import AuthForm from "./AuthForm";
import { ILogin } from "../../@types/auth";
import { useAuthStore } from "../../utils/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { loginUser } from "../../api/apiAuth";
import { toastSuccess } from "../../utils/toast/toastSuccess";
import { toastError } from "../../utils/toast/toastError";
import PasswordField from "./PasswordField";

/**
 * Login component that handles user authentication.
 *
 * @returns {JSX.Element} - The rendered login form.
 */
const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const [loginData, setLoginData] = useState<ILogin>({
    email: "",
    password: "",
  });

  /**
   * Handles the login process.
   */
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginUser(loginData);
      const { name, id, token } = data;

      login(name, id, token);
      toastSuccess("Connexion réussie !");

      setLoginData({
        email: "",
        password: "",
      });

      navigate("/profile");
    } catch (error) {
      toastError("Echec de la connexion");
    }
  };

  return (
    <AuthForm title="Me connecter">
      <div className="mb-4 font-body tracking-wider">
        <label htmlFor="loginEmail" className="block mb-1 text-lg ">
          E-mail
        </label>
        <input
          type="text"
          id="loginEmail"
          value={loginData.email}
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
          className="w-full border border-gray-300 p-2 placeholder-placeholder rounded focus:outline-none"
          placeholder="email@example.com"
        />
      </div>
      <div className="mb-6 font-body tracking-wider">
        <label htmlFor="loginPassword" className="block mb-1 text-lg">
          Mot de passe
        </label>
        <PasswordField
          id="loginPassword"
          name="password"
          value={loginData.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
          placeholder="Mot de passe"
        />
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-gray-800 hover:bg-gray-600 text-white py-2 px-6 rounded font-title cursor-pointe dark:bg-gray-600 dark:hover:bg-gray-400r"
          onClick={handleLogin}
        >
          Connexion
        </button>
      </div>
    </AuthForm>
  );
};

export default Login;
