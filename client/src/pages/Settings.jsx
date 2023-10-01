import { Box } from "@mui/material";
import EditUser from "../components/Settings/EditUser";
import EditPassword from "../components/Settings/EditPassword";

function Settings() {
  return (
    <Box flexGrow={3} p={2}>
      <EditUser />
      <EditPassword />
    </Box>
  );
}

export default Settings;
