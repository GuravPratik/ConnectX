import { Box } from "@mui/material";
import SearchBox from "../components/Search/SearchBox";
import SearchResult from "../components/Search/SearchResult";
function Search() {
  return (
    <Box flexGrow={4} p={2}>
      <SearchBox />
      <SearchResult />
    </Box>
  );
}

export default Search;
