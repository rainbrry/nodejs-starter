import { config } from "dotenv";

config();

const port = process.env.PORT || 8000;
const dbURI = process.env.DB_URI;
const accessTokenKey = process.env.ACCESS_TOKEN_KEY;
const refreshTokenKey = process.env.REFRESH_TOKEN_KEY;
const passwordKey = process.env.PASSWORD_KEY;

export { port, dbURI, accessTokenKey, refreshTokenKey, passwordKey };
