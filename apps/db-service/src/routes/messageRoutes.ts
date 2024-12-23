import { Router } from "express";
import { createMessage, getMessage, getMessages, deleteMessage } from "../controllers/messageController";

const router: import("express").Router = Router();

router.route("/").post(getMessages);
router.route("/create").post(createMessage);
router.route("/get").post(getMessage);
router.route("/delete").post(deleteMessage);

export default router;
