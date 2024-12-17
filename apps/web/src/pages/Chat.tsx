import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Sidebar } from "../components/chat/Sidebar";
import { Profile } from "../components/chat/Profile";
import { Messages } from "../components/chat/Messages";
import { Input } from "../components/chat/Input";
import { Avatar } from "@nextui-org/react";

// Types for better type checking
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

// Header Component for Selected Contact
const Header = ({ selectedContact }: { selectedContact: Contact | null }) => {
  if (!selectedContact) {
    return (
      <div className="h-16 bg-gray-800 flex items-center px-4 border-b border-gray-700">
        <p className="text-gray-500">Select a contact to start chatting</p>
      </div>
    );
  }

  return (
    <div className="h-16 bg-gray-800 flex items-center px-4 space-x-3 border-b border-gray-700 flex-shrink-0 sticky top-0 z-10 shadow-md">
      <Avatar src={selectedContact.avatar} size="sm" className="shrink-0" />
      <div className="flex flex-col">
        <span className="font-semibold">{selectedContact.name}</span>
        <span className="text-xs text-gray-500">Online</span>
      </div>
    </div>
  );
};

export default function ChatPage() {
  const { user, logout } = useAuthStore();

  // Contacts list
  const [contacts] = useState<Contact[]>([
    { id: "1", name: "Alice", avatar: "https://i.pravatar.cc/150?u=alice" },
    { id: "2", name: "Bob", avatar: "https://i.pravatar.cc/150?u=bob" },
    { id: "3", name: "Charlie", avatar: "https://i.pravatar.cc/150?u=charlie" },
  ]);

  // Selected contact state
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  // Messages state (simulating conversation with selected contact)
  const [messages, setMessages] = useState<Message[]>([]);

  // Handle contact selection
  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);

    // Simulate initial messages for the selected contact
    const initialMessages: Message[] = [
      {
        id: "1",
        sender: contact.name,
        content: `Hey there! I'm ${contact.name}.`,
        timestamp: "10:00 AM",
      },
      {
        id: "2",
        sender: "You",
        content: `Hi ${contact.name}, how are you?`,
        timestamp: "10:02 AM",
      },
    ];

    setMessages(initialMessages);
  };

  // Handle sending a message
  const handleSendMessage = (content: string) => {
    if (!selectedContact) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "You",
      content,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div className="dark flex flex-col md:flex-row h-screen bg-gray-900 text-white overflow-hidden">
      {/* Sidebar - full width on mobile, fixed width on larger screens */}
      <div className="w-full md:w-80 md:min-w-[320px] p-3 flex flex-col border-r border-gray-700 overflow-y-auto">
        <Sidebar
          contacts={contacts}
          onContactSelect={handleContactSelect}
          selectedContact={selectedContact}
        />
        <Profile user={user} logout={logout} />
      </div>

      {/* Main content area - full width, flex column */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header selectedContact={selectedContact} />

        {/* Messages container with proper scrolling */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
          <Messages messages={messages} selectedContact={selectedContact} />
        </div>

        {/* Input area - fixed at bottom, full width */}
        <div className="flex-shrink-0 p-4 border-t border-gray-700">
          <Input
            onSendMessage={handleSendMessage}
            disabled={!selectedContact}
          />
        </div>
      </div>
    </div>
  );
}
