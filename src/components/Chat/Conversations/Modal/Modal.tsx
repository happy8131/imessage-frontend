import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import UserOperations from "../../../../graphql/operations/user";
import React, { useCallback, useState } from "react";
import { Observable, useLazyQuery } from "@apollo/client";
import { SearchedUser, SearchUsersData, SearchUsersInput } from "@/util/types";
import UserSearchList from "./userSearchList";
import Participants from "./Participants";
import toast from "react-hot-toast";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConversationModal = ({ isOpen, onClose }: ModalProps) => {
  const [username, setUsername] = useState("");
  const [participants, setParticipants] = useState<Array<SearchedUser>>([]);
  const [searchUsers, { data, loading, error }] = useLazyQuery<any>(
    UserOperations.Queries.searchUsers
  );
  console.log("HERE IS SEARCH DATA", data);

  const onCreateConversation = async () => {
    try {
      // createConversation Mutation
    } catch (err: any) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  const onSearch = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      // search user query
      searchUsers({ variables: { username } as any });
    },
    [username]
  );

  const addParticipant = (user: SearchedUser) => {
    setParticipants((prev) => [...prev, user]);
    setUsername("");
  };

  const removeParticipant = (userId: string) => {
    console.log("removeParticipant");
    setParticipants((prev) => prev.filter((p) => p.id !== userId));
  };
  console.log(participants);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent pb={4}>
          <ModalHeader>Create a Conversations</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSearch}>
              <Stack spacing={4}>
                <Input
                  placeholder="유저를 입력해주세요."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Button type="submit" disabled={!username} isLoading={loading}>
                  검색
                </Button>
              </Stack>
            </form>
            {data?.searchUsers && (
              <UserSearchList
                users={data?.searchUsers}
                username={username}
                addParticipant={addParticipant}
              />
            )}
            {participants.length !== 0 && (
              <>
                <Participants
                  participants={participants}
                  removeParticipant={removeParticipant}
                />
                <Button
                  bg="blue.100"
                  width="100%"
                  mt={6}
                  _hover={{ bg: "gray.100" }}
                  onClick={() => {}}
                >
                  Create Conversation
                </Button>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConversationModal;
