import React from 'react';
import { useRoutes } from 'react-router-dom';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Home from './components/home/index';

function AppRoutes() {
  console.log("AppRoutes is rendering"); // Add this line
  const routesArray = [
    { path: "*", element: <Login /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/home", element: <Home /> },
  ];

  return useRoutes(routesArray);
}

export default AppRoutes;

