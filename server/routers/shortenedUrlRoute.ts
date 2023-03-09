import express from "express";
import {
  createShortenedUrl,
  deleteShortenedUrlById,
  redirectToShortenUrl,
  getShortenedUrlsByUserId,
} from "../controllers/shortenedUrl-controller";
import authChecker from "../middleware/authChecker";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 유저 추가 수정 삭제 조회
 */
router.get("/:id", redirectToShortenUrl);

router.use(authChecker);
router.get("/", getShortenedUrlsByUserId);
router.post("/", createShortenedUrl);
router.delete("/:id", deleteShortenedUrlById);
export default router;
