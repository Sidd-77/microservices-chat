import React, { useState } from "react";
import { Input as NextUIInput, Button } from "@nextui-org/react";
import { Send } from "lucide-react";

interface InputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
}

export function Input({ onSendMessage, disabled = false }: InputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className=" flex space-x-2">
      <NextUIInput
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={disabled ? "Select a contact to send a message" : "Type a message..."}
        fullWidth
        disabled={disabled}
        className="flex-1"
      />
      <Button 
        color="primary" 
        isIconOnly 
        onPress={handleSend}
        disabled={!message.trim() || disabled}
      >
        <Send size={20} />
      </Button>
    </div>
  );
}