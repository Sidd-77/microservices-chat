import { Router } from "express";
import { register, login } from "./authControllers";

const router: import("express").Router = Router();

router.route("/register").post(register);
router.route("/login").post(login);

export default router;
