import { User } from "@messagepunk/models";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "development_secret";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, avatar } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      avatar,
    });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({_id:user._id, token, username, email, avatar });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User does not exist" });
      return;
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    const { username, avatar } = user;

    res.status(200).json({_id:user._id, token, username, email, avatar });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
