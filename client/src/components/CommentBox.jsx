import { Box, Button, Container, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
function CommentBox() {
  const { register, watch, setValue, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data.comment);

    // removing value on success api call
    setValue("comment", "");
  };
  /**
   * TODO:
   *
   *  1) When user clicks on comment empty text field
   *
   */
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
            comment
          </Button>
        </form>
      </Container>
    </Box>
  );
}

export default CommentBox;
