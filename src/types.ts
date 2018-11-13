export interface State {
  [key: string]: any;
}

export type MapStateToProps = (state: State) => State;

type Connect = (
  mapStateToProps: MapStateToProps
) => (ComponentToWrap: React.ComponentType<any>) => React.ComponentType<any>;

type Dispatch = (actionType: string, params?: State) => void;

export interface Provider {
  setState: (state: object) => void;
}

export interface Actions {
  [actionType: string]: (params: State) => void;
}

export interface ActionCreators {
  [actionName: string]: (state: State, params: State) => State;
}

export interface Store {
  Provider: React.ComponentType<any>;
  dispatch: Dispatch;
  connect: Connect;
}
