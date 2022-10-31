import User from "#model/user.model";
import { verifyPassword } from "#helper/EncryptPassword";
import {
	generateAccessToken,
	generateRefreshToken,
} from "#helper/GenerateToken";

const AuthController = {
	// Login user
	login: async (req, res) => {
		const { username, password } = req.body;

		// if username or password is empty
		if (!username || !password) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		// find user
		const user = await User.findOne({ username }).select([
			"+password",
			"+refreshToken",
		]);

		if (!user) return res.status(404).json({ message: "User not found" });

		// check password
		const validPassword = verifyPassword(user.password);
		if (password !== validPassword) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		// generate token
		const accessToken = generateAccessToken({ id: user._id, role: user.role });
		const refreshToken = generateRefreshToken({
			id: user._id,
			role: user.role,
		});

		// add refresh token to user (push to array)
		user.refreshToken.push({ token: refreshToken });

		// delete cookies if exist
		if (req.cookie[`${user._id}`]) req.cookies[`${user._id}`] = null;

		// save user
		await user
			.save()
			.then((user) => {
				// set cookies
				res.cookie(String(user._id), accessToken, {
					httpOnly: true, // only server can access the cookie
					sameSite: "lax", // csrf
					secure: true, // only https
					maxAge: 900000, // 15 minutes
					path: "/",
				});

				return res.status(200).json({ message: "Login success" });
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	},

	// Logout user
	logout: async (req, res) => {},
};

export default AuthController;
