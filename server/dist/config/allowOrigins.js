"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allowedOrigins = [
    'https://www.yoursite.com',
    'http://127.0.0.1:5500',
    'http://localhost:8080',
    'http://localhost:3000',
    'http://localhost:3001',
    process.env.URL
];
exports.default = allowedOrigins;
//# sourceMappingURL=allowOrigins.js.map