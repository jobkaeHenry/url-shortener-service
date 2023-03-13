import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { ShortenedUrl } from "../../models/shortenedUrl";
import HttpError from "../../models/error";

/** url ID 를 받아 삭제하는 함수 */
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
