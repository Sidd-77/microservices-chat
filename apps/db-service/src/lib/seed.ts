import mongoose from "mongoose";
import { User, Chat, Message } from "@messagepunk/models";
import bcrypt from "bcryptjs";

const MONGO_URI = "mongodb://localhost:27017/db"; // Update with your MongoDB URI

const seedUsers = async () => {
  const hashedPassword = await bcrypt.hash("password123", 10);

  const users = [
    { username: "john_doe", email: "john@example.com", password: hashedPassword },
    { username: "jane_doe", email: "jane@example.com", password: hashedPassword },
    { username: "sam_smith", email: "sam@example.com", password: hashedPassword },
  ];

  await User.insertMany(users);
  console.log("Users seeded!");
};

const seedChats = async () => {
  const users = await User.find();
  if (users.length < 2) throw new Error("Not enough users to seed chats.");

  const chats = [
    { users: [users[0]._id, users[1]._id] },
    { users: [users[1]._id, users[2]._id] },
  ];

  const createdChats = await Chat.insertMany(chats);
  console.log("Chats seeded!");
  return createdChats;
};

const seedMessages = async (chats: any[]) => {
  const users = await User.find();

  const messages = [
    {
      user: users[0]._id,
      chat: chats[0]._id,
      content: "Hey! How's it going?",
    },
    {
      user: users[1]._id,
      chat: chats[0]._id,
      content: "I'm doing great, thanks!",
    },
    {
      user: users[1]._id,
      chat: chats[1]._id,
      content: "Did you finish the task?",
    },
    {
      user: users[2]._id,
      chat: chats[1]._id,
      content: "Almost done. Give me a few minutes.",
    },
  ];

  await Message.insertMany(messages);
  console.log("Messages seeded!");
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany();
    await Chat.deleteMany();
    await Message.deleteMany();

    // Seed new data
    await seedUsers();
    const chats = await seedChats();
    await seedMessages(chats);

    console.log("Database seeding completed!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
