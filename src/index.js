import api from "#route/api.route";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { port, dbURI } from "#config/env";

const app = express();

mongoose
	.connect(dbURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Database connected"))
	.catch((err) => console.log(err));

app.use(api);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());

app.listen(port, () =>
	console.log(`Server running at http://localhost:${port}`)
);
