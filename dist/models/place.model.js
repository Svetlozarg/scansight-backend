"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PlaceSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ["hotel", "house", "hut"],
        required: true,
    },
}, {
    timestamps: true,
});
const Place = mongoose_1.models.Place || (0, mongoose_1.model)("Place", PlaceSchema);
exports.default = Place;
//# sourceMappingURL=place.model.js.map