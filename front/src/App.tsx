import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home";
import Navbars from "./components/layout/Navbar";
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

function App() {
  const location = useLocation();
  return (
    <>
      <Navbars />
      <Header />
      <main className="md:ml-64 flex flex-col bg-body">
        {/* // Wrap Routes with ErrorBoundary to display a 500 error page when an error occurs.
          // The `resetKeys` prop resets the error state automatically whenever the URL changes.
          // This ensures that navigation via <Link> works correctly by re-rendering the affected components.  */}
        <ErrorBoundary FallbackComponent={ErrorServer} resetKeys={[location.pathname]}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/books/:bookId" element={<DetailPage />} />
            <Route path="/library" element={<Library />} />
            <Route path="/user/settings" element={<SettingsUser />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/auth" element={<Authentication />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/mentions-legales" element={<Mentions />} />
            <Route path="*" element={<ErrorNotFound />} />
          </Routes>
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
}

export default App;
