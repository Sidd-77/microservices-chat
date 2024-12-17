import { User } from "@messagepunk/models";
import { Request, Response } from "express";

export const searchUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { query } = req.body;
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } }
      ]
    });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.body;
    const user = await User.findById(id);
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
