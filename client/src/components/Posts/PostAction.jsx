import { ButtonGroup, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PostDeleteAlert from "./PostDeleteAlert";
import { useState } from "react";
function PostAction({ setIsPostEdit, postId }) {
  const [open, setOpen] = useState(false);
  function handleClose() {
    console.log("Post delete alert close");
    setOpen(false);
  }

  return (
    <ButtonGroup
      size="small"
      variant="outlined"
      aria-label="outlined primary button group"
    >
      <IconButton color="primary" onClick={() => setIsPostEdit(true)}>
        <EditOutlinedIcon fontSize="small" />
      </IconButton>
      <IconButton color="primary" onClick={() => setOpen(true)}>
        <DeleteIcon fontSize="small" />
      </IconButton>
      <PostDeleteAlert open={open} handleClose={handleClose} postId={postId} />
    </ButtonGroup>
  );
}

export default PostAction;
