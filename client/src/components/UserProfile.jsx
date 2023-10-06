import { ListItem, ListItemButton, ListItemText, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
function UserProfile({ user }) {
  return (
    <ListItem>
      <ListItemButton component={Link} to={`/profile/${user._id}`}>
        <Avatar
          alt={user.userName}
          src={user.profilePic.imageUrl}
          sx={{
            marginRight: "7px",
          }}
        />
        <ListItemText primary={user.userName} secondary={user.fullName} />
      </ListItemButton>
    </ListItem>
  );
}

export default UserProfile;
