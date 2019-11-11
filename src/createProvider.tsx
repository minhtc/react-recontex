import * as React from "react";
import { Store, StoreState } from "./types";

interface Props {
  children: React.ReactNode;
}

function createProvider(store: Store, Provider: React.Provider<any>) {
  return class WrappedComponent extends React.Component<Props> {
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
