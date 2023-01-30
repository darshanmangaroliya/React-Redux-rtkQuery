"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logout_controller_1 = require("../controllers/logout.controller");
const router = (0, express_1.Router)();
router.post("/", logout_controller_1.handleLogout);
exports.default = router;
//# sourceMappingURL=logout.js.map