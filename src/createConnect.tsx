import * as React from "react";
import { MapStateToProps, State } from "./types";

export default (Consumer: React.Consumer<any>) => (
  mapStateToProps: MapStateToProps
) => (ComponentToWrap: React.ComponentType): React.ComponentType => {
  const ConnectedComponent = (props: any): JSX.Element => (
    <Consumer>
      {(state: State) => {
        const stateToProps = mapStateToProps(state || {});
        return <ComponentToWrap {...props} {...stateToProps} />;
      }}
    </Consumer>
  );

  const displayName = ComponentToWrap.displayName || "NoName";
  ConnectedComponent.displayName = `Consumer(${displayName})`;

  return ConnectedComponent;
};
