import React from "react";
import { Avatar, Button } from "@nextui-org/react";
import { Search } from "lucide-react";

// Types
interface Contact {
  id: string;
  name: string;
  avatar: string;
}

interface SidebarProps {
  contacts: Contact[];
  onContactSelect: (contact: Contact) => void;
  selectedContact: Contact | null;
}

export function Sidebar({
  contacts,
  onContactSelect,
  selectedContact,
}: SidebarProps) {
  return (
    <div className="flex-grow overflow-y-auto">
      <div className="">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Contacts</h2>
          <Button variant="ghost" className="p-2 ">
            <Search size={20} />
          </Button>
        </div>
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={`
              flex items-center space-x-3 p-2 rounded-md cursor-pointer 
              transition-colors duration-200 my-2
              ${
                selectedContact?.id === contact.id
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-700"
              }
            `}
            onClick={() => onContactSelect(contact)}
          >
            <Avatar src={contact.avatar} size="sm" className="shrink-0" />
            <span className="font-medium truncate">{contact.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
