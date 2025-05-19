import { useAuthStore } from "./store/useAuthStore";

/**
 * Custom fetch function that includes authentication headers.
 *
 * @param {string} url - The URL to fetch.
 * @param {RequestInit} [options={}] - The fetch options.
 * @returns {Promise<Response>} - The response from the fetch request.
 */
export const authFetch = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  // Get the authentication token and logout function from the auth store
  const token = useAuthStore.getState().token;
  const logout = useAuthStore.getState().logout;

  // Create headers from the options or initialize new headers
  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");

  // Add the authorization header if a token exists
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // Make the fetch request with the updated headers
  const response = await fetch(url, {
    ...options,
    headers,
  });

  // If the response status is 401 (Unauthorized), log the user out
  if (response.status === 401) {
    logout(); // 🔐 Automatic logout if the token is expired or invalid
    const error = new Error("unauthorized");
    (error as any).status = 401;
    throw error;
  }

  return response;
};
