

import  Store  from "./store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./actions/user";
import { getAllProducts } from "./actions/product";
export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={Store}>{children}</Provider>;
}
