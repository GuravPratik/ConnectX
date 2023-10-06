import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
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

function Posts() {
  const { postId } = useParams();

  const { data: currentUser } = useUser();
  // const userId = currentUser?._id;
  const { isLoading, postData, isError, error } = usePostById(postId);

  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    if (!isLoading && !isError) {
      setIsLike(
        postData.likesId.some((like) => like.userId === currentUser._id)
      );
    }
  }, [currentUser._id, isError, isLoading, postData]);

  function updatePostCaption(data) {
    // get updated data
    console.log(data);
    setIsPostEdit(false);
  }

  const [isPostEdit, setIsPostEdit] = useState(false);

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
        Loading...
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
              src="https://res.cloudinary.com/diqgskxvi/image/upload/v1695125210/ConnectX/Posts/dgxqfdg1in90upnfeaii.jpg"
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
                  updateFunction={updatePostCaption}
                  stateFunction={setIsPostEdit}
                  defaultValue={postData.caption}
                />
              )}
            </CardContent>
            <CardActions disableSpacing>
              <IconButton
                aria-label="add to favorites"
                onClick={() => {
                  setIsLike((prevState) => !prevState);
                }}
              >
                {isLike ? (
                  <FavoriteIcon sx={{ color: "#ea1616" }} />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
              <Typography sx={{ marginRight: "5px" }}>
                {postData.likesId.length} Likes
              </Typography>
              <IconButton aria-label="share">
                <CommentIcon />
              </IconButton>
              <Typography sx={{ marginRight: "5px" }}>0 comments</Typography>
            </CardActions>
          </Card>
          <Container>
            {/*
            TODO: 
             send post id as a prop to the comment list component
            */}
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
