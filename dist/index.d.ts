import * as React from "react";
interface IActionCreators {
    [key: string]: (state: object, params?: any) => object;
}
interface IStore {
    Provider: React.ComponentType;
    dispatch: (actionType: string, ...args: any[]) => void;
    connect(mapStateToProps: (state: object) => object): (ComponentToWrap: React.ComponentType) => void;
}
export default function createStore(initialState?: object, actionsCreators?: IActionCreators, logger?: boolean): IStore;
export {};
