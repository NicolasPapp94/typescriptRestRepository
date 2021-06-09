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
exports.createUserDB = exports.deleteUserDB = exports.updateUserDB = exports.getUserDBByEmail = exports.getUserDB = void 0;
const user_1 = __importDefault(require("../models/user"));
const getUserDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let userDB;
    if (id) {
        userDB = yield user_1.default.findByPk(id);
    }
    else {
        userDB = yield user_1.default.findAll();
    }
    return userDB;
});
exports.getUserDB = getUserDB;
const getUserDBByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    let userDB;
    if (email) {
        userDB = yield user_1.default.findOne({
            where: {
                email
            }
        });
        return userDB;
    }
});
exports.getUserDBByEmail = getUserDBByEmail;
const updateUserDB = (userBody, userID) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield user_1.default.update(userBody, {
        where: {
            id: userID
        }
    });
    return updatedUser;
});
exports.updateUserDB = updateUserDB;
const deleteUserDB = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield user_1.default.update({ state: 0 }, {
        where: {
            id: userID
        }
    });
    return updatedUser;
});
exports.deleteUserDB = deleteUserDB;
const createUserDB = (userBody) => __awaiter(void 0, void 0, void 0, function* () {
    const savedUser = user_1.default.build(userBody);
    yield savedUser.save();
    return savedUser;
});
exports.createUserDB = createUserDB;
//# sourceMappingURL=userRepository.js.map