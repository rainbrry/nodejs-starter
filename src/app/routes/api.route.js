import express from "express";
import UsersController from "#controller/users.controller";

const route = express.Router();

route.get("/", (req, res) => res.send("hello"));
route.get("/users", (req, res) => UsersController.index);
route.get("/user/:id", (req, res) => UsersController.show);

export default route;
