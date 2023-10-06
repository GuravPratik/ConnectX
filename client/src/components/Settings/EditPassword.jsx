import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import styled from "@emotion/styled";
import toast from "react-hot-toast";
import { usePasswordUpdate } from "./usePasswordUpdate";

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
  const { updateUserPassword, isLoading: isPasswordUpdating } =
    usePasswordUpdate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm();

  function handleOnSubmit({ newPassword, oldPassword, confirmPassword }) {
    if (!newPassword || !oldPassword || !confirmPassword) {
      toast.error("Please enter all the password fields to update password");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("confirmPassword", {
        type: "passwordNotMatch",
        message: "New Password and Confirm Password do not match",
      });
      return;
    }

    updateUserPassword(
      {
        oldPassword,
        newPassword,
      },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  }

  return (
    <StyledContainer>
      <Typography variant="h4" component="h1" sx={{ marginLeft: "10px" }}>
        Update Password
      </Typography>
      <StyledForm onSubmit={handleSubmit(handleOnSubmit)}>
        <StyledBox>
          <StyledLabel htmlFor="oldPassword">Old Password</StyledLabel>
          <TextField
            id="oldPassword"
            type="password"
            placeholder="old password"
            variant="outlined"
            {...register("oldPassword", {
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
        {errors.oldPassword && (
          <Box>
            <Typography component="p" color="#d50000">
              {errors.oldPassword.message}
            </Typography>
          </Box>
        )}
        <Divider />
        <StyledBox>
          <StyledLabel htmlFor="newPassword">New Password</StyledLabel>
          <TextField
            id="newPassword"
            type="password"
            placeholder="new password"
            variant="outlined"
            {...register("newPassword", {
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
        {errors.newPassword && (
          <Box>
            <Typography component="p" color="#d50000">
              {errors.newPassword.message}
            </Typography>
          </Box>
        )}
        <Divider />
        <StyledBox>
          <StyledLabel htmlFor="confirmPassword">Confirm Password</StyledLabel>
          <TextField
            type="password"
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
          {isPasswordUpdating ? (
            <Button variant="contained">
              <CircularProgress color="inherit" />
            </Button>
          ) : (
            <Button variant="contained" type="submit">
              Update Password
            </Button>
          )}
        </Box>
      </StyledForm>
    </StyledContainer>
  );
}

export default EditPassword;
