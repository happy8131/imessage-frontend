import { Flex } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import MessagesHeader from "./Messages/Header";
import MessageInput from "./Messages/input";

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
        <>
          <Flex
            direction="column"
            justify="space-between"
            overflow="hidden"
            flexGrow={1}
          >
            {/* {conversationId} */}
            <MessagesHeader userId={userId} conversationId={conversationId} />
            {/* <Message /> */}
          </Flex>
          <MessageInput session={session} conversationId={conversationId} />
        </>
      ) : (
        <div>No Conversation Selcted</div>
      )}
    </Flex>
  );
};
export default FeedWrapper;
