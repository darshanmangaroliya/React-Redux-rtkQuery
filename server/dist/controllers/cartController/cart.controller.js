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
exports.getcart = exports.handleRemoveiteam = exports.addItemToCart1 = void 0;
const product_model_1 = __importDefault(require("../../models/product.model"));
const cart_1 = __importDefault(require("../../models/cart"));
const addItemToCart1 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, userId } = req.body;
    const quantity = Number.parseInt(req.body.quantity);
    let data = null;
    try {
        let cart = yield cart_1.default.findOne({
            userId,
        });
        const productDetails = yield product_model_1.default.findById(productId);
        if (cart) {
            let indexFound = cart.items.findIndex((p) => p.productId == productId);
            if (indexFound !== -1) {
                cart.items[indexFound].quantity =
                    cart.items[indexFound].quantity + quantity;
                cart.items[indexFound].total =
                    cart.items[indexFound].quantity * productDetails.price;
                cart.items[indexFound].price = productDetails.price;
                cart.subTotal = cart.items
                    .map((item) => item.total)
                    .reduce((acc, curr) => acc + curr);
            }
            else if (quantity > 0) {
                cart.items.push({
                    productId,
                    name: productDetails.name,
                    quantity,
                    price: productDetails.price,
                    description: productDetails.description,
                    productPictures: [...productDetails.productPictures],
                    total: productDetails.price * quantity,
                });
                cart.subTotal = cart.items
                    .map((item) => item.total)
                    .reduce((acc, curr) => acc + curr);
            }
            else {
                return res.status(400).json({
                    code: 400,
                    message: "Invalid request",
                });
            }
            data = yield cart.save();
        }
        else {
            const cartData = {
                userId,
                items: [
                    {
                        productId,
                        name: productDetails.name,
                        quantity,
                        price: productDetails.price,
                        description: productDetails.description,
                        productPictures: [...productDetails.productPictures],
                        total: productDetails.price * quantity,
                    },
                ],
                subTotal: productDetails.price * quantity,
            };
            cart = new cart_1.default(cartData);
            data = yield cart.save();
        }
        console.log("cartData:", data);
        res.status(200).json({
            message: "Add to Cart successfully!",
            data,
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            err,
        });
    }
});
exports.addItemToCart1 = addItemToCart1;
const handleRemoveiteam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, userId } = req.body;
    let data = null;
    try {
        const removeProduct = yield product_model_1.default.findById(productId);
        let cart = yield cart_1.default.findOne({ userId });
        if (!removeProduct)
            res.send("product not found");
        if (!cart)
            res.send("can't Delete item ");
        let product = cart.items.find((p) => p.productId == productId);
        if (!product)
            return res.json({ msg: "please add product first" });
        let indexFound = cart.items.findIndex((p) => p.productId == productId);
        let qty = product.quantity;
        console.log("qty", qty);
        if (qty === 1) {
            let filterItem = cart.items.filter((p) => p.productId != productId);
            if (filterItem.length > 0) {
                console.log("filterarr:", filterItem);
                cart.items = [...filterItem];
                cart.subTotal = cart.items
                    .map((item) => item.total)
                    .reduce((acc, curr) => acc + curr);
            }
            else {
                cart = null;
            }
        }
        else {
            cart.items[indexFound].quantity = cart.items[indexFound].quantity - 1;
            cart.items[indexFound].total =
                cart.items[indexFound].quantity * removeProduct.price;
            cart.items[indexFound].price = removeProduct.price;
            cart.subTotal = cart.items
                .map((item) => item.total)
                .reduce((acc, curr) => acc + curr);
        }
        try {
            data = yield cart.save();
            res.send({ data, msg: "item remove sucessfully" });
        }
        catch (error) {
            res.send("error");
        }
    }
    catch (error) {
        res.send({ error });
    }
});
exports.handleRemoveiteam = handleRemoveiteam;
const getcart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    try {
        const cart = yield cart_1.default.find({ userId });
        if (!cart)
            return res.json("cart not found");
        res.json(cart[0]);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getcart = getcart;
//# sourceMappingURL=cart.controller.js.map