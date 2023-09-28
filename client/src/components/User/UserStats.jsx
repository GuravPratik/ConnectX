import { Box, Typography } from "@mui/material";

function UserStats() {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "20px",
      }}
    >
      <Typography>10 posts</Typography>
      <Typography>10 followers</Typography>
      <Typography>10 following</Typography>
    </Box>
  );
}

export default UserStats;
