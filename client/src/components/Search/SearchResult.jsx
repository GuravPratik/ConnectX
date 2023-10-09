import { Box } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import UserProfile from "../UserProfile";
import { useEffect, useState } from "react";
import axios from "axios";
const serverUrl = import.meta.env.VITE_SERVER_URL;

function SearchResult() {
  const [searchParams] = useSearchParams();

  const userName = searchParams.get("userName");

  const [users, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      if (userName) {
        const data = await axios.get(`${serverUrl}/users?userName=${userName}`);
        setUser(data.data.users);
      }
    }
    fetchUser();
  }, [userName]);

  if (!users) {
    return (
      <Box sx={{ textAlign: "center", width: "90%", marginTop: "10px" }}>
        Search
      </Box>
    );
  }

  if (users?.length === 0) {
    return (
      <Box sx={{ textAlign: "center", width: "90%", marginTop: "10px" }}>
        No user found
      </Box>
    );
  }
  return (
    <Box sx={{ width: "90%", padding: "10px" }}>
      {users.map((user) => {
        return <UserProfile key={user._id} user={user} />;
      })}
    </Box>
  );
}

export default SearchResult;
