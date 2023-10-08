import { Box, Button, Typography } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

import { Link } from "react-router-dom";
import EditOutlined from "@mui/icons-material/EditOutlined";
import { useState } from "react";
import { formatDateFromNow } from "../../utils/helper";
import EditForm from "../EditForm";
import { useUser } from "../Auth/useUser";
import { useEditComment } from "./useEditComment";

function CommentCard({ comment }) {
  const { data: currentUser } = useUser();
  const { isLoading, editComment } = useEditComment();
  const userId = currentUser._id;
  const [isEditMode, setIsEditMode] = useState(false);
  const isOwner = userId === comment.userId._id;

  function updateFunction(data) {
    editComment(
      { commentId: comment._id, content: data },
      {
        onSettled: () => {
          setIsEditMode(false);
        },
      }
    );
  }

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar
          component={Link}
          to={`/profile/${comment.userId._id}`}
          alt={`${comment.userId.fullName} Profile Pic`}
          src={comment.userId.profilePic.imageUrl}
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
                isUpdating={isLoading}
              />
            </>
          )}
        </Box>
        {isOwner && !isEditMode && (
          <Button
            size="small"
            onClick={() => setIsEditMode(true)}
            disabled={isLoading}
          >
            <EditOutlined fontSize="small" />
          </Button>
        )}
      </Box>
    </ListItem>
  );
}

export default CommentCard;
