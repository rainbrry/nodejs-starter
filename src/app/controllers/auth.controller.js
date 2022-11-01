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
		const accessToken = generateAccessToken({ id: user._id });
		const refreshToken = generateRefreshToken({ id: user._id });

		// add refresh token to user (push to array)
		user.refreshToken.push({ token: refreshToken });

		// delete cookies if exist
		// if (req.cookies[`${user._id}`]) req.cookies[`${user._id}`] = "";

		// save user
		await user
			.save()
			.then((user) => {
				// set cookies
				res.cookie(String(user._id), accessToken, {
					httpOnly: true, // only server can access the cookie
					sameSite: "lax", // csrf
					path: "/",
				});

				return res
					.status(200)
					.json({ message: "Login success", token: refreshToken });
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	},

	// Logout user
	logout: async (req, res) => {
		// get user by id from req.userId, and update refresh token to "", then clear the cookie
		await User.findByIdAndUpdate({ _id: req.userId }, { refreshToken: "" })
			.then(() => {
				res.clearCookie(String(req.userId), { path: "/" });
				return res.status(200).json({ message: "Logout success" });
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	},

	// Refresh cookie
	// refresh cookie for access token. This is for user who already login
	// Access token is stored in cookies, cookies is set for 15 minutes.
	// If cookies expired, user will be logged out automatically, and need to login again
	// to avoid that
	refreshCookie: async (req, res) => {
		// generate new access token
		const accessToken = await generateAccessToken({ id: req.userId });

		// delete current cookie
		res.clearCookie(String(`${req.userId}`, { path: "/" }));
		req.cookies[`${req.userId}`] = "";

		// set new cookie
		res.cookie(String(req.userId), accessToken, {
			httpOnly: true, // only server can access the cookie
			sameSite: "lax", // csrf
			path: "/", // cookie for all path
		});

		res.status(200).json({ message: "Refreshed" });
	},

	// Get user login
	getAuth: async (req, res) => {
		const user = await User.findById(req.userId);

		res.status(200).json({ user });
	},
};

export default AuthController;
