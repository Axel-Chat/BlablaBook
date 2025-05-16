import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home";
import Navbar from "./components/layout/Navbar";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import DetailPage from "./pages/DetailsBookPage";
import Library from "./components/Library";
import SettingsUser from "./pages/SettingsUser";
import ProfilePage from "./components/ProfilePage";
import Authentication from "./pages/Authentication";
import SearchPage from "./pages/SearchPage";
import ErrorNotFound from "./pages/ErrorNotFound";
import About from "./pages/About";
import Mentions from "./pages/Mentions";
import ErrorServer from "./pages/ErrorServer";
import { ErrorBoundary } from "react-error-boundary";
import Logout from "./components/authentication/Logout";
import CategoryPage from "./pages/CategoryPage";
import BackToTopPage from "./components/BackToTopPage";
import MobileNav from "./components/layout/MobileNav";
import MobileCategoryPage from "./pages/MobileCategoryPage";
import UserReadPage from "./pages/UserReadPage";
import UserToReadPage from "./pages/UserToReadPage";

function App() {
  const location = useLocation();
  return (
    // Wrapper div pour toute l'application
    <div className="flex flex-col min-h-screen bg-white text-black dark:text-placeholder transition-colors">
      <BackToTopPage />
      <Navbar />
      <Header />

      {/* Le main prend tout l'espace disponible avec flex-grow */}
      <main className="md:ml-64 flex-grow bg-body">
        <ErrorBoundary
          FallbackComponent={ErrorServer}
          resetKeys={[location.pathname]}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/books/:bookId" element={<DetailPage />} />
            <Route path="/categories/:categoryId" element={<CategoryPage />} />
            <Route path="/categories" element={<MobileCategoryPage />} />
            <Route path="/library" element={<Library />} />
            <Route path="/user/settings" element={<SettingsUser />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/books/read" element={<UserReadPage />} />
            <Route path="/books/to-read" element={<UserToReadPage />} />
            <Route path="/auth" element={<Authentication />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/mentions-legales" element={<Mentions />} />
            <Route path="*" element={<ErrorNotFound />} />
          </Routes>
        </ErrorBoundary>
      </main>
      {/* Le footer sera toujours en bas */}
      <Footer />
      {/* Mobile nav at the end, after Footer */}
      <MobileNav />
    </div>
  );
}

export default App;
