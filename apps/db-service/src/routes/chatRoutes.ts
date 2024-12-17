import { Router } from "express";
import { createChat, getChat, getChats, deleteChat } from "../controllers/chatController";

const router: import("express").Router = Router();

router.route("/").post(getChats);
router.route("/create").post(createChat);
router.route("/get").post(getChat);
router.route("/delete").post(deleteChat);

export default router;
