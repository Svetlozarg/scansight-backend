"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstname: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
    },
    lastname: {
        type: String,
        required: [true, "Last name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
    },
    points: {
        type: Number,
        default: 0,
    },
    locations: [
        {
            name: {
                type: String,
                required: true,
            },
            visited: {
                type: Boolean,
                default: false,
            },
        },
    ],
}, {
    timestamps: true,
});
const User = mongoose_1.models.User || (0, mongoose_1.model)("User", userSchema);
exports.default = User;
//# sourceMappingURL=user.model.js.map