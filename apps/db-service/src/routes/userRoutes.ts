import { Router } from "express";
import { searchUsers, getUser, getUsers } from "../controllers/userController";

const router: import("express").Router = Router();

router.route("/search").post(searchUsers);
router.route("/get").post(getUser);
router.route("/all").get(getUsers);

export default router;
