export interface ObjectWithKey {
  [key: string]: any;
}

export interface StoreState {
  [key: string]: any;
}

export interface Actions {
  [actionType: string]: (state: StoreState, params?: any) => StoreState;
}

export type VoidFunction = () => void;

export type ListenerFunction = (newStoreState: StoreState) => void;

export interface Store {
  getState: () => StoreState;
  subscribe: (callback: ListenerFunction) => VoidFunction;
  dispatch: (actionType: string, params?: any) => void;
}
