import { Box, Container } from "@mui/material";
import UserPost from "../components/User/UserPost";
import UserDetails from "../components/User/UserDetails";

function Profile() {
  return (
    <Box flexGrow={3} p={2}>
      <Container>
        <UserDetails />
        <UserPost />
      </Container>
    </Box>
  );
}

export default Profile;
