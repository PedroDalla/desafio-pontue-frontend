import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Nav } from "../components/Nav";
import { IRedacao } from "../types";
import { IconFilePlus } from "@tabler/icons-react";
import { ItemPreview } from "../components/ItemPreview";
import { getDetailedRedacoesFromUser } from "../services/API";
import { LoadingSkeleton } from "../components/LoadingSkeleton";
import { createPortal } from "react-dom";
import { UploadModal } from "../components/UploadModal";

export const Home: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<IRedacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalEnabled, setModalEnabled] = useState(false);

  useEffect(() => {
    if (auth && !auth.isAuthenticated) {
      navigate("/login");
    }
  }, [auth, navigate]);

  //Fetch data
  useEffect(() => {
    if (auth && auth.credentials) {
      const accessToken = auth.credentials.access_token;
      getDetailedRedacoesFromUser(auth.credentials.aluno_id, accessToken)
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch(() => {
          navigate("/error");
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
            <button
              onClick={() => {
                setModalEnabled((v) => !v);
              }}
              className="p-4 cursor-pointer rounded-md border-slate-200 border-2 hover:bg-indigo-800 hover:text-white transition-colors duration-75">
              <IconFilePlus size={32} className="h-8 md:h-auto" />
            </button>
          </div>
        </div>

        {/* Display Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 w-full gap-x-4 gap-y-8">
          {loading
            ? new Array(8)
                .fill(undefined)
                .map((_item, index) => (
                  <LoadingSkeleton width={360} height={180} key={index} />
                ))
            : data.map((item, index) => (
                <ItemPreview item={item} key={index} />
              ))}
        </div>
      </main>
      {createPortal(
        <UploadModal
          isOpen={modalEnabled}
          closeModal={() => setModalEnabled((modalEnabled) => !modalEnabled)}
        />,
        document.body
      )}
    </div>
  );
};
