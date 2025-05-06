import { createBrowserRouter, Outlet } from "react-router-dom";
import { Layout } from "./components/layout";
import AuthProvider from "./contexts/AuthContex";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ProviderQueryClient } from "./contexts/QueriesContext";
import { Login } from "./pages/login";
import { Movie } from "./pages/movie";
import { Movies } from "./pages/movies";
import { Register } from "./pages/register";
import { Private } from "./routes/Private";

// Wrapper de autenticação e tema
function AuthWrapper() {
  return (
    <ProviderQueryClient>
      <ThemeProvider>
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      </ThemeProvider>
    </ProviderQueryClient>
  );
}

const router = createBrowserRouter([
  {
    element: <AuthWrapper />,
    children: [
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
            element: (
              <Private>
                <Movies />
              </Private>
            ),
          },
          {
            path: "/movies/:id",
            element: (
              <Private>
                <Movie />
              </Private>
            ),
          },
        ],
      },
    ],
  },
]);

export { router };