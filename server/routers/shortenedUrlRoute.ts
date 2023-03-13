import express from "express";

import { deleteShortenedUrlById } from "../controllers/shortenUrl/deleteShortenedUrlById";
import { createShortenedUrl } from "../controllers/shortenUrl/createShortUrl";
import { getShortenedUrlsByUserId } from "../controllers/shortenUrl/getShortenedUrlsByuserId";
import { redirectToShortenUrl } from "../controllers/shortenUrl/redirectToShortenUrl";

import authChecker from "../middleware/authChecker";
import getAnalyticsById from "../controllers/analytics/getAnalyticsById";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 유저 추가 수정 삭제 조회
 */
router.get("/:id", redirectToShortenUrl);

router.use(authChecker);
router.get("/analytics/:id",getAnalyticsById);
router.get("/", getShortenedUrlsByUserId);
router.post("/", createShortenedUrl);
router.delete("/:id", deleteShortenedUrlById);
export default router;
