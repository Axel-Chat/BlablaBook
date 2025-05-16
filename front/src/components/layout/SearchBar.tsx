import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { searchBooks } from "../../api/apiBooks";
import { IBook } from "../../@types";

const SearchBar = () => {
  const [researchTerm, setResearch] = useState("");
  const [results, setResults] = useState<IBook[]>([]);
  const navigate = useNavigate();

  // handle search result page
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (researchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(researchTerm.trim())}`); // go to search result page on form submit
      setResearch("");
    }
  };

  // reset search bar after clicking on a suggestion
  const handleSuggestionClick = () => {
    setResearch("");
    setResults([]);
  };

  // fetch book suggestions from the api
  useEffect(() => {
    const fetchData = async () => {
      try {
        // start searching in db if research term is longer than 2 characters
        if (researchTerm.length > 2) {
          const res = await searchBooks(researchTerm);
          setResults(res);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error("Error fetching search results:", error); // log the error if fetching fails
        setResults([]); // optionally clear the results or show an error state
      }
    };

    const timer = setTimeout(fetchData, 300); // add delay to avoid too many requests
    return () => clearTimeout(timer); // clear the timeout if researchTerm changes
  }, [researchTerm]);

  return (
    <div className="search-bar text-placeholder relative max-w-70 md:min-w-75 md:block font-body tracking-wider">
      <form onSubmit={handleSearch} className="flex gap-2 ">
        <button type="submit" aria-label="soumettre la recherche">
          <i className="fas fa-search absolute left-3 -translate-y-1/2 pl-2"></i>
        </button>
        <input
          type="text"
          value={researchTerm}
          placeholder="Chercher un livre ou un auteur"
          onChange={(e) => setResearch(e.target.value)} // update research term on input change
          className="border rounded px-3 py-2 w-full pl-10 placeholder-gray-400 "
        />
      </form>

      {results.length > 0 && (
        <ul className="absolute bg-white border border-gray-200 rounded-md mt-1 w-full max-h-60 overflow-auto shadow-lg z-10 ">
          {results.map((book) => (
            <li key={book.id} className="p-2 hover:bg-gray-100 text-sm">
              <Link to={`/books/${book.id}`} onClick={handleSuggestionClick}>
                {book.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
