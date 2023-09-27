import { Box, Typography } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

import { Link } from "react-router-dom";

function CommentCard({ comment }) {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar
          component={Link}
          to={`/profile/${comment.userId._id}`}
          alt="Remy Sharp"
          src="https://res.cloudinary.com/diqgskxvi/image/upload/v1694931762/ConnectX/Users/f5occh3cdepzjxdpbz9y.jpg"
        />
      </ListItemAvatar>
      <Box>
        <ListItemText
          primary={comment.userId.userName}
          secondary={
            <Typography component="span" variant="p" color="text.primary">
              {comment.createdAt}
            </Typography>
          }
        />
        <ListItemText
          primary={
            <Typography component="span" variant="p" color="text.primary">
              {comment.content}
            </Typography>
          }
        />
      </Box>
    </ListItem>
  );
}

export default CommentCard;
