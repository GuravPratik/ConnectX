import { useParams } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";
import styled from "@emotion/styled";
import UserStats from "./UserStats";
import UserAvatar from "./UserAvatar";

const StyledBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "start",
  padding: "10px",
}));

const StateBox = styled(Box)(() => ({
  display: "flex",
  padding: "10px",
  width: "fit-content",
  gap: "20px",
  alignItems: "center",
}));

const RightBox = styled(Box)(() => ({
  padding: "10px",
  width: "50%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  justifyContent: "center",
}));
const LeftBox = styled(Box)(() => ({
  display: "flex",
  width: "50%",
  padding: "10px",
  justifyContent: "center",
  alignSelf: "center",
}));
const DetailBox = styled(Box)(() => ({
  display: "flex",
  padding: "10px",
  width: "240px",
  height: "180px",
  gap: "5px",
  flexDirection: "column",
}));

function UserDetails() {
  const currentUserId = "1";
  const { userId } = useParams();
  return (
    <StyledBox>
      <LeftBox>
        <UserAvatar />
      </LeftBox>
      <RightBox>
        <StateBox>
          <Typography component="p">UserName</Typography>
          {/*
            TODO:
                1) if user visiting their own profile instead of rendaring follow button show edit button and when user clicks on edit button show 
                box or redirect to the edit page
                to show box with form use dialog box from material ui
          
          */}

          {currentUserId === userId ? (
            <Button variant="contained" size="small">
              Edit
            </Button>
          ) : (
            <Button variant="contained" size="small">
              Follow
            </Button>
          )}
        </StateBox>
        <StateBox>
          <UserStats />
        </StateBox>
        <DetailBox>
          <Typography component="p">FullName</Typography>
          <Typography
            component="p"
            style={{
              wordWrap: "break-word",
            }}
          >
            Just checking if the bio appers good or not and if not fix it
            otherwise keep as it is
          </Typography>
        </DetailBox>
      </RightBox>
    </StyledBox>
  );
}

export default UserDetails;
