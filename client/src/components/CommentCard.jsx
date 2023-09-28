import { Box, Button, Typography } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

import { Link } from "react-router-dom";
import EditOutlined from "@mui/icons-material/EditOutlined";
import { useState } from "react";
import { formatDateFromNow } from "../utils/helper";
import EditForm from "./EditForm";

function CommentCard({ comment }) {
  const userId = "65069b176fee902589df976a";
  const [isEditMode, setIsEditMode] = useState(false);
  const isOwner = userId === comment.userId._id;

  function updateFunction(data) {
    console.log(data);
    setIsEditMode(false);
  }

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
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "50%",
          }}
        >
          {!isEditMode ? (
            <>
              <ListItemText
                primary={comment.userId.userName}
                secondary={
                  <Typography component="span" variant="p" color="text.primary">
                    {formatDateFromNow(comment.createdAt)} ago
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
            </>
          ) : (
            <>
              <EditForm
                defaultValue={comment.content}
                updateFunction={updateFunction}
                stateFunction={setIsEditMode}
              />
            </>
          )}
        </Box>
        {isOwner && !isEditMode && (
          <Button size="small" onClick={() => setIsEditMode(true)}>
            <EditOutlined fontSize="small" />
          </Button>
        )}
      </Box>
    </ListItem>
  );
}

export default CommentCard;
