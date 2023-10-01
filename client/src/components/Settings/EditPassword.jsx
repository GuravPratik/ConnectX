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

function EditPassword() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  function handleOnSubmit(data) {
    if (data.password === "") {
      alert("Please enter password");
      return;
    }

    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "passwordNotMatch",
        message: "Password do not match",
      });
      return;
    }
    console.log(data);
  }

  return (
    <StyledContainer>
      <Typography variant="h4" component="h1" sx={{ marginLeft: "10px" }}>
        Update Password
      </Typography>
      <StyledForm onSubmit={handleSubmit(handleOnSubmit)}>
        <StyledBox>
          <StyledLabel htmlFor="newPassword">New Password</StyledLabel>
          <TextField
            id="newPassword"
            placeholder="new password"
            variant="outlined"
            {...register("password", {
              minLength: {
                value: 8,
                message: "Password should be greater than 8 characters",
              },
            })}
            sx={{
              width: "80%",
            }}
          />
        </StyledBox>
        {errors.password && (
          <Box>
            <Typography component="p" color="#d50000">
              {errors.password.message}
            </Typography>
          </Box>
        )}
        <Divider />
        <StyledBox>
          <StyledLabel htmlFor="confirmPassword">Confirm Password</StyledLabel>
          <TextField
            id="confirmPassword"
            placeholder="Confirm password"
            variant="outlined"
            {...register("confirmPassword", {
              minLength: {
                value: 8,
                message: "Password should be greater than 8 characters",
              },
            })}
            sx={{
              width: "80%",
            }}
          />
        </StyledBox>
        {errors.confirmPassword && (
          <Box>
            <Typography component="p" color="#d50000">
              {errors.confirmPassword.message}
            </Typography>
          </Box>
        )}
        <Divider />
        <Box>
          <Button variant="contained" type="submit">
            Update Password
          </Button>
        </Box>
      </StyledForm>
    </StyledContainer>
  );
}

export default EditPassword;
