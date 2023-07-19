import "./App.css";
import React from "react";
import UploadPage from "./Components/Pages/UploadPage";
import Download_MailPage from "./Components/Pages/Download_MailPage";
import PasswordPage from "./Components/Pages/PasswordPage";
import Logo from "./assets/images/logo.png";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <UploadPage />,
    },
    {
      path: "/download/:id",
      element: <Download_MailPage />,
    },
    {
      path: "/password/:id",
      element: <PasswordPage />,
    }
  ]);
  return (
    <div className="fontstyle back p-[30px] min-h-screen">
      <div className="w-[150px]">
        <img src={Logo} alt="logo" />
      </div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
