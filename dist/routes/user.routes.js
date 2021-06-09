"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = require("../controller/user.controllers");
const router = express_1.Router();
router.get('/', user_controllers_1.getUsers);
router.get('/:userID', user_controllers_1.getUserByID);
router.post('/', user_controllers_1.postUser);
router.put('/:userID', user_controllers_1.putUser);
router.delete('/:userID', user_controllers_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map