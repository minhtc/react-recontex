import { Actions, ListenerFunction, Store, StoreState } from "./types";
import { printNextState, printPrevState, printWarning } from "./utils";

export default function createStore(
  initialState: StoreState,
  actions: Actions,
  isEnableLog?: boolean
): Store {
  let currentState: StoreState = initialState;
  const listeners: ListenerFunction[] = [];

  return {
    getState() {
      return currentState;
    },

    subscribe(callback: ListenerFunction) {
      listeners.push(callback);
      return function unsubscrible() {
        const index = listeners.indexOf(callback);
        if (index >= 0) {
          listeners.splice(index, 1);
        }
      };
    },

    dispatch(actionType: string, params?: any) {
      // check if action type is exists
      if (!actionType) {
        if (isEnableLog) {
          printWarning("Action Type is required!");
        }
        return;
      }

      // check if action type is exists
      if (!actions[actionType]) {
        if (isEnableLog) {
          printWarning(`Ation with type ${actionType} is not defined`);
        }
        return;
      }

      // print prev state
      if (isEnableLog) {
        printPrevState(actionType, currentState);
      }

      // update state changes
      currentState = actions[actionType](currentState, params);

      // print next state
      if (isEnableLog) {
        printNextState(currentState);
      }

      // update store state value
      for (const listener of listeners) {
        listener(currentState);
      }
    }
  };
}
