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
exports.deletePlace = exports.updatePlace = exports.createPlace = exports.getPlace = exports.getAllPlaces = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const place_model_1 = __importDefault(require("../models/place.model"));
//@desc Get all places
//?@route GET /api/place/all
//@access private
exports.getAllPlaces = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const places = yield place_model_1.default.find({});
    res.status(200).json({ success: true, data: places });
}));
//@desc Get a single place
//?@route GET /api/place/:id
//@access private
exports.getPlace = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const place = yield place_model_1.default.findById(req.params.id);
    if (place) {
        res.status(200).json({ success: true, data: place });
    }
    else {
        res.status(404);
        res.send({ success: false, message: "Place not found" });
    }
}));
//@desc Create a place
//!@route POST /api/place/create
//@access private
exports.createPlace = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const place = yield place_model_1.default.create(req.body);
    if (place) {
        res.status(201).json({ success: true, data: place });
    }
    else {
        res.status(400);
        res.send({ success: false, message: "Place data is not valid" });
    }
}));
//@desc Update a place
//!@route PUT /api/place/:id
//@access private
exports.updatePlace = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const place = yield place_model_1.default.findById(req.params.id);
    if (place) {
        place.name = req.body.name || place.name;
        place.location = req.body.location || place.location;
        place.url = req.body.url || place.url;
        place.image = req.body.image || place.image;
        place.category = req.body.category || place.category;
        const updatedPlace = yield place.save();
        res.status(200).json({ success: true, data: updatedPlace });
    }
    else {
        res.status(404);
        res.send({ success: false, message: "Place not found" });
    }
}));
//@desc Delete a place
//!@route DELETE /api/place/:id
//@access private
exports.deletePlace = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const plaace = yield place_model_1.default.findOneAndDelete({ _id: req.params.id });
    if (!plaace) {
        res.status(404);
        throw new Error("Place not found");
    }
    res.status(200).json({ success: true, message: "Place deleted successfuly" });
}));
//# sourceMappingURL=place.controller.js.map