import SkeletonLoader from "@/components/common/SkeletonLoader";
import { MessagesData, MessageSubscriptionData } from "@/util/types";
import { useQuery } from "@apollo/client";
import { Flex, Stack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import MessagesOperations from "../../../../graphql/operations/messages";
import MessageItem from "./MessageItem";

interface MessagesProps {
  userId: string;
  conversationId: string;
}

const Messages = ({ userId, conversationId }: MessagesProps) => {
  const { data, loading, error, subscribeToMore } = useQuery(
    MessagesOperations.Query.messages,
    {
      variables: {
        conversationId,
      },
      onError: ({ message }) => {
        toast.error(message);
      },
    }
  );

  useEffect(() => {
    let unsubscribe = subscribeToMore({
      document: MessagesOperations.Subscription.messageSent,
      variables: {
        conversationId,
      },
      updateQuery: (prev, { subscriptionData }: MessageSubscriptionData) => {
        if (!subscriptionData) return prev;

        const newMessage: any = subscriptionData.data.messageSent;
        return Object.assign({}, prev, {
          // if sender then we have the value in the cache, no need to update with new value
          // if not the sender, need to fetch new message
          messages:
            newMessage.sender.id === userId
              ? prev.messages
              : [newMessage, ...prev.messages],
        });
      },
    });

    return () => unsubscribe();
  }, [conversationId]);

  if (error) {
    return null;
  }

  console.log("HERE IS MESSAGES DATA", data);

  return (
    <Flex direction="column" justify="flex-end" overflow="hidden">
      {loading && (
        <Stack spacing={4} px={4}>
          <SkeletonLoader count={4} height="60px" width="320px" />
          <span>Loading Messages</span>
        </Stack>
      )}
      {data?.messages && (
        <Flex direction="column-reverse" overflowY="scroll" height="100%">
          {data.messages.map((message: any) => (
            <MessageItem
              key={message.id}
              message={message}
              sentByMe={message.sender.id === userId}
            />
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default Messages;
