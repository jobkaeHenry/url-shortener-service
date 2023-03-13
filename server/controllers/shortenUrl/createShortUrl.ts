import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import HttpError from "../../models/error";
import { ShortenedUrl } from "../../models/shortenedUrl";
import { User } from "../../models/user";
import { urlRegExp } from "../../utils/regExp";
import { shortUrlCreator } from "../../utils/shortenUrl/shortenedUrlCreator";

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
