import React, { useEffect, useRef } from "react";
import { Avatar } from "@nextui-org/react";

// Types
interface Contact {
  id: string;
  name: string;
  avatar: string;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

interface MessagesProps {
  messages: Message[];
  selectedContact: Contact | null;
}

export function Messages({ messages, selectedContact }: MessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedContact) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-900 text-gray-500">
        <p>Select a contact to view messages</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
      {messages.map((message) => {
        const isYou = message.sender === 'You';
        
        return (
          <div 
            key={message.id}
            className={`flex items-start space-x-3 ${isYou ? 'justify-end' : 'justify-start'}`}
          >
            {!isYou && (
              <Avatar 
                src={selectedContact.avatar} 
                size="sm" 
                className="shrink-0" 
              />
            )}
            <div 
              className={`
                max-w-[70%] p-3 rounded-lg 
                ${isYou 
                  ? 'bg-blue-600 text-white self-end' 
                  : 'bg-gray-700 text-white self-start'}
              `}
            >
              <div className="text-sm">{message.content}</div>
              <div className="text-xs text-gray-300 mt-1 text-right">
                {message.timestamp}
              </div>
            </div>
            {isYou && (
              <Avatar 
                src="https://i.pravatar.cc/150?u=default" 
                size="sm" 
                className="shrink-0" 
              />
            )}
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}