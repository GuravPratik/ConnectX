import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Homepage/Sidebar";
import ProtectedRoute from "./ProtectedRoute";

function AppLayout() {
  return (
    <ProtectedRoute>
      <Box>
        <Stack direction="row" gap={2}>
          <Sidebar />
          <Outlet />
        </Stack>
      </Box>
    </ProtectedRoute>
  );
}

export default AppLayout;
