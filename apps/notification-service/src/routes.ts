// routes.ts
import { Router } from "express";
import {
  subscribe,
  pushNotificationToClient,
  pushNotificationToUser,
} from "./controller";

const subscriptionRouter:Router = Router();

subscriptionRouter.post("/subscribe", subscribe);
subscriptionRouter.post("/push-notification/client", pushNotificationToClient);
subscriptionRouter.post("/push-notification/user", pushNotificationToUser);

export default subscriptionRouter;