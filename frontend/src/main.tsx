import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { hc } from "hono/client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppType } from "../../backend/src/index.ts";
import App from "./App.tsx";
import "./index.css";
import { ApiClientContext } from "./useApiClient.ts";

const queryClient = new QueryClient();
const apiClient = hc<AppType>(import.meta.env.VITE_APP_API_URL);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ApiClientContext.Provider value={apiClient}>
        <App />
      </ApiClientContext.Provider>
    </QueryClientProvider>
  </StrictMode>
);
