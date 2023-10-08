import {
  Box,
  Button,
  Container,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import styled from "@emotion/styled";
import { useCreatePost } from "./useCreatePost";

const StyledContainer = styled(Container)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "start",
  border: "solid #eeeeee 3px",
  borderRadius: "10px",
  padding: "20px",
}));

const StyledBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "5px",
}));

const StyledLabel = styled("label")(() => ({
  width: "150px",
  padding: "3px",
}));

const StyledForm = styled("form")(() => ({
  width: "100%",
  margin: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
}));

function PostForm() {
  const { createPost, isLoading } = useCreatePost();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function handleOnSubmit(data) {
    createPost({
      postImage: data.imageFile[0],
      caption: data.caption,
    });
  }

  return (
    <StyledContainer>
      <Typography variant="h4" component="h1" sx={{ marginLeft: "10px" }}>
        Create a new Post
      </Typography>
      <StyledForm onSubmit={handleSubmit(handleOnSubmit)}>
        <StyledBox>
          <StyledLabel htmlFor="imageFile">Select a Image</StyledLabel>
          <input
            id="imageFile"
            type="file"
            accept="image/*"
            {...register("imageFile", { required: true })}
            style={{
              padding: "10px",
            }}
          />
        </StyledBox>
        {errors.imageFile?.type === "required" && (
          <Box>
            <Typography component="p" color="#d50000">
              *Image is required to create a new post
            </Typography>
          </Box>
        )}
        <Divider />
        <StyledBox>
          <StyledLabel htmlFor="caption">Caption</StyledLabel>
          <TextField
            id="caption"
            multiline
            rows={4}
            placeholder="Write a Caption..."
            variant="outlined"
            {...register("caption", {
              maxLength: {
                value: 280,
                message: "Caption should be less than 280 characters",
              },
            })}
            sx={{
              width: "80%",
            }}
          />
        </StyledBox>
        {errors.caption && (
          <Box>
            <Typography component="p" color="#d50000">
              {errors.caption.message}
            </Typography>
          </Box>
        )}
        <Divider />
        <Button variant="contained" type="submit" disabled={isLoading}>
          Share
        </Button>
        <Button variant="contained" type="reset" disabled={isLoading}>
          reset
        </Button>
      </StyledForm>
    </StyledContainer>
  );
}

export default PostForm;
