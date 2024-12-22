import { Avatar, Button } from "@nextui-org/react";
import { LogOut, Settings } from "lucide-react";
import { User as UserType } from "../../types/auth";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import NotificationSubscribe from "../notificationSubscript";

interface ProfileProps {
  user: UserType | null;
  logout: () => void;
}

export function Profile({ user, logout }: ProfileProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <Button
        onPress={onOpen}
        variant="solid"
        color="secondary"
        className="w-full  sticky bottom-0 z-10 shadow-lg text-xl font-bold mb-2 h-12 "
      >
        <div
          className="flex items-center space-x-1 p-2 rounded-md cursor-pointer 
              transition-colors duration-200"
        >
          <Avatar
            src={user?.avatar || "https://i.pravatar.cc/150?u=default"}
            size="md"
            className="border border-gray-300"
          />
          <span className="text-white font-medium truncate">
            {user?.username}
          </span>
        </div>
      </Button>

      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} placement="center" className="dark">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center gap-1">
                <Avatar
                  src={user?.avatar || "https://i.pravatar.cc/150?u=default"}
                  size="lg"
                  className="mb-2"
                />
                <h2 className="text-2xl font-bold">{user?.username}</h2>
                <p className="text-gray-500">{user?.email}</p>
              </ModalHeader>
              <ModalBody className="flex flex-col items-center space-y-4">
                <div className="flex space-x-4">
                  <NotificationSubscribe userId={user?._id || ""} />
                  <Button
                    color="danger"
                    variant="solid"
                    onPress={() => {
                      logout();
                      localStorage.setItem("pushSubscriptionId", "");
                      onClose();
                    }}
                  >
                    <LogOut size={20} />
                    Logout
                  </Button>
                  <Button color="primary" variant="solid">
                    <Settings size={20} />
                    Settings
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-center">
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
