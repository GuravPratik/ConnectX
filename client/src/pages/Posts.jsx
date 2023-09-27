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
import { useParams } from "react-router-dom";
import UserProfile from "../components/UserProfile";
import { useState } from "react";

import { Link } from "react-router-dom";
import CommentList from "../components/CommentList";
import CommentBox from "../components/CommentBox";

const postData = {
  imageInfo: {
    id: "ConnectX/Posts/dgxqfdg1in90upnfeaii",
    secureUrl:
      "https://res.cloudinary.com/diqgskxvi/image/upload/v1695125210/ConnectX/Posts/dgxqfdg1in90upnfeaii.jpg",
  },
  _id: "65098ed3c28eaeb46a48da91",
  userId: {
    _id: "65069b176fee902589df976a",
    userName: "testUser2",
    fullName: "TestUser2",
    profilePic:
      "https://res.cloudinary.com/diqgskxvi/image/upload/v1694931762/ConnectX/Users/f5occh3cdepzjxdpbz9y.jpg",
  },
  caption: "New Caption Test 2",
  likesId: [
    {
      userId: "65069b176fee902589df976a",
      userName: "testUser2",
      fullName: "TestUser2",
      _id: "650c5be55b589fa762d0cf85",
    },
  ],
  createdAt: "2023-09-19T12:06:43.164Z",
  __v: 9,
  updatedAt: "2023-09-19T12:23:12.220Z",
};

function Posts() {
  const userId = "65069b176fee902589df976a";
  const { postId } = useParams();
  const [isLike, setIsLike] = useState(
    postData.likesId.some((like) => like.userId === userId)
  );
  return (
    <Box flexGrow={3}>
      {/* <Card>
        <CardMedia
          component="img"
          height="140"
          image="https://res.cloudinary.com/diqgskxvi/image/upload/v1695125210/ConnectX/Posts/dgxqfdg1in90upnfeaii.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </Card> */}
      <Container
        sx={{
          marginTop: "20px",
          // border: "solid red",
          padding: "20px",
        }}
      >
        <Card
          sx={{
            // border: "solid blue",
            padding: "10px",
          }}
        >
          <CardHeader
            component={() => {
              return <UserProfile user={postData.userId} />;
            }}
          />
          <CardMedia
            sx={{
              // border: "solid yellow",
              maxHeight: "500px",
            }}
            component="img"
            src="https://res.cloudinary.com/diqgskxvi/image/upload/v1695125210/ConnectX/Posts/dgxqfdg1in90upnfeaii.jpg"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {postData.caption}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {postData.createdAt}
            </Typography>
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
            <IconButton
              aria-label="share"
              component={Link}
              to={`/posts/${postData._id}`}
            >
              <CommentIcon />
            </IconButton>
            <Typography sx={{ marginRight: "5px" }}>0 comments</Typography>
          </CardActions>
        </Card>
        <Container>
          {/*
            TODO: 
             send comment id as a prop to the comment list component
            */}
          <CommentList />
          <CommentBox />
        </Container>
      </Container>
    </Box>
  );
}

export default Posts;
