import { Avatar } from "@mui/material";

function UserAvatar({ imageUrl }) {
  return (
    <>
      <Avatar
        alt="User Profile"
        src={imageUrl}
        sx={{ width: 180, height: 180 }}
      />
    </>
  );
}

export default UserAvatar;
