import { CreateUsernameData, CreateUsernameVariables } from "@/util/types";
import { useMutation } from "@apollo/client";
import { Button, Center, Image, Input, Stack, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import UserOperations from "../../graphql/operations/user";

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth = ({ session, reloadSession }: IAuthProps) => {
  const [username, setUsername] = useState("");

  const [createUsername, { loading, error }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(UserOperations.Mutations.createUsername);

  const onSubmit = async () => {
    if (!username) return;
    try {
      const { data } = await createUsername({ variables: { username } });

      if (!data?.createUsername) {
        throw new Error();
      }

      if (data.createUsername.error) {
        const {
          createUsername: { error },
        } = data;

        throw new Error(error);
      }

      toast.success("Username Successfully");

      reloadSession();
    } catch (error: any) {
      toast.error(error?.message);
      console.log("err", error);
    }
  };
  console.log("se", session);
  return (
    <Center height="100vh">
      <Stack spacing={8} align="center">
        {session ? (
          <>
            <Text fontSize="3xl">Creat a Username</Text>
            <Input
              placeholder="Enter a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button width="100%" onClick={onSubmit} isLoading={loading}>
              Save
            </Button>
          </>
        ) : (
          <>
            <Text fontSize="3xl">MessengerQL</Text>
            <Button
              onClick={() => signIn("google")}
              leftIcon={<Image height="20px" src="/images/googlelogo.png" />}
            >
              Continue with Google
            </Button>
          </>
        )}
      </Stack>
    </Center>
  );
};

export default Auth;
