import { useEffect, useState } from "react";
import { getAllCategories } from "../api/apiBooks";
import { ICategory } from "../@types";
import { Link } from "react-router-dom";
import { categoriesImage } from "../data/categoriesImage";

export default function MobileCategoryPage() {
  const [categories, setCategories] = useState<ICategory[]>([]);

  //Fetch all categories
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
      <div className="content ml-[5vw] mr-[5vw] pt-8 md:hidden">
        {/* Sidebar fixe à gauche */}
        <div className="">
          <h2 className="text-3xl text-center mb-4 font-bold font-title">Genres</h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">
            {categories.map((category) => {
              return (
                <li key={category.id} className="relative max-w-xs w-60 xs:w-80 sm:w-70 mx-auto">
                  <Link
                    to={`/categories/${category.id}`}
                    className="block text-gray-800 hover:text-yellow-700 hover:underline mb-2 font-body tracking-widest h-40"
                  >
                    <div className="h-40 relative">
                      <img
                        src={`/img/categories/${categoriesImage[category.id - 1].src}`}
                        alt=""
                        className="rounded-2xl brightness-50 w-full h-full object-cover absolute inset-0"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-white font-extrabold text-3xl text-center drop-shadow-lg px-2">
                          {" "}
                          {category.name}
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Contenu principal avec la Navbar */}
      </div>
    </div>
  );
}
