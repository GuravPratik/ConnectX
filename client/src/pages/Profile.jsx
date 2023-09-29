import { Box, Container, Divider } from "@mui/material";
import UserPost from "../components/User/UserPost";
import UserDetails from "../components/User/UserDetails";

function Profile() {
  return (
    <Box flexGrow={3} p={2}>
      <Container>
        <UserDetails />
        <Divider />
        {/* TODO: change the width of the divider  */}
      </Container>

      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <UserPost />
      </Container>
    </Box>
  );
}

export default Profile;
