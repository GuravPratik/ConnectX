import Link from "@mui/material/Link";
import { useMoveBack } from "../hooks/useMoveBack";
import { Box, Container, Typography } from "@mui/material";
import styled from "@emotion/styled";

const StyledBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  border: "solid 1px #616161",
  borderRadius: "20px",
  padding: "20px",
}));

function PageNotFound() {
  const moveBack = useMoveBack();
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <StyledBox>
        <Typography variant="h4" component="h1">
          404 - Page Not Found
        </Typography>
        <p>The page you are looking for could not be found 😢</p>
        <Link
          onClick={moveBack}
          variant="body2"
          underline="hover"
          component="button"
          sx={{
            color: "#2196f3",
          }}
        >
          &larr; Go back
        </Link>
      </StyledBox>
    </Container>
  );
}

export default PageNotFound;
