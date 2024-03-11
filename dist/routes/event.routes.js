"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateTokenHandler_1 = require("../middleware/validateTokenHandler");
const event_controller_1 = require("../controllers/event.controller");
const router = express_1.default.Router();
router.get("/all", event_controller_1.getAllEvents);
router.get("/:id", event_controller_1.getEvent);
router.post("/create", validateTokenHandler_1.validateToken, event_controller_1.createEvent);
router.put("/:id", validateTokenHandler_1.validateToken, event_controller_1.updateEvent);
router.delete("/:id", validateTokenHandler_1.validateToken, event_controller_1.deleteEvent);
exports.default = router;
//# sourceMappingURL=event.routes.js.map