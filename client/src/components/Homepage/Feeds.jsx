import { Box } from "@mui/material";
import Post from "./Post";
import styled from "@emotion/styled";
import PostSkeleton from "../Posts/PostSkeleton";
import { useFeed } from "./useFeed";

const StyledBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "center",
  gap: "20px",
}));

function Feeds() {
  const { isLoading, data: postData } = useFeed();
  if (isLoading) {
    return (
      <StyledBox flex={4} p={2}>
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </StyledBox>
    );
  }

  return (
    <StyledBox flex={4} p={2}>
      {postData.map((post) => {
        return <Post key={post._id} post={post} />;
      })}
    </StyledBox>
  );
}

export default Feeds;
