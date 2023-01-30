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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllproduct = exports.handleAddproduct = void 0;
const product_model_1 = __importDefault(require("../../models/product.model"));
const handleAddproduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { name, price, quantity, description, productPictures } = _a, restparams = __rest(_a, ["name", "price", "quantity", "description", "productPictures"]);
    let urlArray = [];
    urlArray.push({ img: productPictures });
    const newProduct = new product_model_1.default({
        name,
        price,
        quantity,
        description,
        productPictures: urlArray,
        createdBy: "629dc27237f47a8c43f5f9d9",
    });
    try {
        const savedProduct = yield newProduct.save();
        res.status(200).json(savedProduct);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.handleAddproduct = handleAddproduct;
const getAllproduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProduct = yield product_model_1.default.find({});
        if (!allProduct)
            return res.status(204).json({ 'message': 'No users found' });
        res.status(200).send(allProduct);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getAllproduct = getAllproduct;
//# sourceMappingURL=product.controller.js.map