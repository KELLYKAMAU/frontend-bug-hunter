import "./App.css";
import UserLogin from "./components/auth/Userlogin";
import Contact from "./components/contact/Contact";
import Registration from "./components/auth/registration";
import { Admindashboard } from "./components/Admin dashboard/Aside/Aside/Dashboard";
import Landing from "./components/Landing";
import UserDashboard from "./components/user/UserDashboard";
import About from "./components/static/About";
import Services from "./components/static/Services";
import { ProtectedRoute } from "./components/routing/ProtectedRoute";
import { createBrowserRouter, RouterProvider } from "react-router";
import Bugs from "./components/bugs/Bugs";
import Projects from "./components/projects/Projects";
import Comments from "./components/comments/Comments";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/services",
      element: <Services />,
    },
    {
      path: "/userLogin",
      element: <UserLogin />,
    },
     {
      path: "/bugs",
      element: <Bugs/>,
    },
     {
      path: "/projects",
      element: <Projects />,
    },
     {
      path: "/userLogin",
      element: <UserLogin />,
    },
     {
      path: "/comments",
      element: <Comments/>,
    },
    {
      path: "/register",
      element: <Registration />,
    },
    {
      path: "/admin/dashboard",
      element: (
        <ProtectedRoute allowedRoles={["admin"]}>
          <Admindashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/user/dashboard",
      element: (
        <ProtectedRoute allowedRoles={["admin", "developer", "tester"]}>
          <UserDashboard />
        </ProtectedRoute>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
