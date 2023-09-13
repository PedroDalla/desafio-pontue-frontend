import axios from "axios";
import { createContext, useEffect, useState } from "react";

interface Credentials {
  email: string;
  accessToken: string;
  alunoId: string;
}

interface AuthContextShape {
  credentials?: Credentials;
  login: (email: string, password: string, remember: boolean) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextShape | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState<Credentials>();

  //Apply stored credentials if they exist
  useEffect(() => {
    const storedCredentials = localStorage.getItem("credentials");
    if (storedCredentials) {
      setCredentials(JSON.parse(storedCredentials));
      setIsAuthenticated(true);
    }
  }, []);

  //Login functionality
  const login = async (email: string, password: string, remember: boolean) => {
    const response = await axios.post(
      "https://desafio.pontue.com.br/auth/login",
      {
        email: email,
        password: password,
      }
    );
    if (response.status === 200) {
      setIsAuthenticated(true);

      //Stores user credentials in the localStorage
      if (remember) {
        localStorage.setItem("credentials", JSON.stringify(response.data));
      }
      setCredentials(response.data);
    } else {
      throw new Error("Internal error");
    }
  };

  const logout = () => {
    localStorage.removeItem("credentials");
    setCredentials(undefined);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ credentials, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
