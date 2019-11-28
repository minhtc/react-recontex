import { StoreState } from "./types";

const loggerStyle = "font-weight: bold";

function printPrevState(
  actionType: string | number | symbol,
  state: StoreState
) {
  console.log(
    `---> ACTION: %c${actionType.toString()}`,
    `color: #000000; ${loggerStyle}`
  );
  console.log("  %cprev state ", `color: #708090; ${loggerStyle}`, state);
}

function printNextState(state: StoreState) {
  console.log("  %cnext state ", `color: #008000; ${loggerStyle}`, state);
}

function printWarning(message: string) {
  console.log(`%c${message}`, `color: #FFA500; ${loggerStyle}`);
}

export { printPrevState, printNextState, printWarning };
