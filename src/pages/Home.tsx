import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Nav } from "../components/Nav";
import axios from "axios";
import { Redacao, RedacaoFromUser } from "../types";
import { IconFilePlus } from "@tabler/icons-react";
import { ItemPreview } from "../components/ItemPreview";

export const Home: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<Redacao[]>([]);

  useEffect(() => {
    if (auth && !auth.isAuthenticated) {
      navigate("/login");
    }
  }, [auth, navigate]);

  //Fetch data
  useEffect(() => {
    if (auth && auth.credentials) {
      const accessToken = auth.credentials.access_token;
      axios
        .get(
          "https://desafio.pontue.com.br/index/aluno/" +
            auth?.credentials?.aluno_id,
          {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            response.data.data.forEach((item: RedacaoFromUser) => {
              axios
                .get("https://desafio.pontue.com.br/redacao/" + item.id, {
                  headers: {
                    Authorization: "Bearer " + accessToken,
                  },
                })
                .then((result) => {
                  if (result.status === 200) {
                    const redacao: Redacao = result.data.data;
                    setData((data) => [...data, redacao]);
                  }
                });
            });
          }
        });
    }
  }, []);

  //Only render data if user is authenticated
  if (!auth || !auth.credentials) return null;

  return (
    <div className="min-h-screen max-w-screen">
      <Nav />
      <main className="container mx-auto py-10 px-2 md:px-0">
        {/* Title Section */}
        <div className="flex justify-between items-center">
          <div className="my-6 flex flex-col gap-2">
            <h1 className="text-3xl font-semibold">Bem vindo!</h1>
            <h3 className="text-lg font-medium">
              Essas são suas redações salvas:
            </h3>
          </div>

          {/* Button Section */}
          <div>
            <button className="p-4 cursor-pointer rounded-md border-slate-200 border-2 hover:bg-indigo-800 hover:text-white transition-colors duration-75">
              <IconFilePlus size={32} className="h-8 md:h-auto" />
            </button>
          </div>
        </div>

        {/* Display Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 w-full gap-x-4 gap-y-8">
          {data.map((item, index) => (
            <ItemPreview item={item} key={index} />
          ))}
        </div>
      </main>
    </div>
  );
};
