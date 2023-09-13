import { Link } from "react-router-dom";
import { Nav } from "../components/Nav";
import { IconArrowLeft, IconMoodSadDizzy } from "@tabler/icons-react";

export const Error: React.FC = () => {
  return (
    <div className="h-screen w-screen">
      <Nav />
      <main className="container mx-auto py-20 flex flex-col gap-5 justify-center items-center">
        <IconMoodSadDizzy size={80} />
        <h1 className="text-4xl font-medium">
          Houve um erro ao carregar essa página
        </h1>
        <h4 className="text-md font-light">
          Houve um erro de conexão ou a API detectou muitas chamadas
          consecutivas.
        </h4>
        <Link
          to="/"
          className="w-fit px-10 rounded-md bg-indigo-600 text-white py-3 my-4 hover:bg-indigo-700 transition-colors duration-150 flex items-center gap-2">
          <IconArrowLeft /> Voltar
        </Link>
      </main>
    </div>
  );
};
