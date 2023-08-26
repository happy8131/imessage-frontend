import { Stack, Text } from "@chakra-ui/react";
import { ConversationPopulated } from "../../../../../backend/src/util/types";

interface ConversationItemProps {
  conversation: ConversationPopulated;
}

const ConversationItem = ({ conversation }: ConversationItemProps) => {
  console.log("CONVERSATION", conversation);
  return (
    <Stack
      p={4}
      _hover={{ bg: "whiteAlpha.200" }}
      borderRadius={4}
      color="whiteAlpha.900"
    >
      <Text>{conversation.id}</Text>
    </Stack>
  );
};

export default ConversationItem;
