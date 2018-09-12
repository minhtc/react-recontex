import createStore from "react-recontext";
import initialState from "./initialState"
import actionsCreators from "./actions"

export const { Provider, connect, actions } = createStore(
  initialState,
  actionsCreators
);
