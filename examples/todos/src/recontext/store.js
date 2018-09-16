import createStore from "react-recontext";
import initialState from "./initialState";
import actionsCreators from "./actions/index";

const enableLogger = true;

export const { Provider, connect, actions } = createStore(
  initialState,
  actionsCreators,
  enableLogger
);
