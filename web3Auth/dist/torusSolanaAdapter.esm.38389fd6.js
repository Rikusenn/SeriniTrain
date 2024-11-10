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
})({"node_modules/@toruslabs/solana-embed/node_modules/@toruslabs/openlogin-utils/dist/openloginUtils.esm.js":[function(require,module,exports) {
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
},{"randombytes":"node_modules/randombytes/browser.js","@babel/runtime/helpers/defineProperty":"node_modules/@babel/runtime/helpers/defineProperty.js","base64url":"node_modules/base64url/index.js","keccak":"node_modules/keccak/js.js","buffer":"../../../../usr/local/lib/node_modules/parcel-bundler/node_modules/buffer/index.js"}],"node_modules/@toruslabs/solana-embed/node_modules/@toruslabs/openlogin-jrpc/dist/openloginJrpc.esm.js":[function(require,module,exports) {
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
},{"@babel/runtime/helpers/defineProperty":"node_modules/@babel/runtime/helpers/defineProperty.js","readable-stream":"node_modules/readable-stream/readable-browser.js","@toruslabs/openlogin-utils":"node_modules/@toruslabs/solana-embed/node_modules/@toruslabs/openlogin-utils/dist/openloginUtils.esm.js","events":"../../../../usr/local/lib/node_modules/parcel-bundler/node_modules/events/events.js","fast-safe-stringify":"node_modules/fast-safe-stringify/index.js","eth-rpc-errors":"node_modules/eth-rpc-errors/dist/index.js","end-of-stream":"node_modules/end-of-stream/index.js","once":"node_modules/once/once.js","pump":"node_modules/pump/index.js"}],"node_modules/@toruslabs/solana-embed/dist/solanaEmbed.esm.js":[function(require,module,exports) {
var define;
var Buffer = require("buffer").Buffer;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TorusInPageProvider = exports.TORUS_BUILD_ENV = exports.PAYMENT_PROVIDER = exports.LOGIN_PROVIDER = exports.BUTTON_POSITION = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _web = require("@solana/web3.js");
var _baseControllers = require("@toruslabs/base-controllers");
var _httpHelpers = require("@toruslabs/http-helpers");
var _openloginJrpc = require("@toruslabs/openlogin-jrpc");
var _ethRpcErrors = require("eth-rpc-errors");
var _isStream = require("is-stream");
var _pump = _interopRequireDefault(require("pump"));
var _loglevel = _interopRequireDefault(require("loglevel"));
var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var version = "0.3.4";
var messages = {
  errors: {
    disconnected: function disconnected() {
      return "Torus: Lost connection to Torus.";
    },
    permanentlyDisconnected: function permanentlyDisconnected() {
      return "Torus: Disconnected from iframe. Page reload required.";
    },
    unsupportedSync: function unsupportedSync(method) {
      return "Torus: The Torus Ethereum provider does not support synchronous methods like ".concat(method, " without a callback parameter.");
    },
    invalidDuplexStream: function invalidDuplexStream() {
      return "Must provide a Node.js-style duplex stream.";
    },
    invalidOptions: function invalidOptions(maxEventListeners) {
      return "Invalid options. Received: { maxEventListeners: ".concat(maxEventListeners, "}");
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
  warnings: {}
};
var PAYMENT_PROVIDER = exports.PAYMENT_PROVIDER = {
  MOONPAY: "moonpay",
  WYRE: "wyre",
  RAMPNETWORK: "rampnetwork",
  XANPOOL: "xanpool",
  MERCURYO: "mercuryo",
  TRANSAK: "transak"
};
var TORUS_BUILD_ENV = exports.TORUS_BUILD_ENV = {
  PRODUCTION: "production",
  DEVELOPMENT: "development",
  TESTING: "testing"
};
var BUTTON_POSITION = exports.BUTTON_POSITION = {
  BOTTOM_LEFT: "bottom-left",
  TOP_LEFT: "top-left",
  BOTTOM_RIGHT: "bottom-right",
  TOP_RIGHT: "top-right"
};
var LOGIN_PROVIDER = exports.LOGIN_PROVIDER = {
  GOOGLE: "google",
  FACEBOOK: "facebook",
  REDDIT: "reddit",
  DISCORD: "discord",
  TWITCH: "twitch",
  APPLE: "apple",
  LINE: "line",
  GITHUB: "github",
  KAKAO: "kakao",
  LINKEDIN: "linkedin",
  TWITTER: "twitter",
  WEIBO: "weibo",
  WECHAT: "wechat",
  EMAIL_PASSWORDLESS: "email_passwordless"
};
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
  supportedVerifierList: [LOGIN_PROVIDER.GOOGLE, LOGIN_PROVIDER.REDDIT, LOGIN_PROVIDER.DISCORD],
  api: "https://api.tor.us",
  translations: translations,
  prodTorusUrl: "",
  localStorageKeyPrefix: "torus-"
};
var log = _loglevel.default.getLogger("solana-embed");

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
      log.error("Torus - RPC Error: ".concat(error.message), error);
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
  var warningMsg = "Torus: Lost connection to \"".concat(remoteLabel, "\".");
  if (error?.stack) {
    warningMsg += "\n".concat(error.stack);
  }
  log.warn(warningMsg);
  if (emitter && emitter.listenerCount("error") > 0) {
    emitter.emit("error", warningMsg);
  }
}
var getWindowId = function getWindowId() {
  return Math.random().toString(36).slice(2);
};
var getTorusUrl = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(buildEnv) {
    var torusUrl, logLevel;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.t0 = buildEnv;
          _context.next = _context.t0 === "testing" ? 3 : _context.t0 === "development" ? 6 : 9;
          break;
        case 3:
          torusUrl = "https://solana-testing.tor.us";
          logLevel = "debug";
          return _context.abrupt("break", 12);
        case 6:
          torusUrl = "http://localhost:8080";
          logLevel = "debug";
          return _context.abrupt("break", 12);
        case 9:
          torusUrl = "https://solana.tor.us";
          logLevel = "error";
          return _context.abrupt("break", 12);
        case 12:
          return _context.abrupt("return", {
            torusUrl: torusUrl,
            logLevel: logLevel
          });
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getTorusUrl(_x) {
    return _ref2.apply(this, arguments);
  };
}();
var getUserLanguage = function getUserLanguage() {
  var userLanguage = window.navigator.language || "en-US";
  var userLanguages = userLanguage.split("-");
  userLanguage = Object.prototype.hasOwnProperty.call(configuration.translations, userLanguages[0]) ? userLanguages[0] : "en";
  return userLanguage;
};
var FEATURES_PROVIDER_CHANGE_WINDOW = {
  height: 660,
  width: 375
};
var FEATURES_DEFAULT_WALLET_WINDOW = {
  height: 740,
  width: 1315
};
var FEATURES_DEFAULT_POPUP_WINDOW = {
  height: 700,
  width: 1200
};
var FEATURES_CONFIRM_WINDOW = {
  height: 600,
  width: 400
};
function storageAvailable(type) {
  var storage;
  try {
    storage = window[type];
    var x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e && (
    // everything except Firefox
    e.code === 22 ||
    // Firefox
    e.code === 1014 ||
    // test name field too, because code might not be present
    // everything except Firefox
    e.name === "QuotaExceededError" ||
    // Firefox
    e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
    // acknowledge QuotaExceededError only if there's something already stored
    storage && storage.length !== 0;
  }
}
/**
 * popup handler utils
 */
function getPopupFeatures(_ref) {
  var w = _ref.width,
    h = _ref.height;
  // Fixes dual-screen position                             Most browsers      Firefox
  var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  var dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;
  var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : window.screen.width;
  var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : window.screen.height;
  var systemZoom = 1; // No reliable estimate
  var left = Math.abs((width - w) / 2 / systemZoom + dualScreenLeft);
  var top = Math.abs((height - h) / 2 / systemZoom + dualScreenTop);
  var features = "titlebar=0,toolbar=0,status=0,location=0,menubar=0,height=".concat(h / systemZoom, ",width=").concat(w / systemZoom, ",top=").concat(top, ",left=").concat(left);
  return features;
}
var BaseProvider = /*#__PURE__*/function (_SafeEventEmitter) {
  /**
   * Indicating that this provider is a Torus provider.
   */

  function BaseProvider(connectionStream, _ref) {
    var _this;
    _classCallCheck(this, BaseProvider);
    var _ref$maxEventListener = _ref.maxEventListeners,
      maxEventListeners = _ref$maxEventListener === void 0 ? 100 : _ref$maxEventListener,
      _ref$jsonRpcStreamNam = _ref.jsonRpcStreamName,
      jsonRpcStreamName = _ref$jsonRpcStreamNam === void 0 ? "provider" : _ref$jsonRpcStreamNam;
    _this = _callSuper(this, BaseProvider);
    (0, _defineProperty2.default)(_this, "isTorus", void 0);
    (0, _defineProperty2.default)(_this, "_rpcEngine", void 0);
    (0, _defineProperty2.default)(_this, "jsonRpcConnectionEvents", void 0);
    (0, _defineProperty2.default)(_this, "_state", void 0);
    if (!(0, _isStream.duplex)(connectionStream)) {
      throw new Error(messages.errors.invalidDuplexStream());
    }
    _this.isTorus = true;
    _this.setMaxListeners(maxEventListeners);
    _this._handleConnect = _this._handleConnect.bind(_this);
    _this._handleDisconnect = _this._handleDisconnect.bind(_this);
    _this._handleStreamDisconnect = _this._handleStreamDisconnect.bind(_this);
    _this._rpcRequest = _this._rpcRequest.bind(_this);
    _this._initializeState = _this._initializeState.bind(_this);
    _this.request = _this.request.bind(_this);
    _this.sendAsync = _this.sendAsync.bind(_this);
    // this.enable = this.enable.bind(this);
    // setup connectionStream multiplexing
    var mux = new _openloginJrpc.ObjectMultiplex();
    (0, _pump.default)(connectionStream, mux, connectionStream, _this._handleStreamDisconnect.bind(_this, "Torus"));
    // ignore phishing warning message (handled elsewhere)
    mux.ignoreStream("phishing");
    // setup own event listeners
    // connect to async provider
    var jsonRpcConnection = (0, _openloginJrpc.createStreamMiddleware)();
    (0, _pump.default)(jsonRpcConnection.stream, mux.createStream(jsonRpcStreamName), jsonRpcConnection.stream, _this._handleStreamDisconnect.bind(_this, "Torus RpcProvider"));
    // handle RPC requests via dapp-side rpc engine
    var rpcEngine = new _openloginJrpc.JRPCEngine();
    rpcEngine.push((0, _openloginJrpc.createIdRemapMiddleware)());
    rpcEngine.push(createErrorMiddleware());
    rpcEngine.push((0, _baseControllers.createLoggerMiddleware)({
      origin: location.origin
    }));
    rpcEngine.push(jsonRpcConnection.middleware);
    _this._rpcEngine = rpcEngine;
    _this.jsonRpcConnectionEvents = jsonRpcConnection.events;
    return _this;
  }
  /**
   * Submits an RPC request for the given method, with the given params.
   * Resolves with the result of the method call, or rejects on error.
   */
  _inherits(BaseProvider, _SafeEventEmitter);
  return _createClass(BaseProvider, [{
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
                }, (0, _openloginJrpc.getRpcPromiseCallback)(resolve, reject));
              }));
            case 8:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function request(_x2) {
        return _request.apply(this, arguments);
      }
      return request;
    }()
    /**
     * Submits an RPC request per the given JSON-RPC request object.
     */
    )
  }, {
    key: "send",
    value: function send(payload, callback) {
      this._rpcRequest(payload, callback);
    }
    /**
     * Submits an RPC request per the given JSON-RPC request object.
     */
  }, {
    key: "sendAsync",
    value: function sendAsync(payload) {
      var _this3 = this;
      return new Promise(function (resolve, reject) {
        _this3._rpcRequest(payload, (0, _openloginJrpc.getRpcPromiseCallback)(resolve, reject));
      });
    }
    /**
     * Called when connection is lost to critical streams.
     *
     * emits TorusInpageProvider#disconnect
     */
  }, {
    key: "_handleStreamDisconnect",
    value: function _handleStreamDisconnect(streamName, error) {
      logStreamDisconnectWarning(streamName, error, this);
      this._handleDisconnect(false, error ? error.message : undefined);
    }
  }]);
}(_openloginJrpc.SafeEventEmitter);
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
function documentReady() {
  return _documentReady.apply(this, arguments);
}
function _documentReady() {
  _documentReady = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee27() {
    return _regeneratorRuntime().wrap(function _callee27$(_context27) {
      while (1) switch (_context27.prev = _context27.next) {
        case 0:
          return _context27.abrupt("return", new Promise(function (resolve) {
            if (document.readyState !== "loading") {
              resolve();
            } else {
              handleEvent(document, "DOMContentLoaded", resolve);
            }
          }));
        case 1:
        case "end":
          return _context27.stop();
      }
    }, _callee27);
  }));
  return _documentReady.apply(this, arguments);
}
var htmlToElement = function htmlToElement(html) {
  var template = window.document.createElement("template");
  var trimmedHtml = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = trimmedHtml;
  return template.content.firstChild;
};
function isLegacyTransactionInstance(transaction) {
  return transaction.version === undefined;
}
var PopupHandler = /*#__PURE__*/function (_SafeEventEmitter2) {
  function PopupHandler(_ref) {
    var _this4;
    _classCallCheck(this, PopupHandler);
    var url = _ref.url,
      target = _ref.target,
      features = _ref.features;
    _this4 = _callSuper(this, PopupHandler);
    (0, _defineProperty2.default)(_this4, "url", void 0);
    (0, _defineProperty2.default)(_this4, "target", void 0);
    (0, _defineProperty2.default)(_this4, "features", void 0);
    (0, _defineProperty2.default)(_this4, "window", void 0);
    (0, _defineProperty2.default)(_this4, "windowTimer", void 0);
    (0, _defineProperty2.default)(_this4, "iClosedWindow", void 0);
    _this4.url = url;
    _this4.target = target || "_blank";
    _this4.features = features || getPopupFeatures(FEATURES_DEFAULT_POPUP_WINDOW);
    _this4.window = undefined;
    _this4.windowTimer = undefined;
    _this4.iClosedWindow = false;
    _this4._setupTimer();
    return _this4;
  }
  _inherits(PopupHandler, _SafeEventEmitter2);
  return _createClass(PopupHandler, [{
    key: "_setupTimer",
    value: function _setupTimer() {
      var _this5 = this;
      this.windowTimer = Number(setInterval(function () {
        if (_this5.window && _this5.window.closed) {
          clearInterval(_this5.windowTimer);
          if (!_this5.iClosedWindow) {
            _this5.emit("close");
          }
          _this5.iClosedWindow = false;
          _this5.window = undefined;
        }
        if (_this5.window === undefined) clearInterval(_this5.windowTimer);
      }, 500));
    }
  }, {
    key: "open",
    value: function open() {
      this.window = window.open(this.url.href, this.target, this.features);
      if (this.window?.focus) this.window.focus();
      return Promise.resolve();
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
}(_openloginJrpc.SafeEventEmitter);
function ownKeys$2(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) {
      (0, _defineProperty2.default)(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
var TorusCommunicationProvider = /*#__PURE__*/function (_BaseProvider) {
  function TorusCommunicationProvider(connectionStream, _ref) {
    var _this6;
    _classCallCheck(this, TorusCommunicationProvider);
    var _ref$maxEventListener2 = _ref.maxEventListeners,
      maxEventListeners = _ref$maxEventListener2 === void 0 ? 100 : _ref$maxEventListener2,
      _ref$jsonRpcStreamNam2 = _ref.jsonRpcStreamName,
      jsonRpcStreamName = _ref$jsonRpcStreamNam2 === void 0 ? "provider" : _ref$jsonRpcStreamNam2;
    _this6 = _callSuper(this, TorusCommunicationProvider, [connectionStream, {
      maxEventListeners: maxEventListeners,
      jsonRpcStreamName: jsonRpcStreamName
    }]);
    // private state
    (0, _defineProperty2.default)(_this6, "embedTranslations", void 0);
    (0, _defineProperty2.default)(_this6, "torusUrl", void 0);
    (0, _defineProperty2.default)(_this6, "dappStorageKey", void 0);
    (0, _defineProperty2.default)(_this6, "windowRefs", void 0);
    (0, _defineProperty2.default)(_this6, "tryWindowHandle", void 0);
    (0, _defineProperty2.default)(_this6, "torusAlertContainer", void 0);
    (0, _defineProperty2.default)(_this6, "torusIframe", void 0);
    _this6._state = _objectSpread$2({}, TorusCommunicationProvider._defaultState);
    // public state
    _this6.torusUrl = "";
    _this6.dappStorageKey = "";
    var languageTranslations = configuration.translations[getUserLanguage()];
    _this6.embedTranslations = languageTranslations.embed;
    _this6.windowRefs = {};
    // setup own event listeners
    // EIP-1193 connect
    _this6.on("connect", function () {
      _this6._state.isConnected = true;
    });
    var notificationHandler = function notificationHandler(payload) {
      var method = payload.method,
        params = payload.params;
      if (method === _baseControllers.COMMUNICATION_NOTIFICATIONS.IFRAME_STATUS) {
        var isFullScreen = params.isFullScreen,
          rid = params.rid;
        _this6._displayIframe({
          isFull: isFullScreen,
          rid: rid
        });
      } else if (method === _baseControllers.COMMUNICATION_NOTIFICATIONS.CREATE_WINDOW) {
        var windowId = params.windowId,
          url = params.url;
        _this6._createPopupBlockAlert(windowId, url);
      } else if (method === _baseControllers.COMMUNICATION_NOTIFICATIONS.CLOSE_WINDOW) {
        _this6._handleCloseWindow(params);
      } else if (method === _baseControllers.COMMUNICATION_NOTIFICATIONS.USER_LOGGED_IN) {
        var currentLoginProvider = params.currentLoginProvider;
        _this6._state.isLoggedIn = true;
        _this6._state.currentLoginProvider = currentLoginProvider;
      } else if (method === _baseControllers.COMMUNICATION_NOTIFICATIONS.USER_LOGGED_OUT) {
        _this6._state.isLoggedIn = false;
        _this6._state.currentLoginProvider = null;
        _this6._displayIframe();
      }
    };
    _this6.jsonRpcConnectionEvents.on("notification", notificationHandler);
    return _this6;
  }
  _inherits(TorusCommunicationProvider, _BaseProvider);
  return _createClass(TorusCommunicationProvider, [{
    key: "isLoggedIn",
    get: function get() {
      return this._state.isLoggedIn;
    }
  }, {
    key: "isIFrameFullScreen",
    get: function get() {
      return this._state.isIFrameFullScreen;
    }
    /**
     * Returns whether the inPage provider is connected to Torus.
     */
  }, {
    key: "isConnected",
    value: function isConnected() {
      return this._state.isConnected;
    }
  }, {
    key: "_initializeState",
    value: function () {
      var _initializeState2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(params) {
        var _this7 = this;
        var torusUrl, dappStorageKey, torusAlertContainer, torusIframe, _yield$this$request, currentLoginProvider, isLoggedIn;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              torusUrl = params.torusUrl, dappStorageKey = params.dappStorageKey, torusAlertContainer = params.torusAlertContainer, torusIframe = params.torusIframe;
              this.torusUrl = torusUrl;
              this.dappStorageKey = dappStorageKey;
              this.torusAlertContainer = torusAlertContainer;
              this.torusIframe = torusIframe;
              this.torusIframe.addEventListener("load", function () {
                // only do this if iframe is not full screen
                if (!_this7._state.isIFrameFullScreen) _this7._displayIframe();
              });
              _context3.next = 9;
              return this.request({
                method: _baseControllers.COMMUNICATION_JRPC_METHODS.GET_PROVIDER_STATE,
                params: []
              });
            case 9:
              _yield$this$request = _context3.sent;
              currentLoginProvider = _yield$this$request.currentLoginProvider;
              isLoggedIn = _yield$this$request.isLoggedIn;
              // indicate that we've connected, for EIP-1193 compliance
              this._handleConnect(currentLoginProvider, isLoggedIn);
              _context3.next = 18;
              break;
            case 15:
              _context3.prev = 15;
              _context3.t0 = _context3["catch"](0);
              log.error("Torus: Failed to get initial state. Please report this bug.", _context3.t0);
            case 18:
              _context3.prev = 18;
              log.info("initialized communication state");
              this._state.initialized = true;
              this.emit("_initialized");
              return _context3.finish(18);
            case 23:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[0, 15, 18, 23]]);
      }));
      function _initializeState(_x3) {
        return _initializeState2.apply(this, arguments);
      }
      return _initializeState;
    }()
  }, {
    key: "_handleWindow",
    value: function _handleWindow(windowId) {
      var _this8 = this;
      var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        url = _ref3.url,
        target = _ref3.target,
        features = _ref3.features;
      var finalUrl = new URL(url || "".concat(this.torusUrl, "/redirect?windowId=").concat(windowId));
      if (this.dappStorageKey) {
        // If multiple instances, it returns the first one
        if (finalUrl.hash) finalUrl.hash += "&dappStorageKey=".concat(this.dappStorageKey);else finalUrl.hash = "#dappStorageKey=".concat(this.dappStorageKey);
      }
      var handledWindow = new PopupHandler({
        url: finalUrl,
        target: target,
        features: features
      });
      handledWindow.open();
      if (!handledWindow.window) {
        this._createPopupBlockAlert(windowId, finalUrl.href);
        return;
      }
      // Add to collection only if window is opened
      this.windowRefs[windowId] = handledWindow;
      // We tell the iframe that the window has been successfully opened
      this.request({
        method: _baseControllers.COMMUNICATION_JRPC_METHODS.OPENED_WINDOW,
        params: {
          windowId: windowId
        }
      });
      handledWindow.once("close", function () {
        // user closed the window
        delete _this8.windowRefs[windowId];
        _this8.request({
          method: _baseControllers.COMMUNICATION_JRPC_METHODS.CLOSED_WINDOW,
          params: {
            windowId: windowId
          }
        });
      });
    }
  }, {
    key: "_displayIframe",
    value: function _displayIframe() {
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref4$isFull = _ref4.isFull,
        isFull = _ref4$isFull === void 0 ? false : _ref4$isFull,
        _ref4$rid = _ref4.rid,
        rid = _ref4$rid === void 0 ? "" : _ref4$rid;
      var style = {};
      // set phase
      if (!isFull) {
        style.display = this._state.torusWidgetVisibility ? "block" : "none";
        style.height = "70px";
        style.width = "70px";
        switch (this._state.buttonPosition) {
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
      this._state.isIFrameFullScreen = isFull;
      this.request({
        method: _baseControllers.COMMUNICATION_JRPC_METHODS.IFRAME_STATUS,
        params: {
          isIFrameFullScreen: isFull,
          rid: rid
        }
      });
    }
  }, {
    key: "hideTorusButton",
    value: function hideTorusButton() {
      this._state.torusWidgetVisibility = false;
      this._displayIframe();
    }
  }, {
    key: "showTorusButton",
    value: function showTorusButton() {
      this._state.torusWidgetVisibility = true;
      this._displayIframe();
    }
    /**
     * Internal RPC method. Forwards requests to background via the RPC engine.
     * Also remap ids inbound and outbound
     */
  }, {
    key: "_rpcRequest",
    value: function _rpcRequest(payload, callback) {
      var cb = callback;
      var _payload = payload;
      if (!Array.isArray(_payload)) {
        if (!_payload.jsonrpc) {
          _payload.jsonrpc = "2.0";
        }
      }
      this.tryWindowHandle(_payload, cb);
    }
    /**
     * When the provider becomes connected, updates internal state and emits
     * required events. Idempotent.
     *
     * @param currentLoginProvider - The login Provider
     * emits TorusInpageProvider#connect
     */
  }, {
    key: "_handleConnect",
    value: function _handleConnect(currentLoginProvider, isLoggedIn) {
      if (!this._state.isConnected) {
        this._state.isConnected = true;
        this.emit("connect", {
          currentLoginProvider: currentLoginProvider,
          isLoggedIn: isLoggedIn
        });
        log.debug(messages.info.connected(currentLoginProvider));
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
     * emits TorusInpageProvider#disconnect
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
          this._state.currentLoginProvider = null;
          this._state.isLoggedIn = false;
          this._state.torusWidgetVisibility = false;
          this._state.isIFrameFullScreen = false;
          this._state.isPermanentlyDisconnected = true;
        }
        this.emit("disconnect", error);
      }
    }
    // Called if the iframe wants to close the window cause it is done processing the request
  }, {
    key: "_handleCloseWindow",
    value: function _handleCloseWindow(params) {
      var windowId = params.windowId;
      if (this.windowRefs[windowId]) {
        this.windowRefs[windowId].close();
        delete this.windowRefs[windowId];
      }
    }
  }, {
    key: "_createPopupBlockAlert",
    value: function () {
      var _createPopupBlockAlert2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(windowId, url) {
        var _this9 = this;
        var logoUrl, torusAlert, successAlert, btnContainer, bindOnLoad, attachOnLoad;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              logoUrl = this.getLogoUrl();
              torusAlert = htmlToElement('<div id="torusAlert" class="torus-alert--v2">' + "<div id=\"torusAlert__logo\"><img src=\"".concat(logoUrl, "\" /></div>") + "<div>" + "<h1 id=\"torusAlert__title\">".concat(this.embedTranslations.actionRequired, "</h1>") + "<p id=\"torusAlert__desc\">".concat(this.embedTranslations.pendingAction, "</p>") + "</div>" + "</div>");
              successAlert = htmlToElement("<div><a id=\"torusAlert__btn\">".concat(this.embedTranslations.continue, "</a></div>"));
              btnContainer = htmlToElement('<div id="torusAlert__btn-container"></div>');
              btnContainer.appendChild(successAlert);
              torusAlert.appendChild(btnContainer);
              bindOnLoad = function bindOnLoad() {
                successAlert.addEventListener("click", function () {
                  _this9._handleWindow(windowId, {
                    url: url,
                    target: "_blank",
                    features: getPopupFeatures(FEATURES_CONFIRM_WINDOW)
                  });
                  torusAlert.remove();
                  if (_this9.torusAlertContainer.children.length === 0) _this9.torusAlertContainer.style.display = "none";
                });
              };
              attachOnLoad = function attachOnLoad() {
                _this9.torusAlertContainer.appendChild(torusAlert);
              };
              _context4.next = 10;
              return documentReady();
            case 10:
              attachOnLoad();
              bindOnLoad();
              this.torusAlertContainer.style.display = "block";
            case 13:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function _createPopupBlockAlert(_x4, _x5) {
        return _createPopupBlockAlert2.apply(this, arguments);
      }
      return _createPopupBlockAlert;
    }()
  }, {
    key: "getLogoUrl",
    value: function getLogoUrl() {
      var logoUrl = "".concat(this.torusUrl, "/images/torus_icon-blue.svg");
      return logoUrl;
    }
  }]);
}(BaseProvider);
(0, _defineProperty2.default)(TorusCommunicationProvider, "_defaultState", {
  buttonPosition: "bottom-left",
  currentLoginProvider: null,
  isIFrameFullScreen: false,
  hasEmittedConnection: false,
  torusWidgetVisibility: false,
  initialized: false,
  isLoggedIn: false,
  isPermanentlyDisconnected: false,
  isConnected: false
});
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
var TorusInPageProvider = exports.TorusInPageProvider = /*#__PURE__*/function (_BaseProvider2) {
  /**
   * The chain ID of the currently connected Solana chain.
   * See [chainId.network]{@link https://chainid.network} for more information.
   */

  /**
   * The user's currently selected Solana address.
   * If null, Torus is either locked or the user has not permitted any
   * addresses to be viewed.
   */

  function TorusInPageProvider(connectionStream, _ref) {
    var _this10;
    _classCallCheck(this, TorusInPageProvider);
    var _ref$maxEventListener3 = _ref.maxEventListeners,
      maxEventListeners = _ref$maxEventListener3 === void 0 ? 100 : _ref$maxEventListener3,
      _ref$jsonRpcStreamNam3 = _ref.jsonRpcStreamName,
      jsonRpcStreamName = _ref$jsonRpcStreamNam3 === void 0 ? "provider" : _ref$jsonRpcStreamNam3;
    _this10 = _callSuper(this, TorusInPageProvider, [connectionStream, {
      maxEventListeners: maxEventListeners,
      jsonRpcStreamName: jsonRpcStreamName
    }]);
    // private state
    (0, _defineProperty2.default)(_this10, "chainId", void 0);
    (0, _defineProperty2.default)(_this10, "selectedAddress", void 0);
    (0, _defineProperty2.default)(_this10, "tryWindowHandle", void 0);
    _this10._state = _objectSpread$1({}, TorusInPageProvider._defaultState);
    // public state
    _this10.selectedAddress = null;
    _this10.chainId = null;
    _this10._handleAccountsChanged = _this10._handleAccountsChanged.bind(_this10);
    _this10._handleChainChanged = _this10._handleChainChanged.bind(_this10);
    _this10._handleUnlockStateChanged = _this10._handleUnlockStateChanged.bind(_this10);
    // setup own event listeners
    // EIP-1193 connect
    _this10.on("connect", function () {
      _this10._state.isConnected = true;
    });
    var jsonRpcNotificationHandler = function jsonRpcNotificationHandler(payload) {
      var method = payload.method,
        params = payload.params;
      if (method === _baseControllers.PROVIDER_NOTIFICATIONS.ACCOUNTS_CHANGED) {
        _this10._handleAccountsChanged(params);
      } else if (method === _baseControllers.PROVIDER_NOTIFICATIONS.UNLOCK_STATE_CHANGED) {
        _this10._handleUnlockStateChanged(params);
      } else if (method === _baseControllers.PROVIDER_NOTIFICATIONS.CHAIN_CHANGED) {
        _this10._handleChainChanged(params);
      }
    };
    // json rpc notification listener
    _this10.jsonRpcConnectionEvents.on("notification", jsonRpcNotificationHandler);
    return _this10;
  }
  /**
   * Returns whether the inpage provider is connected to Torus.
   */
  _inherits(TorusInPageProvider, _BaseProvider2);
  return _createClass(TorusInPageProvider, [{
    key: "isConnected",
    value: function isConnected() {
      return this._state.isConnected;
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
      var _initializeState3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var _yield$this$request2, accounts, chainId, isUnlocked;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return this.request({
                method: _baseControllers.PROVIDER_JRPC_METHODS.GET_PROVIDER_STATE,
                params: []
              });
            case 3:
              _yield$this$request2 = _context5.sent;
              accounts = _yield$this$request2.accounts;
              chainId = _yield$this$request2.chainId;
              isUnlocked = _yield$this$request2.isUnlocked;
              // indicate that we've connected, for EIP-1193 compliance
              this.emit("connect", {
                chainId: chainId
              });
              this._handleChainChanged({
                chainId: chainId
              });
              this._handleUnlockStateChanged({
                accounts: accounts,
                isUnlocked: isUnlocked
              });
              this._handleAccountsChanged(accounts);
              _context5.next = 16;
              break;
            case 13:
              _context5.prev = 13;
              _context5.t0 = _context5["catch"](0);
              log.error("Torus: Failed to get initial state. Please report this bug.", _context5.t0);
            case 16:
              _context5.prev = 16;
              log.info("initialized provider state");
              this._state.initialized = true;
              this.emit("_initialized");
              return _context5.finish(16);
            case 21:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this, [[0, 13, 16, 21]]);
      }));
      function _initializeState() {
        return _initializeState3.apply(this, arguments);
      }
      return _initializeState;
    }()
    /**
     * Internal RPC method. Forwards requests to background via the RPC engine.
     * Also remap ids inbound and outbound
     */
  }, {
    key: "_rpcRequest",
    value: function _rpcRequest(payload, callback) {
      var _this11 = this;
      var isInternal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var cb = callback;
      var _payload = payload;
      if (!Array.isArray(_payload)) {
        if (!_payload.jsonrpc) {
          _payload.jsonrpc = "2.0";
        }
        if (_payload.method === "solana_accounts" || _payload.method === "solana_requestAccounts") {
          // handle accounts changing
          cb = function cb(err, res) {
            _this11._handleAccountsChanged(res.result || [], _payload.method === "solana_accounts", isInternal);
            callback(err, res);
          };
        } else if (_payload.method === "wallet_getProviderState") {
          this._rpcEngine.handle(payload, cb);
          return;
        }
      }
      this.tryWindowHandle(_payload, cb);
    }
    /**
     * When the provider becomes connected, updates internal state and emits
     * required events. Idempotent.
     *
     * @param chainId - The ID of the newly connected chain.
     * emits TorusInpageProvider#connect
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
     * emits TorusInpageProvider#disconnect
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
        log.error("Torus: Received non-array accounts parameter. Please report this bug.", finalAccounts);
        finalAccounts = [];
      }
      var _iterator = _createForOfIteratorHelper(accounts),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var account = _step.value;
          if (typeof account !== "string") {
            log.error("Torus: Received non-string account. Please report this bug.", accounts);
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
        // we should always have the correct accounts even before solana_accounts
        // returns, except in cases where isInternal is true
        if (isEthAccounts && Array.isArray(this._state.accounts) && this._state.accounts.length > 0 && !isInternal) {
          log.error('Torus: "solana_accounts" unexpectedly updated accounts. Please report this bug.', finalAccounts);
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
     * emits TorusInpageProvider#chainChanged
     * @param networkInfo - An object with network info.
     */
  }, {
    key: "_handleChainChanged",
    value: function _handleChainChanged() {
      var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        chainId = _ref5.chainId;
      if (!chainId) {
        log.error("Torus: Received invalid network parameters. Please report this bug.", {
          chainId: chainId
        });
        return;
      }
      if (chainId === "loading") {
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
      var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        accounts = _ref6.accounts,
        isUnlocked = _ref6.isUnlocked;
      if (typeof isUnlocked !== "boolean") {
        log.error("Torus: Received invalid isUnlocked parameter. Please report this bug.", {
          isUnlocked: isUnlocked
        });
        return;
      }
      if (isUnlocked !== this._state.isUnlocked) {
        this._state.isUnlocked = isUnlocked;
        this._handleAccountsChanged(accounts || []);
      }
    }
  }]);
}(BaseProvider);
(0, _defineProperty2.default)(TorusInPageProvider, "_defaultState", {
  accounts: null,
  isConnected: false,
  isUnlocked: false,
  initialized: false,
  isPermanentlyDisconnected: false,
  hasEmittedConnection: false
});

/**
 * Returns whether the given image URL exists
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
function getSiteIcon(_x6) {
  return _getSiteIcon.apply(this, arguments);
}
/**
 * Gets site metadata and returns it
 *
 */
function _getSiteIcon() {
  _getSiteIcon = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee28(window) {
    var _document, icon;
    return _regeneratorRuntime().wrap(function _callee28$(_context28) {
      while (1) switch (_context28.prev = _context28.next) {
        case 0:
          _context28.prev = 0;
          _document = window.document; // Use the site's favicon if it exists
          icon = _document.querySelector('head > link[rel="shortcut icon"]');
          _context28.t0 = icon;
          if (!_context28.t0) {
            _context28.next = 8;
            break;
          }
          _context28.next = 7;
          return imgExists(icon.href);
        case 7:
          _context28.t0 = _context28.sent;
        case 8:
          if (!_context28.t0) {
            _context28.next = 10;
            break;
          }
          return _context28.abrupt("return", icon.href);
        case 10:
          // Search through available icons in no particular order
          icon = Array.from(_document.querySelectorAll('head > link[rel="icon"]')).find(function (_icon) {
            return Boolean(_icon.href);
          });
          _context28.t1 = icon;
          if (!_context28.t1) {
            _context28.next = 16;
            break;
          }
          _context28.next = 15;
          return imgExists(icon.href);
        case 15:
          _context28.t1 = _context28.sent;
        case 16:
          if (!_context28.t1) {
            _context28.next = 18;
            break;
          }
          return _context28.abrupt("return", icon.href);
        case 18:
          return _context28.abrupt("return", "");
        case 21:
          _context28.prev = 21;
          _context28.t2 = _context28["catch"](0);
          return _context28.abrupt("return", "");
        case 24:
        case "end":
          return _context28.stop();
      }
    }, _callee28, null, [[0, 21]]);
  }));
  return _getSiteIcon.apply(this, arguments);
}
var getSiteMetadata = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.t0 = getSiteName(window);
          _context6.next = 3;
          return getSiteIcon(window);
        case 3:
          _context6.t1 = _context6.sent;
          return _context6.abrupt("return", {
            name: _context6.t0,
            icon: _context6.t1
          });
        case 5:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function getSiteMetadata() {
    return _ref7.apply(this, arguments);
  };
}();
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
var PROVIDER_UNSAFE_METHODS = ["send_transaction", "sign_transaction", "sign_all_transactions", "sign_message", "connect"];
var COMMUNICATION_UNSAFE_METHODS = [_baseControllers.COMMUNICATION_JRPC_METHODS.SET_PROVIDER];
var isLocalStorageAvailable = storageAvailable("localStorage");
// preload for iframe doesn't work https://bugs.chromium.org/p/chromium/issues/detail?id=593267
(function () {
  var _preLoadIframe = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
    var torusIframeHtml, _yield$getTorusUrl, torusUrl;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          if (!(typeof document === "undefined")) {
            _context7.next = 3;
            break;
          }
          return _context7.abrupt("return");
        case 3:
          torusIframeHtml = document.createElement("link");
          _context7.next = 6;
          return getTorusUrl("production");
        case 6:
          _yield$getTorusUrl = _context7.sent;
          torusUrl = _yield$getTorusUrl.torusUrl;
          torusIframeHtml.href = "".concat(torusUrl, "/frame");
          torusIframeHtml.crossOrigin = "anonymous";
          torusIframeHtml.type = "text/html";
          torusIframeHtml.rel = "prefetch";
          if (torusIframeHtml.relList && torusIframeHtml.relList.supports) {
            if (torusIframeHtml.relList.supports("prefetch")) {
              document.head.appendChild(torusIframeHtml);
            }
          }
          _context7.next = 18;
          break;
        case 15:
          _context7.prev = 15;
          _context7.t0 = _context7["catch"](0);
          log.warn(_context7.t0);
        case 18:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 15]]);
  }));
  function preLoadIframe() {
    return _preLoadIframe.apply(this, arguments);
  }
  return preLoadIframe;
})()();
var Torus = exports.default = /*#__PURE__*/function () {
  function Torus() {
    _classCallCheck(this, Torus);
    var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref8$modalZIndex = _ref8.modalZIndex,
      modalZIndex = _ref8$modalZIndex === void 0 ? 99999 : _ref8$modalZIndex;
    (0, _defineProperty2.default)(this, "isInitialized", void 0);
    (0, _defineProperty2.default)(this, "torusAlert", void 0);
    (0, _defineProperty2.default)(this, "modalZIndex", void 0);
    (0, _defineProperty2.default)(this, "alertZIndex", void 0);
    (0, _defineProperty2.default)(this, "requestedLoginProvider", void 0);
    (0, _defineProperty2.default)(this, "provider", void 0);
    (0, _defineProperty2.default)(this, "communicationProvider", void 0);
    (0, _defineProperty2.default)(this, "dappStorageKey", void 0);
    (0, _defineProperty2.default)(this, "isTopupHidden", false);
    (0, _defineProperty2.default)(this, "torusAlertContainer", void 0);
    (0, _defineProperty2.default)(this, "torusUrl", void 0);
    (0, _defineProperty2.default)(this, "torusIframe", void 0);
    (0, _defineProperty2.default)(this, "styleLink", void 0);
    this.torusUrl = "";
    this.isInitialized = false; // init done
    this.requestedLoginProvider = null;
    this.modalZIndex = modalZIndex;
    this.alertZIndex = modalZIndex + 1000;
    this.dappStorageKey = "";
  }
  return _createClass(Torus, [{
    key: "isLoggedIn",
    get: function get() {
      if (!this.communicationProvider) return false;
      return this.communicationProvider.isLoggedIn;
    }
  }, {
    key: "init",
    value: function () {
      var _init = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
        var _this12 = this;
        var _ref9,
          _ref9$buildEnv,
          buildEnv,
          _ref9$enableLogging,
          enableLogging,
          network,
          _ref9$showTorusButton,
          showTorusButton,
          _ref9$useLocalStorage,
          useLocalStorage,
          _ref9$buttonPosition,
          buttonPosition,
          _ref9$apiKey,
          apiKey,
          _ref9$extraParams,
          extraParams,
          whiteLabel,
          _yield$getTorusUrl2,
          torusUrl,
          logLevel,
          dappStorageKey,
          torusIframeUrl,
          hashParams,
          handleSetup,
          _args10 = arguments;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _ref9 = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : {}, _ref9$buildEnv = _ref9.buildEnv, buildEnv = _ref9$buildEnv === void 0 ? TORUS_BUILD_ENV.PRODUCTION : _ref9$buildEnv, _ref9$enableLogging = _ref9.enableLogging, enableLogging = _ref9$enableLogging === void 0 ? false : _ref9$enableLogging, network = _ref9.network, _ref9$showTorusButton = _ref9.showTorusButton, showTorusButton = _ref9$showTorusButton === void 0 ? false : _ref9$showTorusButton, _ref9$useLocalStorage = _ref9.useLocalStorage, useLocalStorage = _ref9$useLocalStorage === void 0 ? false : _ref9$useLocalStorage, _ref9$buttonPosition = _ref9.buttonPosition, buttonPosition = _ref9$buttonPosition === void 0 ? BUTTON_POSITION.BOTTOM_LEFT : _ref9$buttonPosition, _ref9$apiKey = _ref9.apiKey, apiKey = _ref9$apiKey === void 0 ? "torus-default" : _ref9$apiKey, _ref9$extraParams = _ref9.extraParams, extraParams = _ref9$extraParams === void 0 ? {} : _ref9$extraParams, whiteLabel = _ref9.whiteLabel;
              if (!this.isInitialized) {
                _context10.next = 3;
                break;
              }
              throw new Error("Already initialized");
            case 3:
              (0, _httpHelpers.setAPIKey)(apiKey);
              _context10.next = 6;
              return getTorusUrl(buildEnv);
            case 6:
              _yield$getTorusUrl2 = _context10.sent;
              torusUrl = _yield$getTorusUrl2.torusUrl;
              logLevel = _yield$getTorusUrl2.logLevel;
              log.enableAll();
              log.info(torusUrl, "url loaded");
              log.info("Solana Embed Version :".concat(version));
              this.torusUrl = torusUrl;
              log.setDefaultLevel(logLevel);
              if (enableLogging) log.enableAll();else log.disableAll();
              dappStorageKey = this.handleDappStorageKey(useLocalStorage);
              torusIframeUrl = new URL(torusUrl);
              if (torusIframeUrl.pathname.endsWith("/")) torusIframeUrl.pathname += "frame";else torusIframeUrl.pathname += "/frame";
              hashParams = new URLSearchParams();
              if (dappStorageKey) hashParams.append("dappStorageKey", dappStorageKey);
              hashParams.append("origin", window.location.origin);
              torusIframeUrl.hash = hashParams.toString();
              // Iframe code
              this.torusIframe = htmlToElement("<iframe\n        id=\"torusIframe\"\n        class=\"torusIframe\"\n        src=\"".concat(torusIframeUrl.href, "\"\n        style=\"display: none; position: fixed; top: 0; right: 0; width: 100%;\n        height: 100%; border: none; border-radius: 0; z-index: ").concat(this.modalZIndex.toString(), "\"\n      ></iframe>"));
              this.torusAlertContainer = htmlToElement("<div id=\"torusAlertContainer\" style=\"display:none; z-index: ".concat(this.alertZIndex.toString(), "\"></div>"));
              this.styleLink = htmlToElement("<link href=\"".concat(torusUrl, "/css/widget.css\" rel=\"stylesheet\" type=\"text/css\">"));
              handleSetup = /*#__PURE__*/function () {
                var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
                  return _regeneratorRuntime().wrap(function _callee9$(_context9) {
                    while (1) switch (_context9.prev = _context9.next) {
                      case 0:
                        return _context9.abrupt("return", new Promise(function (resolve, reject) {
                          try {
                            window.document.head.appendChild(_this12.styleLink);
                            window.document.body.appendChild(_this12.torusIframe);
                            window.document.body.appendChild(_this12.torusAlertContainer);
                            _this12.torusIframe.addEventListener("load", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
                              var dappMetadata;
                              return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                                while (1) switch (_context8.prev = _context8.next) {
                                  case 0:
                                    _context8.next = 2;
                                    return getSiteMetadata();
                                  case 2:
                                    dappMetadata = _context8.sent;
                                    // send init params here
                                    _this12.torusIframe.contentWindow.postMessage({
                                      buttonPosition: buttonPosition,
                                      apiKey: apiKey,
                                      network: network,
                                      dappMetadata: dappMetadata,
                                      extraParams: extraParams,
                                      whiteLabel: whiteLabel
                                    }, torusIframeUrl.origin);
                                    _context8.next = 6;
                                    return _this12._setupWeb3({
                                      torusUrl: torusUrl
                                    });
                                  case 6:
                                    if (showTorusButton) _this12.showTorusButton();
                                    if (whiteLabel?.topupHide) _this12.isTopupHidden = whiteLabel.topupHide;else _this12.hideTorusButton();
                                    _this12.isInitialized = true;
                                    window.torus = _this12;
                                    resolve();
                                  case 11:
                                  case "end":
                                    return _context8.stop();
                                }
                              }, _callee8);
                            })));
                          } catch (error) {
                            reject(error);
                          }
                        }));
                      case 1:
                      case "end":
                        return _context9.stop();
                    }
                  }, _callee9);
                }));
                return function handleSetup() {
                  return _ref10.apply(this, arguments);
                };
              }();
              _context10.next = 28;
              return documentReady();
            case 28:
              _context10.next = 30;
              return handleSetup();
            case 30:
            case "end":
              return _context10.stop();
          }
        }, _callee10, this);
      }));
      function init() {
        return _init.apply(this, arguments);
      }
      return init;
    }()
  }, {
    key: "login",
    value: function () {
      var _login = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
        var _this13 = this;
        var params,
          res,
          _args11 = arguments;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              params = _args11.length > 0 && _args11[0] !== undefined ? _args11[0] : {};
              if (this.isInitialized) {
                _context11.next = 3;
                break;
              }
              throw new Error("Call init() first");
            case 3:
              _context11.prev = 3;
              this.requestedLoginProvider = params.loginProvider || null;
              if (!this.requestedLoginProvider) {
                this.communicationProvider._displayIframe({
                  isFull: true
                });
              }
              // If user is already logged in, we assume they have given access to the website
              _context11.next = 8;
              return new Promise(function (resolve, reject) {
                // We use this method because we want to update inPage provider state with account info
                _this13.provider._rpcRequest({
                  method: "solana_requestAccounts",
                  params: [_this13.requestedLoginProvider, params.login_hint]
                }, (0, _openloginJrpc.getRpcPromiseCallback)(resolve, reject));
              });
            case 8:
              res = _context11.sent;
              if (!(Array.isArray(res) && res.length > 0)) {
                _context11.next = 11;
                break;
              }
              return _context11.abrupt("return", res);
            case 11:
              throw new Error("Login failed");
            case 14:
              _context11.prev = 14;
              _context11.t0 = _context11["catch"](3);
              log.error("login failed", _context11.t0);
              throw _context11.t0;
            case 18:
              _context11.prev = 18;
              if (this.communicationProvider.isIFrameFullScreen) this.communicationProvider._displayIframe();
              return _context11.finish(18);
            case 21:
            case "end":
              return _context11.stop();
          }
        }, _callee11, this, [[3, 14, 18, 21]]);
      }));
      function login() {
        return _login.apply(this, arguments);
      }
      return login;
    }()
  }, {
    key: "loginWithPrivateKey",
    value: function () {
      var _loginWithPrivateKey = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(loginParams) {
        var privateKey, userInfo, _yield$this$communica, success;
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              if (this.isInitialized) {
                _context12.next = 2;
                break;
              }
              throw new Error("Call init() first");
            case 2:
              privateKey = loginParams.privateKey, userInfo = loginParams.userInfo;
              _context12.next = 5;
              return this.communicationProvider.request({
                method: "login_with_private_key",
                params: {
                  privateKey: privateKey,
                  userInfo: userInfo
                }
              });
            case 5:
              _yield$this$communica = _context12.sent;
              success = _yield$this$communica.success;
              if (success) {
                _context12.next = 9;
                break;
              }
              throw new Error("Login Failed");
            case 9:
            case "end":
              return _context12.stop();
          }
        }, _callee12, this);
      }));
      function loginWithPrivateKey(_x7) {
        return _loginWithPrivateKey.apply(this, arguments);
      }
      return loginWithPrivateKey;
    }()
  }, {
    key: "logout",
    value: function () {
      var _logout = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              if (this.communicationProvider.isLoggedIn) {
                _context13.next = 2;
                break;
              }
              throw new Error("Not logged in");
            case 2:
              _context13.next = 4;
              return this.communicationProvider.request({
                method: _baseControllers.COMMUNICATION_JRPC_METHODS.LOGOUT,
                params: []
              });
            case 4:
              this.requestedLoginProvider = null;
            case 5:
            case "end":
              return _context13.stop();
          }
        }, _callee13, this);
      }));
      function logout() {
        return _logout.apply(this, arguments);
      }
      return logout;
    }()
  }, {
    key: "cleanUp",
    value: function () {
      var _cleanUp = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14() {
        return _regeneratorRuntime().wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              if (!this.communicationProvider.isLoggedIn) {
                _context14.next = 3;
                break;
              }
              _context14.next = 3;
              return this.logout();
            case 3:
              this.clearInit();
            case 4:
            case "end":
              return _context14.stop();
          }
        }, _callee14, this);
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
        return element instanceof Element || element instanceof Document;
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
      this.communicationProvider.hideTorusButton();
    }
  }, {
    key: "showTorusButton",
    value: function showTorusButton() {
      this.communicationProvider.showTorusButton();
    }
  }, {
    key: "setProvider",
    value: function () {
      var _setProvider = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15(params) {
        return _regeneratorRuntime().wrap(function _callee15$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return this.communicationProvider.request({
                method: _baseControllers.COMMUNICATION_JRPC_METHODS.SET_PROVIDER,
                params: _objectSpread({}, params)
              });
            case 2:
            case "end":
              return _context15.stop();
          }
        }, _callee15, this);
      }));
      function setProvider(_x8) {
        return _setProvider.apply(this, arguments);
      }
      return setProvider;
    }()
  }, {
    key: "showWallet",
    value: function () {
      var _showWallet = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee16(path) {
        var params,
          instanceId,
          finalPath,
          finalUrl,
          walletWindow,
          _args16 = arguments;
        return _regeneratorRuntime().wrap(function _callee16$(_context16) {
          while (1) switch (_context16.prev = _context16.next) {
            case 0:
              params = _args16.length > 1 && _args16[1] !== undefined ? _args16[1] : {};
              _context16.next = 3;
              return this.communicationProvider.request({
                method: _baseControllers.COMMUNICATION_JRPC_METHODS.WALLET_INSTANCE_ID,
                params: []
              });
            case 3:
              instanceId = _context16.sent;
              finalPath = path ? "/".concat(path) : "";
              finalUrl = new URL("".concat(this.torusUrl, "/wallet").concat(finalPath)); // Using URL constructor to prevent js injection and allow parameter validation.!
              finalUrl.searchParams.append("instanceId", instanceId);
              Object.keys(params).forEach(function (x) {
                finalUrl.searchParams.append(x, params[x]);
              });
              if (this.dappStorageKey) {
                finalUrl.hash = "#dappStorageKey=".concat(this.dappStorageKey);
              }
              // No need to track this window state. Hence, no _handleWindow call.
              walletWindow = new PopupHandler({
                url: finalUrl,
                features: getPopupFeatures(FEATURES_DEFAULT_WALLET_WINDOW)
              });
              walletWindow.open();
            case 11:
            case "end":
              return _context16.stop();
          }
        }, _callee16, this);
      }));
      function showWallet(_x9) {
        return _showWallet.apply(this, arguments);
      }
      return showWallet;
    }()
  }, {
    key: "getUserInfo",
    value: function () {
      var _getUserInfo = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee17() {
        var userInfoResponse;
        return _regeneratorRuntime().wrap(function _callee17$(_context17) {
          while (1) switch (_context17.prev = _context17.next) {
            case 0:
              _context17.next = 2;
              return this.communicationProvider.request({
                method: _baseControllers.COMMUNICATION_JRPC_METHODS.USER_INFO,
                params: []
              });
            case 2:
              userInfoResponse = _context17.sent;
              return _context17.abrupt("return", userInfoResponse);
            case 4:
            case "end":
              return _context17.stop();
          }
        }, _callee17, this);
      }));
      function getUserInfo() {
        return _getUserInfo.apply(this, arguments);
      }
      return getUserInfo;
    }()
  }, {
    key: "initiateTopup",
    value: function () {
      var _initiateTopup = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee18(provider, params) {
        var windowId, topupResponse;
        return _regeneratorRuntime().wrap(function _callee18$(_context18) {
          while (1) switch (_context18.prev = _context18.next) {
            case 0:
              if (this.isInitialized) {
                _context18.next = 2;
                break;
              }
              throw new Error("Torus is not initialized");
            case 2:
              windowId = getWindowId();
              this.communicationProvider._handleWindow(windowId);
              _context18.next = 6;
              return this.communicationProvider.request({
                method: _baseControllers.COMMUNICATION_JRPC_METHODS.TOPUP,
                params: {
                  provider: provider,
                  params: params,
                  windowId: windowId
                }
              });
            case 6:
              topupResponse = _context18.sent;
              return _context18.abrupt("return", topupResponse);
            case 8:
            case "end":
              return _context18.stop();
          }
        }, _callee18, this);
      }));
      function initiateTopup(_x10, _x11) {
        return _initiateTopup.apply(this, arguments);
      }
      return initiateTopup;
    }() // Solana specific API
  }, {
    key: "getAccounts",
    value: function () {
      var _getAccounts = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee19() {
        var response;
        return _regeneratorRuntime().wrap(function _callee19$(_context19) {
          while (1) switch (_context19.prev = _context19.next) {
            case 0:
              _context19.next = 2;
              return this.provider.request({
                method: "getAccounts",
                params: []
              });
            case 2:
              response = _context19.sent;
              return _context19.abrupt("return", response);
            case 4:
            case "end":
              return _context19.stop();
          }
        }, _callee19, this);
      }));
      function getAccounts() {
        return _getAccounts.apply(this, arguments);
      }
      return getAccounts;
    }()
  }, {
    key: "sendTransaction",
    value: function () {
      var _sendTransaction = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee20(transaction) {
        var isLegacyTransaction, message, response;
        return _regeneratorRuntime().wrap(function _callee20$(_context20) {
          while (1) switch (_context20.prev = _context20.next) {
            case 0:
              isLegacyTransaction = isLegacyTransactionInstance(transaction);
              message = isLegacyTransaction ? transaction.serialize({
                requireAllSignatures: false
              }).toString("hex") : Buffer.from(transaction.serialize()).toString("hex");
              _context20.next = 4;
              return this.provider.request({
                method: "send_transaction",
                params: {
                  message: message,
                  isLegacyTransaction: isLegacyTransaction
                }
              });
            case 4:
              response = _context20.sent;
              return _context20.abrupt("return", response);
            case 6:
            case "end":
              return _context20.stop();
          }
        }, _callee20, this);
      }));
      function sendTransaction(_x12) {
        return _sendTransaction.apply(this, arguments);
      }
      return sendTransaction;
    }() // support sendOptions
  }, {
    key: "signAndSendTransaction",
    value: function () {
      var _signAndSendTransaction = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee21(transaction, options) {
        var isLegacyTransaction, message, response;
        return _regeneratorRuntime().wrap(function _callee21$(_context21) {
          while (1) switch (_context21.prev = _context21.next) {
            case 0:
              isLegacyTransaction = isLegacyTransactionInstance(transaction);
              message = isLegacyTransaction ? transaction.serialize({
                requireAllSignatures: false
              }).toString("hex") : Buffer.from(transaction.serialize()).toString("hex");
              _context21.next = 4;
              return this.provider.request({
                method: "send_transaction",
                params: {
                  message: message,
                  options: options,
                  isLegacyTransaction: isLegacyTransaction
                }
              });
            case 4:
              response = _context21.sent;
              return _context21.abrupt("return", {
                signature: response
              });
            case 6:
            case "end":
              return _context21.stop();
          }
        }, _callee21, this);
      }));
      function signAndSendTransaction(_x13, _x14) {
        return _signAndSendTransaction.apply(this, arguments);
      }
      return signAndSendTransaction;
    }()
  }, {
    key: "signTransaction",
    value: function () {
      var _signTransaction = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee22(transaction) {
        var isLegacyTransaction, message, response, parsed, signature;
        return _regeneratorRuntime().wrap(function _callee22$(_context22) {
          while (1) switch (_context22.prev = _context22.next) {
            case 0:
              isLegacyTransaction = isLegacyTransactionInstance(transaction);
              message = isLegacyTransaction ? transaction.serializeMessage().toString("hex") : Buffer.from(transaction.message.serialize()).toString("hex");
              _context22.next = 4;
              return this.provider.request({
                method: "sign_transaction",
                params: {
                  message: message,
                  messageOnly: true,
                  isLegacyTransaction: isLegacyTransaction
                }
              });
            case 4:
              response = _context22.sent;
              // reconstruct signature pair
              parsed = JSON.parse(response);
              signature = {
                publicKey: new _web.PublicKey(parsed.publicKey),
                signature: Buffer.from(parsed.signature, "hex")
              };
              transaction.addSignature(signature.publicKey, signature.signature);
              return _context22.abrupt("return", transaction);
            case 9:
            case "end":
              return _context22.stop();
          }
        }, _callee22, this);
      }));
      function signTransaction(_x15) {
        return _signTransaction.apply(this, arguments);
      }
      return signTransaction;
    }()
  }, {
    key: "signAllTransactions",
    value: function () {
      var _signAllTransactions = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee23(transactions) {
        var isLegacyTransaction, encodedMessage, responses, signatures;
        return _regeneratorRuntime().wrap(function _callee23$(_context23) {
          while (1) switch (_context23.prev = _context23.next) {
            case 0:
              encodedMessage = transactions.map(function (tx) {
                isLegacyTransaction = isLegacyTransactionInstance(tx);
                return isLegacyTransaction ? tx.serializeMessage().toString("hex") : Buffer.from(tx.message.serialize()).toString("hex");
              });
              _context23.next = 3;
              return this.provider.request({
                method: "sign_all_transactions",
                params: {
                  message: encodedMessage,
                  messageOnly: true,
                  isLegacyTransaction: isLegacyTransaction
                }
              });
            case 3:
              responses = _context23.sent;
              // reconstruct signature pairs
              signatures = responses.map(function (item) {
                var parsed = JSON.parse(item);
                return {
                  publicKey: new _web.PublicKey(parsed.publicKey),
                  signature: Buffer.from(parsed.signature, "hex")
                };
              });
              transactions.forEach(function (tx, idx) {
                tx.addSignature(signatures[idx].publicKey, signatures[idx].signature);
                return tx;
              });
              return _context23.abrupt("return", transactions);
            case 7:
            case "end":
              return _context23.stop();
          }
        }, _callee23, this);
      }));
      function signAllTransactions(_x16) {
        return _signAllTransactions.apply(this, arguments);
      }
      return signAllTransactions;
    }()
  }, {
    key: "signMessage",
    value: function () {
      var _signMessage = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee24(data) {
        var response;
        return _regeneratorRuntime().wrap(function _callee24$(_context24) {
          while (1) switch (_context24.prev = _context24.next) {
            case 0:
              _context24.next = 2;
              return this.provider.request({
                method: "sign_message",
                params: {
                  data: data
                }
              });
            case 2:
              response = _context24.sent;
              return _context24.abrupt("return", response);
            case 4:
            case "end":
              return _context24.stop();
          }
        }, _callee24, this);
      }));
      function signMessage(_x17) {
        return _signMessage.apply(this, arguments);
      }
      return signMessage;
    }()
  }, {
    key: "getGaslessPublicKey",
    value: function () {
      var _getGaslessPublicKey = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee25() {
        var response;
        return _regeneratorRuntime().wrap(function _callee25$(_context25) {
          while (1) switch (_context25.prev = _context25.next) {
            case 0:
              _context25.next = 2;
              return this.provider.request({
                method: "get_gasless_public_key",
                params: []
              });
            case 2:
              response = _context25.sent;
              return _context25.abrupt("return", response);
            case 4:
            case "end":
              return _context25.stop();
          }
        }, _callee25, this);
      }));
      function getGaslessPublicKey() {
        return _getGaslessPublicKey.apply(this, arguments);
      }
      return getGaslessPublicKey;
    }() // async connect(): Promise<boolean> {
    //   const response = (await this.provider.request({
    //     method: "connect",
    //     params: {},
    //   })) as boolean;
    //   return response;
    // }
  }, {
    key: "handleDappStorageKey",
    value: function handleDappStorageKey(useLocalStorage) {
      var localStorageKey = "".concat(configuration.localStorageKeyPrefix).concat(window.location.hostname);
      var dappStorageKey = "";
      if (isLocalStorageAvailable && useLocalStorage) {
        var storedKey = window.localStorage.getItem(localStorageKey);
        if (storedKey) dappStorageKey = storedKey;else {
          var generatedKey = "torus-app-".concat(getWindowId());
          window.localStorage.setItem(localStorageKey, generatedKey);
          dappStorageKey = generatedKey;
        }
      }
      this.dappStorageKey = dappStorageKey;
      return dappStorageKey;
    }
  }, {
    key: "_setupWeb3",
    value: function () {
      var _setupWeb = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee26(providerParams) {
        var _this14 = this;
        var providerStream, communicationStream, inPageProvider, communicationProvider, detectAccountRequestPrototypeModifier, proxiedInPageProvider, proxiedCommunicationProvider;
        return _regeneratorRuntime().wrap(function _callee26$(_context26) {
          while (1) switch (_context26.prev = _context26.next) {
            case 0:
              log.info("setupWeb3 running");
              // setup background connection
              providerStream = new _openloginJrpc.BasePostMessageStream({
                name: "embed_torus",
                target: "iframe_torus",
                targetWindow: this.torusIframe.contentWindow
              }); // We create another LocalMessageDuplexStream for communication between dapp <> iframe
              communicationStream = new _openloginJrpc.BasePostMessageStream({
                name: "embed_communication",
                target: "iframe_communication",
                targetWindow: this.torusIframe.contentWindow
              }); // compose the inPage provider
              inPageProvider = new TorusInPageProvider(providerStream, {});
              communicationProvider = new TorusCommunicationProvider(communicationStream, {});
              inPageProvider.tryWindowHandle = function (payload, cb) {
                var _payload = payload;
                if (!Array.isArray(_payload) && PROVIDER_UNSAFE_METHODS.includes(_payload.method)) {
                  if (!_this14.communicationProvider.isLoggedIn) throw new Error("User Not Logged In");
                  var windowId = getWindowId();
                  communicationProvider._handleWindow(windowId, {
                    target: "_blank",
                    features: getPopupFeatures(FEATURES_CONFIRM_WINDOW)
                  });
                  // for inPageProvider methods sending windowId in request instead of params
                  // as params might be positional.
                  _payload.windowId = windowId;
                }
                inPageProvider._rpcEngine.handle(_payload, cb);
              };
              communicationProvider.tryWindowHandle = function (payload, cb) {
                var _payload = payload;
                if (!Array.isArray(_payload) && COMMUNICATION_UNSAFE_METHODS.includes(_payload.method)) {
                  var windowId = getWindowId();
                  communicationProvider._handleWindow(windowId, {
                    target: "_blank",
                    features: getPopupFeatures(FEATURES_PROVIDER_CHANGE_WINDOW) // todo: are these features generic for all
                  });
                  // for communication methods sending window id in jrpc req params
                  _payload.params.windowId = windowId;
                }
                communicationProvider._rpcEngine.handle(_payload, cb);
              };
              // detect solana_requestAccounts and pipe to enable for now
              detectAccountRequestPrototypeModifier = function detectAccountRequestPrototypeModifier(m) {
                var originalMethod = inPageProvider[m];
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                var self = _this14;
                inPageProvider[m] = function providerFunc(request, cb) {
                  var method = request.method,
                    _request$params = request.params,
                    params = _request$params === void 0 ? [] : _request$params;
                  if (method === "solana_requestAccounts") {
                    if (!cb) return self.login({
                      loginProvider: params[0]
                    });
                    self.login({
                      loginProvider: params[0]
                    })
                    // eslint-disable-next-line promise/no-callback-in-promise
                    .then(function (res) {
                      return cb(null, res);
                    })
                    // eslint-disable-next-line promise/no-callback-in-promise
                    .catch(function (err) {
                      return cb(err);
                    });
                  }
                  return originalMethod.apply(this, [request, cb]);
                };
              }; // Detects call to solana_requestAccounts in request & sendAsync and passes to login
              detectAccountRequestPrototypeModifier("request");
              detectAccountRequestPrototypeModifier("sendAsync");
              detectAccountRequestPrototypeModifier("send");
              proxiedInPageProvider = new Proxy(inPageProvider, {
                // straight up lie that we deleted the property so that it doesn't
                // throw an error in strict mode
                deleteProperty: function deleteProperty() {
                  return true;
                }
              });
              proxiedCommunicationProvider = new Proxy(communicationProvider, {
                // straight up lie that we deleted the property so that it doesn't
                // throw an error in strict mode
                deleteProperty: function deleteProperty() {
                  return true;
                }
              });
              this.provider = proxiedInPageProvider;
              this.communicationProvider = proxiedCommunicationProvider;
              _context26.next = 17;
              return Promise.all([inPageProvider._initializeState(), communicationProvider._initializeState(_objectSpread(_objectSpread({}, providerParams), {}, {
                dappStorageKey: this.dappStorageKey,
                torusAlertContainer: this.torusAlertContainer,
                torusIframe: this.torusIframe
              }))]);
            case 17:
              log.debug("Torus - injected provider");
            case 18:
            case "end":
              return _context26.stop();
          }
        }, _callee26, this);
      }));
      function _setupWeb3(_x18) {
        return _setupWeb.apply(this, arguments);
      }
      return _setupWeb3;
    }()
  }]);
}();
},{"@babel/runtime/helpers/defineProperty":"node_modules/@babel/runtime/helpers/defineProperty.js","@solana/web3.js":"node_modules/@solana/web3.js/lib/index.browser.esm.js","@toruslabs/base-controllers":"node_modules/@toruslabs/base-controllers/dist/baseControllers.esm.js","@toruslabs/http-helpers":"node_modules/@toruslabs/http-helpers/dist/httpHelpers.esm.js","@toruslabs/openlogin-jrpc":"node_modules/@toruslabs/solana-embed/node_modules/@toruslabs/openlogin-jrpc/dist/openloginJrpc.esm.js","eth-rpc-errors":"node_modules/eth-rpc-errors/dist/index.js","is-stream":"node_modules/is-stream/index.js","pump":"node_modules/pump/index.js","loglevel":"node_modules/loglevel/lib/loglevel.js","fast-deep-equal":"node_modules/fast-deep-equal/index.js","buffer":"../../../../usr/local/lib/node_modules/parcel-bundler/node_modules/buffer/index.js"}],"node_modules/@web3auth/torus-solana-adapter/dist/torusSolanaAdapter.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SolanaWalletAdapter = void 0;
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
var _solanaEmbed = _interopRequireDefault(require("@toruslabs/solana-embed"));
var _base = require("@web3auth/base");
var _baseSolanaAdapter = require("@web3auth/base-solana-adapter");
var _solanaProvider = require("@web3auth/solana-provider");
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
var SolanaWalletAdapter = exports.SolanaWalletAdapter = /*#__PURE__*/function (_BaseSolanaAdapter) {
  (0, _inherits2.default)(SolanaWalletAdapter, _BaseSolanaAdapter);
  var _super = _createSuper(SolanaWalletAdapter);
  function SolanaWalletAdapter(params) {
    var _this;
    (0, _classCallCheck2.default)(this, SolanaWalletAdapter);
    _this = _super.call(this, params);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "name", _base.WALLET_ADAPTERS.TORUS_SOLANA);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "adapterNamespace", _base.ADAPTER_NAMESPACES.SOLANA);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "currentChainNamespace", _base.CHAIN_NAMESPACES.SOLANA);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "type", _base.ADAPTER_CATEGORY.EXTERNAL);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "status", _base.ADAPTER_STATUS.NOT_READY);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "torusInstance", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "torusWalletOptions", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "initParams", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "loginSettings", {});
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "solanaProvider", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "rehydrated", false);
    _this.torusWalletOptions = params.adapterSettings || {};
    _this.initParams = params.initParams || {};
    _this.loginSettings = params.loginSettings || {};
    _this.chainConfig = params.chainConfig || null;
    _this.sessionTime = params.sessionTime || 86400;
    return _this;
  }
  (0, _createClass2.default)(SolanaWalletAdapter, [{
    key: "provider",
    get: function get() {
      if (this.status === _base.ADAPTER_STATUS.CONNECTED && this.solanaProvider) {
        var _this$solanaProvider;
        return ((_this$solanaProvider = this.solanaProvider) === null || _this$solanaProvider === void 0 ? void 0 : _this$solanaProvider.provider) || null;
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
        var network, _this$chainConfig, blockExplorer, displayName, ticker, tickerName, rpcTarget, chainId, _this$chainConfig2, _chainId, _blockExplorer, _displayName, _rpcTarget, _ticker, _tickerName;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                (0, _get2.default)((0, _getPrototypeOf2.default)(SolanaWalletAdapter.prototype), "checkInitializationRequirements", this).call(this); // set chainConfig for mainnet by default if not set

                if (!this.chainConfig) {
                  this.chainConfig = (0, _base.getChainConfig)(_base.CHAIN_NAMESPACES.SOLANA, "0x1");
                  _this$chainConfig = this.chainConfig, blockExplorer = _this$chainConfig.blockExplorer, displayName = _this$chainConfig.displayName, ticker = _this$chainConfig.ticker, tickerName = _this$chainConfig.tickerName, rpcTarget = _this$chainConfig.rpcTarget, chainId = _this$chainConfig.chainId;
                  network = {
                    chainId: chainId,
                    rpcTarget: rpcTarget,
                    blockExplorerUrl: blockExplorer,
                    displayName: displayName,
                    ticker: ticker,
                    tickerName: tickerName,
                    logo: ""
                  };
                } else {
                  _this$chainConfig2 = this.chainConfig, _chainId = _this$chainConfig2.chainId, _blockExplorer = _this$chainConfig2.blockExplorer, _displayName = _this$chainConfig2.displayName, _rpcTarget = _this$chainConfig2.rpcTarget, _ticker = _this$chainConfig2.ticker, _tickerName = _this$chainConfig2.tickerName;
                  network = {
                    chainId: _chainId,
                    rpcTarget: _rpcTarget,
                    blockExplorerUrl: _blockExplorer,
                    displayName: _displayName,
                    tickerName: _tickerName,
                    ticker: _ticker,
                    logo: ""
                  };
                }
                this.torusInstance = new _solanaEmbed.default(this.torusWalletOptions);
                _base.log.debug("initializing torus solana adapter init");
                _context.next = 6;
                return this.torusInstance.init(_objectSpread(_objectSpread({
                  showTorusButton: false
                }, this.initParams), {}, {
                  network: network
                }));
              case 6:
                this.solanaProvider = new _solanaProvider.TorusInjectedProvider({
                  config: {
                    chainConfig: this.chainConfig
                  }
                });
                this.status = _base.ADAPTER_STATUS.READY;
                this.emit(_base.ADAPTER_EVENTS.READY, _base.WALLET_ADAPTERS.TORUS_SOLANA);
                _context.prev = 9;
                _base.log.debug("initializing torus solana adapter");
                if (!options.autoConnect) {
                  _context.next = 15;
                  break;
                }
                this.rehydrated = true;
                _context.next = 15;
                return this.connect();
              case 15:
                _context.next = 21;
                break;
              case 17:
                _context.prev = 17;
                _context.t0 = _context["catch"](9);
                _base.log.error("Failed to connect with cached torus solana provider", _context.t0);
                this.emit(_base.ADAPTER_EVENTS.ERRORED, _context.t0);
              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[9, 17]]);
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
        var torusInpageProvider, _this$chainConfig3, chainId, blockExplorer, displayName, rpcTarget, ticker, tickerName, network;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                (0, _get2.default)((0, _getPrototypeOf2.default)(SolanaWalletAdapter.prototype), "checkConnectionRequirements", this).call(this);
                if (this.torusInstance) {
                  _context2.next = 3;
                  break;
                }
                throw _base.WalletInitializationError.notReady("Torus wallet is not initialized");
              case 3:
                if (this.solanaProvider) {
                  _context2.next = 5;
                  break;
                }
                throw _base.WalletInitializationError.notReady("Torus wallet is not initialized");
              case 5:
                this.status = _base.ADAPTER_STATUS.CONNECTING;
                this.emit(_base.ADAPTER_EVENTS.CONNECTING, {
                  adapter: _base.WALLET_ADAPTERS.TORUS_SOLANA
                });
                _context2.prev = 7;
                _context2.next = 10;
                return this.torusInstance.login(this.loginSettings);
              case 10:
                _context2.prev = 10;
                torusInpageProvider = this.torusInstance.provider;
                torusInpageProvider.sendTransaction = this.torusInstance.sendTransaction.bind(this.torusInstance);
                torusInpageProvider.signAllTransactions = this.torusInstance.signAllTransactions.bind(this.torusInstance);
                torusInpageProvider.signMessage = this.torusInstance.signMessage.bind(this.torusInstance);
                torusInpageProvider.signTransaction = this.torusInstance.signTransaction.bind(this.torusInstance);
                _context2.next = 18;
                return this.solanaProvider.setupProvider(torusInpageProvider);
              case 18:
                _context2.next = 30;
                break;
              case 20:
                _context2.prev = 20;
                _context2.t0 = _context2["catch"](10);
                if (!(_context2.t0 instanceof _base.Web3AuthError && _context2.t0.code === 5010)) {
                  _context2.next = 29;
                  break;
                }
                _this$chainConfig3 = this.chainConfig, chainId = _this$chainConfig3.chainId, blockExplorer = _this$chainConfig3.blockExplorer, displayName = _this$chainConfig3.displayName, rpcTarget = _this$chainConfig3.rpcTarget, ticker = _this$chainConfig3.ticker, tickerName = _this$chainConfig3.tickerName;
                network = {
                  chainId: chainId,
                  rpcTarget: rpcTarget,
                  blockExplorerUrl: blockExplorer,
                  displayName: displayName,
                  tickerName: tickerName,
                  ticker: ticker,
                  logo: ""
                };
                _context2.next = 27;
                return this.torusInstance.setProvider(network);
              case 27:
                _context2.next = 30;
                break;
              case 29:
                throw _context2.t0;
              case 30:
                this.status = _base.ADAPTER_STATUS.CONNECTED;
                this.torusInstance.showTorusButton();
                this.emit(_base.ADAPTER_STATUS.CONNECTED, {
                  adapter: _base.WALLET_ADAPTERS.TORUS_SOLANA,
                  reconnected: this.rehydrated
                });
                return _context2.abrupt("return", this.provider);
              case 36:
                _context2.prev = 36;
                _context2.t1 = _context2["catch"](7);
                // ready again to be connected
                this.status = _base.ADAPTER_STATUS.READY;
                this.rehydrated = false;
                this.emit(_base.ADAPTER_EVENTS.ERRORED, _context2.t1);
                throw _base.WalletLoginError.connectionError("Failed to login with torus solana wallet");
              case 42:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[7, 36], [10, 20]]);
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
                return (0, _get2.default)((0, _getPrototypeOf2.default)(SolanaWalletAdapter.prototype), "disconnect", this).call(this);
              case 5:
                _context3.next = 7;
                return this.torusInstance.logout();
              case 7:
                if (options.cleanup) {
                  // ready to connect again
                  this.status = _base.ADAPTER_STATUS.NOT_READY;
                  this.torusInstance = null;
                  this.solanaProvider = null;
                } else {
                  // ready to connect again
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
                return this.torusInstance.getUserInfo();
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
  return SolanaWalletAdapter;
}(_baseSolanaAdapter.BaseSolanaAdapter);
},{"@babel/runtime/helpers/asyncToGenerator":"node_modules/@babel/runtime/helpers/asyncToGenerator.js","@babel/runtime/helpers/classCallCheck":"node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"node_modules/@babel/runtime/helpers/createClass.js","@babel/runtime/helpers/assertThisInitialized":"node_modules/@babel/runtime/helpers/assertThisInitialized.js","@babel/runtime/helpers/get":"node_modules/@babel/runtime/helpers/get.js","@babel/runtime/helpers/inherits":"node_modules/@babel/runtime/helpers/inherits.js","@babel/runtime/helpers/possibleConstructorReturn":"node_modules/@babel/runtime/helpers/possibleConstructorReturn.js","@babel/runtime/helpers/getPrototypeOf":"node_modules/@babel/runtime/helpers/getPrototypeOf.js","@babel/runtime/helpers/defineProperty":"node_modules/@babel/runtime/helpers/defineProperty.js","@babel/runtime/regenerator":"node_modules/@babel/runtime/regenerator/index.js","@toruslabs/solana-embed":"node_modules/@toruslabs/solana-embed/dist/solanaEmbed.esm.js","@web3auth/base":"node_modules/@web3auth/base/dist/base.esm.js","@web3auth/base-solana-adapter":"node_modules/@web3auth/base-solana-adapter/dist/baseSolanaAdapter.esm.js","@web3auth/solana-provider":"node_modules/@web3auth/solana-provider/dist/solanaProvider.esm.js"}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
//# sourceMappingURL=/torusSolanaAdapter.esm.38389fd6.js.map