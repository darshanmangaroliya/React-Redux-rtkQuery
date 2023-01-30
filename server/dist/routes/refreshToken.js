"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const refreshTokenController_1 = require("../controllers/refreshTokenController");
const router = (0, express_1.Router)();
router.get("/", refreshTokenController_1.handleRefreshToken);
exports.default = router;
//# sourceMappingURL=refreshToken.js.map