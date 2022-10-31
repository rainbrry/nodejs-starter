import jwt from "jsonwebtoken";
import { accessTokenKey, refreshTokenKey } from "#config/env";

// generate access token
export const generateAccessToken = (payload) => {
	return jwt.sign(payload, accessTokenKey, { expiresIn: "15m" });
};

// generate refresh token
export const generateRefreshToken = (payload) => {
	return jwt.sign(payload, refreshTokenKey);
};

// verify access token
export const verifyAccessToken = (token) => {
	return jwt.verify(token, accessTokenKey);
};

// verify refresh token
export const verifyRefreshToken = (token) => {
	return jwt.verify(token, refreshTokenKey);
};
