import express from "express";
import UsersController from "#controller/users.controller";
import AuthController from "#controller/auth.controller";

const route = express.Router();

route.post("/login", AuthController.login);

route.get("/", (req, res) => res.send("hello"));

route.get("/users", UsersController.index);
route.get("/user/:id", UsersController.show);
route.post("/user", UsersController.store);
route.patch("/user/:id", UsersController.update);
route.put("/reset-password/:id", UsersController.resetPassword);
route.delete("/user/:id", UsersController.destroy);

export default route;
