import { Box, ImageList, ImageListItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const itemData = [
  {
    id: 1,
    img: "https://res.cloudinary.com/diqgskxvi/image/upload/v1695789499/ConnectX/Posts/kvxybilrak9lodp5iypm.jpg",
    title: "Breakfast",
  },
  {
    id: 2,
    img: "https://res.cloudinary.com/diqgskxvi/image/upload/v1695789365/ConnectX/Posts/tzxnpw3b51v4pohhve3o.jpg",
    title: "Burger",
  },
  {
    id: 3,
    img: "https://res.cloudinary.com/diqgskxvi/image/upload/v1695789365/ConnectX/Posts/tzxnpw3b51v4pohhve3o.jpg",
    title: "Burger",
  },
  {
    id: 4,
    img: "https://res.cloudinary.com/diqgskxvi/image/upload/v1695789365/ConnectX/Posts/tzxnpw3b51v4pohhve3o.jpg",
    title: "Burger",
  },
  {
    id: 5,
    img: "https://res.cloudinary.com/diqgskxvi/image/upload/v1695789365/ConnectX/Posts/tzxnpw3b51v4pohhve3o.jpg",
    title: "Burger",
  },
  {
    id: 6,
    img: "https://res.cloudinary.com/diqgskxvi/image/upload/v1695789365/ConnectX/Posts/tzxnpw3b51v4pohhve3o.jpg",
    title: "Burger",
  },
  {
    id: 7,
    img: "https://res.cloudinary.com/diqgskxvi/image/upload/v1695789365/ConnectX/Posts/tzxnpw3b51v4pohhve3o.jpg",
    title: "Burger",
  },
  {
    id: 8,
    img: "https://res.cloudinary.com/diqgskxvi/image/upload/v1695789365/ConnectX/Posts/tzxnpw3b51v4pohhve3o.jpg",
    title: "Burger",
  },
  {
    id: 9,
    img: "https://res.cloudinary.com/diqgskxvi/image/upload/v1695789365/ConnectX/Posts/tzxnpw3b51v4pohhve3o.jpg",
    title: "Burger",
  },
  {
    id: 10,
    img: "https://res.cloudinary.com/diqgskxvi/image/upload/v1695789499/ConnectX/Posts/kvxybilrak9lodp5iypm.jpg",
    title: "Burger",
  },
  {
    id: 11,
    img: "https://res.cloudinary.com/diqgskxvi/image/upload/v1695789365/ConnectX/Posts/tzxnpw3b51v4pohhve3o.jpg",
    title: "Burger",
  },
  {
    id: 12,
    img: "https://res.cloudinary.com/diqgskxvi/image/upload/v1695789499/ConnectX/Posts/kvxybilrak9lodp5iypm.jpg",
    title: "Burger",
  },
];

function UserPost() {
  if (itemData.length === 0) {
    return (
      <Box>
        <Typography>User Dont have any post</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <ImageList sx={{ width: "100%", height: "100%" }} cols={3}>
        {itemData.map((item) => (
          <ImageListItem
            component={Link}
            key={item.id}
            to={`/posts/${item.id}`}
          >
            <img
              style={{ width: "250px", height: "250px" }}
              src={`${item.img}`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

export default UserPost;
