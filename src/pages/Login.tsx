import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { redirect, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { Logo } from "../components/Logo";

export const Login: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [logging, setLogging] = useState(false);

  useEffect(() => {
    if (auth && auth.isAuthenticated) {
      navigate("/");
    }
  }, [auth, navigate]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (auth) {
      setLogging(true);
      auth
        .login(email, password, remember)
        .then(() => {
          setLogging(false);
          redirect("/");
        })
        .catch((err: AxiosError) => {
          setError(true);
          setLogging(false);
          switch (err.status) {
            case 401:
              setErrorMessage("Usuário ou senha inválidos. Tente novamente.");
              break;
            case 403:
              setErrorMessage("Usuário não tem acesso. Tente outro usuário.");
              break;
            default:
              break;
          }
        });
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-tr from-pink-800 to-60% to-indigo-900">
      <main className="w-full md:w-[600px] absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 shadow-lg bg-white rounded-md">
        <form
          className="flex flex-col items-center gap-2 p-20"
          onSubmit={(e) => handleSubmit(e)}>
          <Logo width={250} height={100} />
          <h1 className="font-semibold text-xl mb-6">Login do Usuário</h1>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="Insira o e-mail"
            className="w-full px-4 py-2 rounded-md border-slate-200 border-2 placeholder:text-slate-500 outline-indigo-400"></input>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            placeholder="Insira a senha"
            className="w-full px-4 py-2 rounded-md border-slate-200 border-2 placeholder:text-slate-500 outline-indigo-400"></input>
          <button
            type="submit"
            disabled={logging}
            className="w-full rounded-md bg-indigo-600 text-white py-3 my-4 hover:bg-indigo-700 transition-colors duration-150 disabled:animate-pulse">
            {!logging ? "Continuar" : "Aguarde"}
          </button>
          {error && (
            <p className="text-red-700 text-sm font-medium">
              {errorMessage || "Houve um erro. Tente novamente."}
            </p>
          )}
          <div className="flex gap-1 mt-4">
            <input
              type="checkbox"
              id="remember-checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.currentTarget.checked)}
              className="cursor-pointer accent-indigo-600 w-3"></input>
            <label
              htmlFor="remember-checkbox"
              className="select-none cursor-pointer text-sm">
              Lembre-se de mim
            </label>
          </div>
        </form>
      </main>
    </div>
  );
};
