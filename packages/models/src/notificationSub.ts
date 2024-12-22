import { Schema, model } from "mongoose";

const SubscriptionSchema = new Schema({
  id: { type: String, required: true, unique: true },
  endpoint: { type: String, required: true },
  p256dh: { type: String, required: true },
  auth: { type: String, required: true },
  userId: { type: String, required: true },
  deviceName: { type: String, default: null },
  createdAt: { type: Date, required: true, default: Date.now },
});

export const SubscriptionModel = model("Subscription", SubscriptionSchema);
