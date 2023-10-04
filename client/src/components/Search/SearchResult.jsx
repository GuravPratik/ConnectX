import { Box } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import UserProfile from "../UserProfile";

const users = [
  {
    profilePic: {
      imageUrl:
        "https://res.cloudinary.com/diqgskxvi/image/upload/v1694346301/ConnectX/2048px-Windows_10_Default_Profile_Picture.svg_osfygk.png",
    },
    _id: "65069a606fee902589df9766",
    userName: "testUser1",
    fullName: "TestUser1",
  },
  {
    profilePic: {
      imageUrl:
        "https://res.cloudinary.com/diqgskxvi/image/upload/v1694346301/ConnectX/2048px-Windows_10_Default_Profile_Picture.svg_osfygk.png",
    },
    _id: "65069b176fee902589df976a",
    userName: "testUser2",
    fullName: "TestUser2",
  },
  {
    profilePic: {
      id: "ConnectX/Users/f5occh3cdepzjxdpbz9y",
      imageUrl:
        "https://res.cloudinary.com/diqgskxvi/image/upload/v1694931762/ConnectX/Users/f5occh3cdepzjxdpbz9y.jpg",
    },
    _id: "65069b2b6fee902589df976c",
    userName: "testUser3",
    fullName: "TestUser3",
  },
  {
    profilePic: {
      id: "ConnectX/Users/ynhqfkli4n5qgzhqmrai",
      imageUrl:
        "https://res.cloudinary.com/diqgskxvi/image/upload/v1695789277/ConnectX/Users/ynhqfkli4n5qgzhqmrai.jpg",
    },
    _id: "6513b0d5880a4f5a5b5dc700",
    userName: "testuser4",
    fullName: "TestUser4",
  },
];

function SearchResult() {
  const [searchParams] = useSearchParams();

  const userName = searchParams.get("userName");

  //  just for testing remove it after
  // const [users, setUser] = useState(null);

  // useEffect(() => {
  //   async function fetchUser() {
  //     if (userName) {
  //       const data = await axios.get(
  //         `http://localhost:3001/api/v1/users?userName=${userName}`
  //       );
  //       setUser(data.data.users);
  //     }
  //   }
  //   fetchUser();
  // }, [userName]);

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
