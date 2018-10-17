import * as React from "react";

type TMapToProps = (state: object) => object;

type TSetProvider = (self: any) => void;

interface IProvider {
  setState: (state: object) => void;
}

interface IActions {
  [key: string]: (params?: any) => void;
}

interface IActionCreators {
  [key: string]: (state: object, params?: any) => void;
}

const createProvider = (
  setProvider: TSetProvider,
  Provider: React.Provider<any>,
  initialState: object
) =>
  class RootProvider extends React.PureComponent<{}> {
    constructor(props: any) {
      super(props);
      this.state = initialState;
      setProvider(this);
    }

    public render() {
      return <Provider value={this.state}>{this.props.children}</Provider>;
    }
  };

const createConnect = (Consumer: React.Consumer<any>) => (
  mapStateToProps: TMapToProps
) => (ComponentToWrap: React.ComponentType) => {
  const ConnectedComponent = (props: any) => (
    <Consumer>
      {(state: any) => {
        const stateToProps = mapStateToProps(state || {});
        return <ComponentToWrap {...props} {...stateToProps} />;
      }}
    </Consumer>
  );

  const displayName = ComponentToWrap.displayName || "NoName";
  ConnectedComponent.displayName = `Consumer(${displayName})`;

  return ConnectedComponent;
};

const actionNameToTypes = (actionName: string) =>
  actionName
    .replace(/([A-Z])/g, "_$1")
    .trim()
    .toUpperCase();
const loggerStyle = "font-weight: bold";

export default (
  initialState: object,
  actionsCreators: IActionCreators = {},
  logger: boolean = false
) => {
  const context = React.createContext({});
  let provider: IProvider;
  let state = initialState;

  const setProvider = (self: any) => (provider = self);

  const actions: IActions = Object.keys(actionsCreators).reduce(
    (accumulator: object, currentAction) => ({
      ...accumulator,
      [actionNameToTypes(currentAction)]: (...args: any) => {
        const update = actionsCreators[currentAction](state, ...args);
        const nextState: object = Object.assign({}, state, update);
        if (logger) {
          let params = {};
          if (args) {
            if (args.length === 1) {
              params = args[0];
            } else if (args.length > 1) {
              params = args;
            }
          }
          console.log(
            `---> ACTION: %c${actionNameToTypes(currentAction)}`,
            `color: #000000; ${loggerStyle}`
          );
          console.log(
            "  %cprev state ",
            `color: #708090; ${loggerStyle}`,
            state
          );
          console.log(
            "  %cparams     ",
            `color: #0000FF; ${loggerStyle}`,
            params
          );
          console.log(
            "  %cnext state ",
            `color: #008000; ${loggerStyle}`,
            nextState
          );
        }

        state = nextState;
        provider.setState(nextState);
      }
    }),
    {}
  );

  const dispatch = (actionType: string, ...args: any) => {
    if (!actionType) {
      console.log(
        "%cAction Type is required!",
        `color: #FFA500; ${loggerStyle}`
      );
      return;
    }
    if (!actions[actionType]) {
      console.warn(
        `%cAction with type ${actionType} is not defined`,
        `color: #FFA500; ${loggerStyle}`
      );
      return;
    }
    actions[actionType](...args);
  };

  const Provider = createProvider(setProvider, context.Provider, initialState);
  const connect = createConnect(context.Consumer);

  return {
    Provider,
    connect,
    dispatch
  };
};
