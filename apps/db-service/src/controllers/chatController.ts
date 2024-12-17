import { Chat } from "@messagepunk/models";
import { Request, Response } from "express";

export const getChats = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.body.id;
    const chats = await Chat.find({ users: userId })
      .populate({
      path: "users",
      select: "-password"
      })
      .populate({
      path: "messages",
      populate: {
        path: "user",
        select: "-password"
      }
      });
    res.json(chats);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createChat = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { users } = req.body;
    const existingChat = await Chat.findOne({ users: { $all: users } });
    if (existingChat) {
        res.status(200).json(existingChat);
        return;
    }
    const chat = await Chat.create({ users });
    await chat.populate({
      path: "users",
      select: "-password"
    });
    res.status(201).json(chat);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getChat = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.body;
    const chat = await Chat.findById(id);
    res.json(chat);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteChat = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.body;
    await Chat.findByIdAndDelete(id);
    res.json({ message: "Chat deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
