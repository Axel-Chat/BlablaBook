import { Link } from "react-router-dom";

export default function ErrorServer() {
  return (
    <div className="bg-body flex flex-col items-center justify-center h-max  ">
      <h1 className="font-title text-9xl text-center font-black p-7">500</h1>
      <img className="w-120 mt-4 mx-auto" src="/img/errorPage/error500_femme.webp" alt="Femme utilisant un extincteur pour éteindre un livre en feu" />
      <p className="font-title text-6xl text-center font-bold pt-6 ">Catastrophe - Littéraire !</p>
      <p className="font-body text-2xl text-center p-6">Il semblerait que notre bibliothèque soit indisponible pour le moment...</p>
      <Link to="/" className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-6 rounded mb-10 ">
        Retour à l'accueil
      </Link>
    </div>
  );
}
