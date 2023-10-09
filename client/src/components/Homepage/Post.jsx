import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { formatDateFromNow } from "../../utils/helper";
import { useUser } from "../Auth/useUser";
import { usePostLike } from "../Posts/usePostLike";
import { usePostDislike } from "../Posts/usePostDislike";

export default function Post({ post }) {
  const { data: currentUser } = useUser();

  // const userId = currentUser?._id;

  const { likePost, isLoading: isAddingLike } = usePostLike(post._id);
  const { disLikePost, isLoading: isRemovingLike } = usePostDislike(post._id);

  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    setIsLike(post.likesId.some((like) => like.userId === currentUser._id));
  }, [currentUser._id, isAddingLike, post, isRemovingLike]);

  const navigate = useNavigate();

  function handleLikeDislike() {
    if (isLike) {
      disLikePost({ postId: post._id });
    } else {
      likePost({ postId: post._id });
    }
  }

  function handlePostClick() {
    navigate(`/posts/${post._id}`);
  }

  return (
    <Card sx={{ maxwidth: 450, minWidth: 400 }}>
      <CardHeader
        component={Link}
        to={`/profile/${post.userId._id}`}
        sx={{
          textDecoration: "none",
          color: "#616161",
        }}
        avatar={
          <Avatar src={post.userId.profilePic.imageUrl} alt="profilePic" />
        }
        title={post.userId.userName}
        subheader={`${formatDateFromNow(post.createdAt)} ago`}
      />
      <CardMedia
        sx={{
          cursor: "pointer",
        }}
        onClick={handlePostClick}
        component="img"
        height="250"
        image={post.imageInfo.secureUrl}
        alt="post Image"
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            maxWidth: "350px",
          }}
        >
          {post.caption}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          disabled={isAddingLike || isRemovingLike}
          aria-label="aria-label-Like"
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
          {post.likesId.length} {post.likesId.length < 2 ? `Like` : `Likes`}
        </Typography>
        <IconButton
          aria-label="share"
          component={Link}
          to={`/posts/${post._id}`}
        >
          <CommentIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
