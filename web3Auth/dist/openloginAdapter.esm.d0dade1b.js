// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/@web3auth/openlogin-adapter/dist/openloginAdapter.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOpenloginDefaultOptions = exports.OpenloginAdapter = void 0;
var _openlogin = _interopRequireWildcard(require("@toruslabs/openlogin"));
var _base = require("@web3auth/base");
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _baseProvider = require("@web3auth/base-provider");
var _lodash = _interopRequireDefault(require("lodash.merge"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var getOpenloginDefaultOptions = exports.getOpenloginDefaultOptions = function getOpenloginDefaultOptions(chainNamespace, chainId) {
  return {
    adapterSettings: {
      network: _openlogin.OPENLOGIN_NETWORK.MAINNET,
      clientId: "",
      uxMode: _openlogin.UX_MODE.POPUP
    },
    chainConfig: chainNamespace ? (0, _base.getChainConfig)(chainNamespace, chainId) : null,
    loginSettings: {}
  };
};
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      (0, _defineProperty2.default)(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = (0, _getPrototypeOf2.default)(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = (0, _getPrototypeOf2.default)(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return (0, _possibleConstructorReturn2.default)(this, result);
  };
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
var OpenloginAdapter = exports.OpenloginAdapter = /*#__PURE__*/function (_BaseAdapter) {
  (0, _inherits2.default)(OpenloginAdapter, _BaseAdapter);
  var _super = _createSuper(OpenloginAdapter);
  function OpenloginAdapter(params) {
    var _params$chainConfig, _params$chainConfig2, _params$adapterSettin, _params$chainConfig3;
    var _this;
    (0, _classCallCheck2.default)(this, OpenloginAdapter);
    _this = _super.call(this);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "name", _base.WALLET_ADAPTERS.OPENLOGIN);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "adapterNamespace", _base.ADAPTER_NAMESPACES.MULTICHAIN);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "type", _base.ADAPTER_CATEGORY.IN_APP);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "openloginInstance", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "clientId", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "status", _base.ADAPTER_STATUS.NOT_READY);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "currentChainNamespace", _base.CHAIN_NAMESPACES.EIP155);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "openloginOptions", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "loginSettings", {});
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "privKeyProvider", null);
    _base.log.debug("const openlogin adapter", params);
    var defaultOptions = getOpenloginDefaultOptions((_params$chainConfig = params.chainConfig) === null || _params$chainConfig === void 0 ? void 0 : _params$chainConfig.chainNamespace, (_params$chainConfig2 = params.chainConfig) === null || _params$chainConfig2 === void 0 ? void 0 : _params$chainConfig2.chainId);
    _this.openloginOptions = _objectSpread(_objectSpread({
      clientId: "",
      network: _openlogin.OPENLOGIN_NETWORK.MAINNET
    }, defaultOptions.adapterSettings), params.adapterSettings || {});
    _this.clientId = (_params$adapterSettin = params.adapterSettings) === null || _params$adapterSettin === void 0 ? void 0 : _params$adapterSettin.clientId;
    _this.loginSettings = _objectSpread(_objectSpread({}, defaultOptions.loginSettings), params.loginSettings);
    _this.sessionTime = _this.loginSettings.sessionTime || 86400; // if no chainNamespace is passed then chain config should be set before calling init

    if ((_params$chainConfig3 = params.chainConfig) !== null && _params$chainConfig3 !== void 0 && _params$chainConfig3.chainNamespace) {
      var _params$chainConfig4;
      _this.currentChainNamespace = (_params$chainConfig4 = params.chainConfig) === null || _params$chainConfig4 === void 0 ? void 0 : _params$chainConfig4.chainNamespace;
      var defaultChainIdConfig = defaultOptions.chainConfig ? defaultOptions.chainConfig : {};
      _this.chainConfig = _objectSpread(_objectSpread({}, defaultChainIdConfig), params === null || params === void 0 ? void 0 : params.chainConfig);
      _base.log.debug("const openlogin chainConfig", _this.chainConfig);
      if (!_this.chainConfig.rpcTarget && params.chainConfig.chainNamespace !== _base.CHAIN_NAMESPACES.OTHER) {
        throw _base.WalletInitializationError.invalidParams("rpcTarget is required in chainConfig");
      }
    }
    return _this;
  }
  (0, _createClass2.default)(OpenloginAdapter, [{
    key: "chainConfigProxy",
    get: function get() {
      return this.chainConfig ? _objectSpread({}, this.chainConfig) : null;
    }
  }, {
    key: "provider",
    get: function get() {
      var _this$privKeyProvider;
      return ((_this$privKeyProvider = this.privKeyProvider) === null || _this$privKeyProvider === void 0 ? void 0 : _this$privKeyProvider.provider) || null;
    },
    set: function set(_) {
      throw new Error("Not implemented");
    }
  }, {
    key: "init",
    value: function () {
      var _init = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee(options) {
        var _this$openloginOption;
        var isRedirectResult, redirectResult;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                (0, _get2.default)((0, _getPrototypeOf2.default)(OpenloginAdapter.prototype), "checkInitializationRequirements", this).call(this);
                if ((_this$openloginOption = this.openloginOptions) !== null && _this$openloginOption !== void 0 && _this$openloginOption.clientId) {
                  _context.next = 3;
                  break;
                }
                throw _base.WalletInitializationError.invalidParams("clientId is required before openlogin's initialization");
              case 3:
                if (this.chainConfig) {
                  _context.next = 5;
                  break;
                }
                throw _base.WalletInitializationError.invalidParams("chainConfig is required before initialization");
              case 5:
                isRedirectResult = false;
                if (this.openloginOptions.uxMode === _openlogin.UX_MODE.REDIRECT) {
                  redirectResult = (0, _openlogin.getHashQueryParams)();
                  if (Object.keys(redirectResult).length > 0 && redirectResult._pid) {
                    isRedirectResult = true;
                  }
                }
                this.openloginOptions = _objectSpread(_objectSpread({}, this.openloginOptions), {}, {
                  replaceUrlOnRedirect: isRedirectResult
                });
                this.openloginInstance = new _openlogin.default(this.openloginOptions);
                _base.log.debug("initializing openlogin adapter init");
                _context.next = 12;
                return this.openloginInstance.init();
              case 12:
                this.status = _base.ADAPTER_STATUS.READY;
                this.emit(_base.ADAPTER_EVENTS.READY, _base.WALLET_ADAPTERS.OPENLOGIN);
                _context.prev = 14;
                _base.log.debug("initializing openlogin adapter"); // connect only if it is redirect result or if connect (adapter is cached/already connected in same session) is true

                if (!(this.openloginInstance.privKey && (options.autoConnect || isRedirectResult))) {
                  _context.next = 19;
                  break;
                }
                _context.next = 19;
                return this.connect();
              case 19:
                _context.next = 25;
                break;
              case 21:
                _context.prev = 21;
                _context.t0 = _context["catch"](14);
                _base.log.error("Failed to connect with cached openlogin provider", _context.t0);
                this.emit("ERRORED", _context.t0);
              case 25:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[14, 21]]);
      }));
      function init(_x) {
        return _init.apply(this, arguments);
      }
      return init;
    }()
  }, {
    key: "connect",
    value: function () {
      var _connect = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2(params) {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                (0, _get2.default)((0, _getPrototypeOf2.default)(OpenloginAdapter.prototype), "checkConnectionRequirements", this).call(this);
                this.status = _base.ADAPTER_STATUS.CONNECTING;
                this.emit(_base.ADAPTER_EVENTS.CONNECTING, _objectSpread(_objectSpread({}, params), {}, {
                  adapter: _base.WALLET_ADAPTERS.OPENLOGIN
                }));
                _context2.prev = 3;
                _context2.next = 6;
                return this.connectWithProvider(params);
              case 6:
                return _context2.abrupt("return", this.provider);
              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](3);
                _base.log.error("Failed to connect with openlogin provider", _context2.t0); // ready again to be connected

                this.status = _base.ADAPTER_STATUS.READY;
                this.emit(_base.ADAPTER_EVENTS.ERRORED, _context2.t0);
                if (!(_context2.t0 !== null && _context2.t0 !== void 0 && _context2.t0.message.includes("user closed popup"))) {
                  _context2.next = 16;
                  break;
                }
                throw _base.WalletLoginError.popupClosed();
              case 16:
                throw _base.WalletLoginError.connectionError("Failed to login with openlogin");
              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[3, 9]]);
      }));
      function connect(_x2) {
        return _connect.apply(this, arguments);
      }
      return connect;
    }()
  }, {
    key: "disconnect",
    value: function () {
      var _disconnect = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var options,
          _args3 = arguments;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                options = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {
                  cleanup: false
                };
                if (!(this.status !== _base.ADAPTER_STATUS.CONNECTED)) {
                  _context3.next = 3;
                  break;
                }
                throw _base.WalletLoginError.notConnectedError("Not connected with wallet");
              case 3:
                if (this.openloginInstance) {
                  _context3.next = 5;
                  break;
                }
                throw _base.WalletInitializationError.notReady("openloginInstance is not ready");
              case 5:
                _context3.next = 7;
                return this.openloginInstance.logout();
              case 7:
                if (options.cleanup) {
                  this.status = _base.ADAPTER_STATUS.NOT_READY;
                  this.openloginInstance = null;
                  this.privKeyProvider = null;
                } else {
                  // ready to be connected again
                  this.status = _base.ADAPTER_STATUS.READY;
                }
                this.emit(_base.ADAPTER_EVENTS.DISCONNECTED);
              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function disconnect() {
        return _disconnect.apply(this, arguments);
      }
      return disconnect;
    }()
  }, {
    key: "authenticateUser",
    value: function () {
      var _authenticateUser = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var userInfo;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(this.status !== _base.ADAPTER_STATUS.CONNECTED)) {
                  _context4.next = 2;
                  break;
                }
                throw _base.WalletLoginError.notConnectedError("Not connected with wallet, Please login/connect first");
              case 2:
                _context4.next = 4;
                return this.getUserInfo();
              case 4:
                userInfo = _context4.sent;
                return _context4.abrupt("return", {
                  idToken: userInfo.idToken
                });
              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function authenticateUser() {
        return _authenticateUser.apply(this, arguments);
      }
      return authenticateUser;
    }()
  }, {
    key: "getUserInfo",
    value: function () {
      var _getUserInfo = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var userInfo;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(this.status !== _base.ADAPTER_STATUS.CONNECTED)) {
                  _context5.next = 2;
                  break;
                }
                throw _base.WalletLoginError.notConnectedError("Not connected with wallet");
              case 2:
                if (this.openloginInstance) {
                  _context5.next = 4;
                  break;
                }
                throw _base.WalletInitializationError.notReady("openloginInstance is not ready");
              case 4:
                _context5.next = 6;
                return this.openloginInstance.getUserInfo();
              case 6:
                userInfo = _context5.sent;
                return _context5.abrupt("return", userInfo);
              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function getUserInfo() {
        return _getUserInfo.apply(this, arguments);
      }
      return getUserInfo;
    }() // should be called only before initialization.
  }, {
    key: "setAdapterSettings",
    value: function setAdapterSettings(adapterSettings) {
      if (this.status === _base.ADAPTER_STATUS.READY) return;
      var defaultOptions = getOpenloginDefaultOptions();
      this.openloginOptions = _objectSpread(_objectSpread(_objectSpread({}, defaultOptions.adapterSettings), this.openloginOptions || {}), adapterSettings);
      if (adapterSettings.sessionTime) {
        this.loginSettings = _objectSpread(_objectSpread({}, this.loginSettings), {}, {
          sessionTime: adapterSettings.sessionTime
        });
      }
      if (adapterSettings.clientId) {
        this.clientId = adapterSettings.clientId;
      }
    } // should be called only before initialization.
  }, {
    key: "setChainConfig",
    value: function setChainConfig(customChainConfig) {
      (0, _get2.default)((0, _getPrototypeOf2.default)(OpenloginAdapter.prototype), "setChainConfig", this).call(this, customChainConfig);
      this.currentChainNamespace = customChainConfig.chainNamespace;
    }
  }, {
    key: "connectWithProvider",
    value: function () {
      var _connectWithProvider = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee6(params) {
        var _yield$import, SolanaPrivateKeyProvider, _yield$import2, EthereumPrivateKeyProvider, _params$extraLoginOpt, finalPrivKey, _yield$import3, getED25519Key;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (this.chainConfig) {
                  _context6.next = 2;
                  break;
                }
                throw _base.WalletInitializationError.invalidParams("chainConfig is required before initialization");
              case 2:
                if (this.openloginInstance) {
                  _context6.next = 4;
                  break;
                }
                throw _base.WalletInitializationError.notReady("openloginInstance is not ready");
              case 4:
                if (!(this.currentChainNamespace === _base.CHAIN_NAMESPACES.SOLANA)) {
                  _context6.next = 12;
                  break;
                }
                _context6.next = 7;
                return require("_bundle_loader")(require.resolve('@web3auth/solana-provider'));
              case 7:
                _yield$import = _context6.sent;
                SolanaPrivateKeyProvider = _yield$import.SolanaPrivateKeyProvider;
                this.privKeyProvider = new SolanaPrivateKeyProvider({
                  config: {
                    chainConfig: this.chainConfig
                  }
                });
                _context6.next = 25;
                break;
              case 12:
                if (!(this.currentChainNamespace === _base.CHAIN_NAMESPACES.EIP155)) {
                  _context6.next = 20;
                  break;
                }
                _context6.next = 15;
                return require("_bundle_loader")(require.resolve('@web3auth/ethereum-provider'));
              case 15:
                _yield$import2 = _context6.sent;
                EthereumPrivateKeyProvider = _yield$import2.EthereumPrivateKeyProvider;
                this.privKeyProvider = new EthereumPrivateKeyProvider({
                  config: {
                    chainConfig: this.chainConfig
                  }
                });
                _context6.next = 25;
                break;
              case 20:
                if (!(this.currentChainNamespace === _base.CHAIN_NAMESPACES.OTHER)) {
                  _context6.next = 24;
                  break;
                }
                this.privKeyProvider = new _baseProvider.CommonPrivateKeyProvider();
                _context6.next = 25;
                break;
              case 24:
                throw new Error("Invalid chainNamespace: ".concat(this.currentChainNamespace, " found while connecting to wallet"));
              case 25:
                if (!(!this.openloginInstance.privKey && params)) {
                  _context6.next = 29;
                  break;
                }
                if (!this.loginSettings.curve) {
                  this.loginSettings.curve = this.currentChainNamespace === _base.CHAIN_NAMESPACES.SOLANA ? _openlogin.SUPPORTED_KEY_CURVES.ED25519 : _openlogin.SUPPORTED_KEY_CURVES.SECP256K1;
                }
                _context6.next = 29;
                return this.openloginInstance.login((0, _lodash.default)(this.loginSettings, {
                  loginProvider: params.loginProvider
                }, {
                  extraLoginOptions: _objectSpread(_objectSpread({}, params.extraLoginOptions || {}), {}, {
                    login_hint: params.login_hint || ((_params$extraLoginOpt = params.extraLoginOptions) === null || _params$extraLoginOpt === void 0 ? void 0 : _params$extraLoginOpt.login_hint)
                  })
                }));
              case 29:
                finalPrivKey = this.openloginInstance.privKey;
                if (!finalPrivKey) {
                  _context6.next = 41;
                  break;
                }
                if (!(this.currentChainNamespace === _base.CHAIN_NAMESPACES.SOLANA)) {
                  _context6.next = 37;
                  break;
                }
                _context6.next = 34;
                return require("_bundle_loader")(require.resolve('@toruslabs/openlogin-ed25519'));
              case 34:
                _yield$import3 = _context6.sent;
                getED25519Key = _yield$import3.getED25519Key;
                finalPrivKey = getED25519Key(finalPrivKey).sk.toString("hex");
              case 37:
                _context6.next = 39;
                return this.privKeyProvider.setupProvider(finalPrivKey);
              case 39:
                this.status = _base.ADAPTER_STATUS.CONNECTED;
                this.emit(_base.ADAPTER_EVENTS.CONNECTED, {
                  adapter: _base.WALLET_ADAPTERS.OPENLOGIN,
                  reconnected: !params
                });
              case 41:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function connectWithProvider(_x3) {
        return _connectWithProvider.apply(this, arguments);
      }
      return connectWithProvider;
    }()
  }]);
  return OpenloginAdapter;
}(_base.BaseAdapter);
},{"@toruslabs/openlogin":"node_modules/@toruslabs/openlogin/dist/openlogin.esm.js","@web3auth/base":"node_modules/@web3auth/base/dist/base.esm.js","@babel/runtime/helpers/asyncToGenerator":"node_modules/@babel/runtime/helpers/asyncToGenerator.js","@babel/runtime/helpers/classCallCheck":"node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"node_modules/@babel/runtime/helpers/createClass.js","@babel/runtime/helpers/assertThisInitialized":"node_modules/@babel/runtime/helpers/assertThisInitialized.js","@babel/runtime/helpers/get":"node_modules/@babel/runtime/helpers/get.js","@babel/runtime/helpers/inherits":"node_modules/@babel/runtime/helpers/inherits.js","@babel/runtime/helpers/possibleConstructorReturn":"node_modules/@babel/runtime/helpers/possibleConstructorReturn.js","@babel/runtime/helpers/getPrototypeOf":"node_modules/@babel/runtime/helpers/getPrototypeOf.js","@babel/runtime/helpers/defineProperty":"node_modules/@babel/runtime/helpers/defineProperty.js","@babel/runtime/regenerator":"node_modules/@babel/runtime/regenerator/index.js","@web3auth/base-provider":"node_modules/@web3auth/base-provider/dist/baseProvider.esm.js","lodash.merge":"node_modules/lodash.merge/index.js","_bundle_loader":"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-loader.js","@web3auth/solana-provider":[["test_auth3.a086a51a.js","test_auth3.js"],"test_auth3.a086a51a.js.map","node_modules/@web3auth/solana-provider/dist/solanaProvider.esm.js"],"@web3auth/ethereum-provider":[["test_auth3.a086a51a.js","test_auth3.js"],"test_auth3.a086a51a.js.map","node_modules/@web3auth/ethereum-provider/dist/ethereumProvider.esm.js"],"@toruslabs/openlogin-ed25519":[["openloginEd25519.esm.6f79c0d7.js","node_modules/@toruslabs/openlogin-ed25519/dist/openloginEd25519.esm.js"],"openloginEd25519.esm.6f79c0d7.js.map","node_modules/@toruslabs/openlogin-ed25519/dist/openloginEd25519.esm.js"]}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61125" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }
  return bundleURL;
}
function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }
  return '/';
}
function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-loader.js":[function(require,module,exports) {
var getBundleURL = require('./bundle-url').getBundleURL;
function loadBundlesLazy(bundles) {
  if (!Array.isArray(bundles)) {
    bundles = [bundles];
  }
  var id = bundles[bundles.length - 1];
  try {
    return Promise.resolve(require(id));
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      return new LazyPromise(function (resolve, reject) {
        loadBundles(bundles.slice(0, -1)).then(function () {
          return require(id);
        }).then(resolve, reject);
      });
    }
    throw err;
  }
}
function loadBundles(bundles) {
  return Promise.all(bundles.map(loadBundle));
}
var bundleLoaders = {};
function registerBundleLoader(type, loader) {
  bundleLoaders[type] = loader;
}
module.exports = exports = loadBundlesLazy;
exports.load = loadBundles;
exports.register = registerBundleLoader;
var bundles = {};
function loadBundle(bundle) {
  var id;
  if (Array.isArray(bundle)) {
    id = bundle[1];
    bundle = bundle[0];
  }
  if (bundles[bundle]) {
    return bundles[bundle];
  }
  var type = (bundle.substring(bundle.lastIndexOf('.') + 1, bundle.length) || bundle).toLowerCase();
  var bundleLoader = bundleLoaders[type];
  if (bundleLoader) {
    return bundles[bundle] = bundleLoader(getBundleURL() + bundle).then(function (resolved) {
      if (resolved) {
        module.bundle.register(id, resolved);
      }
      return resolved;
    }).catch(function (e) {
      delete bundles[bundle];
      throw e;
    });
  }
}
function LazyPromise(executor) {
  this.executor = executor;
  this.promise = null;
}
LazyPromise.prototype.then = function (onSuccess, onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.then(onSuccess, onError);
};
LazyPromise.prototype.catch = function (onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.catch(onError);
};
},{"./bundle-url":"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/loaders/browser/js-loader.js":[function(require,module,exports) {
module.exports = function loadJSBundle(bundle) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.async = true;
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.src = bundle;
    script.onerror = function (e) {
      script.onerror = script.onload = null;
      reject(e);
    };
    script.onload = function () {
      script.onerror = script.onload = null;
      resolve();
    };
    document.getElementsByTagName('head')[0].appendChild(script);
  });
};
},{}],0:[function(require,module,exports) {
var b=require("../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-loader.js");b.register("js",require("../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/loaders/browser/js-loader.js"));b.load([]).then(function(){require("node_modules/@web3auth/openlogin-adapter/dist/openloginAdapter.esm.js");});
},{}]},{},["../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js",0], null)
//# sourceMappingURL=/openloginAdapter.esm.d0dade1b.js.map