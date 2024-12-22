import React, { useState } from "react";
import { Input as NextUIInput, Button } from "@nextui-org/react";
import { Send } from "lucide-react";
import { FilePicker } from "./FilePicker";

interface InputProps {
  onSendMessage: (content: string, isfile: boolean) => void;
  disabled?: boolean;
  onInputChange: (content: string) => void;
}

export function Input({
  onSendMessage,
  disabled = false,
  onInputChange,
}: InputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim(), false);
      setMessage("");
    }
  };

  const handleFileSelect = (content: string) => {
    if (!disabled) {
      onSendMessage(content, true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex space-x-2">
      <NextUIInput
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          onInputChange(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        placeholder={
          disabled ? "Select a contact to send a message" : "Type a message..."
        }
        fullWidth
        disabled={disabled}
        className="flex-1"
      />
      <FilePicker onSelect={handleFileSelect} disabled={disabled} />
      <Button
        color="primary"
        isIconOnly
        onPress={handleSend}
        isDisabled={!message.trim() || disabled}
      >
        <Send size={20} />
      </Button>
    </div>
  );
}