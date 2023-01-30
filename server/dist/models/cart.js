"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let ItemSchema = new Schema({
    productId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Product",
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity can not be less then 1."],
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    productPictures: [{ img: { type: String } }],
    total: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
exports.Item = mongoose_1.default.model("item", ItemSchema);
const CartSchema = new Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    items: [ItemSchema],
    subTotal: {
        default: 0,
        type: Number,
    },
}, {
    timestamps: true,
});
const Cart = mongoose_1.default.model("Cart", CartSchema);
exports.default = Cart;
//# sourceMappingURL=cart.js.map