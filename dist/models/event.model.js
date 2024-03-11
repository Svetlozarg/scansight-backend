"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const eventSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    phone: {
        type: String,
        trim: true,
        maxlength: 20,
    },
    email: {
        type: String,
        trim: true,
        maxlength: 100,
    },
    link: {
        type: String,
        trim: true,
        maxlength: 100,
    },
}, {
    timestamps: true,
});
const Event = mongoose_1.models.Event || (0, mongoose_1.model)("Event", eventSchema);
exports.default = Event;
//# sourceMappingURL=event.model.js.map