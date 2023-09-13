import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Nav } from "../components/Nav";
import axios from "axios";
import { Redacao } from "../types";

export const Home: React.FC = () => {
  const auth = useAuth();
  const [data, setData] = useState<Redacao>();

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
          "https://desafio.pontue.com.br/redacao/" +
            item.id +
            auth?.credentials?.aluno_id,
          {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            setData(response.data.data);
          }
        });
    }
  }, []);

  //Only render data if user is authenticated
  if (!auth || !auth.credentials) return null;

  return (
    <div className="h-screen w-screen">
      <Nav />
      <main className="container mx-auto py-10"></main>
    </div>
  );
};
