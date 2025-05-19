import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";


import Navbar from "./components/layout/Navbar";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import MobileNav from "./components/layout/MobileNav";
import BackToTopPage from "./components/BackToTopPage";


import HomePage from "./pages/Home";
import DetailPage from "./pages/DetailsBookPage";
import CategoryPage from "./pages/CategoryPage";
import MobileCategoryPage from "./pages/MobileCategoryPage";
import Library from "./components/Library";
import SettingsUser from "./pages/SettingsUser";
import ProfilePage from "./components/ProfilePage";
import UserReadPage from "./pages/UserReadPage";
import UserToReadPage from "./pages/UserToReadPage";
import Authentication from "./pages/Authentication";
import Logout from "./components/authentication/Logout";
import SearchPage from "./pages/SearchPage";
import About from "./pages/About";
import Mentions from "./pages/Mentions";
import ErrorNotFound from "./pages/ErrorNotFound";
import ErrorServer from "./pages/ErrorServer";

import { ErrorBoundary } from "react-error-boundary";

function App() {
  const location = useLocation();

  return (
    // Wrapper for the entire app - vertical layout with dark mode support
    <div className="flex flex-col min-h-screen bg-white text-black dark:text-placeholder transition-colors">
      
      {/* Back-to-top button component */}
      <BackToTopPage />

     
      <Navbar />
      <Header />

      {/* Main content area that expands to fill available vertical space */}
      <main className="md:ml-64 flex-grow bg-body">
        {/* Error boundary to catch any rendering errors and show a fallback page */}
        <ErrorBoundary
          FallbackComponent={ErrorServer}
          resetKeys={[location.pathname]}
        >
          <Routes>
            {/* Route definitions */}
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
            
            {/* Catch-all route for undefined paths */}
            <Route path="*" element={<ErrorNotFound />} />
          </Routes>
        </ErrorBoundary>
      </main>

      {/* Footer always sticks to the bottom */}
      <Footer />

      {/* Bottom navigation for mobile devices */}
      <MobileNav />
    </div>
  );
}

export default App;
