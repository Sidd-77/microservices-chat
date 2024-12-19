import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  chatId: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
  reciever: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
  content: { type: String, required: true },
  createdAt: Date()
}, { timestamps: true });

export const Message =  model("Message", messageSchema);