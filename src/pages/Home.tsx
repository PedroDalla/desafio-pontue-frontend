import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth && !auth.isAuthenticated) {
      navigate("/login");
    }
  }, [auth, navigate]);

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-tr from-pink-800 to-60% to-indigo-900">
      <main className="w-full md:w-[600px] absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 shadow-lg bg-white rounded-md">
        <div className="flex flex-col items-center gap-2 p-20">
          <h1 className="font-semibold text-xl mb-6">Home</h1>
        </div>
      </main>
    </div>
  );
};
