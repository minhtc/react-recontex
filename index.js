import React from "react";

const createProvider = (setProvider, Provider, initialState) =>
  class StoreProvider extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = initialState;
      setProvider(this);
    }

    render() {
      return <Provider value={this.state}>{this.props.children}</Provider>;
    }
  };

const createConnect = Consumer => mapStateToProps => ComponentToWrap => {
  const ConnectedComponent = props => {
    return (
      <Consumer>
        {state => {
          const stateToProps = mapStateToProps(state || {});
          return <ComponentToWrap {...props} {...stateToProps} />;
        }}
      </Consumer>
    );
  };

  const displayName =
    ComponentToWrap.displayName || ComponentToWrap.name || "NoName";
  ConnectedComponent.displayName = `Consumer(${displayName})`;

  return ConnectedComponent;
};

export default (initialState = {}, actionsCreators = {}) => {
  const context = React.createContext();
  let provider = null;
  let state = initialState;
  const setProvider = self => (provider = self);

  const actions = Object.keys(actionsCreators).reduce(
    (accumulator, currentAction) => ({
      ...accumulator,
      [currentAction]: (...args) => {
        const changes = actionsCreators[currentAction](state, ...args);
        state = { ...state, ...changes }
        provider.setState(state);
      }
    }),
    {}
  );

  const Provider = createProvider(setProvider, context.Provider, initialState);
  const connect = createConnect(context.Consumer);

  return {
    Provider,
    connect,
    actions
  };
};
