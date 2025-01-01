import express, { Request, Response, NextFunction } from "express";
import {
	createRestaurant,
	getRestaurant,
	getRestaurantOrder,
	getSingleRestaurant,
	searchRestaurant,
	updateOrderStatus,
	updateRestaurant
} from "../controller/restaurant.controller";
import upload from "../middlewares/multer";
import { isAuthenticated } from "../middlewares/isAuthenticated";

interface AuthRequest extends Request {
	id: string;
	file?: Express.Multer.File;
}

type AuthRequestHandler = (req: AuthRequest, res: Response, next: NextFunction) => Promise<any>;


const router = express.Router();

router.route("/")
	.post(
		isAuthenticated as AuthRequestHandler,
		upload.single("imageFile"),
		createRestaurant as AuthRequestHandler
	);
router.route("/")
	.get(
		isAuthenticated as AuthRequestHandler,
		getRestaurant as AuthRequestHandler
	);
router.route("/")
	.put(
		isAuthenticated as AuthRequestHandler,
		upload.single("imageFile"),
		updateRestaurant as AuthRequestHandler
	);
router.route("/order")
	.get(
		isAuthenticated as AuthRequestHandler,
		getRestaurantOrder as AuthRequestHandler
	);
router.route("/order/:orderId/status")
	.put(
		isAuthenticated as AuthRequestHandler,
		updateOrderStatus as AuthRequestHandler
	);
router.route("/search/:searchText")
	.get(
		isAuthenticated as AuthRequestHandler,
		searchRestaurant as AuthRequestHandler
	);
router.route("/:id")
	.get(
		isAuthenticated as AuthRequestHandler,
		getSingleRestaurant as AuthRequestHandler
	);

export default router;
