import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { searchBooks } from "../api/apiBooks";
import { IBook } from "../@types";
import Seo from "../components/Seo";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

//get query string
const useQuery = () => {
  return new URLSearchParams(useLocation().search);  // get query params from URL like ?query=harry
};

const SearchPage = () => {
  const query = useQuery();
  const searchTerm = query.get("query") || ""; // get search term from URL
  const [results, setResults] = useState<IBook[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      const res = await searchBooks(searchTerm);// search books based on search term
      setResults(res);
    };

    if (searchTerm) {
      fetchResults();
    }
  }, [searchTerm]); // rerun when searchTerm changes

  return (
    <>
       <Seo
        title="Recherche"
        description="Résultat de votre recherche"
        url={`${baseUrl}/search`}
      />
      <div>
        <section className="content ml-[5vw] mr-[5vw]">
          <h2 className="text-xl mt-8 mb-4 font-bold">
            {results.length} Résultat(s) pour la recherche : " {searchTerm} "
          </h2>
          {results.length > 0 ? (
            <div className="book-list grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {results.map((book: any) => (
                <Link key={book.id} to={`/books/${book.id}`} className="block">
                  <div className="book cursor-pointer hover:shadow-lg hover:rounded-md hover:transition-shadow">
                    <img
                      src={`https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/${book.cover_url}.jpg`}
                      alt=""
                      role="presentation"
                      className="h-80 w-full object-contain mb-2 mx-auto"
                    />
                    <p className="text-center">{book.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p>Aucun résultat trouvé.</p>
          )}
        </section>
      </div>
    </>
  );
};

export default SearchPage;
