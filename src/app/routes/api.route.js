import express from "express";
import UsersController from "#controller/users.controller";
import AuthController from "#controller/auth.controller";
import {
	checkUser,
	requireAuth,
	requireAdmin,
	requireManager,
} from "#middleware/auth.middleware";
import { verifyRefreshToken } from "#middleware/token.middleware";

const route = express.Router();

// auth routes
route.post("/login", AuthController.login);
route.get("/getAuth", requireAuth, AuthController.getAuth);
route.post("/refresh-token", verifyRefreshToken, AuthController.refreshCookie);
route.post("/logout", checkUser, AuthController.logout);

// dashboard
route.get("/", (req, res) => res.send("hello"));

// user routes
route.get("/users", requireManager, UsersController.index);
route.get("/user/:id", requireAdmin, UsersController.show);
route.post("/user", requireAdmin, UsersController.store);
route.patch("/user/:id", requireAuth, UsersController.update);
route.put("/reset-password/:id", requireAdmin, UsersController.resetPassword);
route.delete("/user/:id", requireAdmin, UsersController.destroy);

export default route;
