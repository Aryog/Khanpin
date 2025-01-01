// user.route.ts
import express, { Request, Response, NextFunction } from "express";
import {
	checkAuth,
	forgotPassword,
	login,
	logout,
	resetPassword,
	signup,
	updateProfile,
	verifyEmail,
} from "../controller/user.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

interface AuthRequest extends Request {
	id: string;
}

type AuthRequestHandler = (req: AuthRequest, res: Response, next: NextFunction) => Promise<any>;
type StandardRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const router = express.Router();

router.get("/check-auth",
	isAuthenticated as AuthRequestHandler,
	checkAuth as AuthRequestHandler
);
router.post("/signup", signup as StandardRequestHandler);
router.post("/login", login as StandardRequestHandler);
router.post("/logout", logout as StandardRequestHandler);
router.post("/verify-email", verifyEmail as StandardRequestHandler);
router.post("/forgot-password", forgotPassword as StandardRequestHandler);
router.post("/reset-password/:token", resetPassword as StandardRequestHandler);
router.put("/profile/update",
	isAuthenticated as AuthRequestHandler,
	updateProfile as AuthRequestHandler
);

export default router;
