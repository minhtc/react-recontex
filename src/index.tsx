import * as React from "react";
import createConnect from "./createConnect";
import createProvider from "./createProvider";
import { ActionCreators, Actions, Provider, State, Store } from "./types";
import { actionNameToTypes, printDebugInfo, printWarning } from "./utils";

export default function createStore(
  initialState: object = {},
  actionsCreators: ActionCreators = {},
  logger: boolean = false
): Store {
  const context = React.createContext(initialState);
  let provider: Provider;
  let state = initialState;

  const setProvider = (self: any) => {
    provider = self;
  };

  const actions: Actions = Object.keys(actionsCreators).reduce(
    (accumulator: object, currentAction) => ({
      ...accumulator,
      [actionNameToTypes(currentAction)]: (params: State = {}) => {
        const update: object = actionsCreators[currentAction](state, params);
        const nextState: object = { ...state, ...update };
        if (logger) {
          printDebugInfo(currentAction, state, params, nextState);
        }
        state = nextState;
        provider.setState(nextState);
      }
    }),
    {}
  );

  const dispatch = (actionType: string, params: State = {}) => {
    if (!actionType) {
      printWarning("Action Type is required!");
    } else if (!actions[actionType]) {
      printWarning(`Ation with type ${actionType} is not defined`);
    } else {
      actions[actionType](params);
    }
  };

  return {
    Provider: createProvider(setProvider, context.Provider, initialState),
    connect: createConnect(context.Consumer),
    dispatch
  };
}
