"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const handleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    const { user, pwd } = req.body;
    if (!user || !pwd)
        return res
            .status(400)
            .json({ message: "Username and password are required." });
    const foundUser = yield UserModel_1.default.findOne({ username: user }).exec();
    if (!foundUser)
        return res.sendStatus(401);
    const match = yield bcrypt_1.default.compare(pwd, foundUser.password);
    if (match) {
        const isAdmin = foundUser.isAdmin;
        const accessToken = jsonwebtoken_1.default.sign({
            user: foundUser._id
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10s" });
        const newRefreshToken = jsonwebtoken_1.default.sign({ username: foundUser.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
        let newRefreshTokenArray = !(cookies === null || cookies === void 0 ? void 0 : cookies.jwt)
            ? foundUser.refreshToken
            : foundUser.refreshToken.filter((rt) => rt !== cookies.jwt);
        if (cookies === null || cookies === void 0 ? void 0 : cookies.jwt) {
            const refreshToken = cookies.jwt;
            const foundToken = yield UserModel_1.default.findOne({ refreshToken }).exec();
            if (!foundToken) {
                newRefreshTokenArray = [];
            }
            res.clearCookie("jwt", {
                httpOnly: true,
                sameSite: "none",
                secure: true,
            });
        }
        foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        const result = yield foundUser.save();
        res.cookie("jwt", newRefreshToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({ accessToken });
    }
    else {
        res.sendStatus(401);
    }
});
exports.handleLogin = handleLogin;
//# sourceMappingURL=auth.controller.js.map