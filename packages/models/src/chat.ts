import { Schema, model } from "mongoose";

const chatSchema = new Schema({
  users: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  latest_message: { type: Schema.Types.ObjectId, ref: "Message" },
}, { timestamps: true });

export const Chat = model("Chat", chatSchema);

