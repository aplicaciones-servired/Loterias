import { useAuth } from "../auth/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/Interfaces";
import { LOGIN_URL } from "../utils/contanst";
import axios from "axios";
import { toast } from "react-toastify";

export function useLogin(): {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  errorString: string;
  loading: boolean;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (ev: React.FormEvent) => void;
} {
  const { login, setUsernames } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorString, setErrorString] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = (ev: React.FormEvent): void => {
    ev.preventDefault();
    setLoading(true);
    //axios.post("http://localhost:9010/api/v2/login", { username, password })
    axios.post(`${LOGIN_URL}/login`, { username, password })
      .then((res) => {
        const proceso = res.data.user.process
        if (proceso === "Operaciones" || proceso === "Financiero") {
          login();
          setUsernames(res.data.user as unknown as User);
          navigate('/home')
        }
        if (proceso !== "Operaciones" && proceso !== "Financiero") {
          toast.error("No estas autorizado", {
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          setErrorString("Datos de usuario inválidos.");
        }
      })
      .catch((error) => {
        const errorMessage = (error.response?.data?.message ??
          error.message) as string | undefined;
        setErrorString(errorMessage ?? "Error al iniciar sesión");
        setTimeout(() => {
          setErrorString("");
        }, 5000);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    username,
    setUsername,
    password,
    errorString,
    loading,
    setPassword,
    handleSubmit,
  };
}
