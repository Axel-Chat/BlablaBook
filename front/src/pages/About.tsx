import { useEffect, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import Seo from "../components/Seo";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function About() {
  const [flipPageDimensions, setFlipPageDimensions] = useState({
    width: 495,
    height: 700,
  });
  const [windowWidth, setWindowWidth] = useState(0);

  // Utiliser useEffect pour détecter le chargement initial de la page
  useEffect(() => {
    // Définir la largeur initiale de la fenêtre
    setWindowWidth(window.innerWidth);

    // Fonction pour mettre à jour la largeur de la fenêtre
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Ajouter l'écouteur d'événement
    window.addEventListener("resize", handleResize);

    // Nettoyer
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Mettre à jour les dimensions lorsque windowWidth change
  useEffect(() => {
    if (windowWidth < 550) {
      setFlipPageDimensions({
        width: 354,
        height: 500,
      });
    } else {
      setFlipPageDimensions({
        width: 495,
        height: 700,
      });
    }
  }, [windowWidth]);

  return (
    <>
      <Seo
        title="A propos"
        description="Apprenez en davantage sur les créateurs du site"
        url={`${baseUrl}/about`}
      />
      <div className="flex justify-center pt-10 pb-10 overflow-hidden">
        {/* @ts-ignore */}
        <HTMLFlipBook
          width={flipPageDimensions.width}
          height={flipPageDimensions.height}
          showCover={true}
          maxShadowOpacity={0.5}
          flippingTime={700}
          >
          <div className="w-full h-auto">
            <img
              srcSet="/img/about/front_cover.webp 495w, /img/about/front_cover_mobile.webp 354w"
              sizes="(max-width: 550px) 354px, 495px"
              src="/img/about/front_cover.webp"
              alt=""
            />
          </div>
          <div className="w-full h-auto">
            <img
              srcSet="/img/about/presentation.webp 495w, /img/about/presentation_mobile.webp 354w"
              sizes="(max-width: 550px) 354px, 495px"
              src="/img/about/presentation.webp"
              alt=""
            />
          </div>
          <div className="w-full h-auto">
            <img
              srcSet="/img/about/presentation_2.webp 495w, /img/about/presentation_2_mobile.webp 354w"
              sizes="(max-width: 550px) 354px, 495px"
              src="/img/about/presentation_2.webp"
              alt=""
            />
          </div>
          <div className="w-full h-auto">
            <img
              srcSet="/img/about/bounabassa.webp 495w, /img/about/bounabassa_mobile.webp 354w"
              sizes="(max-width: 550px) 354px, 495px"
              src="/img/about/bounabassa.webp"
              alt=""
            />
          </div>
          <div className="w-full h-auto">
            <img
              srcSet="/img/about/guilhem.webp 495w, /img/about/guilhem_mobile.webp 354w"
              sizes="(max-width: 550px) 354px, 495px"
              src="/img/about/guilhem.webp"
              alt=""
            />
          </div>
          <div className="w-full h-auto">
            <img
              srcSet="/img/about/axel.webp 495w, /img/about/axel_mobile.webp 354w"
              sizes="(max-width: 550px) 354px, 495px"
              src="/img/about/axel.webp"
              alt=""
            />
          </div>
          <div className="w-full h-auto">
            <img
              srcSet="/img/about/amandine.webp 495w, /img/about/amandine_mobile.webp 354w"
              sizes="(max-width: 550px) 354px, 495px"
              src="/img/about/amandine.webp"
              alt=""
            />
          </div>
          <div className="w-full h-auto">
            <img
              srcSet="/img/about/mickael.webp 495w, /img/about/mickael_mobile.webp 354w"
              sizes="(max-width: 550px) 354px, 495px"
              src="/img/about/mickael.webp"
              alt=""
            />
          </div>
          <div className="w-full h-auto">
            <img
              srcSet="/img/about/epilogue.webp 495w, /img/about/epilogue_mobile.webp 354w"
              sizes="(max-width: 550px) 354px, 495px"
              src="/img/about/epilogue.webp"
              alt=""
            />
          </div>
          <div className="w-full h-auto">
            <img
              srcSet="/img/about/back_cover.webp 495w, /img/about/back_cover_mobile.webp 354w"
              sizes="(max-width: 550px) 354px, 495px"
              src="/img/about/back_cover.webp"
              alt=""
            />
          </div>
        </HTMLFlipBook>
      </div>
    </>
  );
}
