"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;
const crypto_1 = require("crypto");
function hashPassword(password) {
    const salt = (0, crypto_1.randomBytes)(16);
    const hash = (0, crypto_1.scryptSync)(password, salt, 64);
    return `scrypt$${salt.toString('hex')}$${hash.toString('hex')}`;
}
function verifyPassword(password, stored) {
    const parts = stored.split('$');
    if (parts.length !== 3)
        return false;
    const [algo, saltHex, hashHex] = parts;
    if (algo !== 'scrypt')
        return false;
    const salt = Buffer.from(saltHex, 'hex');
    const expected = Buffer.from(hashHex, 'hex');
    const actual = (0, crypto_1.scryptSync)(password, salt, expected.length);
    return (0, crypto_1.timingSafeEqual)(actual, expected);
}
//# sourceMappingURL=password.util.js.map