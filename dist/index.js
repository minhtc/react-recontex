var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const createProvider = (setProvider, Provider, initialState) => class RootProvider extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = initialState;
        setProvider(this);
    }
    render() {
        return React.createElement(Provider, { value: this.state }, this.props.children);
    }
};
const createConnect = (Consumer) => (mapStateToProps) => (ComponentToWrap) => {
    const ConnectedComponent = (props) => (React.createElement(Consumer, null, (state) => {
        const stateToProps = mapStateToProps(state || {});
        return React.createElement(ComponentToWrap, Object.assign({}, props, stateToProps));
    }));
    const displayName = ComponentToWrap.displayName || "NoName";
    ConnectedComponent.displayName = `Consumer(${displayName})`;
    return ConnectedComponent;
};
const actionNameToTypes = (actionName) => actionName
    .replace(/([A-Z])/g, "_$1")
    .trim()
    .toUpperCase();
const loggerStyle = "font-weight: bold";
exports.default = (initialState, actionsCreators = {}, logger = false) => {
    const context = React.createContext({});
    let provider;
    let state = initialState;
    const setProvider = (self) => (provider = self);
    const actions = Object.keys(actionsCreators).reduce((accumulator, currentAction) => (Object.assign({}, accumulator, { [actionNameToTypes(currentAction)]: (...args) => {
            const update = actionsCreators[currentAction](state, ...args);
            const nextState = Object.assign({}, state, update);
            if (logger) {
                let params = {};
                if (args) {
                    if (args.length === 1) {
                        params = args[0];
                    }
                    else if (args.length > 1) {
                        params = args;
                    }
                }
                console.log(`---> ACTION: %c${actionNameToTypes(currentAction)}`, `color: #000000; ${loggerStyle}`);
                console.log("  %cprev state ", `color: #708090; ${loggerStyle}`, state);
                console.log("  %cparams     ", `color: #0000FF; ${loggerStyle}`, params);
                console.log("  %cnext state ", `color: #008000; ${loggerStyle}`, nextState);
            }
            state = nextState;
            provider.setState(nextState);
        } })), {});
    const dispatch = (actionType, ...args) => {
        if (!actionType) {
            console.log("%cAction Type is required!", `color: #FFA500; ${loggerStyle}`);
            return;
        }
        if (!actions[actionType]) {
            console.warn(`%cAction with type ${actionType} is not defined`, `color: #FFA500; ${loggerStyle}`);
            return;
        }
        actions[actionType](...args);
    };
    const Provider = createProvider(setProvider, context.Provider, initialState);
    const connect = createConnect(context.Consumer);
    return {
        Provider,
        connect,
        dispatch
    };
};
