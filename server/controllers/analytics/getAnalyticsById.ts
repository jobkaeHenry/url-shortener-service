import { Request, Response, NextFunction } from "express";
import HttpError from "../../models/error";
import { ShortenedUrl } from "../../models/shortenedUrl";
import { getBrowserName } from "../../utils/analytics/getUserAgent";

const getAnalyticsById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  let matchedUrl;
  try {
    matchedUrl = await ShortenedUrl.findOne({ _id: id });
  } catch {
    return next(new HttpError("일치하는 url이 없습니다", 404));
  }
  const browser = await ShortenedUrl.aggregate([
    { $match: { _id: matchedUrl?._id } },
    { $unwind: "$analytics" },
    {
      $group: {
        _id: "$analytics.browser",
        count: { $sum: 1 },
      },
    },
  ]);
  const parsedBrowser = browser.map((e) => {
    return { name: getBrowserName(e._id), count: e.count };
  });

  const language = await ShortenedUrl.aggregate([
    { $match: { _id: matchedUrl?._id } },
    { $unwind: "$analytics" },
    {
      $group: {
        _id: { $substr: ["$analytics.language", 0, 2] },
        count: { $sum: 1 },
      },
    },
  ]);
  const parsedLanguage = language.map((e) => {
    return { name: e._id, count: e.count };
  });

  res.json({
    browserInfo: parsedBrowser,
    language: parsedLanguage,
  });
};

export default getAnalyticsById;
