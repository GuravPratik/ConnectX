import {
  Box,
  CircularProgress,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

function UserPost({ userPosts, isLoading, isPostError }) {
  if (isLoading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }

  if (isPostError) {
    return (
      <Box>
        <Typography>Error while loading posts</Typography>
      </Box>
    );
  }

  if (userPosts.length === 0) {
    return (
      <Box>
        <Typography>No posts available for this user.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <ImageList sx={{ width: "100%", height: "100%" }} cols={3}>
        {userPosts.map((post) => (
          <ImageListItem
            component={Link}
            key={post._id}
            to={`/posts/${post._id}`}
          >
            <img
              style={{ width: "250px", height: "250px" }}
              src={`${post.imageInfo.secureUrl}`}
              alt={post.caption}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

export default UserPost;
