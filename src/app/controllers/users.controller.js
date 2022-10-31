import User from "#model/user.model";
import { encryptPassword } from "#helper/EncryptPassword";

// Controller for the user routes

const UsersController = {
	// Get all users
	index: async (req, res) => {
		await User.find()
			.select("+role")
			.then((users) => res.status(200).json(users))
			.catch((err) => res.status(500).json(err));
	},

	// Get a user by id
	show: async (req, res) => {
		await User.findById(req.params.id)
			.select("+role")
			.then((user) => res.status(200).json(user))
			.catch((err) => res.status(500).json(err));
	},

	// Create a new user
	store: async (req, res) => {
		const { fullname, username, role, password } = req.body;

		const user = await User.findOne({ username });
		if (user) {
			return res.status(400).json({ message: "User already exists" });
		}

		const newUser = new User({
			fullname,
			username,
			password: encryptPassword(password),
			role,
		});

		await newUser
			.save()
			.then((user) => {
				return res
					.status(200)
					.json({ message: "User created successfully", data: user });
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	},

	// Update a user by id
	update: async (req, res) => {
		await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		})
			.then((user) => res.status(200).json(user))
			.catch((err) => res.status(500).json(err));
	},

	// Delete a user by id
	destroy: async (req, res) => {
		await User.findByIdAndDelete(req.params.id)
			.then((user) => res.status(200).json(user))
			.catch((err) => res.status(500).json(err));
	},

	// Reset password
	resetPassword: async (req, res) => {
		await User.findById(req.params.id)
			.select("+password")
			.then((user) => {
				if (req.body.currentPassword === user.password) {
					user.password = req.body.newPassword;
					user.save();
					res.status(200).json("Success");
				}
			})
			.catch((err) => res.status(500).json(err));
	},
};

export default UsersController;
