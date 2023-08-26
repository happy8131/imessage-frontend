import { useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/react";
import { Session } from "next-auth";
import ConversationList from "./ConversationList";
import ConversationOperations from "../../../graphql/operations/conversation";
import { ConversationsData } from "@/util/types";
import { ConversationPopulated } from "../../../../../backend/src/util/types";
import { useEffect } from "react";

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

  console.log("QUERY DATA", conversationsData);

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
        console.log("HERE IS SUB DATA", subscriptionData);
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
    <Box width={{ base: "100%", md: "400px" }} bg="#2A2A2A" py={6} px={3}>
      <ConversationList
        session={session}
        conversations={conversationsData?.conversations}
      />
    </Box>
  );
};

export default ConversationsWrapper;
