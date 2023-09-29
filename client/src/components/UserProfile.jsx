import { ListItem, ListItemButton, ListItemText, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
function UserProfile({ user }) {
  return (
    <ListItem>
      <ListItemButton component={Link} to={`/profile/${user.id || user._id}`}>
        <Avatar
          alt={user.name ? user.name : user.userName}
          src={user.dpUrl}
          sx={{
            marginRight: "7px",
          }}
        />
        <ListItemText
          primary={user.name ? user.name : user.userName}
          secondary={user.fullName}
        />
      </ListItemButton>
    </ListItem>
  );
}

export default UserProfile;
