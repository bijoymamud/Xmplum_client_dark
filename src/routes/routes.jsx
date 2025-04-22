import { createBrowserRouter, Route } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../page/home/Home";
import Register from "../page/authentication/Register";
import Login from "../page/authentication/Login";
import EmailVarification from "../page/authentication/MailVarification";
import OtpVerification from "../page/authentication/OtpVerification";
import ChangePass from "../page/authentication/ChangePass";
import Confirmation from "../page/authentication/Confirmation";
import MessageLayout from "../page/Message/MessageLayout";
import ChatInterface from "../page/Message/ChatInterface";
import SignupVerification from "../page/authentication/SignupVerification";
import ChatHistory from "../page/Message/ChatHistory";
import UserProfile from "../page/Profile/UserProfile";
import PrivateRoute from "./PrivateRoute";
import AdminDashboard from "../layout/AdminDashboard/AdminDashboard";
import AdminHome from "../layout/AdminDashboard/AdminHome";
import UsersInfo from "../layout/AdminDashboard/UsersInfo";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {path: "/", element: <Home />},
   
      
    ],

  
  },

 
  {
    path: 'admin', element: <AdminDashboard/>,
    children: [

            { index: true, element: <AdminHome /> },
            {path: "admin_home", element: <AdminHome/>},
            {path: "user_info", element: <UsersInfo/>}
    ] 
  },



  {
    element: <PrivateRoute />,
    children: [
      {
        path: '/',
        element: <MessageLayout />,
        children: [
          {
            path: 'chat',
            children: [
              { index: true, element: <ChatInterface /> },
              { path: ':id', element: <ChatHistory /> },
            ],
          },
          {
            path: 'profile',
            element: <UserProfile />,
          },
        ],
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
  },
  {
    path: '/confirm_password',
    element: <ChangePass/>
  },
  {
    path: '/changed_password',
    element: <Confirmation/>
  },
  {
    path:'/verify_signup',
    element: <SignupVerification/>
  }
]);
