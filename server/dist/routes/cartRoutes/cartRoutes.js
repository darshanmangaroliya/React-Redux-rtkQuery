"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = require("../../controllers/cartController/cart.controller");
const router = (0, express_1.Router)();
router.post("/addIteam", cart_controller_1.addItemToCart1);
router.post("/removeItem", cart_controller_1.handleRemoveiteam);
router.get("/", cart_controller_1.getcart);
exports.default = router;
//# sourceMappingURL=cartRoutes.js.map