import * as React from "react";

function createProvider<StoreState>(
  store: {
    getState: () => StoreState;
    subscribe: (callback: (newStoreState: StoreState) => void) => () => void;
  },
  Provider: React.Provider<StoreState>
) {
  return class WrappedComponent extends React.Component {
    isComMounted: boolean = false;
    unsubscribe: any;

    state = store.getState();

    componentDidMount() {
      this.isComMounted = true;
      this.subscribe();
    }

    componentWillUnmount() {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
      this.isComMounted = false;
    }

    subscribe() {
      this.unsubscribe = store.subscribe((newStoreState: StoreState) => {
        if (!this.isComMounted) {
          return;
        }
        this.setState(newStoreState);
      });
    }

    render() {
      return <Provider value={this.state}>{this.props.children}</Provider>;
    }
  };
}

export default createProvider;
