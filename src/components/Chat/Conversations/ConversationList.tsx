import { Box, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { ConversationPopulated } from "../../../../../backend/src/util/types";
import ConversationItem from "./ConversationItem";
import ConversationMoal from "./Modal/Modal";

interface ConversationListProps {
  session: Session;
  conversations: any;
  onViewConversation: (conversationId: string) => void;
}

const ConversationList = ({
  session,
  conversations,
  onViewConversation,
}: ConversationListProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const router = useRouter();
  const {
    user: { id: userId },
  } = session;

  return (
    <Box width="100%">
      <Box
        py={2}
        px={4}
        mb={4}
        bg="blackAlpha.300"
        borderRadius={4}
        cursor="pointer"
        onClick={onOpen}
      >
        <Text textAlign="center" color="whiteAlpha.800" fontWeight={500}>
          Find or start a conversation
        </Text>
      </Box>
      <ConversationMoal session={session} isOpen={isOpen} onClose={onClose} />
      {conversations?.map(
        (
          conversation: {} & {
            id: string;
            latestMessageId: string | null;
            createdAt: Date;
            updatedAt: Date;
          }
        ) => (
          <ConversationItem
            key={conversation.id}
            userId={userId}
            conversation={conversation}
            onClick={() => onViewConversation(conversation.id)}
            isSelected={conversation.id === router.query.conversation}
          />
        )
      )}
    </Box>
  );
};

export default ConversationList;
