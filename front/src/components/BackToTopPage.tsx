import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function BackToTopPage() {
  // Scrolls to the top of the page whenever the URL/path changes
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}
