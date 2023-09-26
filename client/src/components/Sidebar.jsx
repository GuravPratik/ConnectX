import { AccountBox, Home, Settings } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import SidebarItem from "./SidebarItem";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Box
      flex={1}
      p={2}
      sx={{
        borderRight: "solid",
        height: "100vh",
        borderWidth: "0.8px",
        borderColor: "#878383",
      }}
    >
      <Box position="fixed">
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{ textDecorationLine: "none", color: "black" }}
        >
          ConnectX
        </Typography>
        <List>
          <SidebarItem icon={<Home />} url="/" name="Home" />
          <SidebarItem icon={<SearchIcon />} url="/search" name="Search" />
          <SidebarItem icon={<AddIcon />} url="/create" name="Create" />
          <SidebarItem
            icon={<NotificationsNoneIcon />}
            url="/notifications"
            name="Notifications"
          />
          <SidebarItem icon={<AccountBox />} url="/profile" name="Profile" />
          <SidebarItem icon={<Settings />} url="/setting" name="Settings" />
          <ListItem disablePadding>
            <ListItemButton
              component="button"
              onClick={() => console.log("click")}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
