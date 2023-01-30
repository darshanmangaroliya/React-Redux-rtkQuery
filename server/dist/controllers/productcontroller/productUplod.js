"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const uploadRouter = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}.jpg`);
    },
});
const upload = (0, multer_1.default)({ storage });
uploadRouter.post('/', upload.single('image'), (req, res) => {
    var _a;
    console.log(req.file, "fffffffffffffffffffffffffff");
    res.status(200).json(`/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.path}`);
});
exports.default = uploadRouter;
//# sourceMappingURL=productUplod.js.map