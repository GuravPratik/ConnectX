import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { getResetPasswordLink } from "../services/apiAuth";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  function onSubmit({ email }) {
    setIsLoading(true);
    getResetPasswordLink({ email })
      .then((response) => {
        toast.success(response.message);
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
        reset();
      });
  }

  const navigate = useNavigate();
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
          Forgot Password
        </Typography>
        <Box sx={{ mt: 3 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item sx={{ width: "100%" }}>
                <TextField
                  required
                  fullWidth
                  type="email"
                  id="email"
                  label="Email Address"
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please provide valid email",
                    },
                  })}
                />
                {errors.email?.type === "required" && (
                  <Box>
                    <Typography component="p" color="#d50000">
                      Please provide your email
                    </Typography>
                  </Box>
                )}

                {errors.email && (
                  <Box>
                    <Typography component="p" color="#d50000">
                      {errors.email.message}
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
              {!isLoading ? `Request Reset Link` : `Sending email...`}
            </Button>
            <Button
              onClick={() => {
                navigate("/login");
              }}
              disabled={isLoading}
              type="button"
              fullWidth
              variant="contained"
            >
              Back to login
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
}
