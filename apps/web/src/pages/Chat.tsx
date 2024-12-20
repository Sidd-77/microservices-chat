import { useEffect, useState, useRef } from "react";
import { useAuthStore } from "../store/authStore";
import { Sidebar } from "../components/chat/Sidebar";
import { Profile } from "../components/chat/Profile";
import { Messages } from "../components/chat/Messages";
import { Input } from "../components/chat/Input";
import { Avatar } from "@nextui-org/react";
import { Chat } from "../types/chat";
import { getChats } from "../api/users";
import { ChatMessage } from "../types/chat";
import { ChatSocketService } from "../api/socket";
import { v4 as uuidv4 } from "uuid";
import { getMessages } from "../api/messages";

interface UserStatus {
  userId: string;
  status: "online" | "offline";
}

const Header = ({
  selectedContact,
  isOnline,
  currentUserId,
}: {
  selectedContact: Chat | null;
  isOnline: boolean;
  currentUserId: string;
}) => {
  if (!selectedContact) {
    return (
      <div className="h-16 bg-gray-800 flex items-center px-4 border-b border-gray-700">
        <p className="text-gray-500">Select a contact to start chatting</p>
      </div>
    );
  }

  const otherUser = selectedContact.users.find((u) => u._id !== currentUserId);

  return (
    <div className="h-16 bg-gray-800 flex items-center px-4 space-x-3 border-b border-gray-700 flex-shrink-0 sticky top-0 z-10 shadow-md">
      <Avatar src={otherUser?.avatar} size="sm" className="shrink-0" />
      <div className="flex flex-col">
        <span className="font-semibold">{otherUser?.username}</span>
        <span className="text-xs text-gray-500">
          {isOnline ? "Online" : "Offline"}
        </span>
      </div>
    </div>
  );
};

const chatSocket = new ChatSocketService();

export default function ChatPage() {
  const { user, logout } = useAuthStore();
  const [chats, setChats] = useState<Chat[]>([]);
  const [updateList, setUpdateList] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleContactSelect = async (contact: Chat) => {
    setMessages([]);
    setSelectedContact(contact);
    try {
      const fetchedMessages = await getMessages(contact._id);
      setMessages(fetchedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = (content: string) => {
    if (!selectedContact?.users || !user) return;
    const receiverId =
      selectedContact.users.find((u) => u._id !== user._id)?._id || "null";
    const newMessage = {
      chatId: selectedContact._id,
      content,
      sender: user._id,
      receiver: receiverId,
      _id: uuidv4(),
      createdAt: new Date(),
    };
    // Optimistically add the message to the UI
    setMessages((prev) => [...prev, newMessage]);
    // Send via socket
    chatSocket.sendMessage(newMessage);
  };

  const handleTyping = (isTyping: boolean) => {
    if (!selectedContact || !user) return;
    chatSocket.sendTypingStatus(selectedContact._id, user._id, isTyping);
  };

  // Socket connection effect
  useEffect(() => {
    if (!user?._id) return;

    chatSocket.connect(user._id);

    const messageUnsubscribe = chatSocket.onMessage((message) => {
      // Only add message if it belongs to the currently selected chat
      setMessages((prev) => {
        if (selectedContact && message.chatId === selectedContact._id) {
          return [...prev, message];
        }
        return prev;
      });
    });

    const typingUnsubscribe = chatSocket.onTypingStatus(() => {
      // Handle typing status
    });

    const onlineUsersUnsubscribe = chatSocket.onOnlineUsers((users) => {
      setOnlineUsers(users);
    });

    const userStatusUnsubscribe = chatSocket.onUserStatus(
      (status: UserStatus) => {
        setOnlineUsers((prev) => {
          if (status.status === "online") {
            return [...new Set([...prev, status.userId])];
          } else {
            return prev.filter((id) => id !== status.userId);
          }
        });
      }
    );

    return () => {
      messageUnsubscribe();
      typingUnsubscribe();
      onlineUsersUnsubscribe();
      userStatusUnsubscribe();
      chatSocket.disconnect();
    };
  }, [user?._id]); // Remove selectedContact from dependencies

  // Load chats effect
  useEffect(() => {
    if (user?._id) {
      getChats(user._id).then((res) => {
        setChats(res);
      });
    }
  }, [user?._id, updateList]);

  const handleInputChange = () => {
    if (!selectedContact) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    handleTyping(true);

    typingTimeoutRef.current = setTimeout(() => {
      handleTyping(false);
    }, 1000);
  };

  return (
    <div className="dark flex flex-col md:flex-row h-screen bg-gray-900 text-white overflow-hidden">
      <div className="w-full md:w-80 md:min-w-[320px] p-3 flex flex-col border-r border-gray-700 overflow-y-auto">
        <Sidebar
          chats={chats}
          onContactSelect={handleContactSelect}
          selectedContact={selectedContact}
          setUpdateList={setUpdateList}
          onlineUsers={onlineUsers}
          currentUserId={user?._id || "killme"}
        />
        <Profile user={user} logout={logout} />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          selectedContact={selectedContact}
          isOnline={
            selectedContact
              ? onlineUsers.includes(selectedContact.users[0]._id)
              : false
          }
          currentUserId={user?._id || "killme"}
        />

        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
          <Messages
            messages={messages}
            selectedChat={selectedContact}
            socketService={chatSocket}
            currentUserId={user?._id || "killme"}
          />
        </div>

        <div className="flex-shrink-0 p-4 border-t border-gray-700">
          <Input
            onSendMessage={handleSendMessage}
            onInputChange={handleInputChange}
            disabled={!selectedContact}
          />
        </div>
      </div>
    </div>
  );
}
