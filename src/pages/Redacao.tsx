import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Nav } from "../components/Nav";
import { useNavigate, useParams } from "react-router-dom";
import { IRedacao } from "../types";
import { getRedacao } from "../services/API";
import { IconArrowRight, IconDownload } from "@tabler/icons-react";
import { LoadingSkeleton } from "../components/LoadingSkeleton";

export const Redacao: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState<IRedacao>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth && !auth.isAuthenticated) {
      navigate("/login");
    }
  }, [auth, navigate]);

  //Fetch data
  useEffect(() => {
    if (auth && auth.credentials && params && params.id) {
      const accessToken = auth.credentials.access_token;
      getRedacao(params.id, accessToken).then((result) => {
        if (result.status === 200) {
          setData(result.data.data);
          setLoading(false);
        }
      });
    }
  }, []);

  //Only render data if user is authenticated
  if (!auth || !auth.credentials) return null;

  return (
    <div className="h-screen w-screen">
      <Nav />

      <main className="container mx-auto py-10 h-full">
        {data && (
          <div className="w-full flex flex-col-reverse lg:grid lg:grid-cols-5 gap-10 gap-y-10 justify-center px-3 h-full">
            {/* Files Section */}
            <div className="w-full flex flex-col gap-10 items-center col-span-3 h-full">
              {loading ? (
                <LoadingSkeleton />
              ) : (
                data.urls.map((item, index) => (
                  <div
                    className="w-full h-full flex flex-col gap-3"
                    key={index}>
                    <object
                      data={item.url}
                      className="max-w-full object-contain shadow-lg h-full">
                      <div className="p-10">
                        Parece que você não tem um leitor de PDF no seu browser
                        ou a imagem está indisponível.{" "}
                        <a
                          href={item.url}
                          className="w-fit px-6 items-center flex gap-2 text-sm rounded-md bg-indigo-600 text-white py-3 my-4 hover:bg-indigo-700 transition-colors duration-150">
                          Clique aqui para acessar diretamente{" "}
                          <IconArrowRight />
                        </a>
                      </div>
                    </object>
                    <div className="flex justify-between items-start">
                      <span className="text-sm text-slate-800 underline">
                        Arquivo {index + 1}/{data.urls.length}
                      </span>
                      <a
                        href={item.url}
                        target="__blank"
                        className="w-8 h-8 justify-center items-center flex gap-2 text-sm rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-150">
                        <IconDownload size={20} />
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
            {/* Info Section */}
            <div className="w-full col-span-2">
              {loading ? (
                <LoadingSkeleton />
              ) : (
                <ul className="flex flex-col gap-2 text-md text-indigo-950">
                  <li className="text-3xl font-black">
                    Redação nº{data.numero}
                  </li>
                  <li>Criada por: {data.aluno.nome_completo}</li>
                  <li>
                    Criada em: {new Date(data.created_at).toLocaleDateString()}
                  </li>
                  <li>Arquivos totais: {data.urls.length}</li>
                </ul>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
