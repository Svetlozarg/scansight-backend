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
exports.deductPoints = exports.addPoints = exports.loginUser = exports.registerUser = exports.getUserPoints = exports.getUsers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
//@desc Get all users
//?@route GET /api/users
//@access private
exports.getUsers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.find({});
    if (users) {
        res.status(200).json({
            success: true,
            data: users,
        });
    }
    else {
        res.status(404);
        res.send({
            success: false,
            message: "Users not found",
        });
        throw new Error("Users not found");
    }
}));
//@desc Get user's total points
//?@route GET /api/user/:id/points
//@access private
exports.getUserPoints = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(req.params.id);
    if (user) {
        res.status(200).json({
            success: true,
            data: {
                points: user.points,
            },
        });
    }
    else {
        res.status(404);
        res.send({
            success: false,
            message: "User not found",
        });
        throw new Error("User not found");
    }
}));
//@desc Register a user
//!@route POST /api/register
//@access public
exports.registerUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, email, phone, password } = req.body;
    if (!firstname || !lastname || !email || !phone || !password) {
        res.status(400);
        res.send({
            success: false,
            message: "All fields are mandatory!",
        });
        throw new Error("All fields are mandatory!");
    }
    const userAvailable = yield user_model_1.default.findOne({ email });
    if (userAvailable) {
        res.status(400);
        res.send({
            success: false,
            message: "User already registered!",
        });
        throw new Error("User already registered!");
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const user = yield user_model_1.default.create({
        firstname,
        lastname,
        email,
        phone,
        password: hashedPassword,
        locations: [
            { name: "Исторически музей", visited: false },
            { name: "Хераклея Синтика", visited: false },
            { name: "Къща Ванга", visited: false },
            { name: "Самуилова Крепост", visited: false },
        ],
    });
    console.log(`User created ${user}`);
    if (user) {
        res.status(201).json({
            success: true,
            data: {
                _id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                phone: user.phone,
                location: user.locations,
            },
        });
    }
    else {
        res.status(400);
        res.send({
            success: false,
            message: "User data is not valid",
        });
        throw new Error("User data is not valid");
    }
    res.json({ message: "Register the user" });
}));
//@desc Login user
//!@route POST /api/login
//@access public
exports.loginUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        res.send({
            success: false,
            message: "All fields are mandatory!",
        });
        throw new Error("All fields are mandatory!");
    }
    const user = yield user_model_1.default.findOne({ email });
    if (user && (yield bcrypt_1.default.compare(password, user.password))) {
        if (!process.env.ACCESS_TOKEN_SECERT) {
            res.status(500);
            res.send({
                success: false,
                message: "Access token secret is not defined",
            });
            throw new Error("Access token secret is not defined");
        }
        const accessToken = jsonwebtoken_1.default.sign({
            user: {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                phone: user.phone,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECERT, { expiresIn: "24h" });
        res.status(200).json({
            success: true,
            data: {
                _id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                phone: user.phone,
                accessToken: accessToken,
            },
        });
    }
    else {
        res.status(401);
        res.send({
            success: false,
            message: "email or password is not valid",
        });
        throw new Error("email or password is not valid");
    }
}));
//@desc Add points to user
//!@route POST /api/user/:id/points
//@access private
exports.addPoints = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(req.params.id);
    if (user) {
        user.points += req.body.points;
        yield user.save();
        res.status(200).json({
            success: true,
            data: {
                points: user.points,
            },
        });
    }
    else {
        res.status(404);
        res.send({
            success: false,
            message: "User not found",
        });
        throw new Error("User not found");
    }
}));
//@desc Deduct points from user
//!@route POST /api/user/:id/points/deduct
//@access private
exports.deductPoints = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(req.params.id);
    if (user) {
        user.points -= req.body.points;
        yield user.save();
        res.status(200).json({
            success: true,
            data: {
                points: user.points,
            },
        });
    }
    else {
        res.status(404);
        res.send({
            success: false,
            message: "User not found",
        });
        throw new Error("User not found");
    }
}));
//# sourceMappingURL=user.controller.js.map