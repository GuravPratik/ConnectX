import { ListItem, ListItemButton, ListItemText, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
function UserProfile({ user }) {
  return (
    <ListItem>
      <ListItemButton component={Link} to={`/profile/${user.id}`}>
        <Avatar
          alt={user.name}
          src={user.dpUrl}
          sx={{
            marginRight: "7px",
          }}
        />
        <ListItemText primary={user.name} secondary={user.fullName} />
      </ListItemButton>
    </ListItem>
  );
}

export default UserProfile;
