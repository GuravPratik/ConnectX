import { Box, Typography } from "@mui/material";

function UserStats({
  numberOfPost = 0,
  numberOfFollowers = 0,
  numberOfFollow = 0,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "20px",
      }}
    >
      <Typography component="p">
        <Typography variant="subtitle2" component="span">
          {numberOfPost + " "}
        </Typography>
        {numberOfPost < 2 ? "post" : "posts"}
      </Typography>
      <Typography component="p">
        <Typography variant="subtitle2" component="span">
          {numberOfFollowers + " "}
        </Typography>{" "}
        followers
      </Typography>
      <Typography component="p">
        <Typography variant="subtitle2" component="span">
          {numberOfFollow + " "}
        </Typography>{" "}
        following
      </Typography>
    </Box>
  );
}

export default UserStats;
