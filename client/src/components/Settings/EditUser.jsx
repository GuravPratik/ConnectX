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

const StyledContainer = styled(Container)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "start",
  border: "solid #eeeeee 3px",
  borderRadius: "10px",
  padding: "20px",
  margin: "10px 0 10px 0",
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

function EditUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function handleOnSubmit(data) {
    console.log(data.imageFile[0], data);
  }

  return (
    <StyledContainer>
      <Typography variant="h4" component="h1" sx={{ marginLeft: "10px" }}>
        Update profile
      </Typography>
      <StyledForm onSubmit={handleSubmit(handleOnSubmit)}>
        <StyledBox>
          <StyledLabel htmlFor="imageFile">Profile Photo</StyledLabel>
          <input
            id="imageFile"
            type="file"
            accept="image/*"
            {...register("imageFile")}
            style={{
              padding: "10px",
            }}
          />
        </StyledBox>
        <Divider />
        <StyledBox>
          <StyledLabel htmlFor="username">Username</StyledLabel>
          <TextField
            id="username"
            placeholder="username"
            defaultValue="username"
            variant="outlined"
            disabled
            sx={{
              width: "80%",
            }}
          />
        </StyledBox>
        <Divider />
        <StyledBox>
          <StyledLabel htmlFor="fullName">FullName</StyledLabel>
          <TextField
            id="fullName"
            placeholder="fullName"
            defaultValue="fullName"
            variant="outlined"
            {...register("fullName", {
              maxLength: {
                value: 30,
                message: "FullName should be less than 30 characters",
              },
            })}
            sx={{
              width: "80%",
            }}
          />
        </StyledBox>

        {errors.fullName && (
          <Box>
            <Typography component="p" color="#d50000">
              {errors.fullName.message}
            </Typography>
          </Box>
        )}
        <Divider />
        <StyledBox>
          <StyledLabel htmlFor="caption">Bio</StyledLabel>
          <TextField
            id="caption"
            defaultValue="bio"
            multiline
            rows={4}
            placeholder="Write about yourself..."
            variant="outlined"
            {...register("updatedBio", {
              maxLength: {
                value: 150,
                message: "Bio should be less than 150 characters",
              },
            })}
            sx={{
              width: "80%",
            }}
          />
        </StyledBox>
        {errors.updatedBio && (
          <Box>
            <Typography component="p" color="#d50000">
              {errors.updatedBio.message}
            </Typography>
          </Box>
        )}
        <Divider />
        <Box>
          <Button variant="contained" type="submit">
            Update
          </Button>
        </Box>
      </StyledForm>
    </StyledContainer>
  );
}

export default EditUser;
