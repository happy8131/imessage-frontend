import { SearchedUser, SearchUsersData } from "@/util/types";
import { Avatar, Button, Flex, Stack, Text } from "@chakra-ui/react";

interface UserSearchListProps {
  users: any;
  username: string;
  addParticipant: (user: SearchedUser) => void;
}

const UserSearchList = ({
  users,
  username,
  addParticipant,
}: UserSearchListProps) => {
  return (
    <>
      {users.length === 0 ? (
        <Flex mt={6} justify="center">
          <Text>유저를 찾을 수 없습니다.</Text>
        </Flex>
      ) : (
        <Stack mt={6}>
          {users.map((user: SearchedUser) => {
            return (
              <Stack
                key={user.id}
                direction="row"
                align="center"
                spacing={4}
                py={2}
                px={4}
                borderRadius={4}
                _hover={{ bg: "whiteAlpha.200" }}
              >
                <Avatar />
                <Flex justify="space-between" align="center" width="100%">
                  <Text color="blackAlpha.700">{user?.username}</Text>
                  <Button
                    bg="blue.100"
                    _hover={{ bg: "gray.100" }}
                    onClick={() => addParticipant(user)}
                  >
                    Select
                  </Button>
                </Flex>
              </Stack>
            );
          })}
        </Stack>
      )}
    </>
  );
};

export default UserSearchList;
