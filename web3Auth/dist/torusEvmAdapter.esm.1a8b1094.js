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
})({"node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js":[function(require,module,exports) {
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (e.includes(n)) continue;
    t[n] = r[n];
  }
  return t;
}
module.exports = _objectWithoutPropertiesLoose, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],"node_modules/@babel/runtime/helpers/objectWithoutProperties.js":[function(require,module,exports) {
var objectWithoutPropertiesLoose = require("./objectWithoutPropertiesLoose.js");
function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var o,
    r,
    i = objectWithoutPropertiesLoose(e, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
module.exports = _objectWithoutProperties, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./objectWithoutPropertiesLoose.js":"node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js"}],"node_modules/@toruslabs/torus-embed/node_modules/@toruslabs/openlogin-utils/dist/openloginUtils.esm.js":[function(require,module,exports) {
var Buffer = require("buffer").Buffer;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.URLWithHashParams = void 0;
exports.base64toJSON = base64toJSON;
exports.base64url = void 0;
exports.jsonToBase64 = jsonToBase64;
exports.keccak = void 0;
exports.keccak256 = keccak256;
exports.randomId = void 0;
exports.safeatob = safeatob;
exports.safebtoa = safebtoa;
var _randombytes = _interopRequireDefault(require("randombytes"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _base64url = _interopRequireDefault(require("base64url"));
var _keccak = _interopRequireDefault(require("keccak"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const randomId = () => (0, _randombytes.default)(32).toString("hex");
exports.randomId = randomId;
class URLWithHashParams extends URL {
  constructor() {
    super(...arguments);
    (0, _defineProperty2.default)(this, "hashParams", new URLSearchParams());
  }
  toString() {
    this.hash = this.hashParams.toString();
    return super.toString.call(this);
  }
}
exports.URLWithHashParams = URLWithHashParams;
const base64url = exports.base64url = _base64url.default;
function safebtoa(str) {
  return base64url.encode(str);
}
function safeatob(str) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return base64url.decode(str);
}
const keccak = exports.keccak = _keccak.default;
function base64toJSON(b64str) {
  return JSON.parse(base64url.decode(b64str));
}
function jsonToBase64(json) {
  return base64url.encode(JSON.stringify(json));
}
function keccak256(str) {
  let input = str;
  if (typeof str === "string" && str.slice(0, 2) === "0x" && str.length === 66) {
    input = Buffer.from(str.slice(2), "hex");
  }
  const data = `0x${keccak("keccak256").update(input).digest("hex").padStart(64, "0")}`;
  return data;
}
},{"randombytes":"node_modules/randombytes/browser.js","@babel/runtime/helpers/defineProperty":"node_modules/@babel/runtime/helpers/defineProperty.js","base64url":"node_modules/base64url/index.js","keccak":"node_modules/keccak/js.js","buffer":"../../../../usr/local/lib/node_modules/parcel-bundler/node_modules/buffer/index.js"}],"node_modules/@toruslabs/torus-embed/node_modules/@toruslabs/openlogin-jrpc/dist/openloginJrpc.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Substream = exports.SerializableError = exports.SafeEventEmitter = exports.PostMessageStream = exports.ObjectMultiplex = exports.JRPCEngine = exports.IGNORE_SUBSTREAM = exports.BasePostMessageStream = void 0;
exports.createAsyncMiddleware = createAsyncMiddleware;
exports.createEngineStream = createEngineStream;
exports.createErrorMiddleware = createErrorMiddleware;
exports.createIdRemapMiddleware = createIdRemapMiddleware;
exports.createLoggerMiddleware = createLoggerMiddleware;
exports.createScaffoldMiddleware = createScaffoldMiddleware;
exports.createStreamMiddleware = createStreamMiddleware;
exports.getRpcPromiseCallback = void 0;
exports.mergeMiddleware = mergeMiddleware;
exports.setupMultiplex = setupMultiplex;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _readableStream = require("readable-stream");
var _openloginUtils = require("@toruslabs/openlogin-utils");
var _events = require("events");
var _fastSafeStringify = _interopRequireDefault(require("fast-safe-stringify"));
var _ethRpcErrors = require("eth-rpc-errors");
var _endOfStream = _interopRequireDefault(require("end-of-stream"));
var _once = _interopRequireDefault(require("once"));
var _pump = _interopRequireDefault(require("pump"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function noop() {
  return undefined;
}
const SYN = "SYN";
const ACK = "ACK";
const BRK = "BRK";
class BasePostMessageStream extends _readableStream.Duplex {
  constructor(_ref) {
    let {
      name,
      target,
      targetWindow = window,
      targetOrigin = "*"
    } = _ref;
    super({
      objectMode: true
    });
    (0, _defineProperty2.default)(this, "_init", void 0);
    (0, _defineProperty2.default)(this, "_haveSyn", void 0);
    (0, _defineProperty2.default)(this, "_name", void 0);
    (0, _defineProperty2.default)(this, "_target", void 0);
    (0, _defineProperty2.default)(this, "_targetWindow", void 0);
    (0, _defineProperty2.default)(this, "_targetOrigin", void 0);
    (0, _defineProperty2.default)(this, "_onMessage", void 0);
    (0, _defineProperty2.default)(this, "_synIntervalId", void 0);
    if (!name || !target) {
      throw new Error("Invalid input.");
    }
    this._init = false;
    this._haveSyn = false;
    this._name = name;
    this._target = target; // target origin
    this._targetWindow = targetWindow;
    this._targetOrigin = targetOrigin;
    this._onMessage = this.onMessage.bind(this);
    this._synIntervalId = null;
    window.addEventListener("message", this._onMessage, false);
    this._handShake();
  }
  _break() {
    this.cork();
    this._write(BRK, null, noop);
    this._haveSyn = false;
    this._init = false;
  }
  _handShake() {
    this._write(SYN, null, noop);
    this.cork();
  }
  _onData(data) {
    if (!this._init) {
      // listen for handshake
      if (data === SYN) {
        this._haveSyn = true;
        this._write(ACK, null, noop);
      } else if (data === ACK) {
        this._init = true;
        if (!this._haveSyn) {
          this._write(ACK, null, noop);
        }
        this.uncork();
      }
    } else if (data === BRK) {
      this._break();
    } else {
      // forward message
      try {
        this.push(data);
      } catch (err) {
        this.emit("error", err);
      }
    }
  }
  _postMessage(data) {
    const originConstraint = this._targetOrigin;
    this._targetWindow.postMessage({
      target: this._target,
      data
    }, originConstraint);
  }
  onMessage(event) {
    const message = event.data;
    // validate message
    if (this._targetOrigin !== "*" && event.origin !== this._targetOrigin || event.source !== this._targetWindow || typeof message !== "object" || message.target !== this._name || !message.data) {
      return;
    }
    this._onData(message.data);
  }
  _read() {
    return undefined;
  }
  _write(data, _, cb) {
    this._postMessage(data);
    cb();
  }
  _destroy() {
    window.removeEventListener("message", this._onMessage, false);
  }
}
exports.BasePostMessageStream = BasePostMessageStream;
function safeApply(handler, context, args) {
  try {
    Reflect.apply(handler, context, args);
  } catch (err) {
    // Throw error after timeout so as not to interrupt the stack
    setTimeout(() => {
      throw err;
    });
  }
}
function arrayClone(arr) {
  const n = arr.length;
  const copy = new Array(n);
  for (let i = 0; i < n; i += 1) {
    copy[i] = arr[i];
  }
  return copy;
}
class SafeEventEmitter extends _events.EventEmitter {
  emit(type) {
    let doError = type === "error";
    const events = this._events;
    if (events !== undefined) {
      doError = doError && events.error === undefined;
    } else if (!doError) {
      return false;
    }
    // If there is no 'error' event listener then throw.
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    if (doError) {
      let er;
      if (args.length > 0) {
        [er] = args;
      }
      if (er instanceof Error) {
        // Note: The comments on the `throw` lines are intentional, they show
        // up in Node's output if this results in an unhandled exception.
        throw er; // Unhandled 'error' event
      }
      // At least give some kind of context to the user
      const err = new Error(`Unhandled error.${er ? ` (${er.message})` : ""}`);
      err.context = er;
      throw err; // Unhandled 'error' event
    }
    const handler = events[type];
    if (handler === undefined) {
      return false;
    }
    if (typeof handler === "function") {
      safeApply(handler, this, args);
    } else {
      const len = handler.length;
      const listeners = arrayClone(handler);
      for (let i = 0; i < len; i += 1) {
        safeApply(listeners[i], this, args);
      }
    }
    return true;
  }
}
exports.SafeEventEmitter = SafeEventEmitter;
class SerializableError extends Error {
  constructor(_ref) {
    let {
      code,
      message,
      data
    } = _ref;
    if (!Number.isInteger(code)) {
      throw new Error("code must be an integer");
    }
    if (!message || typeof message !== "string") {
      throw new Error("message must be string");
    }
    super(message);
    (0, _defineProperty2.default)(this, "code", void 0);
    (0, _defineProperty2.default)(this, "data", void 0);
    this.code = code;
    if (data !== undefined) {
      this.data = data;
    }
  }
  toString() {
    return (0, _fastSafeStringify.default)({
      code: this.code,
      message: this.message,
      data: this.data,
      stack: this.stack
    });
  }
}
exports.SerializableError = SerializableError;
const getRpcPromiseCallback = function (resolve, reject) {
  let unwrapResult = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return (error, response) => {
    if (error || response.error) {
      reject(error || response.error);
    } else if (!unwrapResult || Array.isArray(response)) {
      resolve(response);
    } else {
      resolve(response.result);
    }
  };
};
exports.getRpcPromiseCallback = getRpcPromiseCallback;
function createErrorMiddleware(log) {
  return (req, res, next, end) => {
    try {
      // json-rpc-engine will terminate the request when it notices this error
      if (typeof req.method !== "string" || !req.method) {
        res.error = new SerializableError({
          code: -32603,
          message: "invalid method"
        });
        end();
        return;
      }
      next(done => {
        const {
          error
        } = res;
        if (!error) {
          return done();
        }
        log.error(`OpenLogin - RPC Error: ${error.message}`, error);
        return done();
      });
    } catch (error) {
      log.error(`OpenLogin - RPC Error thrown: ${error.message}`, error);
      res.error = new SerializableError({
        code: -32603,
        message: error.message
      });
      end();
    }
  };
}
function createStreamMiddleware() {
  const idMap = {};
  function readNoop() {
    return false;
  }
  const events = new SafeEventEmitter();
  function processResponse(res) {
    const context = idMap[res.id];
    if (!context) {
      throw new Error(`StreamMiddleware - Unknown response id "${res.id}"`);
    }
    delete idMap[res.id];
    // copy whole res onto original res
    Object.assign(context.res, res);
    // run callback on empty stack,
    // prevent internal stream-handler from catching errors
    setTimeout(context.end);
  }
  function processNotification(res) {
    events.emit("notification", res);
  }
  function processMessage(res, _encoding, cb) {
    let err;
    try {
      const isNotification = !res.id;
      if (isNotification) {
        processNotification(res);
      } else {
        processResponse(res);
      }
    } catch (_err) {
      err = _err;
    }
    // continue processing stream
    cb(err);
  }
  const stream = new _readableStream.Duplex({
    objectMode: true,
    read: readNoop,
    write: processMessage
  });
  const middleware = (req, res, next, end) => {
    // write req to stream
    stream.push(req);
    // register request on id map
    idMap[req.id] = {
      req,
      res,
      next,
      end
    };
  };
  return {
    events,
    middleware,
    stream
  };
}
function createScaffoldMiddleware(handlers) {
  return (req, res, next, end) => {
    const handler = handlers[req.method];
    // if no handler, return
    if (handler === undefined) {
      return next();
    }
    // if handler is fn, call as middleware
    if (typeof handler === "function") {
      return handler(req, res, next, end);
    }
    // if handler is some other value, use as result
    res.result = handler;
    return end();
  };
}
function createIdRemapMiddleware() {
  return (req, res, next, _end) => {
    const originalId = req.id;
    const newId = (0, _openloginUtils.randomId)();
    req.id = newId;
    res.id = newId;
    next(done => {
      req.id = originalId;
      res.id = originalId;
      done();
    });
  };
}
function createLoggerMiddleware(logger) {
  return (req, res, next, _) => {
    logger.debug("REQ", req, "RES", res);
    next();
  };
}
function createAsyncMiddleware(asyncMiddleware) {
  return async (req, res, next, end) => {
    // nextPromise is the key to the implementation
    // it is resolved by the return handler passed to the
    // "next" function
    let resolveNextPromise;
    const nextPromise = new Promise(resolve => {
      resolveNextPromise = resolve;
    });
    let returnHandlerCallback = null;
    let nextWasCalled = false;
    // This will be called by the consumer's async middleware.
    const asyncNext = async () => {
      nextWasCalled = true;
      // We pass a return handler to next(). When it is called by the engine,
      // the consumer's async middleware will resume executing.
      next(runReturnHandlersCallback => {
        // This callback comes from JRPCEngine._runReturnHandlers
        returnHandlerCallback = runReturnHandlersCallback;
        resolveNextPromise();
      });
      await nextPromise;
    };
    try {
      await asyncMiddleware(req, res, asyncNext);
      if (nextWasCalled) {
        await nextPromise; // we must wait until the return handler is called
        returnHandlerCallback(null);
      } else {
        end(null);
      }
    } catch (error) {
      if (returnHandlerCallback) {
        returnHandlerCallback(error);
      } else {
        end(error);
      }
    }
  };
}
function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) {
      (0, _defineProperty2.default)(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
/**
 * A JSON-RPC request and response processor.
 * Give it a stack of middleware, pass it requests, and get back responses.
 */
class JRPCEngine extends SafeEventEmitter {
  constructor() {
    super();
    (0, _defineProperty2.default)(this, "_middleware", void 0);
    this._middleware = [];
  }
  /**
   * Serially executes the given stack of middleware.
   *
   * @returns An array of any error encountered during middleware execution,
   * a boolean indicating whether the request was completed, and an array of
   * middleware-defined return handlers.
   */
  static async _runAllMiddleware(req, res, middlewareStack) {
    const returnHandlers = [];
    let error = null;
    let isComplete = false;
    // Go down stack of middleware, call and collect optional returnHandlers
    for (const middleware of middlewareStack) {
      [error, isComplete] = await JRPCEngine._runMiddleware(req, res, middleware, returnHandlers);
      if (isComplete) {
        break;
      }
    }
    return [error, isComplete, returnHandlers.reverse()];
  }
  /**
   * Runs an individual middleware.
   *
   * @returns An array of any error encountered during middleware exection,
   * and a boolean indicating whether the request should end.
   */
  static _runMiddleware(req, res, middleware, returnHandlers) {
    return new Promise(resolve => {
      const end = err => {
        const error = err || res.error;
        if (error) {
          res.error = (0, _ethRpcErrors.serializeError)(error);
        }
        // True indicates that the request should end
        resolve([error, true]);
      };
      const next = returnHandler => {
        if (res.error) {
          end(res.error);
        } else {
          if (returnHandler) {
            if (typeof returnHandler !== "function") {
              end(new SerializableError({
                code: -32603,
                message: "JRPCEngine: 'next' return handlers must be functions"
              }));
            }
            returnHandlers.push(returnHandler);
          }
          // False indicates that the request should not end
          resolve([null, false]);
        }
      };
      try {
        middleware(req, res, next, end);
      } catch (error) {
        end(error);
      }
    });
  }
  /**
   * Serially executes array of return handlers. The request and response are
   * assumed to be in their scope.
   */
  static async _runReturnHandlers(handlers) {
    for (const handler of handlers) {
      await new Promise((resolve, reject) => {
        handler(err => err ? reject(err) : resolve());
      });
    }
  }
  /**
   * Throws an error if the response has neither a result nor an error, or if
   * the "isComplete" flag is falsy.
   */
  static _checkForCompletion(req, res, isComplete) {
    if (!("result" in res) && !("error" in res)) {
      throw new SerializableError({
        code: -32603,
        message: "Response has no error or result for request"
      });
    }
    if (!isComplete) {
      throw new SerializableError({
        code: -32603,
        message: "Nothing ended request"
      });
    }
  }
  /**
   * Add a middleware function to the engine's middleware stack.
   *
   * @param middleware - The middleware function to add.
   */
  push(middleware) {
    this._middleware.push(middleware);
  }
  handle(req, cb) {
    if (cb && typeof cb !== "function") {
      throw new Error('"callback" must be a function if provided.');
    }
    if (Array.isArray(req)) {
      if (cb) {
        return this._handleBatch(req, cb);
      }
      return this._handleBatch(req);
    }
    if (cb) {
      return this._handle(req, cb);
    }
    return this._promiseHandle(req);
  }
  /**
   * Returns this engine as a middleware function that can be pushed to other
   * engines.
   *
   * @returns This engine as a middleware function.
   */
  asMiddleware() {
    return async (req, res, next, end) => {
      try {
        const [middlewareError, isComplete, returnHandlers] = await JRPCEngine._runAllMiddleware(req, res, this._middleware);
        if (isComplete) {
          await JRPCEngine._runReturnHandlers(returnHandlers);
          return end(middlewareError);
        }
        return next(async handlerCallback => {
          try {
            await JRPCEngine._runReturnHandlers(returnHandlers);
          } catch (error) {
            return handlerCallback(error);
          }
          return handlerCallback();
        });
      } catch (error) {
        return end(error);
      }
    };
  }
  async _handleBatch(reqs, cb) {
    // The order here is important
    try {
      // 2. Wait for all requests to finish, or throw on some kind of fatal
      // error
      const responses = await Promise.all(
      // 1. Begin executing each request in the order received
      reqs.map(this._promiseHandle.bind(this)));
      // 3. Return batch response
      if (cb) {
        return cb(null, responses);
      }
      return responses;
    } catch (error) {
      if (cb) {
        return cb(error);
      }
      throw error;
    }
  }
  /**
   * A promise-wrapped _handle.
   */
  _promiseHandle(req) {
    return new Promise(resolve => {
      this._handle(req, (_err, res) => {
        // There will always be a response, and it will always have any error
        // that is caught and propagated.
        resolve(res);
      });
    });
  }
  /**
   * Ensures that the request object is valid, processes it, and passes any
   * error and the response object to the given callback.
   *
   * Does not reject.
   */
  async _handle(callerReq, cb) {
    if (!callerReq || Array.isArray(callerReq) || typeof callerReq !== "object") {
      const error = new SerializableError({
        code: -32603,
        message: "request must be plain object"
      });
      return cb(error, {
        id: undefined,
        jsonrpc: "2.0",
        error
      });
    }
    if (typeof callerReq.method !== "string") {
      const error = new SerializableError({
        code: -32603,
        message: "method must be string"
      });
      return cb(error, {
        id: callerReq.id,
        jsonrpc: "2.0",
        error
      });
    }
    const req = _objectSpread$1({}, callerReq);
    const res = {
      id: req.id,
      jsonrpc: req.jsonrpc
    };
    let error = null;
    try {
      await this._processRequest(req, res);
    } catch (_error) {
      // A request handler error, a re-thrown middleware error, or something
      // unexpected.
      error = _error;
    }
    if (error) {
      // Ensure no result is present on an errored response
      delete res.result;
      if (!res.error) {
        res.error = (0, _ethRpcErrors.serializeError)(error);
      }
    }
    return cb(error, res);
  }
  /**
   * For the given request and response, runs all middleware and their return
   * handlers, if any, and ensures that internal request processing semantics
   * are satisfied.
   */
  async _processRequest(req, res) {
    const [error, isComplete, returnHandlers] = await JRPCEngine._runAllMiddleware(req, res, this._middleware);
    // Throw if "end" was not called, or if the response has neither a result
    // nor an error.
    JRPCEngine._checkForCompletion(req, res, isComplete);
    // The return handlers should run even if an error was encountered during
    // middleware processing.
    await JRPCEngine._runReturnHandlers(returnHandlers);
    // Now we re-throw the middleware processing error, if any, to catch it
    // further up the call chain.
    if (error) {
      throw error;
    }
  }
}
exports.JRPCEngine = JRPCEngine;
function mergeMiddleware(middlewareStack) {
  const engine = new JRPCEngine();
  middlewareStack.forEach(middleware => engine.push(middleware));
  return engine.asMiddleware();
}
function createEngineStream(opts) {
  if (!opts || !opts.engine) {
    throw new Error("Missing engine parameter!");
  }
  const {
    engine
  } = opts;
  // eslint-disable-next-line prefer-const
  let stream;
  function read() {
    return undefined;
  }
  function write(req, _encoding, cb) {
    engine.handle(req, (_err, res) => {
      stream.push(res);
    });
    cb();
  }
  stream = new _readableStream.Duplex({
    objectMode: true,
    read,
    write
  });
  // forward notifications
  if (engine.on) {
    engine.on("notification", message => {
      stream.push(message);
    });
  }
  return stream;
}
class Substream extends _readableStream.Duplex {
  constructor(_ref) {
    let {
      parent,
      name
    } = _ref;
    super({
      objectMode: true
    });
    (0, _defineProperty2.default)(this, "_parent", void 0);
    (0, _defineProperty2.default)(this, "_name", void 0);
    this._parent = parent;
    this._name = name;
  }
  /**
   * Explicitly sets read operations to a no-op.
   */
  _read() {
    return undefined;
  }
  /**
   * Called when data should be written to this writable stream.
   *
   * @param chunk - Arbitrary object to write
   * @param encoding - Encoding to use when writing payload
   * @param callback - Called when writing is complete or an error occurs
   */
  _write(chunk, _encoding, callback) {
    this._parent.push({
      name: this._name,
      data: chunk
    });
    callback();
  }
}
exports.Substream = Substream;
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
const IGNORE_SUBSTREAM = exports.IGNORE_SUBSTREAM = Symbol("IGNORE_SUBSTREAM");
class ObjectMultiplex extends _readableStream.Duplex {
  constructor() {
    let opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super(_objectSpread(_objectSpread({}, opts), {}, {
      objectMode: true
    }));
    (0, _defineProperty2.default)(this, "_substreams", void 0);
    (0, _defineProperty2.default)(this, "getStream", void 0);
    this._substreams = {};
  }
  createStream(name) {
    // validate name
    if (!name) {
      throw new Error("ObjectMultiplex - name must not be empty");
    }
    if (this._substreams[name]) {
      throw new Error(`ObjectMultiplex - Substream for name "${name}" already exists`);
    }
    // create substream
    const substream = new Substream({
      parent: this,
      name
    });
    this._substreams[name] = substream;
    // listen for parent stream to end
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    anyStreamEnd(this, _error => substream.destroy(_error || undefined));
    return substream;
  }
  // ignore streams (dont display orphaned data warning)
  ignoreStream(name) {
    // validate name
    if (!name) {
      throw new Error("ObjectMultiplex - name must not be empty");
    }
    if (this._substreams[name]) {
      throw new Error(`ObjectMultiplex - Substream for name "${name}" already exists`);
    }
    // set
    this._substreams[name] = IGNORE_SUBSTREAM;
  }
  _read() {
    return undefined;
  }
  _write(chunk, _encoding, callback) {
    const {
      name,
      data
    } = chunk;
    if (!name) {
      window.console.warn(`ObjectMultiplex - malformed chunk without name "${chunk}"`);
      return callback();
    }
    // get corresponding substream
    const substream = this._substreams[name];
    if (!substream) {
      window.console.warn(`ObjectMultiplex - orphaned data for stream "${name}"`);
      return callback();
    }
    // push data into substream
    if (substream !== IGNORE_SUBSTREAM) {
      substream.push(data);
    }
    return callback();
  }
}
// util
exports.ObjectMultiplex = ObjectMultiplex;
function anyStreamEnd(stream, _cb) {
  const cb = (0, _once.default)(_cb);
  (0, _endOfStream.default)(stream, {
    readable: false
  }, cb);
  (0, _endOfStream.default)(stream, {
    writable: false
  }, cb);
}
function setupMultiplex(stream) {
  const mux = new ObjectMultiplex();
  mux.getStream = function streamHelper(name) {
    if (this._substreams[name]) {
      return this._substreams[name];
    }
    return this.createStream(name);
  };
  (0, _pump.default)(stream, mux, stream, err => {
    if (err) window.console.error(err);
  });
  return mux;
}
class PostMessageStream extends BasePostMessageStream {
  _postMessage(data) {
    let originConstraint = this._targetOrigin;
    if (typeof data === "object") {
      const dataObj = data;
      if (typeof dataObj.data === "object") {
        const dataObjData = dataObj.data;
        if (Array.isArray(dataObjData.params) && dataObjData.params.length > 0) {
          const dataObjDataParam = dataObjData.params[0];
          if (dataObjDataParam._origin) {
            originConstraint = dataObjDataParam._origin;
          }
          // add a constraint for the response
          dataObjDataParam._origin = window.location.origin;
        }
      }
    }
    this._targetWindow.postMessage({
      target: this._target,
      data
    }, originConstraint);
  }
}
exports.PostMessageStream = PostMessageStream;
},{"@babel/runtime/helpers/defineProperty":"node_modules/@babel/runtime/helpers/defineProperty.js","readable-stream":"node_modules/readable-stream/readable-browser.js","@toruslabs/openlogin-utils":"node_modules/@toruslabs/torus-embed/node_modules/@toruslabs/openlogin-utils/dist/openloginUtils.esm.js","events":"../../../../usr/local/lib/node_modules/parcel-bundler/node_modules/events/events.js","fast-safe-stringify":"node_modules/fast-safe-stringify/index.js","eth-rpc-errors":"node_modules/eth-rpc-errors/dist/index.js","end-of-stream":"node_modules/end-of-stream/index.js","once":"node_modules/once/once.js","pump":"node_modules/pump/index.js"}],"node_modules/@metamask/obs-store/dist/asStream.js":[function(require,module,exports) {
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storeAsStream = void 0;
var stream_1 = require("stream");
var ObservableStoreStream = /*#__PURE__*/function (_stream_1$Duplex) {
  function ObservableStoreStream(obsStore) {
    var _this;
    _classCallCheck(this, ObservableStoreStream);
    _this = _callSuper(this, ObservableStoreStream, [{
      // pass values, not serializations
      objectMode: true
    }]);
    // dont buffer outgoing updates
    _this.resume();
    // save handler so we can unsubscribe later
    _this.handler = function (state) {
      return _this.push(state);
    };
    // subscribe to obsStore changes
    _this.obsStore = obsStore;
    _this.obsStore.subscribe(_this.handler);
    return _this;
  }
  // emit current state on new destination
  _inherits(ObservableStoreStream, _stream_1$Duplex);
  return _createClass(ObservableStoreStream, [{
    key: "pipe",
    value: function pipe(dest, options) {
      var result = _superPropGet(ObservableStoreStream, "pipe", this, 3)([dest, options]);
      dest.write(this.obsStore.getState());
      return result;
    }
    // write from incoming stream to state
  }, {
    key: "_write",
    value: function _write(chunk, _encoding, callback) {
      this.obsStore.putState(chunk);
      callback();
    }
    // noop - outgoing stream is asking us if we have data we arent giving it
  }, {
    key: "_read",
    value: function _read(_size) {
      return undefined;
    }
    // unsubscribe from event emitter
  }, {
    key: "_destroy",
    value: function _destroy(err, callback) {
      this.obsStore.unsubscribe(this.handler);
      _superPropGet(ObservableStoreStream, "_destroy", this, 3)([err, callback]);
    }
  }]);
}(stream_1.Duplex);
function storeAsStream(obsStore) {
  return new ObservableStoreStream(obsStore);
}
exports.storeAsStream = storeAsStream;
},{"stream":"../../../../usr/local/lib/node_modules/parcel-bundler/node_modules/stream-browserify/index.js"}],"node_modules/@metamask/safe-event-emitter/index.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
function safeApply(handler, context, args) {
    try {
        Reflect.apply(handler, context, args);
    }
    catch (err) {
        // Throw error after timeout so as not to interrupt the stack
        setTimeout(() => {
            throw err;
        });
    }
}
function arrayClone(arr) {
    const n = arr.length;
    const copy = new Array(n);
    for (let i = 0; i < n; i += 1) {
        copy[i] = arr[i];
    }
    return copy;
}
class SafeEventEmitter extends events_1.EventEmitter {
    emit(type, ...args) {
        let doError = type === 'error';
        const events = this._events;
        if (events !== undefined) {
            doError = doError && events.error === undefined;
        }
        else if (!doError) {
            return false;
        }
        // If there is no 'error' event listener then throw.
        if (doError) {
            let er;
            if (args.length > 0) {
                [er] = args;
            }
            if (er instanceof Error) {
                // Note: The comments on the `throw` lines are intentional, they show
                // up in Node's output if this results in an unhandled exception.
                throw er; // Unhandled 'error' event
            }
            // At least give some kind of context to the user
            const err = new Error(`Unhandled error.${er ? ` (${er.message})` : ''}`);
            err.context = er;
            throw err; // Unhandled 'error' event
        }
        const handler = events[type];
        if (handler === undefined) {
            return false;
        }
        if (typeof handler === 'function') {
            safeApply(handler, this, args);
        }
        else {
            const len = handler.length;
            const listeners = arrayClone(handler);
            for (let i = 0; i < len; i += 1) {
                safeApply(listeners[i], this, args);
            }
        }
        return true;
    }
}
exports.default = SafeEventEmitter;

},{"events":"../../../../usr/local/lib/node_modules/parcel-bundler/node_modules/events/events.js"}],"node_modules/@metamask/obs-store/dist/ObservableStore.js":[function(require,module,exports) {
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObservableStore = void 0;
var safe_event_emitter_1 = __importDefault(require("@metamask/safe-event-emitter"));
var ObservableStore = /*#__PURE__*/function (_safe_event_emitter_) {
  function ObservableStore(initState) {
    var _this;
    _classCallCheck(this, ObservableStore);
    _this = _callSuper(this, ObservableStore);
    if (initState) {
      _this._state = initState;
    } else {
      // Typecast/default state: Preserve existing behavior
      _this._state = {};
    }
    return _this;
  }
  // wrapper around internal getState
  _inherits(ObservableStore, _safe_event_emitter_);
  return _createClass(ObservableStore, [{
    key: "getState",
    value: function getState() {
      return this._getState();
    }
    // wrapper around internal putState
  }, {
    key: "putState",
    value: function putState(newState) {
      this._putState(newState);
      this.emit('update', newState);
    }
  }, {
    key: "updateState",
    value: function updateState(partialState) {
      // if non-null object, merge
      if (partialState && _typeof(partialState) === 'object') {
        var state = this.getState();
        this.putState(Object.assign(Object.assign({}, state), partialState));
        // if not object, use new value
      } else {
        this.putState(partialState);
      }
    }
    // subscribe to changes
  }, {
    key: "subscribe",
    value: function subscribe(handler) {
      this.on('update', handler);
    }
    // unsubscribe to changes
  }, {
    key: "unsubscribe",
    value: function unsubscribe(handler) {
      this.removeListener('update', handler);
    }
    //
    // private
    //
    // read from persistence
  }, {
    key: "_getState",
    value: function _getState() {
      return this._state;
    }
    // write to persistence
  }, {
    key: "_putState",
    value: function _putState(newState) {
      this._state = newState;
    }
  }]);
}(safe_event_emitter_1.default);
exports.ObservableStore = ObservableStore;
},{"@metamask/safe-event-emitter":"node_modules/@metamask/safe-event-emitter/index.js"}],"node_modules/@metamask/obs-store/dist/ComposedStore.js":[function(require,module,exports) {
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComposedStore = void 0;
var ObservableStore_1 = require("./ObservableStore");
var ComposedStore = /*#__PURE__*/function (_ObservableStore_1$Ob) {
  function ComposedStore(children) {
    var _this;
    _classCallCheck(this, ComposedStore);
    // Typecast: Preserve existing behavior
    _this = _callSuper(this, ComposedStore, [{}]);
    // subscribe to children
    _this._children = children || {};
    Object.keys(_this._children).forEach(function (childKey) {
      var child = _this._children[childKey];
      _this._addChild(childKey, child);
    });
    return _this;
  }
  _inherits(ComposedStore, _ObservableStore_1$Ob);
  return _createClass(ComposedStore, [{
    key: "_addChild",
    value: function _addChild(childKey, child) {
      var _this2 = this;
      var updateFromChild = function updateFromChild(childValue) {
        var state = _this2.getState();
        state[childKey] = childValue;
        _this2.putState(state);
      };
      child.subscribe(updateFromChild);
      updateFromChild(child.getState());
    }
  }]);
}(ObservableStore_1.ObservableStore);
exports.ComposedStore = ComposedStore;
},{"./ObservableStore":"node_modules/@metamask/obs-store/dist/ObservableStore.js"}],"node_modules/@metamask/obs-store/dist/MergedStore.js":[function(require,module,exports) {
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MergedStore = void 0;
var ObservableStore_1 = require("./ObservableStore");
var MergedStore = /*#__PURE__*/function (_ObservableStore_1$Ob) {
  function MergedStore() {
    var _this;
    var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    _classCallCheck(this, MergedStore);
    // Typecast: Preserve existing behavior
    _this = _callSuper(this, MergedStore, [{}]);
    _this._children = children;
    // subscribe to children
    children.forEach(function (child) {
      return _this._addChild(child);
    });
    _this._updateWholeState();
    return _this;
  }
  _inherits(MergedStore, _ObservableStore_1$Ob);
  return _createClass(MergedStore, [{
    key: "_addChild",
    value: function _addChild(child) {
      var _this2 = this;
      child.subscribe(function () {
        return _this2._updateWholeState();
      });
    }
  }, {
    key: "_updateWholeState",
    value: function _updateWholeState() {
      var childStates = this._children.map(function (child) {
        return child.getState();
      });
      // apply shallow merge over states
      var state = Object.assign.apply(Object, [{}].concat(_toConsumableArray(childStates)));
      this.putState(state);
    }
  }]);
}(ObservableStore_1.ObservableStore);
exports.MergedStore = MergedStore;
},{"./ObservableStore":"node_modules/@metamask/obs-store/dist/ObservableStore.js"}],"node_modules/process-nextick-args/index.js":[function(require,module,exports) {
var process = require("process");
'use strict';

if (typeof process === 'undefined' ||
    !process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = { nextTick: nextTick };
} else {
  module.exports = process
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}


},{"process":"../../../../usr/local/lib/node_modules/parcel-bundler/node_modules/process/browser.js"}],"node_modules/through2/node_modules/isarray/index.js":[function(require,module,exports) {
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],"node_modules/through2/node_modules/readable-stream/lib/internal/streams/stream-browser.js":[function(require,module,exports) {
module.exports = require('events').EventEmitter;

},{"events":"../../../../usr/local/lib/node_modules/parcel-bundler/node_modules/events/events.js"}],"node_modules/through2/node_modules/safe-buffer/index.js":[function(require,module,exports) {

/* eslint-disable node/no-deprecated-api */
var buffer = require('buffer')
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}

},{"buffer":"../../../../usr/local/lib/node_modules/parcel-bundler/node_modules/buffer/index.js"}],"node_modules/core-util-is/lib/util.js":[function(require,module,exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('buffer').Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

},{"buffer":"../../../../usr/local/lib/node_modules/parcel-bundler/node_modules/buffer/index.js"}],"node_modules/through2/node_modules/readable-stream/lib/internal/streams/BufferList.js":[function(require,module,exports) {

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = require('safe-buffer').Buffer;
var util = require('util');

function copyBuffer(src, target, offset) {
  src.copy(target, offset);
}

module.exports = function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  BufferList.prototype.push = function push(v) {
    var entry = { data: v, next: null };
    if (this.length > 0) this.tail.next = entry;else this.head = entry;
    this.tail = entry;
    ++this.length;
  };

  BufferList.prototype.unshift = function unshift(v) {
    var entry = { data: v, next: this.head };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };

  BufferList.prototype.shift = function shift() {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
    --this.length;
    return ret;
  };

  BufferList.prototype.clear = function clear() {
    this.head = this.tail = null;
    this.length = 0;
  };

  BufferList.prototype.join = function join(s) {
    if (this.length === 0) return '';
    var p = this.head;
    var ret = '' + p.data;
    while (p = p.next) {
      ret += s + p.data;
    }return ret;
  };

  BufferList.prototype.concat = function concat(n) {
    if (this.length === 0) return Buffer.alloc(0);
    var ret = Buffer.allocUnsafe(n >>> 0);
    var p = this.head;
    var i = 0;
    while (p) {
      copyBuffer(p.data, ret, i);
      i += p.data.length;
      p = p.next;
    }
    return ret;
  };

  return BufferList;
}();

if (util && util.inspect && util.inspect.custom) {
  module.exports.prototype[util.inspect.custom] = function () {
    var obj = util.inspect({ length: this.length });
    return this.constructor.name + ' ' + obj;
  };
}
},{"safe-buffer":"node_modules/through2/node_modules/safe-buffer/index.js","util":"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/_empty.js"}],"node_modules/through2/node_modules/readable-stream/lib/internal/streams/destroy.js":[function(require,module,exports) {
'use strict';

/*<replacement>*/

var pna = require('process-nextick-args');
/*</replacement>*/

// undocumented cb() API, needed for core, not for public API
function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err) {
      if (!this._writableState) {
        pna.nextTick(emitErrorNT, this, err);
      } else if (!this._writableState.errorEmitted) {
        this._writableState.errorEmitted = true;
        pna.nextTick(emitErrorNT, this, err);
      }
    }

    return this;
  }

  // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks

  if (this._readableState) {
    this._readableState.destroyed = true;
  }

  // if this is a duplex stream mark the writable part as destroyed as well
  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      if (!_this._writableState) {
        pna.nextTick(emitErrorNT, _this, err);
      } else if (!_this._writableState.errorEmitted) {
        _this._writableState.errorEmitted = true;
        pna.nextTick(emitErrorNT, _this, err);
      }
    } else if (cb) {
      cb(err);
    }
  });

  return this;
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finalCalled = false;
    this._writableState.prefinished = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy
};
},{"process-nextick-args":"node_modules/process-nextick-args/index.js"}],"node_modules/through2/node_modules/readable-stream/lib/_stream_writable.js":[function(require,module,exports) {
var process = require("process");

var global = arguments[3];
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.

'use strict';

/*<replacement>*/
var pna = require('process-nextick-args');
/*</replacement>*/

module.exports = Writable;

/* <replacement> */
function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;
  this.next = null;
  this.entry = null;
  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/
var asyncWrite = !true && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var util = Object.create(require('core-util-is'));
util.inherits = require('inherits');
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: require('util-deprecate')
};
/*</replacement>*/

/*<replacement>*/
var Stream = require('./internal/streams/stream');
/*</replacement>*/

/*<replacement>*/

var Buffer = require('safe-buffer').Buffer;
var OurUint8Array = (typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : {}).Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

/*</replacement>*/

var destroyImpl = require('./internal/streams/destroy');
util.inherits(Writable, Stream);
function nop() {}
function WritableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');
  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  var isDuplex = stream instanceof Duplex;

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var writableHwm = options.writableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (writableHwm || writableHwm === 0)) this.highWaterMark = writableHwm;else this.highWaterMark = defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // if _final has been called
  this.finalCalled = false;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // has it been destroyed
  this.destroyed = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;
  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}
WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};
(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;
      if (this !== Writable) return false;
      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}
function Writable(options) {
  Duplex = Duplex || require('./_stream_duplex');

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }
  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;
  if (options) {
    if (typeof options.write === 'function') this._write = options.write;
    if (typeof options.writev === 'function') this._writev = options.writev;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
    if (typeof options.final === 'function') this._final = options.final;
  }
  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};
function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  pna.nextTick(cb, er);
}

// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;
  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    pna.nextTick(cb, er);
    valid = false;
  }
  return valid;
}
Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;
  var isBuf = !state.objectMode && _isUint8Array(chunk);
  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }
  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }
  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;
  if (typeof cb !== 'function') cb = nop;
  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }
  return ret;
};
Writable.prototype.cork = function () {
  var state = this._writableState;
  state.corked++;
};
Writable.prototype.uncork = function () {
  var state = this._writableState;
  if (state.corked) {
    state.corked--;
    if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};
Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};
function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }
  return chunk;
}
Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._writableState.highWaterMark;
  }
});

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);
    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }
  var len = state.objectMode ? 1 : chunk.length;
  state.length += len;
  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;
  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }
  return ret;
}
function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}
function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;
  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    pna.nextTick(cb, er);
    // this can emit finish, and it will always happen
    // after error
    pna.nextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
    // this can emit finish, but finish must
    // always follow error
    finishMaybe(stream, state);
  }
}
function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}
function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;
  onwriteStateUpdate(state);
  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);
    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }
    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}
function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;
  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;
    var count = 0;
    var allBuffers = true;
    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }
    buffer.allBuffers = allBuffers;
    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
    state.bufferedRequestCount = 0;
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;
      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      state.bufferedRequestCount--;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }
    if (entry === null) state.lastBufferedRequest = null;
  }
  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}
Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};
Writable.prototype._writev = null;
Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;
  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }
  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending) endWritable(this, state, cb);
};
function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;
    if (err) {
      stream.emit('error', err);
    }
    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}
function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function') {
      state.pendingcb++;
      state.finalCalled = true;
      pna.nextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}
function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    prefinish(stream, state);
    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');
    }
  }
  return need;
}
function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) pna.nextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}
function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;
  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  }

  // reuse the free corkReq.
  state.corkedRequestsFree.next = corkReq;
}
Object.defineProperty(Writable.prototype, 'destroyed', {
  get: function () {
    if (this._writableState === undefined) {
      return false;
    }
    return this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._writableState.destroyed = value;
  }
});
Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;
Writable.prototype._destroy = function (err, cb) {
  this.end();
  cb(err);
};
},{"process-nextick-args":"node_modules/process-nextick-args/index.js","core-util-is":"node_modules/core-util-is/lib/util.js","inherits":"node_modules/inherits/inherits_browser.js","util-deprecate":"node_modules/util-deprecate/browser.js","./internal/streams/stream":"node_modules/through2/node_modules/readable-stream/lib/internal/streams/stream-browser.js","safe-buffer":"node_modules/through2/node_modules/safe-buffer/index.js","./internal/streams/destroy":"node_modules/through2/node_modules/readable-stream/lib/internal/streams/destroy.js","./_stream_duplex":"node_modules/through2/node_modules/readable-stream/lib/_stream_duplex.js","process":"../../../../usr/local/lib/node_modules/parcel-bundler/node_modules/process/browser.js"}],"node_modules/through2/node_modules/readable-stream/lib/_stream_duplex.js":[function(require,module,exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.

'use strict';

/*<replacement>*/

var pna = require('process-nextick-args');
/*</replacement>*/

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var util = Object.create(require('core-util-is'));
util.inherits = require('inherits');
/*</replacement>*/

var Readable = require('./_stream_readable');
var Writable = require('./_stream_writable');

util.inherits(Duplex, Readable);

{
  // avoid scope creep, the keys array can then be collected
  var keys = objectKeys(Writable.prototype);
  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
  }
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._writableState.highWaterMark;
  }
});

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  pna.nextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }
    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

Duplex.prototype._destroy = function (err, cb) {
  this.push(null);
  this.end();

  pna.nextTick(cb, err);
};
},{"process-nextick-args":"node_modules/process-nextick-args/index.js","core-util-is":"node_modules/core-util-is/lib/util.js","inherits":"node_modules/inherits/inherits_browser.js","./_stream_readable":"node_modules/through2/node_modules/readable-stream/lib/_stream_readable.js","./_stream_writable":"node_modules/through2/node_modules/readable-stream/lib/_stream_writable.js"}],"node_modules/through2/node_modules/string_decoder/lib/string_decoder.js":[function(require,module,exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

/*<replacement>*/

var Buffer = require('safe-buffer').Buffer;
/*</replacement>*/

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return byte >> 6 === 0x02 ? -1 : -2;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd';
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd';
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd';
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd';
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}
},{"safe-buffer":"node_modules/through2/node_modules/safe-buffer/index.js"}],"node_modules/through2/node_modules/readable-stream/lib/_stream_readable.js":[function(require,module,exports) {

var global = arguments[3];
var process = require("process");
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

/*<replacement>*/

var pna = require('process-nextick-args');
/*</replacement>*/

module.exports = Readable;

/*<replacement>*/
var isArray = require('isarray');
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = require('events').EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream = require('./internal/streams/stream');
/*</replacement>*/

/*<replacement>*/

var Buffer = require('safe-buffer').Buffer;
var OurUint8Array = (typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : {}).Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

/*</replacement>*/

/*<replacement>*/
var util = Object.create(require('core-util-is'));
util.inherits = require('inherits');
/*</replacement>*/

/*<replacement>*/
var debugUtil = require('util');
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = require('./internal/streams/BufferList');
var destroyImpl = require('./internal/streams/destroy');
var StringDecoder;

util.inherits(Readable, Stream);

var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn);

  // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.
  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
}

function ReadableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  var isDuplex = stream instanceof Duplex;

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var readableHwm = options.readableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;

  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (readableHwm || readableHwm === 0)) this.highWaterMark = readableHwm;else this.highWaterMark = defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // has it been destroyed
  this.destroyed = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || require('./_stream_duplex');

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined) {
      return false;
    }
    return this._readableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
  }
});

Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;
Readable.prototype._destroy = function (err, cb) {
  this.push(null);
  cb(err);
};

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;
      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }
      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  var state = stream._readableState;
  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
    if (er) {
      stream.emit('error', er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        stream.emit('error', new Error('stream.push() after EOF'));
      } else {
        state.reading = false;
        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
    }
  }

  return needMoreData(state);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    stream.emit('data', chunk);
    stream.read(0);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

    if (state.needReadable) emitReadable(stream);
  }
  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;
  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) pna.nextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    pna.nextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) pna.nextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');
    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', state.awaitDrain);
        state.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = { hasUnpiped: false };

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, { hasUnpiped: false });
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this, unpipeInfo);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        pna.nextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    pna.nextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var _this = this;

  var state = this._readableState;
  var paused = false;

  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) _this.push(chunk);
    }

    _this.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = _this.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  }

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  this._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return this;
};

Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._readableState.highWaterMark;
  }
});

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = Buffer.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    pna.nextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
},{"process-nextick-args":"node_modules/process-nextick-args/index.js","isarray":"node_modules/through2/node_modules/isarray/index.js","events":"../../../../usr/local/lib/node_modules/parcel-bundler/node_modules/events/events.js","./internal/streams/stream":"node_modules/through2/node_modules/readable-stream/lib/internal/streams/stream-browser.js","safe-buffer":"node_modules/through2/node_modules/safe-buffer/index.js","core-util-is":"node_modules/core-util-is/lib/util.js","inherits":"node_modules/inherits/inherits_browser.js","util":"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/_empty.js","./internal/streams/BufferList":"node_modules/through2/node_modules/readable-stream/lib/internal/streams/BufferList.js","./internal/streams/destroy":"node_modules/through2/node_modules/readable-stream/lib/internal/streams/destroy.js","./_stream_duplex":"node_modules/through2/node_modules/readable-stream/lib/_stream_duplex.js","string_decoder/":"node_modules/through2/node_modules/string_decoder/lib/string_decoder.js","process":"../../../../usr/local/lib/node_modules/parcel-bundler/node_modules/process/browser.js"}],"node_modules/through2/node_modules/readable-stream/lib/_stream_transform.js":[function(require,module,exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.

'use strict';

module.exports = Transform;

var Duplex = require('./_stream_duplex');

/*<replacement>*/
var util = Object.create(require('core-util-is'));
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(Transform, Duplex);

function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) {
    return this.emit('error', new Error('write callback called multiple times'));
  }

  ts.writechunk = null;
  ts.writecb = null;

  if (data != null) // single equals check for both `null` and `undefined`
    this.push(data);

  cb(er);

  var rs = this._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    this._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = {
    afterTransform: afterTransform.bind(this),
    needTransform: false,
    transforming: false,
    writecb: null,
    writechunk: null,
    writeencoding: null
  };

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.on('prefinish', prefinish);
}

function prefinish() {
  var _this = this;

  if (typeof this._flush === 'function') {
    this._flush(function (er, data) {
      done(_this, er, data);
    });
  } else {
    done(this, null, null);
  }
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  var _this2 = this;

  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
    _this2.emit('close');
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data != null) // single equals check for both `null` and `undefined`
    stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  if (stream._writableState.length) throw new Error('Calling transform done when ws.length != 0');

  if (stream._transformState.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}
},{"./_stream_duplex":"node_modules/through2/node_modules/readable-stream/lib/_stream_duplex.js","core-util-is":"node_modules/core-util-is/lib/util.js","inherits":"node_modules/inherits/inherits_browser.js"}],"node_modules/through2/node_modules/readable-stream/lib/_stream_passthrough.js":[function(require,module,exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.

'use strict';

module.exports = PassThrough;

var Transform = require('./_stream_transform');

/*<replacement>*/
var util = Object.create(require('core-util-is'));
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};
},{"./_stream_transform":"node_modules/through2/node_modules/readable-stream/lib/_stream_transform.js","core-util-is":"node_modules/core-util-is/lib/util.js","inherits":"node_modules/inherits/inherits_browser.js"}],"node_modules/through2/node_modules/readable-stream/readable-browser.js":[function(require,module,exports) {
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_readable.js":"node_modules/through2/node_modules/readable-stream/lib/_stream_readable.js","./lib/_stream_writable.js":"node_modules/through2/node_modules/readable-stream/lib/_stream_writable.js","./lib/_stream_duplex.js":"node_modules/through2/node_modules/readable-stream/lib/_stream_duplex.js","./lib/_stream_transform.js":"node_modules/through2/node_modules/readable-stream/lib/_stream_transform.js","./lib/_stream_passthrough.js":"node_modules/through2/node_modules/readable-stream/lib/_stream_passthrough.js"}],"node_modules/xtend/immutable.js":[function(require,module,exports) {
module.exports = extend;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function extend() {
  var target = {};
  for (var i = 0; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
}
},{}],"node_modules/through2/through2.js":[function(require,module,exports) {
var process = require("process");
var Transform = require('readable-stream').Transform
  , inherits  = require('util').inherits
  , xtend     = require('xtend')

function DestroyableTransform(opts) {
  Transform.call(this, opts)
  this._destroyed = false
}

inherits(DestroyableTransform, Transform)

DestroyableTransform.prototype.destroy = function(err) {
  if (this._destroyed) return
  this._destroyed = true
  
  var self = this
  process.nextTick(function() {
    if (err)
      self.emit('error', err)
    self.emit('close')
  })
}

// a noop _transform function
function noop (chunk, enc, callback) {
  callback(null, chunk)
}


// create a new export function, used by both the main export and
// the .ctor export, contains common logic for dealing with arguments
function through2 (construct) {
  return function (options, transform, flush) {
    if (typeof options == 'function') {
      flush     = transform
      transform = options
      options   = {}
    }

    if (typeof transform != 'function')
      transform = noop

    if (typeof flush != 'function')
      flush = null

    return construct(options, transform, flush)
  }
}


// main export, just make me a transform stream!
module.exports = through2(function (options, transform, flush) {
  var t2 = new DestroyableTransform(options)

  t2._transform = transform

  if (flush)
    t2._flush = flush

  return t2
})


// make me a reusable prototype that I can `new`, or implicitly `new`
// with a constructor call
module.exports.ctor = through2(function (options, transform, flush) {
  function Through2 (override) {
    if (!(this instanceof Through2))
      return new Through2(override)

    this.options = xtend(options, override)

    DestroyableTransform.call(this, this.options)
  }

  inherits(Through2, DestroyableTransform)

  Through2.prototype._transform = transform

  if (flush)
    Through2.prototype._flush = flush

  return Through2
})


module.exports.obj = through2(function (options, transform, flush) {
  var t2 = new DestroyableTransform(xtend({ objectMode: true, highWaterMark: 16 }, options))

  t2._transform = transform

  if (flush)
    t2._flush = flush

  return t2
})

},{"readable-stream":"node_modules/through2/node_modules/readable-stream/readable-browser.js","util":"../../../../usr/local/lib/node_modules/parcel-bundler/node_modules/util/util.js","xtend":"node_modules/xtend/immutable.js","process":"../../../../usr/local/lib/node_modules/parcel-bundler/node_modules/process/browser.js"}],"node_modules/@metamask/obs-store/dist/transform.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storeTransformStream = void 0;
var through2_1 = require("through2");
function storeTransformStream(syncTransformFn) {
  return through2_1.obj(function (state, _encoding, cb) {
    try {
      var newState = syncTransformFn(state);
      cb(null, newState);
      return undefined;
    } catch (err) {
      cb(err);
      return undefined;
    }
  });
}
exports.storeTransformStream = storeTransformStream;
},{"through2":"node_modules/through2/through2.js"}],"node_modules/@metamask/obs-store/dist/index.js":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
__exportStar(require("./asStream"), exports);
__exportStar(require("./ComposedStore"), exports);
__exportStar(require("./MergedStore"), exports);
__exportStar(require("./ObservableStore"), exports);
__exportStar(require("./transform"), exports);
},{"./asStream":"node_modules/@metamask/obs-store/dist/asStream.js","./ComposedStore":"node_modules/@metamask/obs-store/dist/ComposedStore.js","./MergedStore":"node_modules/@metamask/obs-store/dist/MergedStore.js","./ObservableStore":"node_modules/@metamask/obs-store/dist/ObservableStore.js","./transform":"node_modules/@metamask/obs-store/dist/transform.js"}],"node_modules/@toruslabs/torus-embed/dist/torus.esm.js":[function(require,module,exports) {
var define;
var Buffer = require("buffer").Buffer;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.WALLET_VERIFIERS = exports.WALLET_OPENLOGIN_VERIFIER_MAP = exports.TorusInpageProvider = exports.TORUS_BUILD_ENV = exports.SUPPORTED_PAYMENT_NETWORK = exports.PAYMENT_PROVIDER = exports.LOGIN_PROVIDER = exports.BUTTON_POSITION = void 0;
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _defineProperty3 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _httpHelpers = require("@toruslabs/http-helpers");
var _openloginJrpc = require("@toruslabs/openlogin-jrpc");
var _lodash = _interopRequireDefault(require("lodash.merge"));
var _obsStore = require("@metamask/obs-store");
var _ethRpcErrors = require("eth-rpc-errors");
var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));
var _isStream = require("is-stream");
var _pump = _interopRequireDefault(require("pump"));
var _loglevel = _interopRequireDefault(require("loglevel"));
var _createHash = _interopRequireDefault(require("create-hash"));
var _events = require("events");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _defineProperty2(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var LOGIN_PROVIDER = exports.LOGIN_PROVIDER = {
  GOOGLE: "google",
  FACEBOOK: "facebook",
  TWITCH: "twitch",
  REDDIT: "reddit",
  DISCORD: "discord"
};
var WALLET_VERIFIERS = exports.WALLET_VERIFIERS = {
  GOOGLE: "google",
  FACEBOOK: "facebook",
  TWITCH: "twitch",
  REDDIT: "reddit",
  DISCORD: "discord",
  EMAIL_PASSWORDLESS: "torus-auth0-email-passwordless"
};
var WALLET_OPENLOGIN_VERIFIER_MAP = exports.WALLET_OPENLOGIN_VERIFIER_MAP = _defineProperty2(_defineProperty2(_defineProperty2(_defineProperty2(_defineProperty2(_defineProperty2({}, WALLET_VERIFIERS.GOOGLE, "tkey-google"), WALLET_VERIFIERS.FACEBOOK, "tkey-facebook"), WALLET_VERIFIERS.TWITCH, "tkey-twitch"), WALLET_VERIFIERS.REDDIT, "tkey-reddit"), WALLET_VERIFIERS.DISCORD, "tkey-discord"), WALLET_VERIFIERS.EMAIL_PASSWORDLESS, "tkey-auth0-email-passwordless");
var PAYMENT_PROVIDER = exports.PAYMENT_PROVIDER = {
  MOONPAY: "moonpay",
  WYRE: "wyre",
  RAMPNETWORK: "rampnetwork",
  XANPOOL: "xanpool",
  MERCURYO: "mercuryo",
  TRANSAK: "transak",
  BANXA: "banxa"
};
var SUPPORTED_PAYMENT_NETWORK = exports.SUPPORTED_PAYMENT_NETWORK = {
  MAINNET: "mainnet",
  MATIC: "matic",
  BSC_MAINNET: "bsc_mainnet",
  AVALANCHE_MAINNET: "avalanche_mainnet",
  XDAI: "xdai"
};
var TORUS_BUILD_ENV = exports.TORUS_BUILD_ENV = {
  PRODUCTION: "production",
  DEVELOPMENT: "development",
  BINANCE: "binance",
  TESTING: "testing",
  LRC: "lrc",
  BETA: "beta",
  BNB: "bnb",
  POLYGON: "polygon"
};
var BUTTON_POSITION = exports.BUTTON_POSITION = {
  BOTTOM_LEFT: "bottom-left",
  TOP_LEFT: "top-left",
  BOTTOM_RIGHT: "bottom-right",
  TOP_RIGHT: "top-right"
};

/**
 * From https://min-api.cryptocompare.com/data/v2/pair/mapping/fsym?fsym=BTC&extraParams=YourSite
 * GET https://min-api.cryptocompare.com/data/v2/pair/mapping/fsym?fsym=BTC
 * Then map over returned entries, picking tsym
 *
 * Last updated: Date of commit
 */
var CRYPTO_COMPARE_CURRENCIES = ["ETH", "USDT", "USDC", "TUSD", "EOSDT", "USD", "DAI", "GUSD", "DKKT", "PAX", "ILS", "RUB", "BYN", "EUR", "GBP", "JPY", "KRW", "PLN", "MXN", "AUD", "BRL", "CAD", "CHF", "KPW", "LAK", "LBP", "LKR", "XOF", "CNHT", "DOGE", "UAH", "TRY", "HKD", "XJP", "SGD", "USC", "NZD", "NGN", "RUR", "COP", "GHS", "EGP", "IDR", "BHD", "CRC", "PEN", "AED", "DOP", "PKR", "HUF", "VND", "XAR", "LTC", "RON", "OMR", "MYR", "DKK", "UGX", "ZMW", "SAR", "SEK", "GEL", "RWF", "IRR", "TZS", "CNY", "VEF", "BDT", "HRK", "CLP", "THB", "XAF", "ARS", "UYU", "SZL", "KZT", "NOK", "KES", "PAB", "INR", "CZK", "MAD", "TWD", "PHP", "ZAR", "BOB", "CDF", "DASH", "VES", "ISK", "MWK", "BAM", "TTD", "XRP", "JOD", "RSD", "HNL", "BGN", "GTQ", "BWP", "XMR", "MMK", "QAR", "AOA", "KWD", "MUR", "WUSD", "WEUR", "WAVES", "WTRY", "LRD", "LSL", "LYD", "AWG", "MDL", "BTO", "EURS", "CHFT", "MKD", "MNT", "MOP", "MRO", "MVR", "VOLLAR", "CKUSD", "KHR", "VUV", "BITCNY", "QC", "BBD", "NAD", "NPR", "PGK", "PYG", "BIF", "BMD", "BND", "XLM", "BNB", "SCR", "BAT", "CRO", "HT", "KCS", "LEO", "LINK", "MKR", "NPXS", "OMG", "REP", "ZB", "ZIL", "ZRX", "BCH", "BZD", "CUP", "CVE", "DJF", "DZD", "ERN", "ETB", "FJD", "FKP", "BUSD", "ANCT", "ALL", "AMD", "ANG", "CNYX", "IQD", "UZS", "TND", "GGP", "XAU", "KGS", "GIP", "JMD", "ZEC", "USDP", "BSV", "EMC2", "SNT", "GTO", "POWR", "EUSD", "EURT", "BCY", "BTS", "ATM", "BLOCKPAY", "ARDR", "AMP", "B2X", "BITGOLD", "BITEUR", "ATB", "BITUSD", "AGRS", "DFXT", "HIKEN", "BIX", "KNC", "EOS", "COB", "COSS", "BMH", "NANO", "BDG", "BNT", "XVG", "LKK1Y", "LKK", "USDK", "EURN", "NZDT", "JSE", "GMD", "GNF", "GYD", "YER", "XPF", "HTG", "SLL", "SOS", "WST", "SVC", "SYP", "NEO", "KMF", "JUMP", "AYA", "BLAST", "WGR", "BCN", "BTG", "URALS", "INN", "USDQ", "CNH", "HUSD", "BKRW", "NZDX", "EURX", "CADX", "USDEX", "JPYX", "AUDX", "VNDC", "EON", "GBPX", "CHFX", "USDJ", "IDRT", "USDS", "USDN", "BIDR", "IDK", "BSD", "BTN", "KYD", "NIO", "SBD", "SDG", "SHP", "TOP", "XCD", "XCHF", "CNYT", "GYEN", "ZUSD", "GOLD", "TRX", "TRYB", "PLATC", "STRAX", "UST", "GLM", "VAI", "BRZ", "DDRST", "XAUT", "MIM"];
/**
 * currencies supported by the payment provider
 * Last updated: Date of commit
 */
var PROVIDER_SUPPORTED_FIAT_CURRENCIES = _defineProperty2(_defineProperty2(_defineProperty2(_defineProperty2(_defineProperty2(_defineProperty2(_defineProperty2({}, PAYMENT_PROVIDER.MOONPAY, ["AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "COP", "CZK", "DKK", "DOP", "EGP", "EUR", "GBP", "HKD", "HRK", "IDR", "ILS", "JPY", "JOD", "KES", "KRW", "KWD", "LKR", "MAD", "MXN", "MYR", "NGN", "NOK", "NZD", "OMR", "PEN", "PKR", "PLN", "RON", "RUB", "SEK", "SGD", "THB", "TRY", "TWD", "USD", "VND", "ZAR"]), PAYMENT_PROVIDER.WYRE, ["USD", "EUR", "GBP", "AUD", "CAD", "NZD", "ARS", "BRL", "CHF", "CLP", "COP", "CZK", "DKK", "HKD", "ILS", "INR", "ISK", "JPY", "KRW", "MXN", "MYR", "NOK", "PHP", "PLN", "SEK", "THB", "VND", "ZAR"]), PAYMENT_PROVIDER.RAMPNETWORK, ["USD", "EUR", "GBP"]), PAYMENT_PROVIDER.XANPOOL, ["SGD", "HKD", "THB", "PHP", "INR", "IDR", "MYR", "AUD", "NZD", "KRW"]), PAYMENT_PROVIDER.MERCURYO, ["EUR", "USD", "GBP", "TRY", "JPY", "BRL", "NGN", "VND", "MXN", "KRW"]), PAYMENT_PROVIDER.TRANSAK, ["ARS", "AUD", "BBD", "BGN", "BMD", "BRL", "CAD", "CHF", "CLP", "CRC", "CZK", "DKK", "DOP", "EUR", "FJD", "FKP", "GBP", "GIP", "HRK", "HUF", "IDR", "ILS", "ISK", "JMD", "JPY", "KES", "KRW", "MDL", "MXN", "MYR", "NOK", "NZD", "PEN", "PHP", "PLN", "PYG", "RON", "SEK", "SGD", "THB", "TRY", "TZS", "USD", "ZAR"]), PAYMENT_PROVIDER.BANXA, ["EUR", "GBP", "USD"]);
var cryptoCompareCurrenciesSet = new Set(CRYPTO_COMPARE_CURRENCIES);
/**
 * Fiat currencies that we support
 */
function supportedFiatCurrencies(provider) {
  var providerSupportedFiatCurrencies = PROVIDER_SUPPORTED_FIAT_CURRENCIES[provider];
  return providerSupportedFiatCurrencies.filter(function (currency) {
    return cryptoCompareCurrenciesSet.has(currency);
  });
}
var paymentProviders$1 = _defineProperty2(_defineProperty2(_defineProperty2(_defineProperty2(_defineProperty2(_defineProperty2(_defineProperty2({}, PAYMENT_PROVIDER.MOONPAY, {
  line1: "Credit/ Debit Card/ Apple Pay",
  line2: "4.5% or 5 USD",
  line3: "2,000€/day, 10,000€/mo",
  supportPage: "https://help.moonpay.io/en/",
  minOrderValue: 24.99,
  maxOrderValue: 50000,
  validCurrencies: supportedFiatCurrencies(PAYMENT_PROVIDER.MOONPAY),
  validCryptoCurrenciesByChain: _defineProperty2(_defineProperty2(_defineProperty2(_defineProperty2({}, SUPPORTED_PAYMENT_NETWORK.MAINNET, [{
    value: "aave",
    display: "AAVE"
  }, {
    value: "bat",
    display: "BAT"
  }, {
    value: "dai",
    display: "DAI"
  }, {
    value: "eth",
    display: "ETH"
  }, {
    value: "mkr",
    display: "MKR"
  }, {
    value: "matic",
    display: "MATIC"
  }, {
    value: "usdt",
    display: "USDT"
  }, {
    value: "usdc",
    display: "USDC"
  }]), SUPPORTED_PAYMENT_NETWORK.MATIC, [{
    value: "eth_polygon",
    display: "ETH"
  }, {
    value: "matic_polygon",
    display: "MATIC"
  }, {
    value: "usdc_polygon",
    display: "USDC"
  }]), SUPPORTED_PAYMENT_NETWORK.BSC_MAINNET, [{
    value: "bnb_bsc",
    display: "BNB"
  }, {
    value: "busd_bsc",
    display: "BUSD"
  }]), SUPPORTED_PAYMENT_NETWORK.AVALANCHE_MAINNET, [{
    value: "avax_cchain",
    display: "AVAX"
  }]),
  includeFees: true,
  api: true,
  enforceMax: false
}), PAYMENT_PROVIDER.WYRE, {
  line1: "Apple Pay/ Debit/ Credit Card",
  line2: "4.9% + 30¢ or 5 USD",
  line3: "$250/day",
  supportPage: "https://support.sendwyre.com/en/",
  minOrderValue: 5,
  maxOrderValue: 500,
  validCurrencies: supportedFiatCurrencies(PAYMENT_PROVIDER.WYRE),
  validCryptoCurrenciesByChain: _defineProperty2(_defineProperty2(_defineProperty2({}, SUPPORTED_PAYMENT_NETWORK.MAINNET, [{
    value: "AAVE",
    display: "AAVE"
  }, {
    value: "BAT",
    display: "BAT"
  }, {
    value: "BUSD",
    display: "BUSD"
  }, {
    value: "DAI",
    display: "DAI"
  }, {
    value: "ETH",
    display: "ETH"
  }, {
    value: "MKR",
    display: "MKR"
  }, {
    value: "UNI",
    display: "UNI"
  }, {
    value: "USDC",
    display: "USDC"
  }, {
    value: "USDT",
    display: "USDT"
  }]), SUPPORTED_PAYMENT_NETWORK.MATIC, [{
    value: "MUSDC",
    display: "USDC"
  }]), SUPPORTED_PAYMENT_NETWORK.AVALANCHE_MAINNET, [{
    value: "AVAXC",
    display: "AVAXC"
  }]),
  includeFees: false,
  api: true,
  enforceMax: false
}), PAYMENT_PROVIDER.RAMPNETWORK, {
  line1: "Debit Card/ <br>Apple Pay/ Bank transfer",
  line2: "0.49% - 2.9%",
  line3: "5,000€/purchase, 20,000€/mo",
  supportPage: "https://instant.ramp.network/",
  minOrderValue: 50,
  maxOrderValue: 20000,
  validCurrencies: supportedFiatCurrencies(PAYMENT_PROVIDER.RAMPNETWORK),
  validCryptoCurrenciesByChain: _defineProperty2(_defineProperty2(_defineProperty2({}, SUPPORTED_PAYMENT_NETWORK.MAINNET, [{
    value: "ETH",
    display: "ETH"
  }, {
    value: "DAI",
    display: "DAI"
  }, {
    value: "USDC",
    display: "USDC"
  }, {
    value: "USDT",
    display: "USDT"
  }]), SUPPORTED_PAYMENT_NETWORK.MATIC, [{
    value: "MATIC_DAI",
    display: "DAI"
  }, {
    value: "MATIC_MATIC",
    display: "MATIC"
  }, {
    value: "MATIC_USDC",
    display: "USDC"
  }]), SUPPORTED_PAYMENT_NETWORK.AVALANCHE_MAINNET, [{
    value: "AVAX",
    display: "AVAX"
  }]),
  includeFees: true,
  api: true,
  receiveHint: "walletTopUp.receiveHintRamp",
  enforceMax: false
}), PAYMENT_PROVIDER.XANPOOL, {
  line1: "PayNow/ InstaPay/ FPS/ GoJekPay/ UPI/ PromptPay/ <br>ViettelPay/ DuitNow",
  line2: "2.5% buying, 3% selling",
  line3: "$2,500 / day",
  supportPage: "mailto:support@xanpool.com",
  minOrderValue: 100,
  maxOrderValue: 2500,
  validCurrencies: supportedFiatCurrencies(PAYMENT_PROVIDER.XANPOOL),
  validCryptoCurrenciesByChain: _defineProperty2({}, SUPPORTED_PAYMENT_NETWORK.MAINNET, [{
    value: "ETH",
    display: "ETH"
  }, {
    value: "USDT",
    display: "USDT"
  }]),
  includeFees: true,
  api: true,
  sell: true,
  enforceMax: false
}), PAYMENT_PROVIDER.MERCURYO, {
  line1: "Credit/ Debit Card/ Apple Pay",
  line2: "3.95% or 4 USD",
  line3: "10,000€/day, 25,000€/mo",
  supportPage: "mailto:support@mercuryo.io",
  minOrderValue: 30,
  maxOrderValue: 5000,
  validCurrencies: supportedFiatCurrencies(PAYMENT_PROVIDER.MERCURYO),
  validCryptoCurrenciesByChain: _defineProperty2(_defineProperty2({}, SUPPORTED_PAYMENT_NETWORK.MAINNET, [{
    value: "ETH",
    display: "ETH"
  }, {
    value: "BAT",
    display: "BAT"
  }, {
    value: "USDT",
    display: "USDT"
  }, {
    value: "DAI",
    display: "DAI"
  }]), SUPPORTED_PAYMENT_NETWORK.BSC_MAINNET, [{
    value: "BNB",
    display: "BNB"
  }, {
    value: "BUSD",
    display: "BUSD"
  }, {
    value: "1INCH",
    display: "1INCH"
  }]),
  includeFees: true,
  api: true,
  enforceMax: false
}), PAYMENT_PROVIDER.TRANSAK, {
  line1: "Apple & Google Pay / Credit/Debit Card<br/>Bangkok Bank Mobile & iPay<br/>Bank Transfer (sepa/gbp) / SCB Mobile & Easy",
  line2: "0.99% - 5.5% or 5 USD",
  line3: "$5,000/day, $28,000/mo",
  supportPage: "https://support.transak.com/hc/en-US",
  minOrderValue: 30,
  maxOrderValue: 500,
  validCurrencies: supportedFiatCurrencies(PAYMENT_PROVIDER.TRANSAK),
  validCryptoCurrenciesByChain: _defineProperty2(_defineProperty2(_defineProperty2(_defineProperty2({}, SUPPORTED_PAYMENT_NETWORK.MAINNET, [{
    value: "AAVE",
    display: "AAVE"
  }, {
    value: "DAI",
    display: "DAI"
  }, {
    value: "ETH",
    display: "ETH"
  }, {
    value: "USDC",
    display: "USDC"
  }, {
    value: "USDT",
    display: "USDT"
  }]), SUPPORTED_PAYMENT_NETWORK.MATIC, [{
    value: "AAVE",
    display: "AAVE"
  }, {
    value: "DAI",
    display: "DAI"
  }, {
    value: "MATIC",
    display: "MATIC"
  }, {
    value: "USDC",
    display: "USDC"
  }, {
    value: "USDT",
    display: "USDT"
  }, {
    value: "WETH",
    display: "WETH"
  }]), SUPPORTED_PAYMENT_NETWORK.BSC_MAINNET, [{
    value: "BNB",
    display: "BNB"
  }, {
    value: "BUSD",
    display: "BUSD"
  }]), SUPPORTED_PAYMENT_NETWORK.AVALANCHE_MAINNET, [{
    value: "AVAX",
    display: "AVAX"
  }]),
  includeFees: true,
  enforceMax: true
}), PAYMENT_PROVIDER.BANXA, {
  line1: "Debit Card/ <br>Apple Pay/ Bank transfer",
  line2: "0.49% - 2.9%",
  line3: "5,000€/purchase, 20,000€/mo",
  supportPage: "https://support.banxa.com",
  minOrderValue: 20,
  maxOrderValue: 15000,
  validCurrencies: supportedFiatCurrencies(PAYMENT_PROVIDER.BANXA),
  validCryptoCurrenciesByChain: _defineProperty2(_defineProperty2({}, SUPPORTED_PAYMENT_NETWORK.MAINNET, [{
    value: "ETH",
    display: "ETH"
  }, {
    value: "USDT",
    display: "USDT"
  }, {
    value: "BUSD",
    display: "BUSD"
  }, {
    value: "LINK",
    display: "LINK"
  }, {
    value: "USDC",
    display: "USDC"
  }, {
    value: "CHZ",
    display: "CHZ"
  }, {
    value: "BAT",
    display: "BAT"
  }, {
    value: "MANA",
    display: "MANA"
  }, {
    value: "AAVE",
    display: "AAVE"
  }, {
    value: "COMP",
    display: "COMP"
  }, {
    value: "ENJ",
    display: "ENJ"
  }]), SUPPORTED_PAYMENT_NETWORK.MATIC, [{
    value: "MATIC",
    display: "MATIC"
  }]),
  includeFees: true,
  enforceMax: true
});
var translations = {
  en: {
    embed: {
      continue: "Continue",
      actionRequired: "Authorization required",
      pendingAction: "Click continue to proceed with your request in a popup",
      cookiesRequired: "Cookies Required",
      enableCookies: "Please enable cookies in your browser preferences to access Torus",
      clickHere: "More Info"
    }
  },
  de: {
    embed: {
      continue: "Fortsetzen",
      actionRequired: "Autorisierung erforderlich",
      pendingAction: "Klicken Sie in einem Popup auf Weiter, um mit Ihrer Anfrage fortzufahren",
      cookiesRequired: "Cookies benötigt",
      enableCookies: "Bitte aktivieren Sie Cookies in Ihren Browsereinstellungen, um auf Torus zuzugreifen",
      clickHere: "Mehr Info"
    }
  },
  ja: {
    embed: {
      continue: "継続する",
      actionRequired: "認証が必要です",
      pendingAction: "続行をクリックして、ポップアップでリクエストを続行します",
      cookiesRequired: "必要なクッキー",
      enableCookies: "Torusにアクセスするには、ブラウザの設定でCookieを有効にしてください。",
      clickHere: "詳しくは"
    }
  },
  ko: {
    embed: {
      continue: "계속하다",
      actionRequired: "승인 필요",
      pendingAction: "팝업에서 요청을 진행하려면 계속을 클릭하십시오.",
      cookiesRequired: "쿠키 필요",
      enableCookies: "브라우저 환경 설정에서 쿠키를 활성화하여 Torus에 액세스하십시오.",
      clickHere: "더 많은 정보"
    }
  },
  zh: {
    embed: {
      continue: "继续",
      actionRequired: "需要授权",
      pendingAction: "单击继续以在弹出窗口中继续您的请求",
      cookiesRequired: "必填Cookie",
      enableCookies: "请在您的浏览器首选项中启用cookie以访问Torus。",
      clickHere: "更多信息"
    }
  }
};
var configuration = {
  supportedVerifierList: Object.values(WALLET_VERIFIERS),
  paymentProviders: paymentProviders$1,
  api: "https://api.tor.us",
  translations: translations,
  prodTorusUrl: "",
  localStorageKeyPrefix: "torus-"
};
var runOnLoad = function runOnLoad(fn) {
  return new Promise(function (resolve, reject) {
    if (window.document.body != null) {
      Promise.resolve(fn()).then(resolve).catch(reject);
    } else {
      window.document.addEventListener("DOMContentLoaded", function () {
        Promise.resolve(fn()).then(resolve).catch(reject);
      });
    }
  });
};
var htmlToElement = function htmlToElement(html) {
  var template = window.document.createElement("template");
  var trimmedHtml = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = trimmedHtml;
  return template.content.firstChild;
};
var handleEvent = function handleEvent(handle, eventName, handler) {
  for (var _len = arguments.length, handlerArgs = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    handlerArgs[_key - 3] = arguments[_key];
  }
  var _handlerWrapper = function handlerWrapper() {
    handler.apply(void 0, handlerArgs);
    handle.removeEventListener(eventName, _handlerWrapper);
  };
  handle.addEventListener(eventName, _handlerWrapper);
};
var handleStream = function handleStream(handle, eventName, handler) {
  var _handlerWrapper2 = function handlerWrapper(chunk) {
    handler(chunk);
    handle.removeListener(eventName, _handlerWrapper2);
  };
  handle.on(eventName, _handlerWrapper2);
};
function documentReady() {
  return _documentReady.apply(this, arguments);
}
function _documentReady() {
  _documentReady = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          return _context13.abrupt("return", new Promise(function (resolve) {
            if (document.readyState !== "loading") {
              resolve();
            } else {
              handleEvent(document, "DOMContentLoaded", resolve);
            }
          }));
        case 1:
        case "end":
          return _context13.stop();
      }
    }, _callee13);
  }));
  return _documentReady.apply(this, arguments);
}
var log = _loglevel.default.getLogger("torus-embed");
var messages = {
  errors: {
    disconnected: function disconnected() {
      return "Torus: Lost connection to Torus.";
    },
    permanentlyDisconnected: function permanentlyDisconnected() {
      return "Torus: Disconnected from iframe. Page reload required.";
    },
    sendSiteMetadata: function sendSiteMetadata() {
      return "Torus: Failed to send site metadata. This is an internal error, please report this bug.";
    },
    unsupportedSync: function unsupportedSync(method) {
      return "Torus: The Torus Ethereum provider does not support synchronous methods like ".concat(method, " without a callback parameter.");
    },
    invalidDuplexStream: function invalidDuplexStream() {
      return "Must provide a Node.js-style duplex stream.";
    },
    invalidOptions: function invalidOptions(maxEventListeners, shouldSendMetadata) {
      return "Invalid options. Received: { maxEventListeners: ".concat(maxEventListeners, ", shouldSendMetadata: ").concat(shouldSendMetadata, " }");
    },
    invalidRequestArgs: function invalidRequestArgs() {
      return "Expected a single, non-array, object argument.";
    },
    invalidRequestMethod: function invalidRequestMethod() {
      return "'args.method' must be a non-empty string.";
    },
    invalidRequestParams: function invalidRequestParams() {
      return "'args.params' must be an object or array if provided.";
    },
    invalidLoggerObject: function invalidLoggerObject() {
      return "'args.logger' must be an object if provided.";
    },
    invalidLoggerMethod: function invalidLoggerMethod(method) {
      return "'args.logger' must include required method '".concat(method, "'.");
    }
  },
  info: {
    connected: function connected(chainId) {
      return "Torus: Connected to chain with ID \"".concat(chainId, "\".");
    }
  },
  warnings: {
    // deprecated methods
    enableDeprecation: 'Torus: ""ethereum.enable()" is deprecated and may be removed in the future. ' + 'Please use "ethereum.send("eth_requestAccounts")" instead. For more information, see: https://eips.ethereum.org/EIPS/eip-1102',
    sendDeprecation: 'Torus: "ethereum.send(...)" is deprecated and may be removed in the future.' + ' Please use "ethereum.sendAsync(...)" or "ethereum.request(...)" instead.\nFor more information, see: https://eips.ethereum.org/EIPS/eip-1193',
    events: {
      close: 'Torus: The event "close" is deprecated and may be removed in the future. Please use "disconnect" instead.' + "\nFor more information, see: https://eips.ethereum.org/EIPS/eip-1193",
      data: 'Torus: The event "data" is deprecated and will be removed in the future.' + 'Use "message" instead.\nFor more information, see: https://eips.ethereum.org/EIPS/eip-1193#message',
      networkChanged: 'Torus: The event "networkChanged" is deprecated and may be removed in the future.' + ' Please use "chainChanged" instead.\nFor more information, see: https://eips.ethereum.org/EIPS/eip-1193',
      notification: 'Torus: The event "notification" is deprecated and may be removed in the future. ' + 'Please use "message" instead.\nFor more information, see: https://eips.ethereum.org/EIPS/eip-1193'
    },
    publicConfigStore: 'Torus: The property "publicConfigStore" is deprecated and WILL be removed in the future.'
  }
};
var paymentProviders = configuration.paymentProviders;
var validatePaymentProvider = function validatePaymentProvider(provider, params) {
  var errors = {};
  if (!provider) {
    return {
      errors: errors,
      isValid: true
    };
  }
  if (provider && !paymentProviders[provider]) {
    errors.provider = "Invalid Provider";
    return {
      errors: errors,
      isValid: Object.keys(errors).length === 0
    };
  }
  var selectedProvider = paymentProviders[provider];
  var selectedParams = params || {};
  // set default values
  // if (!selectedParams.selectedCurrency) [selectedParams.selectedCurrency] = selectedProvider.validCurrencies
  // if (!selectedParams.fiatValue) selectedParams.fiatValue = selectedProvider.minOrderValue
  // if (!selectedParams.selectedCryptoCurrency) [selectedParams.selectedCryptoCurrency] = selectedProvider.validCryptoCurrencies
  // validations
  if (selectedParams.fiatValue) {
    var requestedOrderAmount = +parseFloat(selectedParams.fiatValue.toString()) || 0;
    if (requestedOrderAmount < selectedProvider.minOrderValue) errors.fiatValue = "Requested amount is lower than supported";
    if (requestedOrderAmount > selectedProvider.maxOrderValue && selectedProvider.enforceMax) errors.fiatValue = "Requested amount is higher than supported";
  }
  if (selectedParams.selectedCurrency && !selectedProvider.validCurrencies.includes(selectedParams.selectedCurrency)) {
    errors.selectedCurrency = "Unsupported currency";
  }
  if (selectedParams.selectedCryptoCurrency) {
    var validCryptoCurrenciesByChain = Object.values(selectedProvider.validCryptoCurrenciesByChain).flat().map(function (currency) {
      return currency.value;
    });
    var finalCryptoCurrency = provider === PAYMENT_PROVIDER.MOONPAY ? selectedParams.selectedCryptoCurrency.toLowerCase() : selectedParams.selectedCryptoCurrency;
    if (validCryptoCurrenciesByChain && !validCryptoCurrenciesByChain.includes(finalCryptoCurrency)) errors.selectedCryptoCurrency = "Unsupported cryptoCurrency";
  }
  return {
    errors: errors,
    isValid: Object.keys(errors).length === 0
  };
};
// utility functions
/**
 * json-rpc-engine middleware that logs RPC errors and and validates req.method.
 *
 * @param log - The logging API to use.
 * @returns  json-rpc-engine middleware function
 */
function createErrorMiddleware() {
  return function (req, res, next) {
    // json-rpc-engine will terminate the request when it notices this error
    if (typeof req.method !== "string" || !req.method) {
      res.error = _ethRpcErrors.ethErrors.rpc.invalidRequest({
        message: "The request 'method' must be a non-empty string.",
        data: req
      });
    }
    next(function (done) {
      var error = res.error;
      if (!error) {
        return done();
      }
      log.error("MetaMask - RPC Error: ".concat(error.message), error);
      return done();
    });
  };
}
/**
 * Logs a stream disconnection error. Emits an 'error' if given an
 * EventEmitter that has listeners for the 'error' event.
 *
 * @param log - The logging API to use.
 * @param remoteLabel - The label of the disconnected stream.
 * @param error - The associated error to log.
 * @param emitter - The logging API to use.
 */
function logStreamDisconnectWarning(remoteLabel, error, emitter) {
  var warningMsg = "MetaMask: Lost connection to \"".concat(remoteLabel, "\".");
  if (error?.stack) {
    warningMsg += "\n".concat(error.stack);
  }
  log.warn(warningMsg);
  if (emitter && emitter.listenerCount("error") > 0) {
    emitter.emit("error", warningMsg);
  }
}
var getPreopenInstanceId = function getPreopenInstanceId() {
  return Math.random().toString(36).slice(2);
};
var getTorusUrl = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(buildEnv, integrity) {
    var torusUrl, logLevel, version, versionUsed, response;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          // Do not change this line
          version = "1.41.3";
          versionUsed = integrity.version || version;
          _context.prev = 2;
          if (!((buildEnv === "binance" || buildEnv === "production") && !integrity.version)) {
            _context.next = 13;
            break;
          }
          if (configuration.prodTorusUrl) {
            _context.next = 10;
            break;
          }
          _context.next = 7;
          return (0, _httpHelpers.get)("".concat(configuration.api, "/latestversion?name=@toruslabs/torus-embed&version=").concat(version), {}, {
            useAPIKey: true
          });
        case 7:
          response = _context.sent;
          _context.next = 11;
          break;
        case 10:
          response = {
            data: configuration.prodTorusUrl
          };
        case 11:
          versionUsed = response.data;
          // eslint-disable-next-line require-atomic-updates
          configuration.prodTorusUrl = response.data;
        case 13:
          _context.next = 18;
          break;
        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](2);
          log.error(_context.t0, "unable to fetch latest version");
        case 18:
          log.info("version used: ", versionUsed);
          _context.t1 = buildEnv;
          _context.next = _context.t1 === "binance" ? 22 : _context.t1 === "testing" ? 25 : _context.t1 === "bnb" ? 28 : _context.t1 === "polygon" ? 31 : _context.t1 === "lrc" ? 34 : _context.t1 === "beta" ? 37 : _context.t1 === "development" ? 40 : 43;
          break;
        case 22:
          torusUrl = "https://binance.tor.us/v".concat(versionUsed);
          logLevel = "info";
          return _context.abrupt("break", 46);
        case 25:
          torusUrl = "https://testing.tor.us";
          logLevel = "debug";
          return _context.abrupt("break", 46);
        case 28:
          torusUrl = "https://bnb.tor.us";
          logLevel = "error";
          return _context.abrupt("break", 46);
        case 31:
          torusUrl = "https://polygon.tor.us";
          logLevel = "error";
          return _context.abrupt("break", 46);
        case 34:
          torusUrl = "https://lrc.tor.us";
          logLevel = "debug";
          return _context.abrupt("break", 46);
        case 37:
          torusUrl = "https://beta.tor.us";
          logLevel = "debug";
          return _context.abrupt("break", 46);
        case 40:
          torusUrl = "http://localhost:4050";
          logLevel = "debug";
          return _context.abrupt("break", 46);
        case 43:
          torusUrl = "https://app.tor.us/v".concat(versionUsed);
          logLevel = "error";
          return _context.abrupt("break", 46);
        case 46:
          return _context.abrupt("return", {
            torusUrl: torusUrl,
            logLevel: logLevel
          });
        case 47:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 15]]);
  }));
  return function getTorusUrl(_x, _x2) {
    return _ref4.apply(this, arguments);
  };
}();
var getUserLanguage = function getUserLanguage() {
  var userLanguage = window.navigator.language || "en-US";
  var userLanguages = userLanguage.split("-");
  userLanguage = Object.prototype.hasOwnProperty.call(configuration.translations, userLanguages[0]) ? userLanguages[0] : "en";
  return userLanguage;
};
var EMITTED_NOTIFICATIONS = ["eth_subscription" // per eth-json-rpc-filters/subscriptionManager
];
var NOOP = function NOOP() {
  // empty function
};
var FEATURES_PROVIDER_CHANGE_WINDOW = "directories=0,titlebar=0,toolbar=0,status=0,location=0,menubar=0,height=660,width=375";
var FEATURES_DEFAULT_WALLET_WINDOW = "directories=0,titlebar=0,toolbar=0,status=0,location=0,menubar=0,height=740,width=1315";
var FEATURES_CONFIRM_WINDOW = "directories=0,titlebar=0,toolbar=0,status=0,location=0,menubar=0,height=700,width=450";
function getPopupFeatures() {
  // Fixes dual-screen position                             Most browsers      Firefox
  var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  var dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;
  var w = 1200;
  var h = 700;
  var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : window.screen.width;
  var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : window.screen.height;
  var systemZoom = 1; // No reliable estimate
  var left = Math.abs((width - w) / 2 / systemZoom + dualScreenLeft);
  var top = Math.abs((height - h) / 2 / systemZoom + dualScreenTop);
  var features = "titlebar=0,toolbar=0,status=0,location=0,menubar=0,height=".concat(h / systemZoom, ",width=").concat(w / systemZoom, ",top=").concat(top, ",left=").concat(left);
  return features;
}
function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) {
      (0, _defineProperty3.default)(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
_openloginJrpc.SafeEventEmitter.defaultMaxListeners = 100;
// resolve response.result, reject errors
var getRpcPromiseCallback = function getRpcPromiseCallback(resolve, reject) {
  var unwrapResult = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return function (error, response) {
    if (error || response.error) {
      return reject(error || response.error);
    }
    return !unwrapResult || Array.isArray(response) ? resolve(response) : resolve(response.result);
  };
};
var TorusInpageProvider = exports.TorusInpageProvider = /*#__PURE__*/function (_SafeEventEmitter) {
  /**
   * The chain ID of the currently connected Ethereum chain.
   * See [chainId.network]{@link https://chainid.network} for more information.
   */

  /**
   * The user's currently selected Ethereum address.
   * If null, MetaMask is either locked or the user has not permitted any
   * addresses to be viewed.
   */

  /**
   * Indicating that this provider is a MetaMask provider.
   */

  function TorusInpageProvider(connectionStream) {
    var _this;
    _classCallCheck(this, TorusInpageProvider);
    var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref5$maxEventListene = _ref5.maxEventListeners,
      maxEventListeners = _ref5$maxEventListene === void 0 ? 100 : _ref5$maxEventListene,
      _ref5$shouldSendMetad = _ref5.shouldSendMetadata,
      shouldSendMetadata = _ref5$shouldSendMetad === void 0 ? true : _ref5$shouldSendMetad,
      _ref5$jsonRpcStreamNa = _ref5.jsonRpcStreamName,
      jsonRpcStreamName = _ref5$jsonRpcStreamNa === void 0 ? "provider" : _ref5$jsonRpcStreamNa;
    _this = _callSuper(this, TorusInpageProvider);
    (0, _defineProperty3.default)(_this, "chainId", void 0);
    (0, _defineProperty3.default)(_this, "selectedAddress", void 0);
    (0, _defineProperty3.default)(_this, "_rpcEngine", void 0);
    (0, _defineProperty3.default)(_this, "networkVersion", void 0);
    (0, _defineProperty3.default)(_this, "shouldSendMetadata", void 0);
    (0, _defineProperty3.default)(_this, "isTorus", void 0);
    (0, _defineProperty3.default)(_this, "_publicConfigStore", void 0);
    (0, _defineProperty3.default)(_this, "tryPreopenHandle", void 0);
    (0, _defineProperty3.default)(_this, "enable", void 0);
    (0, _defineProperty3.default)(_this, "_state", void 0);
    (0, _defineProperty3.default)(_this, "_jsonRpcConnection", void 0);
    (0, _defineProperty3.default)(_this, "_sentWarnings", {
      // methods
      enable: false,
      experimentalMethods: false,
      send: false,
      publicConfigStore: false,
      // events
      events: {
        close: false,
        data: false,
        networkChanged: false,
        notification: false
      }
    });
    if (!(0, _isStream.duplex)(connectionStream)) {
      throw new Error(messages.errors.invalidDuplexStream());
    }
    _this.isTorus = true;
    _this.setMaxListeners(maxEventListeners);
    // private state
    _this._state = _objectSpread$1({}, TorusInpageProvider._defaultState);
    // public state
    _this.selectedAddress = null;
    _this.networkVersion = null;
    _this.chainId = null;
    _this.shouldSendMetadata = shouldSendMetadata;
    // bind functions (to prevent e.g. web3@1.x from making unbound calls)
    _this._handleAccountsChanged = _this._handleAccountsChanged.bind(_this);
    _this._handleChainChanged = _this._handleChainChanged.bind(_this);
    _this._handleUnlockStateChanged = _this._handleUnlockStateChanged.bind(_this);
    _this._handleConnect = _this._handleConnect.bind(_this);
    _this._handleDisconnect = _this._handleDisconnect.bind(_this);
    _this._handleStreamDisconnect = _this._handleStreamDisconnect.bind(_this);
    _this._sendSync = _this._sendSync.bind(_this);
    _this._rpcRequest = _this._rpcRequest.bind(_this);
    _this._warnOfDeprecation = _this._warnOfDeprecation.bind(_this);
    _this._initializeState = _this._initializeState.bind(_this);
    _this.request = _this.request.bind(_this);
    _this.send = _this.send.bind(_this);
    _this.sendAsync = _this.sendAsync.bind(_this);
    // this.enable = this.enable.bind(this);
    // setup connectionStream multiplexing
    var mux = new _openloginJrpc.ObjectMultiplex();
    (0, _pump.default)(connectionStream, mux, connectionStream, _this._handleStreamDisconnect.bind(_this, "MetaMask"));
    // subscribe to metamask public config (one-way)
    _this._publicConfigStore = new _obsStore.ObservableStore({
      storageKey: "Metamask-Config"
    });
    // handle isUnlocked changes, and chainChanged and networkChanged events
    // this._publicConfigStore.subscribe((stringifiedState) => {
    //   // This is because we are using store as string
    //   const state = JSON.parse(stringifiedState as unknown as string);
    //   if ("isUnlocked" in state && state.isUnlocked !== this._state.isUnlocked) {
    //     this._state.isUnlocked = state.isUnlocked;
    //     if (!this._state.isUnlocked) {
    //       // accounts are never exposed when the extension is locked
    //       this._handleAccountsChanged([]);
    //     } else {
    //       // this will get the exposed accounts, if any
    //       try {
    //         this._rpcRequest(
    //           { method: "eth_accounts", params: [] },
    //           NOOP,
    //           true // indicating that eth_accounts _should_ update accounts
    //         );
    //       } catch (_) {
    //         // Swallow error
    //       }
    //     }
    //   }
    //   if ("selectedAddress" in state && this.selectedAddress !== state.selectedAddress) {
    //     try {
    //       this._rpcRequest(
    //         { method: "eth_accounts", params: [] },
    //         NOOP,
    //         true // indicating that eth_accounts _should_ update accounts
    //       );
    //     } catch (_) {
    //       // Swallow error
    //     }
    //   }
    //   // Emit chainChanged event on chain change
    //   if ("chainId" in state && state.chainId !== this.chainId) {
    //     this.chainId = state.chainId || null;
    //     this.emit("chainChanged", this.chainId);
    //     // indicate that we've connected, for EIP-1193 compliance
    //     // we do this here so that iframe can initialize
    //     if (!this._state.hasEmittedConnection) {
    //       this._handleConnect(this.chainId);
    //       this._state.hasEmittedConnection = true;
    //     }
    //   }
    //   // Emit networkChanged event on network change
    //   if ("networkVersion" in state && state.networkVersion !== this.networkVersion) {
    //     this.networkVersion = state.networkVersion || null;
    //     this.emit("networkChanged", this.networkVersion);
    //   }
    // });
    (0, _pump.default)(mux.createStream("publicConfig"), (0, _obsStore.storeAsStream)(_this._publicConfigStore),
    // RPC requests should still work if only this stream fails
    logStreamDisconnectWarning.bind(_this, "MetaMask PublicConfigStore"));
    // ignore phishing warning message (handled elsewhere)
    mux.ignoreStream("phishing");
    // setup own event listeners
    // EIP-1193 connect
    _this.on("connect", function () {
      _this._state.isConnected = true;
    });
    // connect to async provider
    var jsonRpcConnection = (0, _openloginJrpc.createStreamMiddleware)();
    (0, _pump.default)(jsonRpcConnection.stream, mux.createStream(jsonRpcStreamName), jsonRpcConnection.stream, _this._handleStreamDisconnect.bind(_this, "MetaMask RpcProvider"));
    // handle RPC requests via dapp-side rpc engine
    var rpcEngine = new _openloginJrpc.JRPCEngine();
    rpcEngine.push((0, _openloginJrpc.createIdRemapMiddleware)());
    rpcEngine.push(createErrorMiddleware());
    rpcEngine.push(jsonRpcConnection.middleware);
    _this._rpcEngine = rpcEngine;
    // json rpc notification listener
    jsonRpcConnection.events.on("notification", function (payload) {
      var method = payload.method,
        params = payload.params;
      if (method === "wallet_accountsChanged") {
        _this._handleAccountsChanged(params);
      } else if (method === "wallet_unlockStateChanged") {
        _this._handleUnlockStateChanged(params);
      } else if (method === "wallet_chainChanged") {
        _this._handleChainChanged(params);
      } else if (EMITTED_NOTIFICATIONS.includes(payload.method)) {
        // EIP 1193 subscriptions, per eth-json-rpc-filters/subscriptionManager
        _this.emit("data", payload); // deprecated
        _this.emit("notification", params.result);
        _this.emit("message", {
          type: method,
          data: params
        });
      }
      // Backward compatibility for older non EIP 1193 subscriptions
      // this.emit('data', null, payload)
    });
    return _this;
  }
  _inherits(TorusInpageProvider, _SafeEventEmitter);
  return _createClass(TorusInpageProvider, [{
    key: "publicConfigStore",
    get: function get() {
      if (!this._sentWarnings.publicConfigStore) {
        log.warn(messages.warnings.publicConfigStore);
        this._sentWarnings.publicConfigStore = true;
      }
      return this._publicConfigStore;
    }
    /**
     * Returns whether the inpage provider is connected to Torus.
     */
  }, {
    key: "isConnected",
    value: function isConnected() {
      return this._state.isConnected;
    }
    /**
     * Submits an RPC request for the given method, with the given params.
     * Resolves with the result of the method call, or rejects on error.
     *
     * @param args - The RPC request arguments.
     * @returns A Promise that resolves with the result of the RPC method,
     * or rejects if an error is encountered.
     */
  }, {
    key: "request",
    value: (function () {
      var _request = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(args) {
        var _this2 = this;
        var method, params;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (!(!args || _typeof(args) !== "object" || Array.isArray(args))) {
                _context2.next = 2;
                break;
              }
              throw _ethRpcErrors.ethErrors.rpc.invalidRequest({
                message: messages.errors.invalidRequestArgs(),
                data: args
              });
            case 2:
              method = args.method, params = args.params;
              if (!(typeof method !== "string" || method.length === 0)) {
                _context2.next = 5;
                break;
              }
              throw _ethRpcErrors.ethErrors.rpc.invalidRequest({
                message: messages.errors.invalidRequestMethod(),
                data: args
              });
            case 5:
              if (!(params !== undefined && !Array.isArray(params) && (_typeof(params) !== "object" || params === null))) {
                _context2.next = 7;
                break;
              }
              throw _ethRpcErrors.ethErrors.rpc.invalidRequest({
                message: messages.errors.invalidRequestParams(),
                data: args
              });
            case 7:
              return _context2.abrupt("return", new Promise(function (resolve, reject) {
                _this2._rpcRequest({
                  method: method,
                  params: params
                }, getRpcPromiseCallback(resolve, reject));
              }));
            case 8:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function request(_x3) {
        return _request.apply(this, arguments);
      }
      return request;
    }()
    /**
     * Submits an RPC request per the given JSON-RPC request object.
     *
     * @param payload - The RPC request object.
     * @param cb - The callback function.
     */
    )
  }, {
    key: "sendAsync",
    value: function sendAsync(payload, callback) {
      this._rpcRequest(payload, callback);
    }
    /**
     * We override the following event methods so that we can warn consumers
     * about deprecated events:
     *   addListener, on, once, prependListener, prependOnceListener
     */
  }, {
    key: "addListener",
    value: function addListener(eventName, listener) {
      this._warnOfDeprecation(eventName);
      return _superPropGet(TorusInpageProvider, "addListener", this, 3)([eventName, listener]);
    }
  }, {
    key: "on",
    value: function on(eventName, listener) {
      this._warnOfDeprecation(eventName);
      return _superPropGet(TorusInpageProvider, "on", this, 3)([eventName, listener]);
    }
  }, {
    key: "once",
    value: function once(eventName, listener) {
      this._warnOfDeprecation(eventName);
      return _superPropGet(TorusInpageProvider, "once", this, 3)([eventName, listener]);
    }
  }, {
    key: "prependListener",
    value: function prependListener(eventName, listener) {
      this._warnOfDeprecation(eventName);
      return _superPropGet(TorusInpageProvider, "prependListener", this, 3)([eventName, listener]);
    }
  }, {
    key: "prependOnceListener",
    value: function prependOnceListener(eventName, listener) {
      this._warnOfDeprecation(eventName);
      return _superPropGet(TorusInpageProvider, "prependOnceListener", this, 3)([eventName, listener]);
    }
    // Private Methods
    //= ===================
    /**
     * Constructor helper.
     * Populates initial state by calling 'wallet_getProviderState' and emits
     * necessary events.
     */
  }, {
    key: "_initializeState",
    value: function () {
      var _initializeState2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var _yield$this$request, accounts, chainId, isUnlocked, networkVersion;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return this.request({
                method: "wallet_getProviderState"
              });
            case 3:
              _yield$this$request = _context3.sent;
              accounts = _yield$this$request.accounts;
              chainId = _yield$this$request.chainId;
              isUnlocked = _yield$this$request.isUnlocked;
              networkVersion = _yield$this$request.networkVersion;
              // indicate that we've connected, for EIP-1193 compliance
              this.emit("connect", {
                chainId: chainId
              });
              this._handleChainChanged({
                chainId: chainId,
                networkVersion: networkVersion
              });
              this._handleUnlockStateChanged({
                accounts: accounts,
                isUnlocked: isUnlocked
              });
              this._handleAccountsChanged(accounts);
              _context3.next = 17;
              break;
            case 14:
              _context3.prev = 14;
              _context3.t0 = _context3["catch"](0);
              log.error("MetaMask: Failed to get initial state. Please report this bug.", _context3.t0);
            case 17:
              _context3.prev = 17;
              log.info("initialized state");
              this._state.initialized = true;
              this.emit("_initialized");
              return _context3.finish(17);
            case 22:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[0, 14, 17, 22]]);
      }));
      function _initializeState() {
        return _initializeState2.apply(this, arguments);
      }
      return _initializeState;
    }()
    /**
     * Internal RPC method. Forwards requests to background via the RPC engine.
     * Also remap ids inbound and outbound.
     *
     * @param payload - The RPC request object.
     * @param callback - The consumer's callback.
     * @param isInternal - false - Whether the request is internal.
     */
  }, {
    key: "_rpcRequest",
    value: function _rpcRequest(payload, callback) {
      var _this3 = this;
      var isInternal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var cb = callback;
      var _payload = payload;
      if (!Array.isArray(_payload)) {
        if (!_payload.jsonrpc) {
          _payload.jsonrpc = "2.0";
        }
        if (_payload.method === "eth_accounts" || _payload.method === "eth_requestAccounts") {
          // handle accounts changing
          cb = function cb(err, res) {
            _this3._handleAccountsChanged(res.result || [], _payload.method === "eth_accounts", isInternal);
            callback(err, res);
          };
        } else if (_payload.method === "wallet_getProviderState") {
          this._rpcEngine.handle(payload, cb);
          return;
        }
      }
      this.tryPreopenHandle(_payload, cb);
    }
  }, {
    key: "send",
    value: function send(methodOrPayload, callbackOrArgs) {
      var _this4 = this;
      if (!this._sentWarnings.send) {
        log.warn(messages.warnings.sendDeprecation);
        this._sentWarnings.send = true;
      }
      if (typeof methodOrPayload === "string" && (!callbackOrArgs || Array.isArray(callbackOrArgs))) {
        return new Promise(function (resolve, reject) {
          try {
            _this4._rpcRequest({
              method: methodOrPayload,
              params: callbackOrArgs
            }, getRpcPromiseCallback(resolve, reject, false));
          } catch (error) {
            reject(error);
          }
        });
      }
      if (methodOrPayload && _typeof(methodOrPayload) === "object" && typeof callbackOrArgs === "function") {
        return this._rpcRequest(methodOrPayload, callbackOrArgs);
      }
      return this._sendSync(methodOrPayload);
    }
    /**
     * DEPRECATED.
     * Internal backwards compatibility method, used in send.
     */
  }, {
    key: "_sendSync",
    value: function _sendSync(payload) {
      var result;
      switch (payload.method) {
        case "eth_accounts":
          result = this.selectedAddress ? [this.selectedAddress] : [];
          break;
        case "eth_coinbase":
          result = this.selectedAddress || null;
          break;
        case "eth_uninstallFilter":
          this._rpcRequest(payload, NOOP);
          result = true;
          break;
        case "net_version":
          result = this.networkVersion || null;
          break;
        default:
          throw new Error(messages.errors.unsupportedSync(payload.method));
      }
      return {
        id: payload.id,
        jsonrpc: payload.jsonrpc,
        result: result
      };
    }
    /**
     * When the provider becomes connected, updates internal state and emits
     * required events. Idempotent.
     *
     * @param chainId - The ID of the newly connected chain.
     * emits MetaMaskInpageProvider#connect
     */
  }, {
    key: "_handleConnect",
    value: function _handleConnect(chainId) {
      if (!this._state.isConnected) {
        this._state.isConnected = true;
        this.emit("connect", {
          chainId: chainId
        });
        log.debug(messages.info.connected(chainId));
      }
    }
    /**
     * When the provider becomes disconnected, updates internal state and emits
     * required events. Idempotent with respect to the isRecoverable parameter.
     *
     * Error codes per the CloseEvent status codes as required by EIP-1193:
     * https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#Status_codes
     *
     * @param isRecoverable - Whether the disconnection is recoverable.
     * @param errorMessage - A custom error message.
     * emits MetaMaskInpageProvider#disconnect
     */
  }, {
    key: "_handleDisconnect",
    value: function _handleDisconnect(isRecoverable, errorMessage) {
      if (this._state.isConnected || !this._state.isPermanentlyDisconnected && !isRecoverable) {
        this._state.isConnected = false;
        var error;
        if (isRecoverable) {
          error = new _ethRpcErrors.EthereumRpcError(1013,
          // Try again later
          errorMessage || messages.errors.disconnected());
          log.debug(error);
        } else {
          error = new _ethRpcErrors.EthereumRpcError(1011,
          // Internal error
          errorMessage || messages.errors.permanentlyDisconnected());
          log.error(error);
          this.chainId = null;
          this._state.accounts = null;
          this.selectedAddress = null;
          this._state.isUnlocked = false;
          this._state.isPermanentlyDisconnected = true;
        }
        this.emit("disconnect", error);
      }
    }
    /**
     * Called when connection is lost to critical streams.
     *
     * emits MetamaskInpageProvider#disconnect
     */
  }, {
    key: "_handleStreamDisconnect",
    value: function _handleStreamDisconnect(streamName, error) {
      logStreamDisconnectWarning(streamName, error, this);
      this._handleDisconnect(false, error ? error.message : undefined);
    }
    /**
     * Called when accounts may have changed.
     */
  }, {
    key: "_handleAccountsChanged",
    value: function _handleAccountsChanged(accounts) {
      var isEthAccounts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var isInternal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      // defensive programming
      var finalAccounts = accounts;
      if (!Array.isArray(finalAccounts)) {
        log.error("MetaMask: Received non-array accounts parameter. Please report this bug.", finalAccounts);
        finalAccounts = [];
      }
      var _iterator = _createForOfIteratorHelper(accounts),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var account = _step.value;
          if (typeof account !== "string") {
            log.error("MetaMask: Received non-string account. Please report this bug.", accounts);
            finalAccounts = [];
            break;
          }
        }
        // emit accountsChanged if anything about the accounts array has changed
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (!(0, _fastDeepEqual.default)(this._state.accounts, finalAccounts)) {
        // we should always have the correct accounts even before eth_accounts
        // returns, except in cases where isInternal is true
        if (isEthAccounts && Array.isArray(this._state.accounts) && this._state.accounts.length > 0 && !isInternal) {
          log.error('MetaMask: "eth_accounts" unexpectedly updated accounts. Please report this bug.', finalAccounts);
        }
        this._state.accounts = finalAccounts;
        this.emit("accountsChanged", finalAccounts);
      }
      // handle selectedAddress
      if (this.selectedAddress !== finalAccounts[0]) {
        this.selectedAddress = finalAccounts[0] || null;
      }
    }
    /**
     * Upon receipt of a new chainId and networkVersion, emits corresponding
     * events and sets relevant public state.
     * Does nothing if neither the chainId nor the networkVersion are different
     * from existing values.
     *
     * emits MetamaskInpageProvider#chainChanged
     * @param networkInfo - An object with network info.
     */
  }, {
    key: "_handleChainChanged",
    value: function _handleChainChanged() {
      var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        chainId = _ref6.chainId,
        networkVersion = _ref6.networkVersion;
      if (!chainId || !networkVersion) {
        log.error("MetaMask: Received invalid network parameters. Please report this bug.", {
          chainId: chainId,
          networkVersion: networkVersion
        });
        return;
      }
      if (networkVersion === "loading") {
        this._handleDisconnect(true);
      } else {
        this._handleConnect(chainId);
        if (chainId !== this.chainId) {
          this.chainId = chainId;
          if (this._state.initialized) {
            this.emit("chainChanged", this.chainId);
          }
        }
      }
    }
    /**
     * Upon receipt of a new isUnlocked state, sets relevant public state.
     * Calls the accounts changed handler with the received accounts, or an empty
     * array.
     *
     * Does nothing if the received value is equal to the existing value.
     * There are no lock/unlock events.
     *
     * @param opts - Options bag.
     */
  }, {
    key: "_handleUnlockStateChanged",
    value: function _handleUnlockStateChanged() {
      var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        accounts = _ref7.accounts,
        isUnlocked = _ref7.isUnlocked;
      if (typeof isUnlocked !== "boolean") {
        log.error("MetaMask: Received invalid isUnlocked parameter. Please report this bug.", {
          isUnlocked: isUnlocked
        });
        return;
      }
      if (isUnlocked !== this._state.isUnlocked) {
        this._state.isUnlocked = isUnlocked;
        this._handleAccountsChanged(accounts || []);
      }
    }
    /**
     * Warns of deprecation for the given event, if applicable.
     */
  }, {
    key: "_warnOfDeprecation",
    value: function _warnOfDeprecation(eventName) {
      if (this._sentWarnings.events[eventName] === false) {
        log.warn(messages.warnings.events[eventName]);
        this._sentWarnings.events[eventName] = true;
      }
    }
  }]);
}(_openloginJrpc.SafeEventEmitter);
(0, _defineProperty3.default)(TorusInpageProvider, "_defaultState", {
  accounts: null,
  isConnected: false,
  isUnlocked: false,
  initialized: false,
  isPermanentlyDisconnected: false,
  hasEmittedConnection: false
});
var defaults = function defaults(options) {
  return {
    algorithms: options.algorithms || ["sha256"],
    delimiter: options.delimiter || " ",
    full: options.full || false
  };
};
// Generate list of hashes
var hashes = function hashes(options, data) {
  var internalHashes = {};
  options.algorithms.forEach(function (algorithm) {
    internalHashes[algorithm] = (0, _createHash.default)(algorithm).update(data, "utf8").digest("base64");
  });
  return internalHashes;
};
// Build an integrity string
var integrity = function integrity(options, sri) {
  var output = "";
  // Hash list
  output += Object.keys(sri.hashes).map(function (algorithm) {
    return "".concat(algorithm, "-").concat(sri.hashes[algorithm]);
  }).join(options.delimiter);
  return output;
};
var main = function main(options, data) {
  // Defaults
  var finalOptions = defaults(options);
  var sri = {
    hashes: hashes(finalOptions, data),
    integrity: undefined
  };
  sri.integrity = integrity(finalOptions, sri);
  return finalOptions.full ? sri : sri.integrity;
};
var PopupHandler = /*#__PURE__*/function (_EventEmitter) {
  function PopupHandler(_ref) {
    var _this5;
    _classCallCheck(this, PopupHandler);
    var url = _ref.url,
      target = _ref.target,
      features = _ref.features;
    _this5 = _callSuper(this, PopupHandler);
    (0, _defineProperty3.default)(_this5, "url", void 0);
    (0, _defineProperty3.default)(_this5, "target", void 0);
    (0, _defineProperty3.default)(_this5, "features", void 0);
    (0, _defineProperty3.default)(_this5, "window", void 0);
    (0, _defineProperty3.default)(_this5, "windowTimer", void 0);
    (0, _defineProperty3.default)(_this5, "iClosedWindow", void 0);
    _this5.url = url;
    _this5.target = target || "_blank";
    _this5.features = features || getPopupFeatures();
    _this5.window = undefined;
    _this5.windowTimer = undefined;
    _this5.iClosedWindow = false;
    _this5._setupTimer();
    return _this5;
  }
  _inherits(PopupHandler, _EventEmitter);
  return _createClass(PopupHandler, [{
    key: "_setupTimer",
    value: function _setupTimer() {
      var _this6 = this;
      this.windowTimer = Number(setInterval(function () {
        if (_this6.window && _this6.window.closed) {
          clearInterval(_this6.windowTimer);
          if (!_this6.iClosedWindow) {
            _this6.emit("close");
          }
          _this6.iClosedWindow = false;
          _this6.window = undefined;
        }
        if (_this6.window === undefined) clearInterval(_this6.windowTimer);
      }, 500));
    }
  }, {
    key: "open",
    value: function open() {
      this.window = window.open(this.url.href, this.target, this.features);
      if (this.window?.focus) this.window.focus();
    }
  }, {
    key: "close",
    value: function close() {
      this.iClosedWindow = true;
      if (this.window) this.window.close();
    }
  }, {
    key: "redirect",
    value: function redirect(locationReplaceOnRedirect) {
      if (locationReplaceOnRedirect) {
        window.location.replace(this.url.href);
      } else {
        window.location.href = this.url.href;
      }
    }
  }]);
}(_events.EventEmitter);
/**
 * Returns whether the given image URL exists
 * @param url - the url of the image
 * @returns - whether the image exists
 */
function imgExists(url) {
  return new Promise(function (resolve, reject) {
    try {
      var img = document.createElement("img");
      img.onload = function () {
        return resolve(true);
      };
      img.onerror = function () {
        return resolve(false);
      };
      img.src = url;
    } catch (e) {
      reject(e);
    }
  });
}
/**
 * Extracts a name for the site from the DOM
 */
var getSiteName = function getSiteName(window) {
  var document = window.document;
  var siteName = document.querySelector('head > meta[property="og:site_name"]');
  if (siteName) {
    return siteName.content;
  }
  var metaTitle = document.querySelector('head > meta[name="title"]');
  if (metaTitle) {
    return metaTitle.content;
  }
  if (document.title && document.title.length > 0) {
    return document.title;
  }
  return window.location.hostname;
};
/**
 * Extracts an icon for the site from the DOM
 */
function getSiteIcon(_x4) {
  return _getSiteIcon.apply(this, arguments);
}
/**
 * Gets site metadata and returns it
 *
 */
function _getSiteIcon() {
  _getSiteIcon = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14(window) {
    var document, icon;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          document = window.document; // Use the site's favicon if it exists
          icon = document.querySelector('head > link[rel="shortcut icon"]');
          _context14.t0 = icon;
          if (!_context14.t0) {
            _context14.next = 7;
            break;
          }
          _context14.next = 6;
          return imgExists(icon.href);
        case 6:
          _context14.t0 = _context14.sent;
        case 7:
          if (!_context14.t0) {
            _context14.next = 9;
            break;
          }
          return _context14.abrupt("return", icon.href);
        case 9:
          // Search through available icons in no particular order
          icon = Array.from(document.querySelectorAll('head > link[rel="icon"]')).find(function (_icon) {
            return Boolean(_icon.href);
          });
          _context14.t1 = icon;
          if (!_context14.t1) {
            _context14.next = 15;
            break;
          }
          _context14.next = 14;
          return imgExists(icon.href);
        case 14:
          _context14.t1 = _context14.sent;
        case 15:
          if (!_context14.t1) {
            _context14.next = 17;
            break;
          }
          return _context14.abrupt("return", icon.href);
        case 17:
          return _context14.abrupt("return", null);
        case 18:
        case "end":
          return _context14.stop();
      }
    }, _callee14);
  }));
  return _getSiteIcon.apply(this, arguments);
}
var getSiteMetadata = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.t0 = getSiteName(window);
          _context4.next = 3;
          return getSiteIcon(window);
        case 3:
          _context4.t1 = _context4.sent;
          return _context4.abrupt("return", {
            name: _context4.t0,
            icon: _context4.t1
          });
        case 5:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function getSiteMetadata() {
    return _ref8.apply(this, arguments);
  };
}();
/**
 * Sends site metadata over an RPC request.
 */
function sendSiteMetadata(_x5) {
  return _sendSiteMetadata.apply(this, arguments);
}
function _sendSiteMetadata() {
  _sendSiteMetadata = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15(engine) {
    var domainMetadata;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _context15.next = 3;
          return getSiteMetadata();
        case 3:
          domainMetadata = _context15.sent;
          // call engine.handle directly to avoid normal RPC request handling
          engine.handle({
            jsonrpc: "2.0",
            id: getPreopenInstanceId(),
            method: "wallet_sendDomainMetadata",
            params: domainMetadata
          }, NOOP);
          _context15.next = 10;
          break;
        case 7:
          _context15.prev = 7;
          _context15.t0 = _context15["catch"](0);
          log.error({
            message: messages.errors.sendSiteMetadata(),
            originalError: _context15.t0
          });
        case 10:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[0, 7]]);
  }));
  return _sendSiteMetadata.apply(this, arguments);
}
var _excluded = ["host", "chainId", "networkName"];
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
      (0, _defineProperty3.default)(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
var defaultVerifiers = _defineProperty2(_defineProperty2(_defineProperty2(_defineProperty2(_defineProperty2({}, LOGIN_PROVIDER.GOOGLE, true), LOGIN_PROVIDER.FACEBOOK, true), LOGIN_PROVIDER.REDDIT, true), LOGIN_PROVIDER.TWITCH, true), LOGIN_PROVIDER.DISCORD, true);
var iframeIntegrity = "sha384-QwEWmiPwBSE0zoVFrfYw+zFNBRwBhOo6NucsqlJnGOqpUEVaRo1UOMrAKDykq2WP";
var expectedCacheControlHeader = "max-age=3600";
var UNSAFE_METHODS = ["eth_sendTransaction", "eth_signTypedData", "eth_signTypedData_v3", "eth_signTypedData_v4", "personal_sign", "eth_getEncryptionPublicKey", "eth_decrypt", "wallet_addEthereumChain", "wallet_switchEthereumChain"];
// preload for iframe doesn't work https://bugs.chromium.org/p/chromium/issues/detail?id=593267
(function () {
  var _preLoadIframe = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    var torusIframeHtml, _yield$getTorusUrl, torusUrl;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          if (!(typeof document === "undefined")) {
            _context5.next = 3;
            break;
          }
          return _context5.abrupt("return");
        case 3:
          torusIframeHtml = document.createElement("link");
          _context5.next = 6;
          return getTorusUrl("production", {
            check: false,
            hash: iframeIntegrity,
            version: ""
          });
        case 6:
          _yield$getTorusUrl = _context5.sent;
          torusUrl = _yield$getTorusUrl.torusUrl;
          torusIframeHtml.href = "".concat(torusUrl, "/popup");
          torusIframeHtml.crossOrigin = "anonymous";
          torusIframeHtml.type = "text/html";
          torusIframeHtml.rel = "prefetch";
          if (torusIframeHtml.relList && torusIframeHtml.relList.supports) {
            if (torusIframeHtml.relList.supports("prefetch")) {
              document.head.appendChild(torusIframeHtml);
            }
          }
          _context5.next = 18;
          break;
        case 15:
          _context5.prev = 15;
          _context5.t0 = _context5["catch"](0);
          log.warn(_context5.t0);
        case 18:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 15]]);
  }));
  function preLoadIframe() {
    return _preLoadIframe.apply(this, arguments);
  }
  return preLoadIframe;
})()();
var Torus = exports.default = /*#__PURE__*/function () {
  function Torus() {
    _classCallCheck(this, Torus);
    var _ref9 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref9$buttonPosition = _ref9.buttonPosition,
      buttonPosition = _ref9$buttonPosition === void 0 ? BUTTON_POSITION.BOTTOM_LEFT : _ref9$buttonPosition,
      _ref9$buttonSize = _ref9.buttonSize,
      buttonSize = _ref9$buttonSize === void 0 ? 56 : _ref9$buttonSize,
      _ref9$modalZIndex = _ref9.modalZIndex,
      modalZIndex = _ref9$modalZIndex === void 0 ? 99999 : _ref9$modalZIndex,
      _ref9$apiKey = _ref9.apiKey,
      apiKey = _ref9$apiKey === void 0 ? "torus-default" : _ref9$apiKey;
    (0, _defineProperty3.default)(this, "buttonPosition", BUTTON_POSITION.BOTTOM_LEFT);
    (0, _defineProperty3.default)(this, "buttonSize", void 0);
    (0, _defineProperty3.default)(this, "torusUrl", void 0);
    (0, _defineProperty3.default)(this, "torusIframe", void 0);
    (0, _defineProperty3.default)(this, "styleLink", void 0);
    (0, _defineProperty3.default)(this, "isLoggedIn", void 0);
    (0, _defineProperty3.default)(this, "isInitialized", void 0);
    (0, _defineProperty3.default)(this, "torusWidgetVisibility", void 0);
    (0, _defineProperty3.default)(this, "torusAlert", void 0);
    (0, _defineProperty3.default)(this, "apiKey", void 0);
    (0, _defineProperty3.default)(this, "modalZIndex", void 0);
    (0, _defineProperty3.default)(this, "alertZIndex", void 0);
    (0, _defineProperty3.default)(this, "torusAlertContainer", void 0);
    (0, _defineProperty3.default)(this, "isIframeFullScreen", void 0);
    (0, _defineProperty3.default)(this, "whiteLabel", void 0);
    (0, _defineProperty3.default)(this, "requestedVerifier", void 0);
    (0, _defineProperty3.default)(this, "currentVerifier", void 0);
    (0, _defineProperty3.default)(this, "embedTranslations", void 0);
    (0, _defineProperty3.default)(this, "ethereum", void 0);
    (0, _defineProperty3.default)(this, "provider", void 0);
    (0, _defineProperty3.default)(this, "communicationMux", void 0);
    (0, _defineProperty3.default)(this, "isLoginCallback", void 0);
    (0, _defineProperty3.default)(this, "paymentProviders", configuration.paymentProviders);
    (0, _defineProperty3.default)(this, "loginHint", "");
    (0, _defineProperty3.default)(this, "useWalletConnect", void 0);
    (0, _defineProperty3.default)(this, "isCustomLogin", false);
    this.buttonPosition = buttonPosition;
    this.buttonSize = buttonSize;
    this.torusUrl = "";
    this.isLoggedIn = false; // ethereum.enable working
    this.isInitialized = false; // init done
    this.torusWidgetVisibility = true;
    this.requestedVerifier = "";
    this.currentVerifier = "";
    // this.nodeDetailManager = new NodeDetailManager();
    // this.torusJs = new TorusJs({
    //   metadataHost: "https://metadata.tor.us",
    //   allowHost: "https://signer.tor.us/api/allow",
    //   network: "mainnet",
    // });
    this.apiKey = apiKey;
    (0, _httpHelpers.setAPIKey)(apiKey);
    this.modalZIndex = modalZIndex;
    this.alertZIndex = modalZIndex + 1000;
    this.isIframeFullScreen = false;
  }
  return _createClass(Torus, [{
    key: "init",
    value: function () {
      var _init = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
        var _this7 = this;
        var _ref10,
          _ref10$buildEnv,
          buildEnv,
          _ref10$enableLogging,
          enableLogging,
          _ref10$enabledVerifie,
          enabledVerifiers,
          _ref10$network,
          network,
          _ref10$loginConfig,
          loginConfig,
          _ref10$showTorusButto,
          showTorusButton,
          _ref10$integrity,
          integrity,
          whiteLabel,
          _ref10$skipTKey,
          skipTKey,
          _ref10$useWalletConne,
          useWalletConnect,
          _ref10$mfaLevel,
          mfaLevel,
          _yield$getTorusUrl2,
          torusUrl,
          logLevel,
          torusIframeUrl,
          link,
          _ref11,
          _ref11$defaultLanguag,
          defaultLanguage,
          _ref11$customTranslat,
          customTranslations,
          mergedTranslations,
          languageTranslations,
          handleSetup,
          fetchUrl,
          resp,
          response,
          calculatedIntegrity,
          _args8 = arguments;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _ref10 = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : {}, _ref10$buildEnv = _ref10.buildEnv, buildEnv = _ref10$buildEnv === void 0 ? TORUS_BUILD_ENV.PRODUCTION : _ref10$buildEnv, _ref10$enableLogging = _ref10.enableLogging, enableLogging = _ref10$enableLogging === void 0 ? false : _ref10$enableLogging, _ref10$enabledVerifie = _ref10.enabledVerifiers, enabledVerifiers = _ref10$enabledVerifie === void 0 ? defaultVerifiers : _ref10$enabledVerifie, _ref10$network = _ref10.network, network = _ref10$network === void 0 ? {
                host: "mainnet",
                chainId: null,
                networkName: "",
                blockExplorer: "",
                ticker: "",
                tickerName: ""
              } : _ref10$network, _ref10$loginConfig = _ref10.loginConfig, loginConfig = _ref10$loginConfig === void 0 ? {} : _ref10$loginConfig, _ref10$showTorusButto = _ref10.showTorusButton, showTorusButton = _ref10$showTorusButto === void 0 ? true : _ref10$showTorusButto, _ref10$integrity = _ref10.integrity, integrity = _ref10$integrity === void 0 ? {
                check: false,
                hash: iframeIntegrity,
                version: ""
              } : _ref10$integrity, whiteLabel = _ref10.whiteLabel, _ref10$skipTKey = _ref10.skipTKey, skipTKey = _ref10$skipTKey === void 0 ? false : _ref10$skipTKey, _ref10$useWalletConne = _ref10.useWalletConnect, useWalletConnect = _ref10$useWalletConne === void 0 ? false : _ref10$useWalletConne, _ref10$mfaLevel = _ref10.mfaLevel, mfaLevel = _ref10$mfaLevel === void 0 ? "default" : _ref10$mfaLevel;
              if (!this.isInitialized) {
                _context8.next = 3;
                break;
              }
              throw new Error("Already initialized");
            case 3:
              _context8.next = 5;
              return getTorusUrl(buildEnv, integrity);
            case 5:
              _yield$getTorusUrl2 = _context8.sent;
              torusUrl = _yield$getTorusUrl2.torusUrl;
              logLevel = _yield$getTorusUrl2.logLevel;
              log.info(torusUrl, "url loaded");
              this.torusUrl = torusUrl;
              this.whiteLabel = whiteLabel;
              this.useWalletConnect = useWalletConnect;
              this.isCustomLogin = !!(loginConfig && Object.keys(loginConfig).length > 0) || !!(whiteLabel && Object.keys(whiteLabel).length > 0);
              log.setDefaultLevel(logLevel);
              if (enableLogging) log.enableAll();else log.disableAll();
              this.torusWidgetVisibility = showTorusButton;
              torusIframeUrl = new URL(torusUrl);
              if (torusIframeUrl.pathname.endsWith("/")) torusIframeUrl.pathname += "popup";else torusIframeUrl.pathname += "/popup";
              torusIframeUrl.hash = "#isCustomLogin=".concat(this.isCustomLogin);
              // Iframe code
              this.torusIframe = htmlToElement("<iframe\n        id=\"torusIframe\"\n        allow=".concat(useWalletConnect ? "camera" : "", "\n        class=\"torusIframe\"\n        src=\"").concat(torusIframeUrl.href, "\"\n        style=\"display: none; position: fixed; top: 0; right: 0; width: 100%; color-scheme: none;\n        height: 100%; border: none; border-radius: 0; z-index: ").concat(this.modalZIndex, "\"\n      ></iframe>"));
              this.torusAlertContainer = htmlToElement('<div id="torusAlertContainer"></div>');
              this.torusAlertContainer.style.display = "none";
              this.torusAlertContainer.style.setProperty("z-index", this.alertZIndex.toString());
              link = window.document.createElement("link");
              link.setAttribute("rel", "stylesheet");
              link.setAttribute("type", "text/css");
              link.setAttribute("href", "".concat(torusUrl, "/css/widget.css"));
              this.styleLink = link;
              _ref11 = this.whiteLabel || {}, _ref11$defaultLanguag = _ref11.defaultLanguage, defaultLanguage = _ref11$defaultLanguag === void 0 ? getUserLanguage() : _ref11$defaultLanguag, _ref11$customTranslat = _ref11.customTranslations, customTranslations = _ref11$customTranslat === void 0 ? {} : _ref11$customTranslat;
              mergedTranslations = (0, _lodash.default)(configuration.translations, customTranslations);
              languageTranslations = mergedTranslations[defaultLanguage] || configuration.translations[getUserLanguage()];
              this.embedTranslations = languageTranslations.embed;
              handleSetup = /*#__PURE__*/function () {
                var _ref12 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
                  return _regeneratorRuntime().wrap(function _callee7$(_context7) {
                    while (1) switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.next = 2;
                        return documentReady();
                      case 2:
                        return _context7.abrupt("return", new Promise(function (resolve, reject) {
                          _this7.torusIframe.onload = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
                            var initStream;
                            return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                              while (1) switch (_context6.prev = _context6.next) {
                                case 0:
                                  // only do this if iframe is not full screen
                                  _this7._setupWeb3();
                                  initStream = _this7.communicationMux.getStream("init_stream");
                                  initStream.on("data", function (chunk) {
                                    var name = chunk.name,
                                      data = chunk.data,
                                      error = chunk.error;
                                    if (name === "init_complete" && data.success) {
                                      // resolve promise
                                      _this7.isInitialized = true;
                                      _this7._displayIframe(_this7.isIframeFullScreen);
                                      resolve(undefined);
                                    } else if (error) {
                                      reject(new Error(error));
                                    }
                                  });
                                  initStream.write({
                                    name: "init_stream",
                                    data: {
                                      enabledVerifiers: enabledVerifiers,
                                      loginConfig: loginConfig,
                                      whiteLabel: _this7.whiteLabel,
                                      buttonPosition: _this7.buttonPosition,
                                      buttonSize: _this7.buttonSize,
                                      torusWidgetVisibility: _this7.torusWidgetVisibility,
                                      apiKey: _this7.apiKey,
                                      skipTKey: skipTKey,
                                      network: network,
                                      mfaLevel: mfaLevel
                                    }
                                  });
                                case 4:
                                case "end":
                                  return _context6.stop();
                              }
                            }, _callee6);
                          }));
                          window.document.head.appendChild(_this7.styleLink);
                          window.document.body.appendChild(_this7.torusIframe);
                          window.document.body.appendChild(_this7.torusAlertContainer);
                        }));
                      case 3:
                      case "end":
                        return _context7.stop();
                    }
                  }, _callee7);
                }));
                return function handleSetup() {
                  return _ref12.apply(this, arguments);
                };
              }();
              if (!(buildEnv === "production" && integrity.check)) {
                _context8.next = 54;
                break;
              }
              // hacky solution to check for iframe integrity
              fetchUrl = "".concat(torusUrl, "/popup");
              _context8.next = 37;
              return fetch(fetchUrl, {
                cache: "reload"
              });
            case 37:
              resp = _context8.sent;
              if (!(resp.headers.get("Cache-Control") !== expectedCacheControlHeader)) {
                _context8.next = 40;
                break;
              }
              throw new Error("Unexpected Cache-Control headers, got ".concat(resp.headers.get("Cache-Control")));
            case 40:
              _context8.next = 42;
              return resp.text();
            case 42:
              response = _context8.sent;
              calculatedIntegrity = main({
                algorithms: ["sha384"]
              }, response);
              log.info(calculatedIntegrity, "integrity");
              if (!(calculatedIntegrity === integrity.hash)) {
                _context8.next = 50;
                break;
              }
              _context8.next = 48;
              return handleSetup();
            case 48:
              _context8.next = 52;
              break;
            case 50:
              this.clearInit();
              throw new Error("Integrity check failed");
            case 52:
              _context8.next = 56;
              break;
            case 54:
              _context8.next = 56;
              return handleSetup();
            case 56:
              return _context8.abrupt("return", undefined);
            case 57:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function init() {
        return _init.apply(this, arguments);
      }
      return init;
    }()
  }, {
    key: "login",
    value: function login() {
      var _ref14 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref14$verifier = _ref14.verifier,
        verifier = _ref14$verifier === void 0 ? "" : _ref14$verifier,
        _ref14$login_hint = _ref14.login_hint,
        loginHint = _ref14$login_hint === void 0 ? "" : _ref14$login_hint;
      if (!this.isInitialized) throw new Error("Call init() first");
      this.requestedVerifier = verifier;
      this.loginHint = loginHint;
      return this.ethereum.enable();
    }
  }, {
    key: "logout",
    value: function logout() {
      var _this8 = this;
      return new Promise(function (resolve, reject) {
        if (!_this8.isLoggedIn) {
          reject(new Error("User has not logged in yet"));
          return;
        }
        var logOutStream = _this8.communicationMux.getStream("logout");
        logOutStream.write({
          name: "logOut"
        });
        var statusStream = _this8.communicationMux.getStream("status");
        var statusStreamHandler = function statusStreamHandler(status) {
          if (!status.loggedIn) {
            _this8.isLoggedIn = false;
            _this8.currentVerifier = "";
            _this8.requestedVerifier = "";
            resolve();
          } else reject(new Error("Some Error Occured"));
        };
        handleStream(statusStream, "data", statusStreamHandler);
      });
    }
  }, {
    key: "cleanUp",
    value: function () {
      var _cleanUp = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              if (!this.isLoggedIn) {
                _context9.next = 3;
                break;
              }
              _context9.next = 3;
              return this.logout();
            case 3:
              this.clearInit();
            case 4:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this);
      }));
      function cleanUp() {
        return _cleanUp.apply(this, arguments);
      }
      return cleanUp;
    }()
  }, {
    key: "clearInit",
    value: function clearInit() {
      function isElement(element) {
        return element instanceof Element || element instanceof HTMLDocument;
      }
      if (isElement(this.styleLink) && window.document.body.contains(this.styleLink)) {
        this.styleLink.remove();
        this.styleLink = undefined;
      }
      if (isElement(this.torusIframe) && window.document.body.contains(this.torusIframe)) {
        this.torusIframe.remove();
        this.torusIframe = undefined;
      }
      if (isElement(this.torusAlertContainer) && window.document.body.contains(this.torusAlertContainer)) {
        this.torusAlert = undefined;
        this.torusAlertContainer.remove();
        this.torusAlertContainer = undefined;
      }
      this.isInitialized = false;
    }
  }, {
    key: "hideTorusButton",
    value: function hideTorusButton() {
      this.torusWidgetVisibility = false;
      this._sendWidgetVisibilityStatus(false);
      this._displayIframe();
    }
  }, {
    key: "showTorusButton",
    value: function showTorusButton() {
      this.torusWidgetVisibility = true;
      this._sendWidgetVisibilityStatus(true);
      this._displayIframe();
    }
  }, {
    key: "setProvider",
    value: function setProvider(_ref) {
      var _this9 = this;
      var _ref$host = _ref.host,
        host = _ref$host === void 0 ? "mainnet" : _ref$host,
        _ref$chainId = _ref.chainId,
        chainId = _ref$chainId === void 0 ? null : _ref$chainId,
        _ref$networkName = _ref.networkName,
        networkName = _ref$networkName === void 0 ? "" : _ref$networkName,
        rest = (0, _objectWithoutProperties2.default)(_ref, _excluded);
      return new Promise(function (resolve, reject) {
        var providerChangeStream = _this9.communicationMux.getStream("provider_change");
        var handler = function handler(chunk) {
          var _chunk$data = chunk.data,
            err = _chunk$data.err,
            success = _chunk$data.success;
          log.info(chunk);
          if (err) {
            reject(err);
          } else if (success) {
            resolve();
          } else reject(new Error("some error occured"));
        };
        handleStream(providerChangeStream, "data", handler);
        var preopenInstanceId = getPreopenInstanceId();
        _this9._handleWindow(preopenInstanceId, {
          target: "_blank",
          features: FEATURES_PROVIDER_CHANGE_WINDOW
        });
        providerChangeStream.write({
          name: "show_provider_change",
          data: {
            network: _objectSpread({
              host: host,
              chainId: chainId,
              networkName: networkName
            }, rest),
            preopenInstanceId: preopenInstanceId,
            override: false
          }
        });
      });
    }
  }, {
    key: "showWallet",
    value: function showWallet(path) {
      var _this10 = this;
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var showWalletStream = this.communicationMux.getStream("show_wallet");
      var finalPath = path ? "/".concat(path) : "";
      showWalletStream.write({
        name: "show_wallet",
        data: {
          path: finalPath
        }
      });
      var showWalletHandler = function showWalletHandler(chunk) {
        if (chunk.name === "show_wallet_instance") {
          // Let the error propogate up (hence, no try catch)
          var instanceId = chunk.data.instanceId;
          var finalUrl = new URL("".concat(_this10.torusUrl, "/wallet").concat(finalPath));
          // Using URL constructor to prevent js injection and allow parameter validation.!
          finalUrl.searchParams.append("integrity", "true");
          finalUrl.searchParams.append("instanceId", instanceId);
          Object.keys(params).forEach(function (x) {
            finalUrl.searchParams.append(x, params[x]);
          });
          finalUrl.hash = "#isCustomLogin=".concat(_this10.isCustomLogin);
          var walletWindow = new PopupHandler({
            url: finalUrl,
            features: FEATURES_DEFAULT_WALLET_WINDOW
          });
          walletWindow.open();
        }
      };
      handleStream(showWalletStream, "data", showWalletHandler);
    }
  }, {
    key: "getPublicAddress",
    value: function () {
      var _getPublicAddress = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(_ref2) {
        var verifier, verifierId, _ref2$isExtended, isExtended, walletVerifier, openloginVerifier, url;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              verifier = _ref2.verifier, verifierId = _ref2.verifierId, _ref2$isExtended = _ref2.isExtended, isExtended = _ref2$isExtended === void 0 ? false : _ref2$isExtended;
              if (!(!configuration.supportedVerifierList.includes(verifier) || !WALLET_OPENLOGIN_VERIFIER_MAP[verifier])) {
                _context10.next = 3;
                break;
              }
              throw new Error("Unsupported verifier");
            case 3:
              walletVerifier = verifier;
              openloginVerifier = WALLET_OPENLOGIN_VERIFIER_MAP[verifier];
              url = new URL("https://api.tor.us/lookup/torus");
              url.searchParams.append("verifier", openloginVerifier);
              url.searchParams.append("verifierId", verifierId);
              url.searchParams.append("walletVerifier", walletVerifier);
              url.searchParams.append("network", "mainnet");
              url.searchParams.append("isExtended", isExtended.toString());
              return _context10.abrupt("return", (0, _httpHelpers.get)(url.href, {
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              }, {
                useAPIKey: true
              }));
            case 12:
            case "end":
              return _context10.stop();
          }
        }, _callee10);
      }));
      function getPublicAddress(_x6) {
        return _getPublicAddress.apply(this, arguments);
      }
      return getPublicAddress;
    }()
  }, {
    key: "getUserInfo",
    value: function getUserInfo(message) {
      var _this11 = this;
      return new Promise(function (resolve, reject) {
        if (_this11.isLoggedIn) {
          var userInfoAccessStream = _this11.communicationMux.getStream("user_info_access");
          userInfoAccessStream.write({
            name: "user_info_access_request"
          });
          var userInfoAccessHandler = function userInfoAccessHandler(chunk) {
            var name = chunk.name,
              _chunk$data2 = chunk.data,
              approved = _chunk$data2.approved,
              payload = _chunk$data2.payload,
              rejected = _chunk$data2.rejected,
              newRequest = _chunk$data2.newRequest;
            if (name === "user_info_access_response") {
              if (approved) {
                resolve(payload);
              } else if (rejected) {
                reject(new Error("User rejected the request"));
              } else if (newRequest) {
                var userInfoStream = _this11.communicationMux.getStream("user_info");
                var userInfoHandler = function userInfoHandler(handlerChunk) {
                  if (handlerChunk.name === "user_info_response") {
                    if (handlerChunk.data.approved) {
                      resolve(handlerChunk.data.payload);
                    } else {
                      reject(new Error("User rejected the request"));
                    }
                  }
                };
                handleStream(userInfoStream, "data", userInfoHandler);
                var preopenInstanceId = getPreopenInstanceId();
                _this11._handleWindow(preopenInstanceId, {
                  target: "_blank",
                  features: FEATURES_PROVIDER_CHANGE_WINDOW
                });
                userInfoStream.write({
                  name: "user_info_request",
                  data: {
                    message: message,
                    preopenInstanceId: preopenInstanceId
                  }
                });
              }
            }
          };
          handleStream(userInfoAccessStream, "data", userInfoAccessHandler);
        } else reject(new Error("User has not logged in yet"));
      });
    }
  }, {
    key: "initiateTopup",
    value: function initiateTopup(provider, params) {
      var _this12 = this;
      return new Promise(function (resolve, reject) {
        if (_this12.isInitialized) {
          var _validatePaymentProvi = validatePaymentProvider(provider, params),
            errors = _validatePaymentProvi.errors,
            isValid = _validatePaymentProvi.isValid;
          if (!isValid) {
            reject(new Error(JSON.stringify(errors)));
            return;
          }
          var topupStream = _this12.communicationMux.getStream("topup");
          var topupHandler = function topupHandler(chunk) {
            if (chunk.name === "topup_response") {
              if (chunk.data.success) {
                resolve(chunk.data.success);
              } else {
                reject(new Error(chunk.data.error));
              }
            }
          };
          handleStream(topupStream, "data", topupHandler);
          var preopenInstanceId = getPreopenInstanceId();
          _this12._handleWindow(preopenInstanceId);
          topupStream.write({
            name: "topup_request",
            data: {
              provider: provider,
              params: params,
              preopenInstanceId: preopenInstanceId
            }
          });
        } else reject(new Error("Torus is not initialized yet"));
      });
    }
  }, {
    key: "loginWithPrivateKey",
    value: function () {
      var _loginWithPrivateKey = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(loginParams) {
        var _this13 = this;
        var privateKey, userInfo;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              privateKey = loginParams.privateKey, userInfo = loginParams.userInfo;
              return _context11.abrupt("return", new Promise(function (resolve, reject) {
                if (_this13.isInitialized) {
                  if (Buffer.from(privateKey, "hex").length !== 32) {
                    reject(new Error("Invalid private key, Please provide a 32 byte valid secp25k1 private key"));
                    return;
                  }
                  var loginPrivKeyStream = _this13.communicationMux.getStream("login_with_private_key");
                  var loginHandler = function loginHandler(chunk) {
                    if (chunk.name === "login_with_private_key_response") {
                      if (chunk.data.success) {
                        resolve(chunk.data.success);
                      } else {
                        reject(new Error(chunk.data.error));
                      }
                    }
                  };
                  handleStream(loginPrivKeyStream, "data", loginHandler);
                  loginPrivKeyStream.write({
                    name: "login_with_private_key_request",
                    data: {
                      privateKey: privateKey,
                      userInfo: userInfo
                    }
                  });
                } else reject(new Error("Torus is not initialized yet"));
              }));
            case 2:
            case "end":
              return _context11.stop();
          }
        }, _callee11);
      }));
      function loginWithPrivateKey(_x7) {
        return _loginWithPrivateKey.apply(this, arguments);
      }
      return loginWithPrivateKey;
    }()
  }, {
    key: "showWalletConnectScanner",
    value: function () {
      var _showWalletConnectScanner = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
        var _this14 = this;
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              if (this.useWalletConnect) {
                _context12.next = 2;
                break;
              }
              throw new Error("Set `useWalletConnect` as true in init function options to use wallet connect scanner");
            case 2:
              return _context12.abrupt("return", new Promise(function (resolve, reject) {
                if (_this14.isLoggedIn) {
                  var walletConnectStream = _this14.communicationMux.getStream("wallet_connect_stream");
                  var walletConnectHandler = function walletConnectHandler(chunk) {
                    if (chunk.name === "wallet_connect_stream_res") {
                      if (chunk.data.success) {
                        resolve(chunk.data.success);
                      } else {
                        reject(new Error(chunk.data.error));
                      }
                      _this14._displayIframe();
                    }
                  };
                  handleStream(walletConnectStream, "data", walletConnectHandler);
                  walletConnectStream.write({
                    name: "wallet_connect_stream_req"
                  });
                  _this14._displayIframe(true);
                } else reject(new Error("User has not logged in yet"));
              }));
            case 3:
            case "end":
              return _context12.stop();
          }
        }, _callee12, this);
      }));
      function showWalletConnectScanner() {
        return _showWalletConnectScanner.apply(this, arguments);
      }
      return showWalletConnectScanner;
    }()
  }, {
    key: "_handleWindow",
    value: function _handleWindow(preopenInstanceId) {
      var _ref15 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        url = _ref15.url,
        target = _ref15.target,
        features = _ref15.features;
      if (preopenInstanceId) {
        var windowStream = this.communicationMux.getStream("window");
        var finalUrl = new URL(url || "".concat(this.torusUrl, "/redirect?preopenInstanceId=").concat(preopenInstanceId));
        if (finalUrl.hash) finalUrl.hash += "&isCustomLogin=".concat(this.isCustomLogin);else finalUrl.hash = "#isCustomLogin=".concat(this.isCustomLogin);
        var handledWindow = new PopupHandler({
          url: finalUrl,
          target: target,
          features: features
        });
        handledWindow.open();
        if (!handledWindow.window) {
          this._createPopupBlockAlert(preopenInstanceId, finalUrl.href);
          return;
        }
        windowStream.write({
          name: "opened_window",
          data: {
            preopenInstanceId: preopenInstanceId
          }
        });
        var _closeHandler = function closeHandler(_ref3) {
          var receivedId = _ref3.preopenInstanceId,
            close = _ref3.close;
          if (receivedId === preopenInstanceId && close) {
            handledWindow.close();
            windowStream.removeListener("data", _closeHandler);
          }
        };
        windowStream.on("data", _closeHandler);
        handledWindow.once("close", function () {
          windowStream.write({
            data: {
              preopenInstanceId: preopenInstanceId,
              closed: true
            }
          });
          windowStream.removeListener("data", _closeHandler);
        });
      }
    }
  }, {
    key: "_setEmbedWhiteLabel",
    value: function _setEmbedWhiteLabel(element) {
      // Set whitelabel
      var _ref16 = this.whiteLabel || {},
        theme = _ref16.theme;
      if (theme) {
        var _theme$isDark = theme.isDark,
          isDark = _theme$isDark === void 0 ? false : _theme$isDark,
          _theme$colors = theme.colors,
          colors = _theme$colors === void 0 ? {} : _theme$colors;
        if (isDark) element.classList.add("torus-dark");
        if (colors.torusBrand1) element.style.setProperty("--torus-brand-1", colors.torusBrand1);
        if (colors.torusGray2) element.style.setProperty("--torus-gray-2", colors.torusGray2);
      }
    }
  }, {
    key: "_getLogoUrl",
    value: function _getLogoUrl() {
      var logoUrl = "".concat(this.torusUrl, "/images/torus_icon-blue.svg");
      if (this.whiteLabel?.theme?.isDark) {
        logoUrl = this.whiteLabel?.logoLight || logoUrl;
      } else {
        logoUrl = this.whiteLabel?.logoDark || logoUrl;
      }
      return logoUrl;
    }
  }, {
    key: "_sendWidgetVisibilityStatus",
    value: function _sendWidgetVisibilityStatus(status) {
      var torusWidgetVisibilityStream = this.communicationMux.getStream("torus-widget-visibility");
      torusWidgetVisibilityStream.write({
        data: status
      });
    }
  }, {
    key: "_displayIframe",
    value: function _displayIframe() {
      var isFull = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var style = {};
      var size = this.buttonSize + 14; // 15px padding
      // set phase
      if (!isFull) {
        style.display = this.torusWidgetVisibility ? "block" : "none";
        style.height = "".concat(size, "px");
        style.width = "".concat(size, "px");
        switch (this.buttonPosition) {
          case BUTTON_POSITION.TOP_LEFT:
            style.top = "0px";
            style.left = "0px";
            style.right = "auto";
            style.bottom = "auto";
            break;
          case BUTTON_POSITION.TOP_RIGHT:
            style.top = "0px";
            style.right = "0px";
            style.left = "auto";
            style.bottom = "auto";
            break;
          case BUTTON_POSITION.BOTTOM_RIGHT:
            style.bottom = "0px";
            style.right = "0px";
            style.top = "auto";
            style.left = "auto";
            break;
          case BUTTON_POSITION.BOTTOM_LEFT:
          default:
            style.bottom = "0px";
            style.left = "0px";
            style.top = "auto";
            style.right = "auto";
            break;
        }
      } else {
        style.display = "block";
        style.width = "100%";
        style.height = "100%";
        style.top = "0px";
        style.right = "0px";
        style.left = "0px";
        style.bottom = "0px";
      }
      Object.assign(this.torusIframe.style, style);
      this.isIframeFullScreen = isFull;
    }
  }, {
    key: "_setupWeb3",
    value: function _setupWeb3() {
      var _this15 = this;
      log.info("setupWeb3 running");
      // setup background connection
      var metamaskStream = new _openloginJrpc.BasePostMessageStream({
        name: "embed_metamask",
        target: "iframe_metamask",
        targetWindow: this.torusIframe.contentWindow,
        targetOrigin: new URL(this.torusUrl).origin
      });
      // Due to compatibility reasons, we should not set up multiplexing on window.metamaskstream
      // because the MetamaskInpageProvider also attempts to do so.
      // We create another LocalMessageDuplexStream for communication between dapp <> iframe
      var communicationStream = new _openloginJrpc.BasePostMessageStream({
        name: "embed_comm",
        target: "iframe_comm",
        targetWindow: this.torusIframe.contentWindow,
        targetOrigin: new URL(this.torusUrl).origin
      });
      // Backward compatibility with Gotchi :)
      // window.metamaskStream = this.communicationStream
      // compose the inpage provider
      var inpageProvider = new TorusInpageProvider(metamaskStream);
      // detect eth_requestAccounts and pipe to enable for now
      var detectAccountRequestPrototypeModifier = function detectAccountRequestPrototypeModifier(m) {
        var originalMethod = inpageProvider[m];
        inpageProvider[m] = function providerFunc(method) {
          if (method && method === "eth_requestAccounts") {
            return inpageProvider.enable();
          }
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          return originalMethod.apply(this, [method].concat(args));
        };
      };
      detectAccountRequestPrototypeModifier("send");
      detectAccountRequestPrototypeModifier("sendAsync");
      inpageProvider.enable = function () {
        return new Promise(function (resolve, reject) {
          // If user is already logged in, we assume they have given access to the website
          inpageProvider.sendAsync({
            jsonrpc: "2.0",
            id: getPreopenInstanceId(),
            method: "eth_requestAccounts",
            params: []
          }, function (err, response) {
            var _ref17 = response || {},
              res = _ref17.result;
            if (err) {
              setTimeout(function () {
                reject(err);
              }, 50);
            } else if (Array.isArray(res) && res.length > 0) {
              // If user is already rehydrated, resolve this
              // else wait for something to be written to status stream
              var handleLoginCb = function handleLoginCb() {
                if (_this15.requestedVerifier !== "" && _this15.currentVerifier !== _this15.requestedVerifier) {
                  var requestedVerifier = _this15.requestedVerifier;
                  // eslint-disable-next-line promise/no-promise-in-callback
                  _this15.logout()
                  // eslint-disable-next-line promise/always-return
                  .then(function (_) {
                    _this15.requestedVerifier = requestedVerifier;
                    _this15._showLoginPopup(true, resolve, reject);
                  }).catch(function (error) {
                    return reject(error);
                  });
                } else {
                  resolve(res);
                }
              };
              if (_this15.isLoggedIn) {
                handleLoginCb();
              } else {
                _this15.isLoginCallback = handleLoginCb;
              }
            } else {
              // set up listener for login
              _this15._showLoginPopup(true, resolve, reject);
            }
          });
        });
      };
      inpageProvider.tryPreopenHandle = function (payload, cb) {
        var _payload = payload;
        if (!Array.isArray(_payload) && UNSAFE_METHODS.includes(_payload.method)) {
          var preopenInstanceId = getPreopenInstanceId();
          _this15._handleWindow(preopenInstanceId, {
            target: "_blank",
            features: FEATURES_CONFIRM_WINDOW
          });
          _payload.preopenInstanceId = preopenInstanceId;
        }
        inpageProvider._rpcEngine.handle(_payload, cb);
      };
      // Work around for web3@1.0 deleting the bound `sendAsync` but not the unbound
      // `sendAsync` method on the prototype, causing `this` reference issues with drizzle
      var proxiedInpageProvider = new Proxy(inpageProvider, {
        // straight up lie that we deleted the property so that it doesnt
        // throw an error in strict mode
        deleteProperty: function deleteProperty() {
          return true;
        }
      });
      this.ethereum = proxiedInpageProvider;
      var communicationMux = (0, _openloginJrpc.setupMultiplex)(communicationStream);
      this.communicationMux = communicationMux;
      var windowStream = communicationMux.getStream("window");
      windowStream.on("data", function (chunk) {
        if (chunk.name === "create_window") {
          // url is the url we need to open
          // we can pass the final url upfront so that it removes the step of redirecting to /redirect and waiting for finalUrl
          _this15._createPopupBlockAlert(chunk.data.preopenInstanceId, chunk.data.url);
        }
      });
      // show torus widget if button clicked
      var widgetStream = communicationMux.getStream("widget");
      widgetStream.on("data", function (chunk) {
        var data = chunk.data;
        _this15._displayIframe(data);
      });
      // Show torus button if wallet has been hydrated/detected
      var statusStream = communicationMux.getStream("status");
      statusStream.on("data", function (status) {
        // login
        if (status.loggedIn) {
          _this15.isLoggedIn = status.loggedIn;
          _this15.currentVerifier = status.verifier;
        } // logout
        else _this15._displayIframe();
        if (_this15.isLoginCallback) {
          _this15.isLoginCallback();
          delete _this15.isLoginCallback;
        }
      });
      this.provider = proxiedInpageProvider;
      if (this.provider.shouldSendMetadata) sendSiteMetadata(this.provider._rpcEngine);
      inpageProvider._initializeState();
      log.debug("Torus - injected provider");
    }
  }, {
    key: "_showLoginPopup",
    value: function _showLoginPopup(calledFromEmbed, resolve, reject) {
      var _this16 = this;
      var loginHandler = function loginHandler(data) {
        var err = data.err,
          selectedAddress = data.selectedAddress;
        if (err) {
          log.error(err);
          if (reject) reject(err);
        }
        // returns an array (cause accounts expects it)
        else if (resolve) resolve([selectedAddress]);
        if (_this16.isIframeFullScreen) _this16._displayIframe();
      };
      var oauthStream = this.communicationMux.getStream("oauth");
      if (!this.requestedVerifier) {
        this._displayIframe(true);
        handleStream(oauthStream, "data", loginHandler);
        oauthStream.write({
          name: "oauth_modal",
          data: {
            calledFromEmbed: calledFromEmbed
          }
        });
      } else {
        handleStream(oauthStream, "data", loginHandler);
        var preopenInstanceId = getPreopenInstanceId();
        this._handleWindow(preopenInstanceId);
        oauthStream.write({
          name: "oauth",
          data: {
            calledFromEmbed: calledFromEmbed,
            verifier: this.requestedVerifier,
            preopenInstanceId: preopenInstanceId,
            login_hint: this.loginHint
          }
        });
      }
    }
  }, {
    key: "_createPopupBlockAlert",
    value: function _createPopupBlockAlert(preopenInstanceId, url) {
      var _this17 = this;
      var logoUrl = this._getLogoUrl();
      var torusAlert = htmlToElement('<div id="torusAlert" class="torus-alert--v2">' + "<div id=\"torusAlert__logo\"><img src=\"".concat(logoUrl, "\" /></div>") + "<div>" + "<h1 id=\"torusAlert__title\">".concat(this.embedTranslations.actionRequired, "</h1>") + "<p id=\"torusAlert__desc\">".concat(this.embedTranslations.pendingAction, "</p>") + "</div>" + "</div>");
      var successAlert = htmlToElement("<div><a id=\"torusAlert__btn\">".concat(this.embedTranslations.continue, "</a></div>"));
      var btnContainer = htmlToElement('<div id="torusAlert__btn-container"></div>');
      btnContainer.appendChild(successAlert);
      torusAlert.appendChild(btnContainer);
      var bindOnLoad = function bindOnLoad() {
        successAlert.addEventListener("click", function () {
          _this17._handleWindow(preopenInstanceId, {
            url: url,
            target: "_blank",
            features: FEATURES_CONFIRM_WINDOW
          });
          torusAlert.remove();
          if (_this17.torusAlertContainer.children.length === 0) _this17.torusAlertContainer.style.display = "none";
        });
      };
      this._setEmbedWhiteLabel(torusAlert);
      var attachOnLoad = function attachOnLoad() {
        _this17.torusAlertContainer.style.display = "block";
        _this17.torusAlertContainer.appendChild(torusAlert);
      };
      runOnLoad(attachOnLoad);
      runOnLoad(bindOnLoad);
    }
  }]);
}();
},{"@babel/runtime/helpers/objectWithoutProperties":"node_modules/@babel/runtime/helpers/objectWithoutProperties.js","@babel/runtime/helpers/defineProperty":"node_modules/@babel/runtime/helpers/defineProperty.js","@toruslabs/http-helpers":"node_modules/@toruslabs/http-helpers/dist/httpHelpers.esm.js","@toruslabs/openlogin-jrpc":"node_modules/@toruslabs/torus-embed/node_modules/@toruslabs/openlogin-jrpc/dist/openloginJrpc.esm.js","lodash.merge":"node_modules/lodash.merge/index.js","@metamask/obs-store":"node_modules/@metamask/obs-store/dist/index.js","eth-rpc-errors":"node_modules/eth-rpc-errors/dist/index.js","fast-deep-equal":"node_modules/fast-deep-equal/index.js","is-stream":"node_modules/is-stream/index.js","pump":"node_modules/pump/index.js","loglevel":"node_modules/loglevel/lib/loglevel.js","create-hash":"node_modules/create-hash/browser.js","events":"../../../../usr/local/lib/node_modules/parcel-bundler/node_modules/events/events.js","buffer":"../../../../usr/local/lib/node_modules/parcel-bundler/node_modules/buffer/index.js"}],"node_modules/@web3auth/torus-evm-adapter/dist/torusEvmAdapter.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TorusWalletAdapter = void 0;
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
var _torusEmbed = _interopRequireDefault(require("@toruslabs/torus-embed"));
var _base = require("@web3auth/base");
var _baseEvmAdapter = require("@web3auth/base-evm-adapter");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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
var TorusWalletAdapter = exports.TorusWalletAdapter = /*#__PURE__*/function (_BaseEvmAdapter) {
  (0, _inherits2.default)(TorusWalletAdapter, _BaseEvmAdapter);
  var _super = _createSuper(TorusWalletAdapter);
  function TorusWalletAdapter(params) {
    var _this;
    (0, _classCallCheck2.default)(this, TorusWalletAdapter);
    _this = _super.call(this, params);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "name", _base.WALLET_ADAPTERS.TORUS_EVM);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "adapterNamespace", _base.ADAPTER_NAMESPACES.EIP155);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "currentChainNamespace", _base.CHAIN_NAMESPACES.EIP155);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "type", _base.ADAPTER_CATEGORY.EXTERNAL);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "status", _base.ADAPTER_STATUS.NOT_READY);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "torusInstance", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "torusWalletOptions", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "initParams", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "loginSettings", {});
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "rehydrated", false);
    _this.torusWalletOptions = params.adapterSettings || {};
    _this.initParams = params.initParams || {};
    _this.loginSettings = params.loginSettings || {};
    _this.chainConfig = params.chainConfig || null;
    _this.sessionTime = params.sessionTime || 86400;
    return _this;
  }
  (0, _createClass2.default)(TorusWalletAdapter, [{
    key: "provider",
    get: function get() {
      if (this.status === _base.ADAPTER_STATUS.CONNECTED && this.torusInstance) {
        return this.torusInstance.provider;
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
        var network, _this$chainConfig, blockExplorer, displayName, chainId, ticker, tickerName, _this$chainConfig2, _chainId2, _blockExplorer, _displayName, rpcTarget, _ticker, _tickerName;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                (0, _get2.default)((0, _getPrototypeOf2.default)(TorusWalletAdapter.prototype), "checkInitializationRequirements", this).call(this); // set chainConfig for mainnet by default if not set

                if (!this.chainConfig) {
                  this.chainConfig = (0, _base.getChainConfig)(_base.CHAIN_NAMESPACES.EIP155, 1);
                  _this$chainConfig = this.chainConfig, blockExplorer = _this$chainConfig.blockExplorer, displayName = _this$chainConfig.displayName, chainId = _this$chainConfig.chainId, ticker = _this$chainConfig.ticker, tickerName = _this$chainConfig.tickerName;
                  network = {
                    chainId: Number.parseInt(chainId, 16),
                    host: "mainnet",
                    blockExplorer: blockExplorer,
                    networkName: displayName,
                    ticker: ticker,
                    tickerName: tickerName
                  };
                } else {
                  _this$chainConfig2 = this.chainConfig, _chainId2 = _this$chainConfig2.chainId, _blockExplorer = _this$chainConfig2.blockExplorer, _displayName = _this$chainConfig2.displayName, rpcTarget = _this$chainConfig2.rpcTarget, _ticker = _this$chainConfig2.ticker, _tickerName = _this$chainConfig2.tickerName;
                  network = {
                    chainId: Number.parseInt(_chainId2, 16),
                    host: rpcTarget,
                    blockExplorer: _blockExplorer,
                    networkName: _displayName,
                    ticker: _ticker,
                    tickerName: _tickerName
                  };
                }
                this.torusInstance = new _torusEmbed.default(this.torusWalletOptions);
                _base.log.debug("initializing torus evm adapter init");
                _context.next = 6;
                return this.torusInstance.init(_objectSpread(_objectSpread({
                  showTorusButton: false
                }, this.initParams), {}, {
                  network: network
                }));
              case 6:
                this.status = _base.ADAPTER_STATUS.READY;
                this.emit(_base.ADAPTER_EVENTS.READY, _base.WALLET_ADAPTERS.TORUS_EVM);
                _context.prev = 8;
                _base.log.debug("initializing torus evm adapter");
                if (!options.autoConnect) {
                  _context.next = 14;
                  break;
                }
                this.rehydrated = true;
                _context.next = 14;
                return this.connect();
              case 14:
                _context.next = 20;
                break;
              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](8);
                _base.log.error("Failed to connect with torus evm provider", _context.t0);
                this.emit(_base.ADAPTER_EVENTS.ERRORED, _context.t0);
              case 20:
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
    key: "connect",
    value: function () {
      var _connect = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var chainId, _this$chainConfig3, _chainId, blockExplorer, displayName, rpcTarget, ticker, tickerName, network, updatedChainID;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                (0, _get2.default)((0, _getPrototypeOf2.default)(TorusWalletAdapter.prototype), "checkConnectionRequirements", this).call(this);
                if (this.torusInstance) {
                  _context2.next = 3;
                  break;
                }
                throw _base.WalletInitializationError.notReady("Torus wallet is not initialized");
              case 3:
                this.status = _base.ADAPTER_STATUS.CONNECTING;
                this.emit(_base.ADAPTER_EVENTS.CONNECTING, {
                  adapter: _base.WALLET_ADAPTERS.TORUS_EVM
                });
                _context2.prev = 5;
                _context2.next = 8;
                return this.torusInstance.login(this.loginSettings);
              case 8:
                chainId = this.torusInstance.provider.chainId;
                if (!(chainId && parseInt(chainId) !== parseInt(this.chainConfig.chainId, 16))) {
                  _context2.next = 19;
                  break;
                }
                _this$chainConfig3 = this.chainConfig, _chainId = _this$chainConfig3.chainId, blockExplorer = _this$chainConfig3.blockExplorer, displayName = _this$chainConfig3.displayName, rpcTarget = _this$chainConfig3.rpcTarget, ticker = _this$chainConfig3.ticker, tickerName = _this$chainConfig3.tickerName;
                network = {
                  chainId: Number.parseInt(_chainId, 16),
                  host: rpcTarget,
                  blockExplorer: blockExplorer,
                  networkName: displayName,
                  tickerName: tickerName,
                  ticker: ticker
                }; // in some cases when user manually switches chain and relogin then adapter will not connect to initially passed
                // chainConfig but will connect to the one that user switched to.
                // So here trying to switch network to the one that was initially passed in chainConfig.

                _context2.next = 14;
                return this.torusInstance.setProvider(_objectSpread({}, network));
              case 14:
                _context2.next = 16;
                return this.torusInstance.ethereum.request({
                  method: "eth_chainId"
                });
              case 16:
                updatedChainID = _context2.sent;
                if (!(updatedChainID && parseInt(updatedChainID) !== parseInt(this.chainConfig.chainId, 16))) {
                  _context2.next = 19;
                  break;
                }
                throw _base.WalletInitializationError.fromCode(5000, "Not connected to correct chainId. Expected: ".concat(this.chainConfig.chainId, ", Current: ").concat(updatedChainID));
              case 19:
                this.status = _base.ADAPTER_STATUS.CONNECTED;
                this.torusInstance.showTorusButton();
                this.emit(_base.ADAPTER_STATUS.CONNECTED, {
                  adapter: _base.WALLET_ADAPTERS.TORUS_EVM,
                  reconnected: this.rehydrated
                });
                return _context2.abrupt("return", this.provider);
              case 25:
                _context2.prev = 25;
                _context2.t0 = _context2["catch"](5);
                // ready again to be connected
                this.status = _base.ADAPTER_STATUS.READY;
                this.rehydrated = false;
                this.emit(_base.ADAPTER_STATUS.ERRORED, _context2.t0);
                throw _context2.t0 instanceof _base.Web3AuthError ? _context2.t0 : _base.WalletLoginError.connectionError("Failed to login with torus wallet");
              case 31:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[5, 25]]);
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
        var options,
          _args3 = arguments;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                options = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {
                  cleanup: false
                };
                if (this.torusInstance) {
                  _context3.next = 3;
                  break;
                }
                throw _base.WalletInitializationError.notReady("Torus wallet is not initialized");
              case 3:
                _context3.next = 5;
                return (0, _get2.default)((0, _getPrototypeOf2.default)(TorusWalletAdapter.prototype), "disconnect", this).call(this);
              case 5:
                _context3.next = 7;
                return this.torusInstance.logout();
              case 7:
                this.torusInstance.hideTorusButton();
                if (options.cleanup) {
                  this.status = _base.ADAPTER_STATUS.NOT_READY;
                  this.torusInstance = null;
                } else {
                  // ready to be connected again
                  this.status = _base.ADAPTER_STATUS.READY;
                }
                this.rehydrated = false;
                this.emit(_base.ADAPTER_EVENTS.DISCONNECTED);
              case 11:
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
        var userInfo;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(this.status !== _base.ADAPTER_STATUS.CONNECTED)) {
                  _context4.next = 2;
                  break;
                }
                throw _base.WalletLoginError.notConnectedError("Not connected with wallet");
              case 2:
                if (this.torusInstance) {
                  _context4.next = 4;
                  break;
                }
                throw _base.WalletInitializationError.notReady("Torus wallet is not initialized");
              case 4:
                _context4.next = 6;
                return this.torusInstance.getUserInfo("");
              case 6:
                userInfo = _context4.sent;
                return _context4.abrupt("return", userInfo);
              case 8:
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
  }]);
  return TorusWalletAdapter;
}(_baseEvmAdapter.BaseEvmAdapter);
},{"@babel/runtime/helpers/asyncToGenerator":"node_modules/@babel/runtime/helpers/asyncToGenerator.js","@babel/runtime/helpers/classCallCheck":"node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"node_modules/@babel/runtime/helpers/createClass.js","@babel/runtime/helpers/assertThisInitialized":"node_modules/@babel/runtime/helpers/assertThisInitialized.js","@babel/runtime/helpers/get":"node_modules/@babel/runtime/helpers/get.js","@babel/runtime/helpers/inherits":"node_modules/@babel/runtime/helpers/inherits.js","@babel/runtime/helpers/possibleConstructorReturn":"node_modules/@babel/runtime/helpers/possibleConstructorReturn.js","@babel/runtime/helpers/getPrototypeOf":"node_modules/@babel/runtime/helpers/getPrototypeOf.js","@babel/runtime/helpers/defineProperty":"node_modules/@babel/runtime/helpers/defineProperty.js","@babel/runtime/regenerator":"node_modules/@babel/runtime/regenerator/index.js","@toruslabs/torus-embed":"node_modules/@toruslabs/torus-embed/dist/torus.esm.js","@web3auth/base":"node_modules/@web3auth/base/dist/base.esm.js","@web3auth/base-evm-adapter":"node_modules/@web3auth/base-evm-adapter/dist/baseEvmAdapter.esm.js"}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
//# sourceMappingURL=/torusEvmAdapter.esm.1a8b1094.js.map