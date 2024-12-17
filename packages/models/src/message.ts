import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  chat: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
  content: { type: String, required: true },
}, { timestamps: true });

export const Message =  model("Message", messageSchema);