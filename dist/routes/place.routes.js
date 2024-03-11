"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateTokenHandler_1 = require("../middleware/validateTokenHandler");
const place_controller_1 = require("../controllers/place.controller");
const router = express_1.default.Router();
router.get("/all", place_controller_1.getAllPlaces);
router.get("/:id", place_controller_1.getPlace);
router.post("/create", validateTokenHandler_1.validateToken, place_controller_1.createPlace);
router.put("/:id", validateTokenHandler_1.validateToken, place_controller_1.updatePlace);
router.delete("/:id", validateTokenHandler_1.validateToken, place_controller_1.deletePlace);
exports.default = router;
//# sourceMappingURL=place.routes.js.map