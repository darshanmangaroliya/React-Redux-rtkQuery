"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logevent_1 = require("./logevent");
const errorHandler = (err, req, res, next) => {
    (0, logevent_1.logEvents)(`${err.name}: ${err.message}`, 'errLog.txt');
    res.status(500).send(err.message);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map