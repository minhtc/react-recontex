(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
  typeof define === 'function' && define.amd ? define(['react'], factory) :
  (global['react-recontext'] = factory(global.React));
}(this, (function (React) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  var createProvider = function createProvider(setProvider, Provider, initialState) {
    return (
      /*#__PURE__*/
      function (_React$PureComponent) {
        _inherits(RootProvider, _React$PureComponent);

        function RootProvider(props) {
          var _this;

          _classCallCheck(this, RootProvider);

          _this = _possibleConstructorReturn(this, _getPrototypeOf(RootProvider).call(this, props));
          _this.state = initialState;
          setProvider(_assertThisInitialized(_assertThisInitialized(_this)));
          return _this;
        }

        _createClass(RootProvider, [{
          key: "render",
          value: function render() {
            return React.createElement(Provider, {
              value: this.state
            }, this.props.children);
          }
        }]);

        return RootProvider;
      }(React.PureComponent)
    );
  }; // inject root state into component


  var createConnect = function createConnect(Consumer) {
    return function (mapStateToProps) {
      return function (ComponentToWrap) {
        var ConnectedComponent = function ConnectedComponent(props) {
          return React.createElement(Consumer, null, function (state) {
            var stateToProps = mapStateToProps(state || {});
            return React.createElement(ComponentToWrap, _extends({}, props, stateToProps));
          });
        };

        var displayName = ComponentToWrap.displayName || ComponentToWrap.name || "NoName";
        ConnectedComponent.displayName = "Consumer(".concat(displayName, ")");
        return ConnectedComponent;
      };
    };
  };

  var actionNameToTypes = function actionNameToTypes(actionName) {
    return actionName.replace(/([A-Z])/g, "_$1").trim().toUpperCase();
  };

  var loggerStyle = "font-weight: bold"; // create store

  var index = (function (initialState) {
    var actionsCreators = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var logger = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var context = React.createContext();

    var setProvider = function setProvider(self) {
      return provider = self;
    };

    var provider = null;
    var state = initialState;
    var actions = Object.keys(actionsCreators).reduce(function (accumulator, currentAction) {
      return _objectSpread({}, accumulator, _defineProperty({}, actionNameToTypes(currentAction), function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var update = actionsCreators[currentAction].apply(actionsCreators, [state].concat(args));

        var nextState = _objectSpread({}, state, update);

        if (logger) {
          var params = "nothing";

          if (args) {
            if (args.length === 1) params = args[0];else if (args.length > 1) params = args;
          }

          console.log("---> ACTION: %c" + actionNameToTypes(currentAction), "color: #000000; ".concat(loggerStyle));
          console.log("  %cprev state ", "color: #708090; ".concat(loggerStyle), state);
          console.log("  %cparams     ", "color: #0000FF; ".concat(loggerStyle), params);
          console.log("  %cnext state ", "color: #008000; ".concat(loggerStyle), nextState);
        }

        state = nextState;
        provider.setState(nextState);
      }));
    }, {});

    var dispatch = function dispatch(actionType) {
      if (!actionType) {
        console.log("%cAction Type is required!", "color: #FFA500; ".concat(loggerStyle));
        return;
      }

      if (!actions[actionType]) {
        console.warn("%cAction with type ".concat(actionType, " is not defined"), "color: #FFA500; ".concat(loggerStyle));
        return;
      }

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      actions[actionType].apply(actions, args);
    };

    var Provider = createProvider(setProvider, context.Provider, initialState);
    var connect = createConnect(context.Consumer);
    return {
      Provider: Provider,
      connect: connect,
      dispatch: dispatch
    };
  });

  return index;

})));
