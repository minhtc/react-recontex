declare const actionNameToTypes: (actionName: string) => string;
declare const printDebugInfo: (currentAction: string, state: object, args: any[], nextState: object) => void;
declare const printWarning: (message: string) => void;
export { actionNameToTypes, printDebugInfo, printWarning };
