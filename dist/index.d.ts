import * as React from "react";
declare type TMapToProps = (state: object) => object;
interface IActionCreators {
    [key: string]: (state: object, params?: any) => void;
}
declare const _default: (initialState: object, actionsCreators?: IActionCreators, logger?: boolean) => {
    Provider: {
        new (props: any): {
            render(): JSX.Element;
            setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<{}>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
            forceUpdate(callBack?: (() => void) | undefined): void;
            readonly props: Readonly<{
                children?: React.ReactNode;
            }> & Readonly<{}>;
            state: Readonly<{}>;
            context: any;
            refs: {
                [key: string]: React.ReactInstance;
            };
        };
    };
    connect: (mapStateToProps: TMapToProps) => (ComponentToWrap: React.ComponentType<{}>) => {
        (props: any): JSX.Element;
        displayName: string;
    };
    dispatch: (actionType: string, ...args: any) => void;
};
export default _default;
