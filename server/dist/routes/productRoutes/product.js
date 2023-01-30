"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const veryfyJwt_1 = __importDefault(require("../../middleware/veryfyJwt"));
const product_controller_1 = require("../../controllers/productcontroller/product.controller");
const router = (0, express_1.Router)();
router.route("/").post(veryfyJwt_1.default, product_controller_1.handleAddproduct).get(product_controller_1.getAllproduct);
exports.default = router;
//# sourceMappingURL=product.js.map