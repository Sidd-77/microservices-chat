
import React, { useState } from "react";
import { Search } from "lucide-react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Avatar,
  } from "@nextui-org/react";
import { searchUser } from "../api/users";
import { createChat } from "../api/users";
import { User } from "../types/auth";
import { useAuthStore } from "../store/authStore";

interface SearchUserProps  {
    setUpdateList: (value: boolean) => void;
  };

  export default function SearchUser({ setUpdateList }: SearchUserProps) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [result, setResutl] = useState<User[]>([]);
    const { user } = useAuthStore();
    const userId = user?._id || "null";

    return (
      <>
        <Button variant="ghost" className="p-2 " onPress={onOpen}>
            <Search size={20} />
        </Button>
        <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange} className="dark">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Seach User</ModalHeader>
                <ModalBody>
                  <Input placeholder="search"
                    onChange={(e) => {
                      searchUser(e.target.value).then((res) => {
                        console.log(res);
                        setResutl(res);
                      });
                    }}
                  />

                  {result.map((u) => (
                    <div key={u._id} className="flex items-center justify-between space-x-3 p-2 rounded-md cursor-pointer transition-colors duration-200 hover:bg-gray-700">
                        <div className="flex items-center space-x-3">
                            <Avatar src={u.avatar} size="sm" className="shrink-0" />
                            <p className="text-white">{u.username}</p>
                        </div>
                        <Button variant="flat" color="success" size="sm" onPress={async () => {
                            await createChat(u._id, userId).then((res) => {
                                console.log(res);
                            });
                            setUpdateList(true);
                            onClose();
                        }}>
                            Add
                        </Button>
                    </div>
                  ))}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  