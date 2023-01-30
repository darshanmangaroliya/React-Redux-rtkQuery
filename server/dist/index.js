"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = __importDefault(require("./config/db"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorHandler_1 = require("./middleware/errorHandler");
const logevent_1 = require("./middleware/logevent");
const register_1 = __importDefault(require("./routes/register"));
const authLogin_1 = __importDefault(require("./routes/authLogin"));
const refreshToken_1 = __importDefault(require("./routes/refreshToken"));
const logout_1 = __importDefault(require("./routes/logout"));
const veryfyJwt_1 = __importDefault(require("./middleware/veryfyJwt"));
const credentials_1 = __importDefault(require("./middleware/credentials"));
const corsOptions_1 = __importDefault(require("./config/corsOptions"));
const product_1 = __importDefault(require("./routes/productRoutes/product"));
const cartRoutes_1 = __importDefault(require("./routes/cartRoutes/cartRoutes"));
const productUplod_1 = __importDefault(require("./controllers/productcontroller/productUplod"));
const PORT = process.env.PORT || 3500;
const app = (0, express_1.default)();
(0, db_1.default)();
app.use(logevent_1.logger);
app.use((0, cookie_parser_1.default)());
app.use(credentials_1.default);
app.use((0, cors_1.default)(corsOptions_1.default));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("come from server");
});
app.use('/uploads', productUplod_1.default);
const ___dirname = path_1.default.resolve();
app.use('/uploads', express_1.default.static(path_1.default.join(___dirname, 'uploads')));
app.use("/register", register_1.default);
app.use("/auth", authLogin_1.default);
app.use("/refresh", refreshToken_1.default);
app.use("/logout", logout_1.default);
app.use(veryfyJwt_1.default);
app.use("/product", product_1.default);
app.use("/cart", cartRoutes_1.default);
app.use(errorHandler_1.errorHandler);
mongoose_1.default.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
//# sourceMappingURL=index.js.map