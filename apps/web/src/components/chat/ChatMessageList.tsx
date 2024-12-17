import React from "react";
import { useEffect, useRef } from "react";
import { useChatStore } from "../../store/chatStore";
import { ChatMessageItem } from "./ChatMessageItem";

export function ChatMessageList() {
  const messages = useChatStore((state) => state.messages);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto space-y-4">
      {messages.map((message) => (
        <ChatMessageItem key={message.id} message={message} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}