import { Box, Button, Container, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
function CommentBox() {
  const { register, watch, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data.comment);
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
            disabled={!watch("comment")}
            sx={{
              alignSelf: "flex-end",
              width: "fit-content",
            }}
          >
            submit
          </Button>
        </form>
      </Container>
    </Box>
  );
}

export default CommentBox;
