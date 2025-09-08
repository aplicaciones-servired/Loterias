import { useAuth } from "../auth/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/Interfaces";
import { LOGIN_URL } from "../utils/contanst";
import axios from "axios";
import { toast } from "react-toastify";
// import { API_URL } from '../utils/constans'

export function useLogin(): {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  errorString: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (ev: React.FormEvent) => void;
} {
  const { login, setUsernames } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorString, setErrorString] = useState("");
  const navigate = useNavigate();


  const handleSubmit = (ev: React.FormEvent): void => {
    ev.preventDefault();
    //axios.post("http://localhost:9010/api/v2/login", { username, password })
    axios.post(`${LOGIN_URL}/login`, { username, password }) // Reemplaza 'APP_NAME' con el nombre de tu aplicaciÃ³n
      .then((res) => {
        const proceso = res.data.user.process
        if (proceso === "Operaciones") {
          login();
          setUsernames(res.data.user as unknown as User);
          navigate('/home')
        }
        if (proceso !== "Operaciones") {
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
        setErrorString(errorMessage ?? "Error al iniciar sesiÃ³n");
        setTimeout(() => {
          setErrorString("");
        }, 5000);
      });
  };

  return {
    username,
    setUsername,
    password,
    errorString,
    setPassword,
    handleSubmit,
  };
}
