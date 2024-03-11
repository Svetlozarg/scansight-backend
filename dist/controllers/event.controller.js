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
exports.deleteEvent = exports.updateEvent = exports.createEvent = exports.getEvent = exports.getAllEvents = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const event_model_1 = __importDefault(require("../models/event.model"));
//@desc Get all events
//?@route GET /api/event/all
//@access private
exports.getAllEvents = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const events = yield event_model_1.default.find({});
    res.status(200).json({ success: true, data: events });
}));
//@desc Get a single event
//?@route GET /api/event/:id
//@access private
exports.getEvent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield event_model_1.default.findById(req.params.id);
    if (event) {
        res.status(200).json({ success: true, data: event });
    }
    else {
        res.status(404);
        res.send({ success: false, message: "Event not found" });
    }
}));
//@desc Create an event
//!@route POST /api/event/create
//@access private
exports.createEvent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield event_model_1.default.create(req.body);
    if (event) {
        res.status(201).json({ success: true, data: event });
    }
    else {
        res.status(400);
        res.send({ success: false, message: "Event data is not valid" });
    }
}));
//@desc Update an event
//!@route PUT /api/event/:id
//@access private
exports.updateEvent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield event_model_1.default.findById(req.params.id);
    if (event) {
        event.title = req.body.title || event.title;
        event.description = req.body.description || event.description;
        event.startDate = req.body.startDate || event.startDate;
        event.endDate = req.body.endDate || event.endDate;
        event.location = req.body.location || event.location;
        event.phone = req.body.phone || event.phone;
        event.email = req.body.email || event.email;
        event.link = req.body.link || event.link;
        const updatedEvent = yield event.save();
        res.status(200).json({ success: true, data: updatedEvent });
    }
    else {
        res.status(404);
        res.send({ success: false, message: "Event not found" });
    }
}));
//@desc Delete an event
//!@route DELETE /api/event/:id
//@access private
exports.deleteEvent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield event_model_1.default.findOneAndDelete({ _id: req.params.id });
    if (!event) {
        res.status(404);
        throw new Error("Event not found");
    }
    res.status(200).json({ success: true, message: "Event deleted successfuly" });
}));
//# sourceMappingURL=event.controller.js.map