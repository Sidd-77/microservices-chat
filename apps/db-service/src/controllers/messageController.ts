import { Message } from "@messagepunk/models";
import { Request, Response } from "express";

export const getMessages = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const chatId = req.body.chatId;
    const messages = await Message.find({ chatId: chatId });
    res.json(messages);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { sender, receiver, chatId, content, _id, createdAt } = req.body;
    const message = await Message.create({ sender, receiver, chatId, content, _id, createdAt });
    res.status(201).json(message);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { _id } = req.body;
    const message = await Message.findById(_id);
    res.json(message);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { _id } = req.body;
    await Message.findByIdAndDelete(_id);
    res.json({ message: "Message deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
