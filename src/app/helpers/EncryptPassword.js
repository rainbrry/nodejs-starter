import CryptoJS from "crypto-js";
import { passwordKey } from "#config/env";

export const encryptPassword = (password) => {
	return CryptoJS.AES.encrypt(password, passwordKey);
};

export const verifyPassword = (encryptedPassword) => {
	return CryptoJS.AES.decrypt(encryptedPassword, passwordKey).toString(
		CryptoJS.enc.Utf8
	);
};
