import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { BiMessageSquareDots } from "react-icons/bi";
import { ConversationsData } from "../../../util/types";
import ConversationOperations from "../../../graphql/operations/conversation";
import { useQuery } from "@apollo/client";
import { IModalContext, ModalContext } from "@/context/ModalContext";
//import { IModalContext, ModalContext } from "../../../context/ModalContext";

const NoConversation: React.FC = () => {
  const { data, loading, error } = useQuery<ConversationsData>(
    ConversationOperations.Queries.conversations
  );
  const { openModal } = useContext<IModalContext>(ModalContext);

  if (!data?.conversations || loading || error) return null;

  const { conversations } = data;

  const hasConversations = conversations.length;

  const text = hasConversations
    ? "대화를 선택해주세요!"
    : "대화를 시작하세요! 🥳";

  return (
    <Flex height="100%" justify="center" align="center">
      <Stack spacing={10} align="center">
        <Text fontSize={40}>{text}</Text>
        {hasConversations ? (
          <BiMessageSquareDots fontSize={90} />
        ) : (
          // <Button bg="brand.100" onClick={openModal}>
          //   대화 생성
          // </Button>
          ""
        )}
      </Stack>
    </Flex>
  );
};
export default NoConversation;
