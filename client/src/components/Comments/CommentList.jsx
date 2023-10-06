import { Box, List, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import CommentCard from "./CommentCard";
import { useCommentById } from "./useComment";

function CommentList() {
  /*
    Currently its a static page only
    */

  /* TODO: 
    1) get post id as a prop or get from url using useParams hook 
    2) fetch all comments of the post using id
    3) display all comments for that post 
    4) may be need to use useEffect to fetch posts comments or may be use react query (will figure out it later)
    */

  const { postId } = useParams();

  const { isLoading, comments, isError, error } = useCommentById(postId);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
        }}
      >
        Loading...
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
        }}
      >
        {error.message}
      </Box>
    );
  }

  return (
    <Box>
      {comments.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            No comments yet. Be the first to comment!
          </Typography>
        </Box>
      ) : (
        <List>
          {comments.map((comment) => {
            return <CommentCard key={comment._id} comment={comment} />;
          })}
        </List>
      )}
    </Box>
  );
}

export default CommentList;
