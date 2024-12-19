import { Avatar } from "@nextui-org/react";
import SearchUser from "../searchUser";
import { Chat } from "../../types/chat";

interface SidebarProps {
  chats: Chat[];
  onContactSelect: (contact: Chat) => void;
  selectedContact: Chat | null;
  setUpdateList: (value: boolean) => void;
  onlineUsers: string[];
  currentUserId: string;
}

export function Sidebar({
  chats,
  onContactSelect,
  selectedContact,
  setUpdateList,
  onlineUsers,
  currentUserId
}: SidebarProps) {
  return (
    <div className="flex-grow overflow-y-auto">
      <div className="">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Contacts</h2>
          <SearchUser setUpdateList={setUpdateList} />
        </div>
        {chats.map((contact) => {
          const otherUser = contact.users.find(u => u._id !== currentUserId);
          const isOnline = onlineUsers.includes(otherUser?._id || "");
          
          return (
            <div
              key={contact._id}
              className={`
                flex items-center space-x-3 p-2 rounded-md cursor-pointer 
                transition-colors duration-200 my-2 relative
                ${
                  selectedContact?._id === contact._id
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-700"
                }
              `}
              onClick={() => onContactSelect(contact)}
            >
              <div className="relative">
                <Avatar src={otherUser?.avatar} size="sm" className="shrink-0" />
                <div
                  className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-gray-900 rounded-full
                    ${isOnline ? "bg-green-500" : "bg-gray-500"}`}
                />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-medium truncate">
                  {otherUser?.username || "Unknown User"}
                </span>
                <span className="text-xs text-gray-400 truncate">
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}