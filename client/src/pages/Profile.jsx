import { Box, Container, Divider } from "@mui/material";
import UserPost from "../components/User/UserPost";
import UserDetails from "../components/User/UserDetails";
import { ScrollRestoration } from "react-router-dom";
// import { useUser } from "../components/Auth/useUser";

function Profile() {
  // const { isLoading, data } = useUser();
  // console.log(isLoading, data);
  return (
    <>
      <Box flexGrow={3} p={2}>
        <Container>
          <UserDetails />
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
          <UserPost />
        </Container>
      </Box>
      <ScrollRestoration />
    </>
  );
}

export default Profile;
