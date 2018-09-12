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
        _inherits(StoreProvider, _React$PureComponent);

        function StoreProvider(props) {
          var _this;

          _classCallCheck(this, StoreProvider);

          _this = _possibleConstructorReturn(this, _getPrototypeOf(StoreProvider).call(this, props));
          _this.state = initialState;
          setProvider(_assertThisInitialized(_assertThisInitialized(_this)));
          return _this;
        }

        _createClass(StoreProvider, [{
          key: "render",
          value: function render() {
            return React.createElement(Provider, {
              value: this.state
            }, this.props.children);
          }
        }]);

        return StoreProvider;
      }(React.PureComponent)
    );
  };

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

  var index = (function () {
    var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var actionsCreators = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var context = React.createContext();
    var provider = null;
    var state = initialState;

    var setProvider = function setProvider(self) {
      return provider = self;
    };

    var actions = Object.keys(actionsCreators).reduce(function (accumulator, currentAction) {
      return _objectSpread({}, accumulator, _defineProperty({}, currentAction, function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var changes = actionsCreators[currentAction].apply(actionsCreators, [state].concat(args));
        state = _objectSpread({}, state, changes);
        provider.setState(state);
      }));
    }, {});
    var Provider = createProvider(setProvider, context.Provider, initialState);
    var connect = createConnect(context.Consumer);
    return {
      Provider: Provider,
      connect: connect,
      actions: actions
    };
  });

  return index;

})));
