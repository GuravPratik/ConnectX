import { useNavigate, useParams } from "react-router-dom";

import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { Box, Button, Typography } from "@mui/material";
import styled from "@emotion/styled";
import UserStats from "./UserStats";
import UserAvatar from "./UserAvatar";
import { useUser } from "../Auth/useUser";
import { getJoinedDate } from "../../utils/helper";

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

function UserDetails({ user, totalPosts }) {
  // get current user
  const { data: currentUser } = useUser();
  const currentUserId = currentUser._id;
  const { userId } = useParams();

  const isOwner = currentUserId === userId;

  const navigate = useNavigate();
  function handleOnEditClick() {
    navigate("/setting");
  }

  return (
    <StyledBox>
      <LeftBox>
        <UserAvatar imageUrl={user.profilePic.imageUrl} />
      </LeftBox>
      <RightBox>
        <StateBox>
          <Typography component="p">{user.userName}</Typography>
          {/*
            TODO:
                1) if user visiting their own profile instead of rendaring follow button show edit button and when user clicks on edit button show 
                box or redirect to the edit page
                
          
          */}

          {isOwner ? (
            <Button
              variant="contained"
              size="small"
              onClick={handleOnEditClick}
            >
              Edit
            </Button>
          ) : (
            <Button variant="contained" size="small">
              Follow
            </Button>
          )}
        </StateBox>
        <StateBox>
          <UserStats
            numberOfPost={totalPosts}
            numberOfFollowers={user.followers.length}
            numberOfFollow={user.followings.length}
          />
        </StateBox>
        <DetailBox>
          <Typography component="p">{user.fullName}</Typography>
          <Typography
            component="p"
            sx={{
              margin: "2px 0",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <CalendarMonthOutlinedIcon />
            Joined {getJoinedDate(user.createdAt)}
          </Typography>
          <Typography
            component="p"
            style={{
              wordWrap: "break-word",
            }}
          >
            {user.bio}
          </Typography>
        </DetailBox>
      </RightBox>
    </StyledBox>
  );
}

export default UserDetails;
