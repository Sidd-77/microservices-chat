import { Schema, model } from "mongoose";

const chatSchema = new Schema({
  users: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  latest_message: { type: Schema.Types.ObjectId, ref: "Message" },
}, { timestamps: true });

export const Chat = model("Chat", chatSchema);

