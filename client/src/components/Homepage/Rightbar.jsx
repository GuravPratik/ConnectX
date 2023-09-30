import { Box, List, Typography } from "@mui/material";
import UserProfile from "../UserProfile";

function Rightbar() {
  const users = [
    {
      id: 1,
      name: "John Doe",
      fullName: "John Smith Doe",
      dpUrl:
        "https://res.cloudinary.com/diqgskxvi/image/upload/v1694346301/ConnectX/2048px-Windows_10_Default_Profile_Picture.svg_osfygk.png",
    },
    {
      id: 2,
      name: "Jane Smith",
      fullName: "Jane Doe Smith",
      dpUrl:
        "https://res.cloudinary.com/diqgskxvi/image/upload/v1694931762/ConnectX/Users/f5occh3cdepzjxdpbz9y.jpg",
    },
    {
      id: 3,
      name: "Jane Smith",
      fullName: "Jane Doe Smith",
      dpUrl:
        "https://res.cloudinary.com/diqgskxvi/image/upload/v1694931762/ConnectX/Users/f5occh3cdepzjxdpbz9y.jpg",
    },
    {
      id: 4,
      name: "Jane Smith",
      fullName: "Jane Doe Smith",
      dpUrl:
        "https://res.cloudinary.com/diqgskxvi/image/upload/v1694931762/ConnectX/Users/f5occh3cdepzjxdpbz9y.jpg",
    },
    {
      id: 5,
      name: "Jane Smith",
      fullName: "Jane Doe Smith",
      dpUrl:
        "https://res.cloudinary.com/diqgskxvi/image/upload/v1694931762/ConnectX/Users/f5occh3cdepzjxdpbz9y.jpg",
    },
  ];
  return (
    <Box flex={2} p={2}>
      <Typography>Suggestions for you</Typography>
      <List>
        {users.map((user) => (
          <UserProfile user={user} key={user.id} />
        ))}
      </List>
    </Box>
  );
}

export default Rightbar;
