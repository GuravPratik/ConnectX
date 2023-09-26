import { Box, Stack } from "@mui/material";
import Feeds from "../components/Feeds";
import Rightbar from "../components/Rightbar";
import Sidebar from "../components/Sidebar";

function Homepage() {
  return (
    <Box>
      <Stack direction="row" gap={2}>
        <Sidebar />
        <Feeds />
        <Rightbar />
      </Stack>
    </Box>
  );
}

export default Homepage;
