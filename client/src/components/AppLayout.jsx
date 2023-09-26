import { Box, Stack } from "@mui/material";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

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
