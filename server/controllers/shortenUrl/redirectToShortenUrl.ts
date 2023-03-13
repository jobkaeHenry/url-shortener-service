import { Request, Response, NextFunction } from "express";
import HttpError from "../../models/error";
import { ShortenedUrl } from "../../models/shortenedUrl";

/** ShortenedUrl 와 일치하는 url로 리다이렉트하는 컨트롤러 */
export const redirectToShortenUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const shortenedUrl = req.params.id;
  let ExistingUrl;
  try {
    ExistingUrl = await ShortenedUrl.findOne({
      short_code: shortenedUrl,
    });
  } catch (err) {
    const error = new HttpError("오류가 발생했습니다", 500);
    return next(error);
  }

  if (!ExistingUrl) {
    const error = new HttpError("존재하지 않는 URL입니다", 404);
    return next(error);
  }
  // 관련정보를 추가함

  const analyticsData = {
    browser: req.headers["user-agent"],
    location: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    language: req.headers["accept-language"],
    visit_time: new Date(),
  };
  // @ts-expect-error
  ExistingUrl.analytics.push(analyticsData);
  await ExistingUrl.save();
  // 리다이렉트할 url을 줌
  res.json(ExistingUrl.url);
};
