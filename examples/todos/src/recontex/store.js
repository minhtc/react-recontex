import createStore from "react-recontex";
import initialState from "./initialState"
import actionsCreators from "./actions"

export const { Provider, connect, actions } = createStore(
  initialState,
  actionsCreators
);
