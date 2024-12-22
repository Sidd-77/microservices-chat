// controller.ts
import { Request, Response } from "express";
import {
  saveSubscription,
  sendNotificationToSubscription,
  sendNotificationToUser,
  getSubscription,
} from "./subscriptionService";

export const subscribe = async (req: Request, res: Response): Promise<any> => {
  try {
    const subscription = await saveSubscription({
      ...req.body,
      userId: req.body.userId, // Optional user identifier
      deviceName: req.body.deviceName, // Optional device name
    });

    console.log("Subscription saved:", subscription);

    res.status(201).json({
      message: "Subscription saved",
      subscriptionId: subscription._id,
    });
  } catch (error) {
    console.error("Error saving subscription:", error);
    res.status(500).json({ message: "Error saving subscription" });
  }
};

export const pushNotificationToClient = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const { subscriptionId, title, body, image, data } = req.body;

    const subscription = await getSubscription(subscriptionId);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    await sendNotificationToSubscription(
      subscription,
      title,
      body,
      image,
      data,
    );
    res.status(200).json({ message: "Notification sent successfully" });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ message: "Error sending notification" });
  }
};

export const pushNotificationToUser = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const { userId, title, body, image, data } = req.body;

    await sendNotificationToUser(userId, title, body, image, data);
    res.status(200).json({ message: "Notifications sent to user's devices" });
  } catch (error) {
    console.error("Error sending notifications:", error);
    res.status(500).json({ message: "Error sending notifications" });
  }
};