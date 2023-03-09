import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { ShortenedUrl } from "../models/shortenedUrl";
import HttpError from "../models/error";
import { User } from "../models/user";
import { shortUrlCreator } from "../utils/shortenedUrlCreator";
import { urlRegExp } from "../utils/regExp";

export const createShortenedUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { url } = req.body;
  const userId = req.userData?.userId;
  // validation
  if (!urlRegExp.test(url)) {
    return next(new HttpError("유효하지 않은 값입니다", 400));
  }

  // 유저가 실존하는지 검증
  let ActualUser;
  try {
    ActualUser = await User.findById(userId);
  } catch (err) {
    return next(
      new HttpError("유저를 검증하는 과정에서 오류가 발생했습니다", 500)
    );
  }

  // 실존하지 않을경우
  if (!ActualUser) {
    return next(new HttpError("존재하지 않는 유저입니다", 403));
  }
  // 실존할 경우

  let uniqueShortUrl;
  while (true) {
    let generatedShortUrl = shortUrlCreator();
    let existingUrl = await ShortenedUrl.findOne({
      short_code: generatedShortUrl,
    });
    if (!existingUrl) {
      uniqueShortUrl = generatedShortUrl;
      break;
    }
  }

  //express-validator 추가하기
  const createdShortUrl = new ShortenedUrl({
    creator_id: userId,
    url: url,
    short_code: uniqueShortUrl,
    analytics: [],
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await createdShortUrl.save({ session });
    // @ts-expect-error
    ActualUser.shortendUrls.push(createdShortUrl);
    await ActualUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    const error = new HttpError("저장에 실패했습니다", 500);
    return next(error);
  }
  res.status(201).json({
    short_code: createdShortUrl.toObject({ getters: true }).short_code,
  });
  // }
};

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
  // 리다이렉트를 시킴
  res.redirect(ExistingUrl.url);
};

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
        const { analytics, url, _id, short_code, ...other } =
          shortendUrl.toObject({ getters: true });
        return { url, id: _id, short_code, visitCounts: analytics.length };
      })
    );
};

export const deleteShortenedUrlById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const shortenedUrl = req.params.id;
  // 얘 바꾸삼
  const userId = req.userData.userId;

  // 삭제할 애를 정함
  let targetShortenedUrl;
  try {
    targetShortenedUrl = await ShortenedUrl.findById(shortenedUrl).populate(
      "creator_id"
    );
  } catch (error) {
    return next(new HttpError("삭제 대상 url 조회에 실패했습니다", 500));
  }
  // 로그 존재여부 확인
  if (!targetShortenedUrl) {
    return next(new HttpError("존재하지 않는 url 입니다", 404));
  }
  // 권한확인
  else if (String(targetShortenedUrl.creator_id._id) !== userId) {
    return next(new HttpError("삭제 권한이 없습니다", 401));
  } else
    try {
      const session = await mongoose.startSession();
      session.startTransaction();
      await targetShortenedUrl.remove({ session });
      // @ts-expect-error
      targetShortenedUrl.creator_id.shortendUrls.pull(targetShortenedUrl);
      // @ts-expect-error
      await targetShortenedUrl.creator_id.save({ session });
      session.commitTransaction();
    } catch (error) {
      return next(new HttpError("삭제에 실패했습니다", 500));
    }
  res.status(201).json({ message: "삭제가 완료되었습니다" });
};
