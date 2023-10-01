import { Box } from "@mui/material";
import PostForm from "../components/CreatePost/PostForm";
import Rightbar from "../components/Homepage/Rightbar";
import styled from "@emotion/styled";

const StyledBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "center",
  gap: "20px",
}));

function Create() {
  return (
    <>
      <StyledBox flexGrow={1} p={2}>
        <PostForm />
      </StyledBox>
      <Rightbar />
    </>
  );
}

export default Create;
