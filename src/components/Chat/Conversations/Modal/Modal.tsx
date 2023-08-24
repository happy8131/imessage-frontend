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
import ConversationOperations from "../../../../graphql/operations/conversation";
import React, { useCallback, useState } from "react";
import { Observable, useLazyQuery, useMutation } from "@apollo/client";
import {
  CreateConversationData,
  SearchedUser,
  SearchUsersData,
  SearchUsersInput,
} from "@/util/types";
import UserSearchList from "./userSearchList";
import Participants from "./Participants";
import toast from "react-hot-toast";
import { Session } from "next-auth";
import { useRouter } from "next/router";

interface ModalProps {
  session: Session;
  isOpen: boolean;
  onClose: () => void;
}

const ConversationModal = ({ session, isOpen, onClose }: ModalProps) => {
  const {
    user: { id: userId },
  } = session;

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [participants, setParticipants] = useState<Array<SearchedUser>>([]);
  const [searchUsers, { data, loading, error }] = useLazyQuery<any>(
    UserOperations.Queries.searchUsers
  );

  const [createConversation, { loading: createConversationLoading }] =
    useMutation<CreateConversationData>(
      ConversationOperations.Mutations.createConversation
    );
  console.log("HERE IS SEARCH DATA", data);

  const onCreateConversation = async () => {
    const participantIds = [userId, ...participants.map((p) => p.id)];

    try {
      // createConversation Mutation
      const { data } = await createConversation({
        variables: {
          participantIds,
        },
      });

      if (!data?.createConversation) {
        throw new Error("Failed to create conversation");
      }

      const {
        createConversation: { conversationId },
      } = data;

      router.push({ query: { conversationId } });

      setParticipants([]);
      setUsername("");
      onClose();

      console.log("DATA", data);
    } catch (err: any) {
      console.log("onCreateConversation", err);
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
                  isLoading={createConversationLoading}
                  onClick={onCreateConversation}
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
