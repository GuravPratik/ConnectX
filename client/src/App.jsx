import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import PageNotFound from "./pages/PageNotFound";
import Homepage from "./pages/Homepage";

import AppLayout from "./components/AppLayout";
import Posts from "./pages/Posts";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Create from "./pages/Create";
import Settings from "./pages/Settings";
import Search from "./pages/Search";
import Signup from "./pages/Signup";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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
        path: "/profile/:userId",
        element: <Profile />,
      },
      {
        path: "/create",
        element: <Create />,
      },
      {
        path: "/setting",
        element: <Settings />,
      },
      {
        path: "/search",
        element: <Search />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 5000,
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
    </QueryClientProvider>
  );
}
