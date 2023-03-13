import { Request, Response, NextFunction } from "express";
import HttpError from "../../models/error";
import { ShortenedUrl } from "../../models/shortenedUrl";

/** id(유저id)를 body로 받아가 가지고 있는 ShortenedUrl 정보를 리턴*/
export const getShortenedUrlsByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userData.userId;

  let findShortenedUrlByUserId;
  try {
    findShortenedUrlByUserId = await ShortenedUrl.find({ creator_id: userId });
    // 이런 방법도 가능
    // findShortenedUrlByUserId = await User.findById(userId).populate("divelogs");
  } catch (err) {
    next(new HttpError("url을 찾지 못했습니다", 500));
  }
  if (!findShortenedUrlByUserId) {
    next(new HttpError("존재하지 않는 url 입니다", 404));
  } else
    return res.status(200).json(
      findShortenedUrlByUserId.map((shortendUrl) => {
        const { analytics, url, _id, short_code, created_at, ...other } =
          shortendUrl.toObject({ getters: true });
        return {
          url,
          id: _id,
          short_code,
          visitCounts: analytics.length,
          created_at,
        };
      })
    );
};
