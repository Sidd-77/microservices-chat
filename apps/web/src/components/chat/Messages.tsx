import React, { useEffect, useRef, useState } from "react";
import { Avatar } from "@nextui-org/react";
import { ChatSocketService } from "../../api/socket";
import { ChatMessage } from "../../types/chat";

interface MessagesProps {
  messages: ChatMessage[];
  selectedChat: {
    _id: string;
    users: Array<{
      _id: string;
      username: string;
      avatar?: string;
    }>;
  } | null;
  currentUserId: string;
  socketService: ChatSocketService;
}

export function Messages({ messages: initialMessages, selectedChat, currentUserId, socketService }: MessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Socket listeners
  useEffect(() => {
    if (!selectedChat || !socketService) return;

    // Handle incoming messages
    const messageHandler = (message: ChatMessage) => {
      if (message.chatId === selectedChat._id) {
        setMessages(prev => [...prev, message]);
      }
    };

    // Handle typing status
    const typingHandler = ({ chatId, userId, isTyping }: { 
      chatId: string; 
      userId: string; 
      isTyping: boolean 
    }) => {
      if (chatId === selectedChat._id && userId !== currentUserId) {
        setTypingUsers(prev => {
          const updated = new Set(prev);
          if (isTyping) {
            updated.add(userId);
          } else {
            updated.delete(userId);
          }
          return updated;
        });
      }
    };

    // Subscribe to socket events
    const unsubscribeMessage = socketService.onMessage(messageHandler);
    const unsubscribeTyping = socketService.onTypingStatus(typingHandler);

    return () => {
      unsubscribeMessage();
      unsubscribeTyping();
      setTypingUsers(new Set());
    };
  }, [selectedChat, socketService, currentUserId]);

  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-900 text-gray-500">
        <p>Select a chat to view messages</p>
      </div>
    );
  }

  const otherUser = selectedChat.users.find(user => user._id !== currentUserId);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
      {messages.map((message) => {
        const isCurrentUser = message.sender == currentUserId;
        return (
          <div 
            key={message._id}
            className={`flex items-start space-x-3 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
          >
            {!isCurrentUser && otherUser && (
              <Avatar 
                src={otherUser.avatar || `https://i.pravatar.cc/150?u=${otherUser._id}`} 
                size="sm" 
                className="shrink-0" 
              />
            )}
            <div 
              className={`
                max-w-[70%] p-3 rounded-lg 
                ${isCurrentUser 
                  ? 'bg-blue-600 text-white self-end' 
                  : 'bg-gray-700 text-white self-start'}
              `}
            >
              <div className="text-sm">{message.content}</div>
              <div className="text-xs text-gray-300 mt-1 text-right">
                {new Date(message.createdAt).toLocaleTimeString()}
              </div>
            </div>
            {isCurrentUser && (
              <Avatar 
                src={`https://i.pravatar.cc/150?u=${currentUserId}`}
                size="sm" 
                className="shrink-0" 
              />
            )}
          </div>
        );
      })}
      
      {typingUsers.size > 0 && (
        <div className="flex items-center space-x-2 text-gray-400 text-sm">
          <div className="animate-bounce">•</div>
          <div className="animate-bounce delay-100">•</div>
          <div className="animate-bounce delay-200">•</div>
          <span>{otherUser?.username} is typing...</span>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
}