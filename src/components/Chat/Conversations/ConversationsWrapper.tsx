import { useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/react";
import { Session } from "next-auth";
import ConversationList from "./ConversationList";
import ConversationOperations from "../../../graphql/operations/conversation";
import { ConversationsData } from "@/util/types";
import { ConversationPopulated } from "../../../../../backend/src/util/types";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface ConversationsWrapperProps {
  session: Session;
}
const ConversationsWrapper = ({ session }: ConversationsWrapperProps) => {
  const {
    data: conversationsData,
    error: conversationsError,
    loading: conversationsLoading,
    subscribeToMore,
  } = useQuery<ConversationsData>(ConversationOperations.Queries.conversations);

  const router = useRouter();
  const {
    query: { conversationId },
  } = router;

  const onViewConversations = async (conversationId: string) => {
    router.push({ query: { conversationId } });
  };

  const subscribeToNewConversations = () => {
    subscribeToMore({
      document: ConversationOperations.Subscriptions.conversationCreated,
      updateQuery: (
        prev,
        {
          subscriptionData,
        }: {
          subscriptionData: {
            data: { conversationCreated: ConversationPopulated };
          };
        }
      ) => {
        if (!subscriptionData.data) return prev;

        const newConversation = subscriptionData.data.conversationCreated;

        return Object.assign({}, prev, {
          conversations: [newConversation, ...prev.conversations],
        });
      },
    });
  };

  useEffect(() => {
    subscribeToNewConversations();
  }, []);

  console.log("HERE IS DATA", conversationsData);

  return (
    <Box
      display={{ base: conversationId ? "none" : "flex", md: "flex" }}
      width={{ base: "100%", md: "400px" }}
      bg="#2A2A2A"
      py={6}
      px={3}
    >
      <ConversationList
        session={session}
        conversations={conversationsData?.conversations}
        onViewConversation={onViewConversations}
      />
    </Box>
  );
};

export default ConversationsWrapper;
