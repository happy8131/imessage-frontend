import { Box, Input } from "@chakra-ui/react";
import { Session } from "next-auth";
import React, { useState } from "react";
import toast from "react-hot-toast";
interface MessageInputProps {
  session: Session;
  conversationId: string;
}
const MessageInput = ({ session, conversationId }: MessageInputProps) => {
  const [messageBody, setMessageBody] = useState("");

  const onSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      //call sendMessage mutation
    } catch (err: any) {
      console.log("onSendMessage Err", err);
      toast.error(err.message);
    }
  };

  return (
    <Box px={4} py={6} width="100%`">
      <form onSubmit={(e) => onSendMessage(e)}>
        <Input
          value={messageBody}
          onChange={(e) => setMessageBody(e.target.value)}
          placeholder="메시지를 입력해주세요."
          size="md"
          resize="none"
          _focus={{
            boxShadow: "none",
            border: "1px solid",
            borderColor: "whiteAlpha.300",
          }}
        />
      </form>
    </Box>
  );
};

export default MessageInput;
