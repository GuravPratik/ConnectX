import { Box, Typography } from "@mui/material";

function UserStats() {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "20px",
      }}
    >
      <Typography component="p">
        <Typography variant="subtitle2" component="span">
          10{" "}
        </Typography>
        posts
      </Typography>
      <Typography component="p">
        <Typography variant="subtitle2" component="span">
          10{" "}
        </Typography>{" "}
        followers
      </Typography>
      <Typography component="p">
        <Typography variant="subtitle2" component="span">
          10{" "}
        </Typography>{" "}
        following
      </Typography>
    </Box>
  );
}

export default UserStats;
