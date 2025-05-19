import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-body pb-20 flex px-8 py-2 text-sm md:text-base text-black font-bold md:bg-header md:block md:pb-0 mb:bottom-0 w-full md:pl-80 dark:text-placeholder">
      <ul className="flex justify-between items-center font-title w-full py-4 border-t-2 md:border-none md:py-2">
        <li>
          <Link to="/about" aria-label="À propos">
            À propos
          </Link>
        </li>
        <li>
          <Link to="/mentions-legales" aria-label="Mentions légales">
            Mentions légales
          </Link>
        </li>
        <li>
          © Promo Sushi <br /> Équipe BlaBlaBook
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
