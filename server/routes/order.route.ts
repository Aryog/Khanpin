import express, { Request, Response, NextFunction } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import {
	createCheckoutSession,
	getOrders,
	stripeWebhook
} from "../controller/order.controller";

const router = express.Router();

interface AuthRequest extends Request {
	id: string;
	file?: Express.Multer.File;
}

type AuthRequestHandler = (req: AuthRequest, res: Response, next: NextFunction) => Promise<any>;
type StandardRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

router.route("/")
	.get(
		isAuthenticated as AuthRequestHandler,
		getOrders as AuthRequestHandler
	);
router.route("/checkout/create-checkout-session")
	.post(
		isAuthenticated as AuthRequestHandler,
		createCheckoutSession as AuthRequestHandler
	);
router.route("/webhook")
	.post(
		express.raw({ type: 'application/json' }),
		stripeWebhook as StandardRequestHandler
	);

export default router;
