import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Container,
  IconButton,
  Typography,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { ScrollRestoration, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import UserProfile from "../components/UserProfile";
import CommentList from "../components/Comments/CommentList";
import CommentBox from "../components/Comments/CommentBox";
import EditForm from "../components/EditForm";
import PostAction from "../components/Posts/PostAction";
import { formatDateFromNow } from "../utils/helper";
import { useUser } from "../components/Auth/useUser";
import { usePostById } from "../components/Posts/usePost";
import { useCommentById } from "../components/Comments/useComment";
import { usePostEdit } from "../components/Posts/usePostEdit";
import { usePostLike } from "../components/Posts/usePostLike";
import { usePostDislike } from "../components/Posts/usePostDislike";

function Posts() {
  const { postId } = useParams();

  const { data: currentUser } = useUser();
  const { isLoading, postData, isError, error } = usePostById(postId);

  const { updatePost, isUpdating } = usePostEdit(postId);

  const { likePost, isLoading: isAddingLike } = usePostLike(postId);
  const { disLikePost, isLoading: isRemovingLike } = usePostDislike(postId);

  const {
    isLoading: isCommentsLoading,
    comments,
    isError: isCommentError,
  } = useCommentById(postId);

  const [isLike, setIsLike] = useState(false);
  const [isPostEdit, setIsPostEdit] = useState(false);

  useEffect(() => {
    if (!isLoading && !isError) {
      setIsLike(
        postData.likesId.some((like) => like.userId === currentUser._id)
      );
    }
  }, [currentUser._id, isError, isLoading, postData]);

  function updatePostCaption(data) {
    updatePost({ postId: postData._id, caption: data });
    setIsPostEdit(false);
  }

  function handleLikeDislike() {
    if (isLike) {
      disLikePost({ postId });
    } else {
      likePost({ postId });
    }
  }

  if (isLoading) {
    return (
      <Box
        flexGrow={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // if post not found
  if (isError) {
    return (
      <Box
        flexGrow={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography component="h2" variant="h6">
          {error.message}
        </Typography>
      </Box>
    );
  }
  const isOwner = currentUser?._id === postData.userId._id;
  return (
    <>
      <Box
        flexGrow={3}
        sx={{
          width: "46%",
        }}
      >
        <Container
          sx={{
            marginTop: "20px",
            padding: "20px",
          }}
        >
          <Card
            sx={{
              padding: "10px",
            }}
          >
            <CardHeader
              component={() => {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <UserProfile user={postData.userId} />
                    {isOwner && !isPostEdit && (
                      <PostAction
                        setIsPostEdit={setIsPostEdit}
                        postId={postId}
                      />
                    )}
                  </Box>
                );
              }}
            />
            <CardMedia
              sx={{
                maxHeight: "500px",
              }}
              component="img"
              src={postData.imageInfo.secureUrl}
            />
            <CardContent>
              {!isPostEdit ? (
                <>
                  <Typography variant="body2" color="text.secondary">
                    {postData.caption}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatDateFromNow(postData.createdAt)} ago
                  </Typography>
                </>
              ) : (
                <EditForm
                  isUpdating={isUpdating}
                  updateFunction={updatePostCaption}
                  stateFunction={setIsPostEdit}
                  defaultValue={postData.caption}
                />
              )}
            </CardContent>
            <CardActions disableSpacing>
              <IconButton
                aria-label="Like"
                disabled={isAddingLike || isRemovingLike}
                onClick={() => {
                  setIsLike((prevState) => !prevState);
                  handleLikeDislike();
                }}
              >
                {isLike ? (
                  <FavoriteIcon sx={{ color: "#ea1616" }} />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
              <Typography sx={{ marginRight: "5px" }}>
                {postData.likesId.length}{" "}
                {postData.likesId.length < 2 ? `Like` : `Likes`}
              </Typography>
              <IconButton aria-label="share">
                <CommentIcon />
              </IconButton>
              {!isCommentsLoading && !isCommentError && (
                <Typography sx={{ marginRight: "5px" }}>
                  {comments.length}{" "}
                  {comments.length < 2 ? "comment" : "comments"}
                </Typography>
              )}
            </CardActions>
          </Card>
          <Container>
            <CommentList />
            <CommentBox />
          </Container>
        </Container>
      </Box>
      <ScrollRestoration />
    </>
  );
}

export default Posts;
