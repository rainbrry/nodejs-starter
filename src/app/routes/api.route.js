import express from "express";
import UsersController from "#controller/users.controller";
import AuthController from "#controller/auth.controller";
import {
	checkUser,
	requireAuth,
	requireAdmin,
} from "#middleware/auth.middleware";

const route = express.Router();

// auth login
route.post("/login", AuthController.login);

// For dashboard
route.get("/", (req, res) => res.send("hello"));

// user routes
route.get("/users", requireAdmin, UsersController.index);
route.get("/user/:id", requireAdmin, UsersController.show);
route.post("/user", requireAdmin, UsersController.store);
route.patch("/user/:id", requireAuth, UsersController.update);
route.put("/reset-password/:id", requireAdmin, UsersController.resetPassword);
route.delete("/user/:id", requireAdmin, UsersController.destroy);

export default route;
