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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.postUser = exports.getUserByID = exports.getUsers = void 0;
const userRepository_1 = require("../repository/userRepository");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userRepository_1.getUserDB();
    res.json({
        msg: "GetUsers from Controller",
        users
    });
});
exports.getUsers = getUsers;
const getUserByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = req.params;
    const user = yield userRepository_1.getUserDB(userID);
    // ESTAS VALIDACIONES PODRIAN ESTAR EN UNA MIDDLEWARE
    if (!user) {
        return res.status(404).json({
            msg: "No se encontro el usuario con ese ID"
        });
    }
    res.json({
        msg: "GetUsersByID from Controller",
        user
    });
});
exports.getUserByID = getUserByID;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        // ESTAS VALIDACIONES PODRIAN ESTAR EN UNA MIDDLEWARE
        const getEmail = yield userRepository_1.getUserDBByEmail(body.email);
        if (getEmail) {
            return res.status(400).json({
                msg: "Ya existe un usuario con este email"
            });
        }
        const userCreated = yield userRepository_1.createUserDB(body);
        res.json({
            msg: "PostUser from Controller",
            userCreated
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hubo un error al insertar en la Base de datos"
        });
    }
});
exports.postUser = postUser;
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = req.params;
    const { body } = req;
    try {
        // ESTAS VALIDACIONES PODRIAN ESTAR EN UNA MIDDLEWARE
        const getUser = yield userRepository_1.getUserDB(userID);
        if (!getUser) {
            return res.status(404).json({
                msg: "El usuario no existe",
                userID,
                getUser,
            });
        }
        // ESTAS VALIDACIONES PODRIAN ESTAR EN UNA MIDDLEWARE
        const getEmail = yield userRepository_1.getUserDBByEmail(body.email);
        if (getEmail) {
            return res.status(400).json({
                msg: "Ya existe un usuario con este email"
            });
        }
        yield userRepository_1.updateUserDB(body, userID);
        res.json({
            msg: "PostUser from Controller",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Hubo un error al insertar en la Base de datos"
        });
    }
    res.json({
        msg: "PutUser from Controller",
        body,
        userID
    });
});
exports.putUser = putUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = req.params;
    const user = yield userRepository_1.getUserDB(userID);
    // ESTAS VALIDACIONES PODRIAN ESTAR EN UNA MIDDLEWARE
    if (!user) {
        return res.status(404).json({
            msg: "No se encontro el usuario con ese ID"
        });
    }
    const deletedUser = yield userRepository_1.deleteUserDB(userID);
    res.json({
        msg: "DeleteUser from Controller",
        deletedUser
    });
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.controllers.js.map