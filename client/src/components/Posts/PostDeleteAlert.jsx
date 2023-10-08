import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import { useNavigate } from "react-router-dom";
import { useUser } from "../Auth/useUser";
import { usePostDelete } from "./usePostDelete";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PostDeleteAlert({ handleClose, open, postId }) {
  const { data: currentUser } = useUser();
  const { deletPost, isLoading: isDeleting } = usePostDelete();
  const navigate = useNavigate();

  function deletePost(postId) {
    deletPost(postId, {
      onSuccess: () => {
        navigate(`/profile/${currentUser._id}`);
      },
      onError: () => {
        handleClose();
      },
    });

    // TODO:
    // 1) instead of closing post make api request to delete the post and show deleting icon
    //    on successfully api request navigate user to profile use useNavigate from react-router-dom
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {"Are you sure you want to delete this post?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            This action cannot be undone. You will lose all comments and
            interactions associated with this post. Please confirm your
            decision.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            disabled={isDeleting}
            onClick={() => {
              deletePost(postId);
            }}
          >
            {!isDeleting ? `Confirm` : `Deleting...`}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
