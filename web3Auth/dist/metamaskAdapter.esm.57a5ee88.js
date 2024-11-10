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
})({"node_modules/@metamask/detect-provider/dist/index.js":[function(require,module,exports) {
"use strict";

/**
 * Returns a Promise that resolves to the value of window.ethereum if it is
 * set within the given timeout, or null.
 * The Promise will not reject, but an error will be thrown if invalid options
 * are provided.
 *
 * @param options - Options bag.
 * @param options.mustBeMetaMask - Whether to only look for MetaMask providers.
 * Default: false
 * @param options.silent - Whether to silence console errors. Does not affect
 * thrown errors. Default: false
 * @param options.timeout - Milliseconds to wait for 'ethereum#initialized' to
 * be dispatched. Default: 3000
 * @returns A Promise that resolves with the Provider if it is detected within
 * given timeout, otherwise null.
 */
function detectEthereumProvider() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref$mustBeMetaMask = _ref.mustBeMetaMask,
    mustBeMetaMask = _ref$mustBeMetaMask === void 0 ? false : _ref$mustBeMetaMask,
    _ref$silent = _ref.silent,
    silent = _ref$silent === void 0 ? false : _ref$silent,
    _ref$timeout = _ref.timeout,
    timeout = _ref$timeout === void 0 ? 3000 : _ref$timeout;
  _validateInputs();
  var handled = false;
  return new Promise(function (resolve) {
    if (window.ethereum) {
      handleEthereum();
    } else {
      window.addEventListener('ethereum#initialized', handleEthereum, {
        once: true
      });
      setTimeout(function () {
        handleEthereum();
      }, timeout);
    }
    function handleEthereum() {
      if (handled) {
        return;
      }
      handled = true;
      window.removeEventListener('ethereum#initialized', handleEthereum);
      var _window = window,
        ethereum = _window.ethereum;
      if (ethereum && (!mustBeMetaMask || ethereum.isMetaMask)) {
        resolve(ethereum);
      } else {
        var message = mustBeMetaMask && ethereum ? 'Non-MetaMask window.ethereum detected.' : 'Unable to detect window.ethereum.';
        !silent && console.error('@metamask/detect-provider:', message);
        resolve(null);
      }
    }
  });
  function _validateInputs() {
    if (typeof mustBeMetaMask !== 'boolean') {
      throw new Error("@metamask/detect-provider: Expected option 'mustBeMetaMask' to be a boolean.");
    }
    if (typeof silent !== 'boolean') {
      throw new Error("@metamask/detect-provider: Expected option 'silent' to be a boolean.");
    }
    if (typeof timeout !== 'number') {
      throw new Error("@metamask/detect-provider: Expected option 'timeout' to be a number.");
    }
  }
}
module.exports = detectEthereumProvider;
},{}],"node_modules/@web3auth/metamask-adapter/dist/metamaskAdapter.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetamaskAdapter = void 0;
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
var _detectProvider = _interopRequireDefault(require("@metamask/detect-provider"));
var _base = require("@web3auth/base");
var _baseEvmAdapter = require("@web3auth/base-evm-adapter");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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
var MetamaskAdapter = exports.MetamaskAdapter = /*#__PURE__*/function (_BaseEvmAdapter) {
  (0, _inherits2.default)(MetamaskAdapter, _BaseEvmAdapter);
  var _super = _createSuper(MetamaskAdapter);
  function MetamaskAdapter(adapterOptions) {
    var _this;
    (0, _classCallCheck2.default)(this, MetamaskAdapter);
    _this = _super.call(this, adapterOptions);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "adapterNamespace", _base.ADAPTER_NAMESPACES.EIP155);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "currentChainNamespace", _base.CHAIN_NAMESPACES.EIP155);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "type", _base.ADAPTER_CATEGORY.EXTERNAL);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "name", _base.WALLET_ADAPTERS.METAMASK);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "status", _base.ADAPTER_STATUS.NOT_READY);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "rehydrated", false);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "metamaskProvider", null);
    _this.chainConfig = (adapterOptions === null || adapterOptions === void 0 ? void 0 : adapterOptions.chainConfig) || null;
    _this.sessionTime = (adapterOptions === null || adapterOptions === void 0 ? void 0 : adapterOptions.sessionTime) || 86400;
    return _this;
  }
  (0, _createClass2.default)(MetamaskAdapter, [{
    key: "provider",
    get: function get() {
      if (this.status === _base.ADAPTER_STATUS.CONNECTED && this.metamaskProvider) {
        return this.metamaskProvider;
      }
      return null;
    },
    set: function set(_) {
      throw new Error("Not implemented");
    }
  }, {
    key: "init",
    value: function () {
      var _init = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee(options) {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                (0, _get2.default)((0, _getPrototypeOf2.default)(MetamaskAdapter.prototype), "checkInitializationRequirements", this).call(this);
                _context.next = 3;
                return (0, _detectProvider.default)({
                  mustBeMetaMask: true
                });
              case 3:
                this.metamaskProvider = _context.sent;
                if (this.metamaskProvider) {
                  _context.next = 6;
                  break;
                }
                throw _base.WalletInitializationError.notInstalled("Metamask extension is not installed");
              case 6:
                this.status = _base.ADAPTER_STATUS.READY;
                this.emit(_base.ADAPTER_EVENTS.READY, _base.WALLET_ADAPTERS.METAMASK);
                _context.prev = 8;
                _base.log.debug("initializing metamask adapter");
                if (!options.autoConnect) {
                  _context.next = 14;
                  break;
                }
                this.rehydrated = true;
                _context.next = 14;
                return this.connect();
              case 14:
                _context.next = 19;
                break;
              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](8);
                this.emit(_base.ADAPTER_EVENTS.ERRORED, _context.t0);
              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[8, 16]]);
      }));
      function init(_x) {
        return _init.apply(this, arguments);
      }
      return init;
    }()
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
    key: "connect",
    value: function () {
      var _connect = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var _this2 = this;
        var chainId;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                (0, _get2.default)((0, _getPrototypeOf2.default)(MetamaskAdapter.prototype), "checkConnectionRequirements", this).call(this); // set default to mainnet

                if (!this.chainConfig) this.chainConfig = (0, _base.getChainConfig)(_base.CHAIN_NAMESPACES.EIP155, 1);
                this.status = _base.ADAPTER_STATUS.CONNECTING;
                this.emit(_base.ADAPTER_EVENTS.CONNECTING, {
                  adapter: _base.WALLET_ADAPTERS.METAMASK
                });
                if (this.metamaskProvider) {
                  _context2.next = 6;
                  break;
                }
                throw _base.WalletLoginError.notConnectedError("Not able to connect with metamask");
              case 6:
                _context2.prev = 6;
                _context2.next = 9;
                return this.metamaskProvider.request({
                  method: "eth_requestAccounts"
                });
              case 9:
                chainId = this.metamaskProvider.chainId;
                if (!(chainId !== this.chainConfig.chainId)) {
                  _context2.next = 13;
                  break;
                }
                _context2.next = 13;
                return this.switchChain(this.chainConfig);
              case 13:
                this.status = _base.ADAPTER_STATUS.CONNECTED;
                if (this.provider) {
                  _context2.next = 16;
                  break;
                }
                throw _base.WalletLoginError.notConnectedError("Failed to connect with provider");
              case 16:
                this.provider.once("disconnect", function () {
                  // ready to be connected again
                  _this2.disconnect();
                });
                this.emit(_base.ADAPTER_EVENTS.CONNECTED, {
                  adapter: _base.WALLET_ADAPTERS.METAMASK,
                  reconnected: this.rehydrated
                });
                return _context2.abrupt("return", this.provider);
              case 21:
                _context2.prev = 21;
                _context2.t0 = _context2["catch"](6);
                // ready again to be connected
                this.status = _base.ADAPTER_STATUS.READY;
                this.rehydrated = false;
                this.emit(_base.ADAPTER_EVENTS.ERRORED, _context2.t0);
                throw _base.WalletLoginError.connectionError("Failed to login with metamask wallet");
              case 27:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[6, 21]]);
      }));
      function connect() {
        return _connect.apply(this, arguments);
      }
      return connect;
    }()
  }, {
    key: "disconnect",
    value: function () {
      var _disconnect = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var _this$provider;
        var options,
          _args3 = arguments;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                options = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {
                  cleanup: false
                };
                _context3.next = 3;
                return (0, _get2.default)((0, _getPrototypeOf2.default)(MetamaskAdapter.prototype), "disconnect", this).call(this);
              case 3:
                (_this$provider = this.provider) === null || _this$provider === void 0 ? void 0 : _this$provider.removeAllListeners();
                if (options.cleanup) {
                  this.status = _base.ADAPTER_STATUS.NOT_READY;
                  this.metamaskProvider = null;
                } else {
                  // ready to be connected again
                  this.status = _base.ADAPTER_STATUS.READY;
                }
                this.rehydrated = false;
                this.emit(_base.ADAPTER_EVENTS.DISCONNECTED);
              case 7:
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
    key: "getUserInfo",
    value: function () {
      var _getUserInfo = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4() {
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
                return _context4.abrupt("return", {});
              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function getUserInfo() {
        return _getUserInfo.apply(this, arguments);
      }
      return getUserInfo;
    }()
  }, {
    key: "switchChain",
    value: function () {
      var _switchChain = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee5(chainConfig) {
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (this.metamaskProvider) {
                  _context5.next = 2;
                  break;
                }
                throw _base.WalletLoginError.notConnectedError("Not connected with wallet");
              case 2:
                _context5.prev = 2;
                _context5.next = 5;
                return this.metamaskProvider.request({
                  method: "wallet_switchEthereumChain",
                  params: [{
                    chainId: chainConfig.chainId
                  }]
                });
              case 5:
                _context5.next = 15;
                break;
              case 7:
                _context5.prev = 7;
                _context5.t0 = _context5["catch"](2);
                if (!(_context5.t0.code === 4902)) {
                  _context5.next = 14;
                  break;
                }
                _context5.next = 12;
                return this.metamaskProvider.request({
                  method: "wallet_addEthereumChain",
                  params: [{
                    chainId: chainConfig.chainId,
                    chainName: chainConfig.displayName,
                    rpcUrls: [chainConfig.rpcTarget]
                  }]
                });
              case 12:
                _context5.next = 15;
                break;
              case 14:
                throw _context5.t0;
              case 15:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[2, 7]]);
      }));
      function switchChain(_x2) {
        return _switchChain.apply(this, arguments);
      }
      return switchChain;
    }()
  }]);
  return MetamaskAdapter;
}(_baseEvmAdapter.BaseEvmAdapter);
},{"@babel/runtime/helpers/asyncToGenerator":"node_modules/@babel/runtime/helpers/asyncToGenerator.js","@babel/runtime/helpers/classCallCheck":"node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"node_modules/@babel/runtime/helpers/createClass.js","@babel/runtime/helpers/assertThisInitialized":"node_modules/@babel/runtime/helpers/assertThisInitialized.js","@babel/runtime/helpers/get":"node_modules/@babel/runtime/helpers/get.js","@babel/runtime/helpers/inherits":"node_modules/@babel/runtime/helpers/inherits.js","@babel/runtime/helpers/possibleConstructorReturn":"node_modules/@babel/runtime/helpers/possibleConstructorReturn.js","@babel/runtime/helpers/getPrototypeOf":"node_modules/@babel/runtime/helpers/getPrototypeOf.js","@babel/runtime/helpers/defineProperty":"node_modules/@babel/runtime/helpers/defineProperty.js","@babel/runtime/regenerator":"node_modules/@babel/runtime/regenerator/index.js","@metamask/detect-provider":"node_modules/@metamask/detect-provider/dist/index.js","@web3auth/base":"node_modules/@web3auth/base/dist/base.esm.js","@web3auth/base-evm-adapter":"node_modules/@web3auth/base-evm-adapter/dist/baseEvmAdapter.esm.js"}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
//# sourceMappingURL=/metamaskAdapter.esm.57a5ee88.js.map