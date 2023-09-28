import { Box, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import UserPost from "../components/User/UserPost";
import UserDetails from "../components/User/UserDetails";

function Profile() {
  const { userId } = useParams();
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
