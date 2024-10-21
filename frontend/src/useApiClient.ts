import { hc } from "hono/client";

import type { AppType } from "../../backend/src/index.ts";

import { createContext, useContext } from "react";

type Client = ReturnType<typeof hc<AppType>>;

export const ApiClientContext = createContext<Client>(null!);

export const useApiClient = () => useContext(ApiClientContext);
