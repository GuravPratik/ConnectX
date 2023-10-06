import { Box, List, Typography } from "@mui/material";
import UserProfile from "../UserProfile";
import { useRandomUser } from "./useRandomUser";

function Rightbar() {
  const { isLoading, randomUsers, isError, error } = useRandomUser();

  if (isLoading) {
    return (
      <Box flex={2} p={2}>
        Getting Suggestions for you
      </Box>
    );
  }

  if (isError) {
    return (
      <Box flex={2} p={2}>
        {error.message}
      </Box>
    );
  }

  return (
    <Box flex={2} p={2}>
      <Typography>Suggestions for you</Typography>
      <List>
        {randomUsers.map((user) => (
          <UserProfile user={user} key={user._id} />
        ))}
      </List>
    </Box>
  );
}

export default Rightbar;
