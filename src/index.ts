import * as React from "react";
import createProvider from "./createProvider";
import createStore from "./createStore";

export default function createContext<
  StoreState,
  Actions extends Record<string, ActionMethods>,
  ActionMethods extends (state: StoreState, params?: any) => StoreState
>({
  displayName,
  initState,
  actions,
  isEnableLog
}: {
  displayName: string;
  initState: StoreState;
  actions: Actions;
  isEnableLog?: boolean;
}) {
  // Create React Context
  const Context = React.createContext(initState);
  Context.displayName = displayName;

  // Create Store
  const store = createStore(initState, actions, isEnableLog);

  return {
    Context,
    Provider: createProvider(store, Context.Provider),
    actions: store.actions,
    dispatch: store.dispatch
  };
}
