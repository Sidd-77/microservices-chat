import { Message } from "@messagepunk/models";
import { Request, Response } from "express";

export const getMessages = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const chatId = req.body.id;
    const messages = await Message.find({ chat: chatId });
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
    const { user, chat, content } = req.body;
    const message = await Message.create({ user, chat, content });
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
    const { id } = req.body;
    const message = await Message.findById(id);
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
    const { id } = req.body;
    await Message.findByIdAndDelete(id);
    res.json({ message: "Message deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
