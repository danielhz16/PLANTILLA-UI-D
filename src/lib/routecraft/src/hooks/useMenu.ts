import { createContext, useContext } from "react";
import type { UseMenuResult } from "../types";

export const RouterCtx = createContext<UseMenuResult>({ menu: [] });

export const useMenu = (): UseMenuResult => useContext(RouterCtx);
