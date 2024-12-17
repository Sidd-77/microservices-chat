import React from "react";
import { useState } from "react";
import { Button, Input, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/auth";
import { useAuthStore } from "../store/authStore";

export default function Signup() {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await signup({ username, email, password });
      setUser(user);
      navigate("/chat");
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-3 p-6">
          <h1 className="text-2xl font-bold">Sign Up</h1>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              label="Name"
              value={username}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              color="primary"
              className="w-full"
              isLoading={loading}
            >
              Sign Up
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}