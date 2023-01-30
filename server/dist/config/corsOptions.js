"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const allowOrigins_1 = __importDefault(require("./allowOrigins"));
const corsOptions = {
    origin: (origin, callback) => {
        if (allowOrigins_1.default.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
    Credentials: true
};
exports.default = corsOptions;
//# sourceMappingURL=corsOptions.js.map