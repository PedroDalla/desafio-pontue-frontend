import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Redacao } from "./pages/Redacao";
import { Error } from "./pages/Error";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/", element: <Home />, errorElement: <NotFound /> },
  { path: "/error", element: <Error /> },
  { path: "/redacoes/:id", element: <Redacao /> },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
