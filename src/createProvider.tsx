import * as React from "react";

export default (
  setProvider: (self: any) => void,
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
