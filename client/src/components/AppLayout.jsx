import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <Box>
      <Stack direction="row" gap={2}>
        <Sidebar />
        <Outlet />
      </Stack>
    </Box>
  );
}

export default AppLayout;
