import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";

import Copyright from "./Copyright";
import { useSignup } from "./useSignup";
export default function SignUpForm() {
  const { signUp, isLoading } = useSignup();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = ({ userName, fullName, email, password }) => {
    signUp({
      userName,
      fullName,
      email,
      password,
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box sx={{ mt: 3 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Username"
                  label="Username"
                  autoFocus
                  {...register("userName", { required: true })}
                />
                {errors.userName && (
                  <Box>
                    <Typography component="p" color="#d50000">
                      {errors.userName.message}
                    </Typography>
                  </Box>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="fullName"
                  label="FullName"
                  {...register("fullName", { required: true })}
                />
              </Grid>
              {errors.fullName && (
                <Box>
                  <Typography component="p" color="#d50000">
                    {errors.fullName.message}
                  </Typography>
                </Box>
              )}

              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
            </Grid>
            {isLoading ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                <CircularProgress color="inherit" />
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            )}

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
