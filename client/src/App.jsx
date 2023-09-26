import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { Box } from "@mui/material";

import PageNotFound from "./pages/PageNotFound";
import Homepage from "./pages/Homepage";

import AppLayout from "./components/AppLayout";
// just for the testing it is created remove it after creating a login page
function Login() {
  return <Box flexGrow={5}>Login</Box>;
}

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route
              index
              element={
                <>
                  <Homepage />
                </>
              }
            />
            {/* just add remaining routes like profile ,create a new post, search-optional,  */}
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
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
