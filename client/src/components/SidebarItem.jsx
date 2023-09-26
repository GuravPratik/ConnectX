import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

function SidebarItem({ icon, url, name }) {
  return (
    <>
      <ListItem disablePadding>
        <ListItemButton component={Link} to={url}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={name} />
        </ListItemButton>
      </ListItem>
    </>
  );
}

export default SidebarItem;
