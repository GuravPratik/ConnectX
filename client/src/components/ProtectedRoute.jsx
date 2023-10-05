import { useEffect } from "react";
import { useUser } from "./Auth/useUser";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import toast from "react-hot-toast";

const FullPage = styled(Box)(() => ({
  height: "100vh",
  backgroundColor: "#e0e0e0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

function ProtectedRoute({ children }) {
  const { isLoading, isError, error } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isError) {
      toast.error(error.message);
      navigate("/login");
    }
  }, [navigate, isError, isLoading, error]);

  if (isLoading) {
    return (
      <FullPage>
        <CircularProgress />
      </FullPage>
    );
  }

  return children;
}

export default ProtectedRoute;
