import { useState } from "react";
import Login from "../components/authentication/Login";
import Register from "../components/authentication/Register";
import { IRegister } from "../@types/auth";

const Authentication = () => {

  const [registerData, setRegisterDate] = useState<IRegister>({ name: "", email: "", password: "", confirmPassword: "" });

  const handleRegister = async () => {
    console.log("📤 Étape 1 - handleRegister appelée");
    console.log("📤 Étape 2 - données envoyées :", registerData);
  
    if (registerData.password !== registerData.confirmPassword) {
      toastError("Les mots de passe ne correspondent pas");
      return;
    }
  
    try {
      const result = await registerUser(registerData);
  
      console.log("✅ Étape 3 - utilisateur inscrit :", result);
      toastSuccess("Inscription réussie !");

      // ✅ Réinitialisation des champs
      setRegisterDate({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

    } catch (error: any) {
      console.error("❌ Étape 4 - erreur :", error);
      toastError(error.message || "Erreur d'inscription");
    }
  };

  return (
    <main className="md:ml-64">
      <Login />
      <Register 
        data={registerData}
        onChange={setRegisterDate}
        onSubmit={handleRegister}     
      />
    </main>
  );
};

export default Authentication;
