import React from "react";
import { Card, CardBody, Avatar } from "@nextui-org/react";
import { ChatMessage } from "../../types/chat";
import { useAuthStore } from "../../store/authStore";

interface ChatMessageItemProps {
  message: ChatMessage;
}

export function ChatMessageItem({ message }: ChatMessageItemProps) {
  const currentUser = useAuthStore((state) => state.user);
  const isOwnMessage = message.sender.id === currentUser?.id;

  return (
    <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      <div className="flex gap-2 max-w-[80%]">
        {!isOwnMessage && (
          <Avatar
            name={message.sender.username}
            className="w-8 h-8"
            showFallback
          />
        )}
        <Card className={isOwnMessage ? "bg-primary-100" : ""}>
          <CardBody className="py-2 px-4">
            {!isOwnMessage && (
              <p className="text-sm font-semibold">{message.sender.username}</p>
            )}
            <p>{message.content}</p>
            <p className="text-xs text-gray-500">
              {new Date(message.timestamp).toLocaleTimeString()}
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}