import * as React from "react";
import { State } from "./types";

interface Props {
  children: React.ReactChild;
}

export default (
  setProvider: (self: any) => void,
  Provider: React.Provider<any>,
  initialState: State
) =>
  class RootProvider extends React.PureComponent<Props> {
    constructor(props: Props) {
      super(props);
      this.state = initialState;
      setProvider(this);
    }

    public render() {
      return <Provider value={this.state}>{this.props.children}</Provider>;
    }
  };
