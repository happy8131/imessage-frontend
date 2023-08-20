import { Session } from "next-auth";

interface FeedWrapperProps {
  session: Session;
}
const FeedWrapper = ({ session }: FeedWrapperProps) => {
  return <div>Feed Wrapper</div>;
};
export default FeedWrapper;
