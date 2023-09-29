import { Box } from "@mui/material";
import Post from "./Post";
import styled from "@emotion/styled";
import PostSkeleton from "./Posts/PostSkeleton";

const StyledBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "center",
  gap: "20px",
}));

const postData = [
  {
    imageInfo: {
      id: "ConnectX/Posts/dgxqfdg1in90upnfeaii",
      secureUrl:
        "https://res.cloudinary.com/diqgskxvi/image/upload/v1695125210/ConnectX/Posts/dgxqfdg1in90upnfeaii.jpg",
    },
    _id: "65098ed3c28eaeb46a48da91",
    userId: {
      _id: "65069b176fee902589df976a",
      userName: "testUser2",
      fullName: "TestUser2",
    },
    caption: "New Caption Test 2",
    likesId: [
      {
        userId: "65069b176fee902589df976a",
        userName: "testUser2",
        fullName: "TestUser2",
        _id: "650c5be55b589fa762d0cf85",
      },
    ],
    createdAt: "2023-09-19T12:06:43.164Z",
    __v: 9,
    updatedAt: "2023-09-19T12:23:12.220Z",
  },

  {
    imageInfo: {
      id: "ConnectX/Posts/tzxnpw3b51v4pohhve3o",
      secureUrl:
        "https://res.cloudinary.com/diqgskxvi/image/upload/v1695789365/ConnectX/Posts/tzxnpw3b51v4pohhve3o.jpg",
    },
    _id: "6513b12d880a4f5a5b5dc705",
    userId: {
      _id: "6513b0d5880a4f5a5b5dc700",
      userName: "testuser4",
      fullName: "TestUser4",
    },
    caption: "Test Post 1",
    likesId: [],
    createdAt: "2023-09-27T04:35:57.617Z",
    __v: 0,
  },
  {
    imageInfo: {
      id: "ConnectX/Posts/kvxybilrak9lodp5iypm",
      secureUrl:
        "https://res.cloudinary.com/diqgskxvi/image/upload/v1695789499/ConnectX/Posts/kvxybilrak9lodp5iypm.jpg",
    },
    _id: "6513b1b2f3f9208a373652a4",
    userId: {
      _id: "6513b0d5880a4f5a5b5dc700",
      userName: "testuser4",
      fullName: "TestUser4",
    },
    caption: "Test Post 2",
    likesId: [],
    createdAt: "2023-09-27T04:38:10.809Z",
    __v: 0,
  },
  {
    imageInfo: {
      id: "ConnectX/Posts/kvxybilrak9lodp5iypm",
      secureUrl:
        "https://res.cloudinary.com/diqgskxvi/image/upload/v1694931762/ConnectX/Users/f5occh3cdepzjxdpbz9y.jpg",
    },
    _id: "6513b1b2f3f9208a373652a101",
    userId: {
      _id: "6513b0d5880a4f5a5b5dc700",
      userName: "testuser4",
      fullName: "TestUser4",
    },
    caption: "Test Post 2",
    likesId: [],
    createdAt: "2023-09-27T04:38:10.809Z",
    __v: 0,
  },
  {
    imageInfo: {
      id: "ConnectX/Posts/kvxybilrak9lodp5iypm",
      secureUrl:
        "https://res.cloudinary.com/diqgskxvi/image/upload/v1695179499/ConnectX/Posts/niiygytl0bskozjwafpz.jpg",
    },
    _id: "6513b1b2f3f9208a373652a10111",
    userId: {
      _id: "6513b0d5880a4f5a5b5dc700",
      userName: "testuser4",
      fullName: "TestUser4",
    },
    caption: "Test Post 2",
    likesId: [],
    createdAt: "2023-09-27T04:38:10.809Z",
    __v: 0,
  },
];

function Feeds() {
  const isLoading = false;
  if (isLoading) {
    return (
      <StyledBox flex={4} p={2}>
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </StyledBox>
    );
  }

  return (
    <StyledBox flex={4} p={2}>
      {postData.map((post) => {
        return <Post key={post._id} post={post} />;
      })}
    </StyledBox>
  );
}

export default Feeds;
