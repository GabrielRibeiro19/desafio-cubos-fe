import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout";
import { Login } from "./pages/login";
import { Movie } from "./pages/movie";
import { Movies } from "./pages/movies";
import { Register } from "./pages/register";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "/movies/:id",
        element: <Movie />,
      },
      // {
      //   path: '/dashboard',
      //   element: (
      //     <Private>
      //       <Dashboard />
      //     </Private>
      //   ),
      // },
      // {
      //   path: '/dashboard/new',
      //   element: (
      //     <Private>
      //       <New />
      //     </Private>
      //   ),
      // },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export { router };
