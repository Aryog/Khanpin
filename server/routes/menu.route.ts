import express, { Request, Response, NextFunction } from "express";
import upload from "../middlewares/multer";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import {
	addMenu,
	editMenu
} from "../controller/menu.controller";

interface AuthRequest extends Request {
	id: string;
	file?: Express.Multer.File;
}

type AuthRequestHandler = (req: AuthRequest, res: Response, next: NextFunction) => Promise<any>;
const router = express.Router();

router.route("/")
	.post(
		isAuthenticated as AuthRequestHandler,
		upload.single("image"),
		addMenu as AuthRequestHandler
	);
router.route("/:id")
	.put(
		isAuthenticated as AuthRequestHandler,
		upload.single("image"),
		editMenu as AuthRequestHandler
	);

export default router;
