const loggerStyle = "font-weight: bold";
const actionNameToTypes = (actionName: string) => {
  return actionName
    .replace(/([A-Z])/g, "_$1")
    .trim()
    .toUpperCase();
};

const printDebugInfo = (
  currentAction: string,
  state: object,
  params: object,
  nextState: object
) => {
  console.log(
    `---> ACTION: %c${actionNameToTypes(currentAction)}`,
    `color: #000000; ${loggerStyle}`
  );
  console.log("  %cprev state ", `color: #708090; ${loggerStyle}`, state);
  console.log("  %cparams     ", `color: #0000FF; ${loggerStyle}`, params);
  console.log("  %cnext state ", `color: #008000; ${loggerStyle}`, nextState);
};

const printWarning = (message: string) => {
  console.log(`%c${message}`, `color: #FFA500; ${loggerStyle}`);
};

export { actionNameToTypes, printDebugInfo, printWarning };
