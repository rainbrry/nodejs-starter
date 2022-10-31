import jwt from "jsonwebtoken";
import { accessTokenKey, refreshTokenKey } from "#config/env";
import User from "#model/user.model";

export const verifyAccessToken = async (req, res, next) => {
	const accessToken = req.headers.cookie.split("=")[1];

	if (!accessToken) {
		return res.status(403).json({ message: "Invalid token" });
	}

	jwt.verify(accessToken, accessTokenKey, (err, decoded) => {
		if (err) return res.status(401).send({ message: "Unauthorized" });
		req.userId = decoded.id;
		next();
	});
};

export const verifyRefreshToken = (req, res, next) => {
	const refreshToken = req.headers.authorization.split(" ")[1];

	if (!refreshToken) {
		return res.status(403).json({ message: "Invalid token" });
	}

	jwt.verify(refreshToken, refreshTokenKey, async (err, decoded) => {
		if (err) {
			return res.status(401).send({ message: "Unauthorized" });
		}

		const user = await User.findById(decoded.id).select("+refreshToken");
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const userRefreshToken = user.refreshToken.find(
			(user) => user.token === refreshToken
		);

		if (!userRefreshToken) {
			return res.status(403).json({ message: "Invalid token" });
		}

		req.userId = user._id;
		next();
	});
};
