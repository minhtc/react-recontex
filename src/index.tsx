import * as React from "react";

import createConnect from "./createConnect";
import createProvider from "./createProvider";
import { actionNameToTypes, printDebugInfo, printWarning } from "./utils";

interface IProvider {
  setState: (state: object) => void;
}
interface IActions {
  [key: string]: (params?: any) => void;
}
interface IActionCreators {
  [key: string]: (state: object, params?: any) => object;
}
interface IStore {
  Provider: React.ComponentType;
  dispatch: (actionType: string, ...args: any[]) => void;
  connect(
    mapStateToProps: (state: object) => object
  ): (ComponentToWrap: React.ComponentType) => React.ComponentType;
}

export default function createStore(
  initialState: object = {},
  actionsCreators: IActionCreators = {},
  logger: boolean = false
): IStore {
  const context = React.createContext(initialState);
  let provider: IProvider;
  let state = initialState;

  const setProvider = (self: any) => (provider = self);

  const actions: IActions = Object.keys(actionsCreators).reduce(
    (accumulator: object, currentAction) => ({
      ...accumulator,
      [actionNameToTypes(currentAction)]: (...args: any[]) => {
        const update: object = actionsCreators[currentAction](state, ...args);
        const nextState: object = { ...state, ...update };
        if (logger) {
          printDebugInfo(currentAction, state, args, nextState);
        }
        state = nextState;
        provider.setState(nextState);
      }
    }),
    {}
  );

  const dispatch = (actionType: string, ...args: any[]) => {
    if (!actionType) {
      printWarning("Action Type is required!");
    } else if (!actions[actionType]) {
      printWarning(`Ation with type ${actionType} is not defined`);
    } else {
      actions[actionType](...args);
    }
  };

  const Provider = createProvider(setProvider, context.Provider, initialState);
  const connect = createConnect(context.Consumer);

  return {
    Provider,
    connect,
    dispatch
  };
}
