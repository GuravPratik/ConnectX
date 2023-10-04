import { Box, IconButton, TextField } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
function SearchBox() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [userName, setUserName] = useState("");
  function setSearchQuery(value) {
    searchParams.set("userName", value);
    setSearchParams(searchParams);
  }

  return (
    <>
      <Box
        sx={{
          padding: "10px",
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Search"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          variant="outlined"
          sx={{ width: "90%" }}
        />
        <IconButton
          color="primary"
          aria-label="search"
          size="large"
          onClick={() => setSearchQuery(userName)}
        >
          <SearchOutlinedIcon fontSize="medium" />
        </IconButton>
      </Box>
    </>
  );
}

export default SearchBox;
