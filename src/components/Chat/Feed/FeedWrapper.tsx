import { Flex } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import MessagesHeader from "./Messages/Header";

interface FeedWrapperProps {
  session: Session;
}
const FeedWrapper = ({ session }: FeedWrapperProps) => {
  const router = useRouter();

  const { conversationId } = router.query;
  const {
    user: { id: userId },
  } = session;

  return (
    <Flex
      display={{ base: conversationId ? "flex" : "none", md: "flex" }}
      width="100%"
      direction="column"
    >
      {conversationId && typeof conversationId === "string" ? (
        <Flex
          color="whiteAlpha.900"
          direction="column"
          justify="space-between"
          overflow="hidden"
          flexGrow={1}
          border="1px solid red"
        >
          {/* {conversationId} */}
          <MessagesHeader userId={userId} conversationId={conversationId} />
          {/* <Message /> */}
        </Flex>
      ) : (
        <div>No Conversation Selcted</div>
      )}
    </Flex>
  );
};
export default FeedWrapper;
