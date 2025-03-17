import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../page/home/Home";
import Register from "../page/authentication/Register";
import Login from "../page/authentication/Login";
import EmailVarification from "../page/authentication/MailVarification";
import OtpVerification from "../page/authentication/OtpVerification";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],

  
  },
  {
    path:'/register',
    element: <Register/>, 
  }, 
  {
    path: '/login',
    element: <Login/>
  }, 
  {
    path: '/email_verification', 
    element: <EmailVarification/>
  },
  {
    path: '/otp_verification',
    element: <OtpVerification/>
  }
]);
