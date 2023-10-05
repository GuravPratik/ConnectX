import { Box, Container, Divider } from "@mui/material";
import UserPost from "../components/User/UserPost";
import UserDetails from "../components/User/UserDetails";
import { ScrollRestoration } from "react-router-dom";
import { useUserFetch } from "../components/User/useUserFetch";
import { useUserPost } from "../components/User/useUserPost";

function Profile() {
  const { user, isLoading, error } = useUserFetch();
  const {
    isLoading: isPostFetching,
    error: isPostError,
    data: userPosts,
  } = useUserPost();

  /**
   *
   * TODO:
   *    1) add spinner instead of saying only loading
   *    2) get all user post also and send the all posts to the userPost component instead of sending user id
   *    3) also send number of post count to userDetails component it requires it to display total count
   *
   */
  if (isLoading) {
    return (
      <Box
        flexGrow={7}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading...
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        flexGrow={7}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {error.message}
      </Box>
    );
  }

  let totalPosts = 0;

  if (!isPostFetching) {
    totalPosts = userPosts.length;
  }

  return (
    <>
      <Box flexGrow={3} p={2}>
        <Container>
          <UserDetails user={user} totalPosts={totalPosts} />
          <Divider
            sx={{
              borderColor: "#bdbdbd",
            }}
          />
        </Container>

        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <UserPost
            userPosts={userPosts}
            isLoading={isPostFetching}
            isError={isPostError}
          />
        </Container>
      </Box>
      <ScrollRestoration />
    </>
  );
}

export default Profile;
