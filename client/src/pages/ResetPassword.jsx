import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useNavigate, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { resetPasswordUsingEmail } from "../services/apiAuth";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { token } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  function handleOnSubmit({ password, confirmPassword }) {
    if (!password || !confirmPassword) {
      toast.error("Please enter all the password fields to reset password");
      return;
    }

    if (password !== confirmPassword) {
      setError("confirmPassword", {
        type: "passwordNotMatch",
        message: "New Password and Confirm Password do not match",
      });
      return;
    }

    setIsLoading(true);
    resetPasswordUsingEmail({ token, password, confirmPassword })
      .then((response) => {
        toast.success(response.message);
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          border: "1px solid red",
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Enter new Password
        </Typography>
        <Box sx={{ mt: 3 }}>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <Grid container spacing={2}>
              <Grid item sx={{ width: "100%" }}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  {...register("password", {
                    required: true,
                    minLength: {
                      value: 8,
                      message: "Password should be 8 or more characters",
                    },
                  })}
                />
                {errors.password?.type === "required" && (
                  <Box>
                    <Typography component="p" color="#d50000">
                      Please provide password
                    </Typography>
                  </Box>
                )}
                {errors.password && (
                  <Box>
                    <Typography component="p" color="#d50000">
                      {errors.password.message}
                    </Typography>
                  </Box>
                )}
              </Grid>

              <Grid item sx={{ width: "100%" }}>
                <TextField
                  required
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: true,
                    minLength: {
                      value: 8,
                      message: "Password should be 8 or more characters",
                    },
                  })}
                />
                {errors.confirmPassword?.type === "required" && (
                  <Box>
                    <Typography component="p" color="#d50000">
                      Please provide password
                    </Typography>
                  </Box>
                )}
                {errors.confirmPassword && (
                  <Box>
                    <Typography component="p" color="#d50000">
                      {errors.confirmPassword.message}
                    </Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
            <Button
              disabled={isLoading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {!isLoading ? `Reset Password` : `Updating Password...`}
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
}
