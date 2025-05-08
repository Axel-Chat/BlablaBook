import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ICategory } from "../../@types";
import { getAllCategories } from "../../api/apiBooks";

const Navbars = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    async function loadCategories() {
      try {
        const allCategories = await getAllCategories();
        setCategories(allCategories);
      } catch (error) {
        console.log(error);
      }
    }
    loadCategories();
  }, []);
  return (
    <div>
      {/* Conteneur principal avec Flexbox */}
      <div className="flex">
        {/* Sidebar fixe à gauche */}
        <aside className="hidden md:block bg-sidebar p-4 w-64 fixed h-screen z-20 overflow-y-auto">
          <div className="logo flex items-center gap-2 mb-10">
            <Link to="/" className="flex items-center">
              <img src="/blablabook.webp" alt="BlaBlaBook" className="w-20" />
              <h1 className="text-xl font-black font-title">BlaBlaBook</h1>
            </Link>
          </div>
          <div className="pl-4">
            <h2 className="text-xl mb-4 font-title font-bold">Genres</h2>
            <ul>
              {categories.map((category) => {
                return (
                  <li key={category.id}>
                    <Link
                      to={`/categories/${category.id}`}
                      className="block text-gray-800 hover:text-blue-600 mb-2 font-body tracking-widest"
                    >
                      {category.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        {/* Contenu principal avec la Navbar */}
      </div>
    </div>
  );
};

export default Navbars;
