
import { printNextState, printPrevState, printWarning } from "./utils";

export default function createStore<
  StoreState,
  Actions extends Record<string, ActionMethods>,
  ActionMethods extends (state: StoreState, params?: any) => StoreState
>(initialState: StoreState, actions: Actions, isEnableLog?: boolean) {
  type ListenerFunction = (newStoreState: StoreState) => void;

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

    dispatch<T extends keyof typeof actions>(
      actionType: T,
      params: Parameters<typeof actions[T]>[1] extends undefined ? void : Parameters<typeof actions[T]>[1]
    ) {
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
    },

    actions<T extends keyof typeof actions>(actionType: T) {
      type paramsType = Parameters<typeof actions[T]>[1];
      return (params: paramsType extends undefined ? void : paramsType) => this.dispatch(actionType, params);
    }
  };
}
