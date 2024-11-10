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
})({"node_modules/@web3auth/phantom-adapter/dist/phantomAdapter.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomAdapter = void 0;
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
var _base = require("@web3auth/base");
var _baseSolanaAdapter = require("@web3auth/base-solana-adapter");
var _solanaProvider = require("@web3auth/solana-provider");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function poll(callback, interval, count) {
  return new Promise(function (resolve, reject) {
    if (count > 0) {
      setTimeout(/*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
        var done;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return callback();
              case 2:
                done = _context.sent;
                if (done) resolve(done);
                if (!done) poll(callback, interval, count - 1).then(function (res) {
                  resolve(res);
                  return res;
                }).catch(function (err) {
                  return reject(err);
                });
              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })), interval);
    } else {
      resolve(false);
    }
  });
}
var detectProvider = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2() {
    var _window$solana;
    var options,
      isPhantomAvailable,
      isAvailable,
      _args2 = arguments;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            options = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {
              interval: 1000,
              count: 3
            };
            isPhantomAvailable = typeof window !== "undefined" && !!((_window$solana = window.solana) !== null && _window$solana !== void 0 && _window$solana.isPhantom);
            if (!isPhantomAvailable) {
              _context2.next = 4;
              break;
            }
            return _context2.abrupt("return", window.solana);
          case 4:
            _context2.next = 6;
            return poll(function () {
              var _window$solana2;
              return (_window$solana2 = window.solana) === null || _window$solana2 === void 0 ? void 0 : _window$solana2.isPhantom;
            }, options.interval, options.count);
          case 6:
            isAvailable = _context2.sent;
            if (!isAvailable) {
              _context2.next = 9;
              break;
            }
            return _context2.abrupt("return", window.solana);
          case 9:
            return _context2.abrupt("return", null);
          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function detectProvider() {
    return _ref2.apply(this, arguments);
  };
}();
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
var PhantomAdapter = exports.PhantomAdapter = /*#__PURE__*/function (_BaseSolanaAdapter) {
  (0, _inherits2.default)(PhantomAdapter, _BaseSolanaAdapter);
  var _super = _createSuper(PhantomAdapter);
  function PhantomAdapter(options) {
    var _this;
    (0, _classCallCheck2.default)(this, PhantomAdapter);
    _this = _super.call(this, options);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "name", _base.WALLET_ADAPTERS.PHANTOM);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "adapterNamespace", _base.ADAPTER_NAMESPACES.SOLANA);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "currentChainNamespace", _base.CHAIN_NAMESPACES.SOLANA);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "type", _base.ADAPTER_CATEGORY.EXTERNAL);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "status", _base.ADAPTER_STATUS.NOT_READY);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "_wallet", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "phantomProvider", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "rehydrated", false);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "_onDisconnect", function () {
      if (_this._wallet) {
        _this._wallet.off("disconnect", _this._onDisconnect);
        _this.rehydrated = false; // ready to be connected again only if it was previously connected and not cleaned up

        _this.status = _this.status === _base.ADAPTER_STATUS.CONNECTED ? _base.ADAPTER_STATUS.READY : _base.ADAPTER_STATUS.NOT_READY;
        _this.emit(_base.ADAPTER_EVENTS.DISCONNECTED);
      }
    });
    _this.chainConfig = (options === null || options === void 0 ? void 0 : options.chainConfig) || null;
    _this.sessionTime = (options === null || options === void 0 ? void 0 : options.sessionTime) || 86400;
    return _this;
  }
  (0, _createClass2.default)(PhantomAdapter, [{
    key: "isWalletConnected",
    get: function get() {
      var _this$_wallet;
      return !!((_this$_wallet = this._wallet) !== null && _this$_wallet !== void 0 && _this$_wallet.isConnected && this.status === _base.ADAPTER_STATUS.CONNECTED);
    }
  }, {
    key: "provider",
    get: function get() {
      var _this$phantomProvider;
      return ((_this$phantomProvider = this.phantomProvider) === null || _this$phantomProvider === void 0 ? void 0 : _this$phantomProvider.provider) || null;
    },
    set: function set(_) {
      throw new Error("Not implemented");
    }
  }, {
    key: "setAdapterSettings",
    value: function setAdapterSettings(options) {
      if (this.status === _base.ADAPTER_STATUS.READY) return;
      if (options !== null && options !== void 0 && options.sessionTime) {
        this.sessionTime = options.sessionTime;
      }
      if (options !== null && options !== void 0 && options.clientId) {
        this.clientId = options.clientId;
      }
    }
  }, {
    key: "init",
    value: function () {
      var _init = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee(options) {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                (0, _get2.default)((0, _getPrototypeOf2.default)(PhantomAdapter.prototype), "checkInitializationRequirements", this).call(this); // set chainConfig for mainnet by default if not set

                if (!this.chainConfig) {
                  this.chainConfig = (0, _base.getChainConfig)(_base.CHAIN_NAMESPACES.SOLANA, "0x1");
                }
                _context.next = 4;
                return detectProvider({
                  interval: 500,
                  count: 3
                });
              case 4:
                this._wallet = _context.sent;
                if (this._wallet) {
                  _context.next = 7;
                  break;
                }
                throw _base.WalletInitializationError.notInstalled();
              case 7:
                this.phantomProvider = new _solanaProvider.PhantomInjectedProvider({
                  config: {
                    chainConfig: this.chainConfig
                  }
                });
                this.status = _base.ADAPTER_STATUS.READY;
                this.emit(_base.ADAPTER_EVENTS.READY, _base.WALLET_ADAPTERS.PHANTOM);
                _context.prev = 10;
                _base.log.debug("initializing phantom adapter");
                if (!options.autoConnect) {
                  _context.next = 16;
                  break;
                }
                this.rehydrated = true;
                _context.next = 16;
                return this.connect();
              case 16:
                _context.next = 22;
                break;
              case 18:
                _context.prev = 18;
                _context.t0 = _context["catch"](10);
                _base.log.error("Failed to connect with cached phantom provider", _context.t0);
                this.emit("ERRORED", _context.t0);
              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[10, 18]]);
      }));
      function init(_x) {
        return _init.apply(this, arguments);
      }
      return init;
    }()
  }, {
    key: "connect",
    value: function () {
      var _connect = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var _this2 = this;
        var handleDisconnect;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                (0, _get2.default)((0, _getPrototypeOf2.default)(PhantomAdapter.prototype), "checkConnectionRequirements", this).call(this);
                this.status = _base.ADAPTER_STATUS.CONNECTING;
                this.emit(_base.ADAPTER_EVENTS.CONNECTING, {
                  adapter: _base.WALLET_ADAPTERS.PHANTOM
                });
                if (this._wallet) {
                  _context3.next = 6;
                  break;
                }
                throw _base.WalletInitializationError.notInstalled();
              case 6:
                if (this._wallet.isConnected) {
                  _context3.next = 23;
                  break;
                }
                handleDisconnect = this._wallet._handleDisconnect;
                _context3.prev = 8;
                _context3.next = 11;
                return new Promise(function (resolve, reject) {
                  var connect = /*#__PURE__*/function () {
                    var _ref = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2() {
                      return _regenerator.default.wrap(function _callee2$(_context2) {
                        while (1) {
                          switch (_context2.prev = _context2.next) {
                            case 0:
                              _context2.next = 2;
                              return _this2.connectWithProvider(_this2._wallet);
                            case 2:
                              resolve(_this2.provider);
                            case 3:
                            case "end":
                              return _context2.stop();
                          }
                        }
                      }, _callee2);
                    }));
                    return function connect() {
                      return _ref.apply(this, arguments);
                    };
                  }();
                  if (!_this2._wallet) return reject(_base.WalletInitializationError.notInstalled());
                  _this2._wallet.once("connect", connect); // Raise an issue on phantom that if window is closed, disconnect event is not fired

                  _this2._wallet._handleDisconnect = function () {
                    reject(_base.WalletInitializationError.windowClosed());
                    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                      args[_key] = arguments[_key];
                    }
                    return handleDisconnect.apply(_this2._wallet, args);
                  };
                  _this2._wallet.connect().catch(function (reason) {
                    reject(reason);
                  });
                });
              case 11:
                _context3.next = 18;
                break;
              case 13:
                _context3.prev = 13;
                _context3.t0 = _context3["catch"](8);
                if (!(_context3.t0 instanceof _base.Web3AuthError)) {
                  _context3.next = 17;
                  break;
                }
                throw _context3.t0;
              case 17:
                throw _base.WalletLoginError.connectionError(_context3.t0 === null || _context3.t0 === void 0 ? void 0 : _context3.t0.message);
              case 18:
                _context3.prev = 18;
                this._wallet._handleDisconnect = handleDisconnect;
                return _context3.finish(18);
              case 21:
                _context3.next = 25;
                break;
              case 23:
                _context3.next = 25;
                return this.connectWithProvider(this._wallet);
              case 25:
                if (this._wallet.publicKey) {
                  _context3.next = 27;
                  break;
                }
                throw _base.WalletLoginError.connectionError();
              case 27:
                this._wallet.on("disconnect", this._onDisconnect);
                return _context3.abrupt("return", this.provider);
              case 31:
                _context3.prev = 31;
                _context3.t1 = _context3["catch"](0);
                // ready again to be connected
                this.status = _base.ADAPTER_STATUS.READY;
                this.rehydrated = false;
                this.emit(_base.ADAPTER_EVENTS.ERRORED, _context3.t1);
                throw _context3.t1;
              case 37:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 31], [8, 13, 18, 21]]);
      }));
      function connect() {
        return _connect.apply(this, arguments);
      }
      return connect;
    }()
  }, {
    key: "disconnect",
    value: function () {
      var _disconnect = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var options,
          _this$_wallet2,
          _args4 = arguments;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                options = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {
                  cleanup: false
                };
                _context4.next = 3;
                return (0, _get2.default)((0, _getPrototypeOf2.default)(PhantomAdapter.prototype), "disconnect", this).call(this);
              case 3:
                _context4.prev = 3;
                _context4.next = 6;
                return (_this$_wallet2 = this._wallet) === null || _this$_wallet2 === void 0 ? void 0 : _this$_wallet2.disconnect();
              case 6:
                if (options.cleanup) {
                  this.status = _base.ADAPTER_STATUS.NOT_READY;
                  this.phantomProvider = null;
                  this._wallet = null;
                }
                this.emit(_base.ADAPTER_EVENTS.DISCONNECTED);
                _context4.next = 13;
                break;
              case 10:
                _context4.prev = 10;
                _context4.t0 = _context4["catch"](3);
                this.emit(_base.ADAPTER_EVENTS.ERRORED, _base.WalletLoginError.disconnectionError(_context4.t0 === null || _context4.t0 === void 0 ? void 0 : _context4.t0.message));
              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[3, 10]]);
      }));
      function disconnect() {
        return _disconnect.apply(this, arguments);
      }
      return disconnect;
    }()
  }, {
    key: "getUserInfo",
    value: function () {
      var _getUserInfo = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee5() {
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (this.isWalletConnected) {
                  _context5.next = 2;
                  break;
                }
                throw _base.WalletLoginError.notConnectedError("Not connected with wallet, Please login/connect first");
              case 2:
                return _context5.abrupt("return", {});
              case 3:
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
    }()
  }, {
    key: "connectWithProvider",
    value: function () {
      var _connectWithProvider = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee6(injectedProvider) {
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (this.phantomProvider) {
                  _context6.next = 2;
                  break;
                }
                throw _base.WalletLoginError.connectionError("No phantom provider");
              case 2:
                _context6.next = 4;
                return this.phantomProvider.setupProvider(injectedProvider);
              case 4:
                this.status = _base.ADAPTER_STATUS.CONNECTED;
                this.emit(_base.ADAPTER_EVENTS.CONNECTED, {
                  adapter: _base.WALLET_ADAPTERS.PHANTOM,
                  reconnected: this.rehydrated
                });
                return _context6.abrupt("return", this.provider);
              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function connectWithProvider(_x2) {
        return _connectWithProvider.apply(this, arguments);
      }
      return connectWithProvider;
    }()
  }]);
  return PhantomAdapter;
}(_baseSolanaAdapter.BaseSolanaAdapter);
},{"@babel/runtime/helpers/asyncToGenerator":"node_modules/@babel/runtime/helpers/asyncToGenerator.js","@babel/runtime/helpers/classCallCheck":"node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"node_modules/@babel/runtime/helpers/createClass.js","@babel/runtime/helpers/assertThisInitialized":"node_modules/@babel/runtime/helpers/assertThisInitialized.js","@babel/runtime/helpers/get":"node_modules/@babel/runtime/helpers/get.js","@babel/runtime/helpers/inherits":"node_modules/@babel/runtime/helpers/inherits.js","@babel/runtime/helpers/possibleConstructorReturn":"node_modules/@babel/runtime/helpers/possibleConstructorReturn.js","@babel/runtime/helpers/getPrototypeOf":"node_modules/@babel/runtime/helpers/getPrototypeOf.js","@babel/runtime/helpers/defineProperty":"node_modules/@babel/runtime/helpers/defineProperty.js","@babel/runtime/regenerator":"node_modules/@babel/runtime/regenerator/index.js","@web3auth/base":"node_modules/@web3auth/base/dist/base.esm.js","@web3auth/base-solana-adapter":"node_modules/@web3auth/base-solana-adapter/dist/baseSolanaAdapter.esm.js","@web3auth/solana-provider":"node_modules/@web3auth/solana-provider/dist/solanaProvider.esm.js"}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
},{}]},{},["../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js"], null)
//# sourceMappingURL=/phantomAdapter.esm.3e16abad.js.map