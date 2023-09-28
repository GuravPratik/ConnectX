import { Box, List } from "@mui/material";
import CommentCard from "./CommentCard";

const commentsData = [
  {
    _id: "650d0d8dad0ecbee7dcb7517",
    userId: {
      _id: "65069b176fee902589df976a",
      userName: "testUser2",
      fullName: "TestUser2",
    },
    postId: "65098ed3c28eaeb46a48da91",
    content: "This is the first comment, Test1",
    createdAt: "2023-09-22T03:44:13.633Z",
    __v: 0,
  },
  {
    _id: "650d0db4ad0ecbee7dcb751b",
    userId: {
      _id: "65069b176fee902589df976a",
      userName: "testUser2",
      fullName: "TestUser2",
    },
    postId: "65098ed3c28eaeb46a48da91",
    content: "This is the second comment, Test2",
    createdAt: "2023-09-22T03:44:52.457Z",
    __v: 0,
  },
  {
    _id: "650d1415debeefad4b0d1580",
    userId: {
      _id: "65069a606fee902589df9766",
      userName: "testUser1",
      fullName: "TestUser1",
    },
    postId: "65098ed3c28eaeb46a48da91",
    content: "Updating comment third, test 3",
    createdAt: "2023-09-22T04:12:05.576Z",
    __v: 0,
  },
  {
    _id: "650d0d8dad0ecbee7dcb7512",
    userId: {
      _id: "65069b176fee902589df976a",
      userName: "testUser2",
      fullName: "TestUser2",
    },
    postId: "65098ed3c28eaeb46a48da91",
    content:
      "This is the first comment, Test1 asiceafhw90qfhasiicnsicn nhw 0f9qwfq3y8f c 0ehcqhve vv8heq0fh3qg3-jvdapcimw0qh hhf0a9shvcsavwq",
    createdAt: "2023-09-28T03:44:13.633Z",
    updatedAt: "2023-10-22T03:44:13.633Z",
    __v: 0,
  },
];

function CommentList() {
  /*
    Currently its a static page only
    */

  /* TODO: 
    1) get post id as a prop 
    2) fetch all comments of the post using id
    3) display all comments for that post 
    4) may be need to use useEffect to fetch posts comments or may be use react query (will figure out it later)
    */
  return (
    <Box>
      <List>
        {commentsData.map((comment) => {
          return <CommentCard key={comment._id} comment={comment} />;
        })}
      </List>
    </Box>
  );
}

export default CommentList;
