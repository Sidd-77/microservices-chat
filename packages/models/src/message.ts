import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  _id: { type: String, required: true },
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  chatId: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
  receiver: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
  content: { type: String, required: true },
  createdAt: { type: String, required: true },
}, { timestamps: true });

export const Message =  model("Message", messageSchema);