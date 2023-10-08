import { Box, Button, Container, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useCreateComment } from "./useCreateComment";
import { useParams } from "react-router-dom";
function CommentBox() {
  const { addComment, isLoading } = useCreateComment();

  const { register, watch, setValue, handleSubmit } = useForm();
  const { postId } = useParams();
  const onSubmit = (data) => {
    addComment(
      { postId, content: data.comment },
      {
        onSuccess: () => {
          setValue("comment", "");
        },
      }
    );
  };

  return (
    <Box>
      <Container>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <TextField
            disabled={isLoading}
            placeholder="Add a comment"
            id="outlined-basic"
            label="Comment"
            variant="outlined"
            {...register("comment", { required: true })}
          />

          <Button
            type="submit"
            variant="contained"
            component="button"
            disabled={!watch("comment") || isLoading}
            sx={{
              alignSelf: "flex-end",
              width: "fit-content",
            }}
          >
            comment
          </Button>
        </form>
      </Container>
    </Box>
  );
}

export default CommentBox;
