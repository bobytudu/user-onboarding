import React from "react";
import { useRoutes } from 'react-router-dom'
import Layout from "layout/Layout";

//pages
import User from "pages/Users/Users";
import AddUser from "pages/AddUser/AddUser";

//mui components
import Loader from "mui/Loader";
import Snackbar from 'mui/Snackbar'

function Routes() {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <User /> },
        { path: "/add-user", element: <AddUser /> },
      ]
    }
  ])
}

export default function RouteConfig() {
  return (
    <>
      <Loader />
      <Snackbar />
      <Routes />
    </>
  )
}