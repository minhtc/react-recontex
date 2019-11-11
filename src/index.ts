import * as React from "react";
import createProvider from "./createProvider";
import createStore from "./createStore";
import { Actions, StoreState } from "./types";

export default function createContext<T>({
  displayName,
  initState,
  actions,
  isEnableLog
}: {
  displayName: string;
  initState: StoreState;
  actions: Actions;
  isEnableLog?: boolean;
}): {
  Provider: any;
  Context: React.Context<StoreState>;
  dispatch: (actionType: string, params?: any) => void;
} {
  // Create React Context
  const Context = React.createContext(initState);
  Context.displayName = displayName;

  // Create Store
  const store = createStore(initState, actions, isEnableLog);

  return {
    Context,
    Provider: createProvider(store, Context.Provider),
    dispatch: store.dispatch
  };
}
