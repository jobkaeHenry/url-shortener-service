import express from "express";
// import { getDiveLogsByUserId } from "../controllers/shortenedUrl-controller";
import { login, signUp,tokenRefresh } from "../controllers/user-Controller";
import authChecker from "../middleware/authChecker";

const router = express.Router();

// router.get("/divelog/:id", getDiveLogsByUserId);
router.post("/signup", signUp);

// 보호된 라우팅 - authCheck
router.post("/login", login);
router.post("/refresh", tokenRefresh);
router.use(authChecker);

export default router;
