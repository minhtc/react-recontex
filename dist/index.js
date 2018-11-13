'use strict';

var React = require('react');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var createConnect = (function (Consumer) { return function (mapStateToProps) { return function (ComponentToWrap) {
    var ConnectedComponent = function (props) { return (React.createElement(Consumer, null, function (state) {
        var stateToProps = mapStateToProps(state || {});
        return React.createElement(ComponentToWrap, __assign({}, props, stateToProps));
    })); };
    var displayName = ComponentToWrap.displayName || "NoName";
    ConnectedComponent.displayName = "Consumer(" + displayName + ")";
    return ConnectedComponent;
}; }; });

var createProvider = (function (setProvider, Provider, initialState) {
    return /** @class */ (function (_super) {
        __extends(RootProvider, _super);
        function RootProvider(props) {
            var _this = _super.call(this, props) || this;
            _this.state = initialState;
            setProvider(_this);
            return _this;
        }
        RootProvider.prototype.render = function () {
            return React.createElement(Provider, { value: this.state }, this.props.children);
        };
        return RootProvider;
    }(React.PureComponent));
});

var loggerStyle = "font-weight: bold";
var actionNameToTypes = function (actionName) {
    return actionName
        .replace(/([A-Z])/g, "_$1")
        .trim()
        .toUpperCase();
};
var printDebugInfo = function (currentAction, state, params, nextState) {
    console.log("---> ACTION: %c" + actionNameToTypes(currentAction), "color: #000000; " + loggerStyle);
    console.log("  %cprev state ", "color: #708090; " + loggerStyle, state);
    console.log("  %cparams     ", "color: #0000FF; " + loggerStyle, params);
    console.log("  %cnext state ", "color: #008000; " + loggerStyle, nextState);
};
var printWarning = function (message) {
    console.log("%c" + message, "color: #FFA500; " + loggerStyle);
};

function createStore(initialState, actionsCreators, logger) {
    if (initialState === void 0) { initialState = {}; }
    if (actionsCreators === void 0) { actionsCreators = {}; }
    if (logger === void 0) { logger = false; }
    var context = React.createContext(initialState);
    var provider;
    var state = initialState;
    var setProvider = function (self) {
        provider = self;
    };
    var actions = Object.keys(actionsCreators).reduce(function (accumulator, currentAction) {
        var _a;
        return (__assign({}, accumulator, (_a = {}, _a[actionNameToTypes(currentAction)] = function (params) {
            if (params === void 0) { params = {}; }
            var update = actionsCreators[currentAction](state, params);
            var nextState = __assign({}, state, update);
            if (logger) {
                printDebugInfo(currentAction, state, params, nextState);
            }
            state = nextState;
            provider.setState(nextState);
        }, _a)));
    }, {});
    var dispatch = function (actionType, params) {
        if (params === void 0) { params = {}; }
        if (!actionType) {
            printWarning("Action Type is required!");
        }
        else if (!actions[actionType]) {
            printWarning("Ation with type " + actionType + " is not defined");
        }
        else {
            actions[actionType](params);
        }
    };
    return {
        Provider: createProvider(setProvider, context.Provider, initialState),
        connect: createConnect(context.Consumer),
        dispatch: dispatch
    };
}

module.exports = createStore;
