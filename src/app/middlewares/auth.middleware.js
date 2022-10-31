import { verifyAccessToken } from "#middleware/token.middleware";
import User from "#model/user.model";

// check user and set req.user
export const checkUser = (req, res, next) => {
	verifyAccessToken(req, res, async () => {
		const user = await User.findById(req.userId).select("+role");
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		req.user = {
			id: user._id,
			role: user.role,
		};
		next();
	});
};

// only own user can access
export const requireAuth = (req, res, next) => {
	checkUser(req, res, () => {
		if (req.user.id !== req.params.id) {
			return res.status(403).json({ message: "Not allowed" });
		}
		next();
	});
};

// only admin can access
export const requireAdmin = (req, res, next) => {
	checkUser(req, res, () => {
		if (req.user.role !== "admin") {
			return res.status(403).json({ message: "Not allowed" });
		}
		next();
	});
};

// super admin
export const requireSuperAdmin = (req, res, next) => {
	checkUser(req, res, () => {
		if (req.user.role !== "super admin") {
			return res.status(403).json({ message: "Not allowed" });
		}
		next();
	});
};
