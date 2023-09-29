import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import PageNotFound from "./pages/PageNotFound";
import Homepage from "./pages/Homepage";

import AppLayout from "./components/AppLayout";
import Posts from "./pages/Posts";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
// just for the testing it is created remove it after creating a login page

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    // errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/posts/:postId",
        element: <Posts />,
        // loader: menuLoader,
        // errorElement: <Error />,
      },
      {
        path: "//profile/:userId",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#fff",
            color: "#374151",
          },
        }}
      />
    </>
  );
}
