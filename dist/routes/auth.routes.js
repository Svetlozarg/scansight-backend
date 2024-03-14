"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const validateTokenHandler_1 = require("../middleware/validateTokenHandler");
const router = express_1.default.Router();
router.post("/register", user_controller_1.registerUser);
router.post("/login", user_controller_1.loginUser);
router.get("/users", validateTokenHandler_1.validateToken, user_controller_1.getUsers);
router.get("/user/:id/points", validateTokenHandler_1.validateToken, user_controller_1.getUserPoints);
router.post("/user/:id/points", validateTokenHandler_1.validateToken, user_controller_1.addPoints);
router.post("/user/:id/points/deduct", validateTokenHandler_1.validateToken, user_controller_1.deductPoints);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map