import { Router } from "express";
import { deleteUser, getUserByID, getUsers, postUser, putUser } from "../controller/user.controllers";

const router = Router();

router.get('/', getUsers);
router.get('/:userID', getUserByID);
router.post('/', postUser);
router.put('/:userID', putUser);
router.delete('/:userID', deleteUser);

export default router;