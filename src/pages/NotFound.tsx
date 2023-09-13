import { Link } from "react-router-dom";
import { Nav } from "../components/Nav";
import { IconArrowLeft } from "@tabler/icons-react";

export const NotFound: React.FC = () => {
  return (
    <div className="h-screen w-screen">
      <Nav />
      <main className="container mx-auto py-20 flex flex-col gap-3 justify-center items-center">
        <h1 className="text-6xl font-semibold">404</h1>
        <h3 className="text-2xl font-medium">Página não encontrada</h3>
        <Link
          to="/"
          className="w-fit px-10 rounded-md bg-indigo-600 text-white py-3 my-4 hover:bg-indigo-700 transition-colors duration-150 flex items-center gap-2">
          <IconArrowLeft /> Voltar
        </Link>
      </main>
    </div>
  );
};
