import { Box } from "@chakra-ui/react";
import { Session } from "next-auth";
import ConversationList from "./ConversationList";

interface ConversationsWrapperProps {
  session: Session;
}
const ConversationsWrapper = ({ session }: ConversationsWrapperProps) => {
  return (
    <Box width={{ base: "100%", md: "400px" }} bg="#2A2A2A" py={6} px={3}>
      <ConversationList session={session} />
    </Box>
  );
};

export default ConversationsWrapper;
