import { Flex, Stack, Text } from "@chakra-ui/react";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface Participants {
  participants: any;
  removeParticipant: (userId: string) => void;
}

const Participants = ({ participants, removeParticipant }: Participants) => {
  console.log("HERE ARE PARTICIPANTS", participants);
  return (
    <Flex mt={8} gap="10px" flex="wrap">
      {participants.map((participant: any) => {
        return (
          <Stack
            key={participant.id}
            direction="row"
            align="center"
            bg="blackAlpha.200"
            borderRadius={4}
            p={2}
          >
            <Text color="blackAlpha.800">{participant.username}</Text>
            <IoIosCloseCircleOutline
              size={20}
              cursor="pointer"
              onClick={() => removeParticipant(participant.id)}
            />
          </Stack>
        );
      })}
    </Flex>
  );
};

export default Participants;
