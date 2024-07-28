import { useRoutes } from 'react-router-dom';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Home from './components/home/index';
import ProtectedRoute from './components/auth/ProtectedRoute';

function AppRoutes() {
  console.log("AppRoutes is rendering");

  const routesArray = [
    { path: "*", element: <Login /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/home", element: <ProtectedRoute element={<Home />} /> },
  ];

  return useRoutes(routesArray);
}

export default AppRoutes;
