import { AccountBox, Home, Settings } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
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
import { useLogout } from "../Auth/useLogout";
import { useUser } from "../Auth/useUser";

const Sidebar = () => {
  const { logout, isLoading } = useLogout();
  const { data } = useUser();
  return (
    <Box flex={1} p={2}>
      <Box
        position="fixed"
        sx={{
          borderRight: "solid",
          height: "100vh",
          borderWidth: "0.8px",
          borderColor: "#878383",
        }}
      >
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{ textDecorationLine: "none", color: "black" }}
        >
          ConnectX
        </Typography>
        <List sx={{ padding: "20px" }}>
          <SidebarItem icon={<Home />} url="/" name="Home" />
          <SidebarItem icon={<SearchIcon />} url="/search" name="Search" />
          <SidebarItem icon={<AddIcon />} url="/create" name="Create" />

          <SidebarItem
            icon={<AccountBox />}
            url={`profile/${data._id}`}
            name="Profile"
          />
          <SidebarItem icon={<Settings />} url="/setting" name="Settings" />
          <ListItem disablePadding>
            <ListItemButton
              component="button"
              onClick={() => logout()}
              disabled={isLoading}
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
