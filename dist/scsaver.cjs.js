
  /**
   * @license
   * Scsaver.js v0.3.6
   * Released under the MIT License.
   */

'use strict';

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

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _regeneratorRuntime() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */

  _regeneratorRuntime = function () {
    return exports;
  };

  var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }

  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
    return generator._invoke = function (innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");

        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }

        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);

          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }

          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }(innerFn, self, context), generator;
  }

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  exports.wrap = wrap;
  var ContinueSentinel = {};

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}

  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if ("throw" !== record.type) {
        var result = record.arg,
            value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }

      reject(record.arg);
    }

    var previousPromise;

    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }

  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }

  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;

          return next.value = undefined, next.done = !0, next;
        };

        return next.next = next;
      }
    }

    return {
      next: doneResult
    };
  }

  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }

  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (object) {
    var keys = [];

    for (var key in object) keys.push(key);

    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }

      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;

      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
            record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

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
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
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

var CancellationToken = /*#__PURE__*/function () {
  function CancellationToken() {
    var _this = this;

    var parentToken = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, CancellationToken);

    _defineProperty(this, "isCancellationRequested", false);

    this.cancellationPromise = new Promise(function (resolve) {
      _this.cancel = function (e) {
        _this.isCancellationRequested = true;

        if (e) {
          resolve(e);
        } else {
          var err = new Error('cancelled');
          err.cancelled = true;
          resolve(err);
        }
      };
    });

    if (parentToken && parentToken instanceof CancellationToken) {
      parentToken.register(this.cancel);
    }
  }

  _createClass(CancellationToken, [{
    key: "register",
    value: function register(callback) {
      this.cancellationPromise.then(callback);
    }
  }, {
    key: "createDependentToken",
    value: function createDependentToken() {
      return new CancellationToken(this);
    }
  }]);

  return CancellationToken;
}();

/**
 * Web page screensaver JavaScript library.
 * @param  {...any} args Selector, options.
 * @returns {Scsaver}
 */

var Scsaver = /*#__PURE__*/function () {
  /**
   * Defaults for options.
   * @type {Object}
   */

  /**
   * Scsaver element.
   * @type {Element}
   */

  /**
   * Element default selector.
   * @type {String}
   */

  /**
   * Fade in data.
   * @type {Object}
   */

  /**
   * Fade out data.
   * @type {Object}
   */
  function Scsaver() {
    _classCallCheck(this, Scsaver);

    _defineProperty(this, "defaults", {
      waitTime: 3200,
      events: ['keydown', 'mousemove', 'touchstart', 'click'],
      doInterval: 200,
      showFadeTime: 1000,
      hideFadeTime: 1000,
      autoStart: true,
      progressBar: false,
      progressBarParent: null,
      on: null,
      debug: false
    });

    _defineProperty(this, "element", void 0);

    _defineProperty(this, "selector", '#scsaver');

    _defineProperty(this, "waitStateCancelToken", null);

    _defineProperty(this, "waitingTimeoutID", null);

    _defineProperty(this, "waitingAnimID", null);

    _defineProperty(this, "isWaiting", false);

    _defineProperty(this, "isShowing", false);

    _defineProperty(this, "isHidden", true);

    _defineProperty(this, "isFadeIn", false);

    _defineProperty(this, "isFadeOut", false);

    _defineProperty(this, "states", {
      Default: Symbol('Default'),
      Wait: Symbol('Wait'),
      Show: Symbol('Show'),
      ShowFadeInComplete: Symbol('ShowFadeInComplete'),
      Hide: Symbol('Hide'),
      HideFadeOut: Symbol('HideFadeOutComplete'),
      Disabled: Symbol('Disabled'),
      Enabled: Symbol('Enabled')
    });

    _defineProperty(this, "eventPrefix", 'scsaver');

    _defineProperty(this, "beforeState", this.states.Default);

    _defineProperty(this, "currentState", this.states.Default);

    _defineProperty(this, "stateEventName", '');

    _defineProperty(this, "lastEventNow", 0);

    _defineProperty(this, "progressBar", {
      wrapperElement: null,
      barElement: null,
      progress: 0
    });

    _defineProperty(this, "fadeInData", {
      animReqID: null,
      cancelToken: null
    });

    _defineProperty(this, "fadeOutData", {
      animReqID: null,
      cancelToken: null
    });

    // Merge options
    this.settings = _objectSpread2(_objectSpread2({}, this.defaults), arguments.length <= 1 ? undefined : arguments[1]);
    this.selector = (arguments.length <= 0 ? undefined : arguments[0]) || this.selector; // Scsaver Instance

    var scsaver = this;
    this.init();
    return scsaver;
  }
  /**
   * Handle event.
   * @param {*} event
   * @param {*} callback
   */


  _createClass(Scsaver, [{
    key: "on",
    value: function on(event, callback) {
      this.element.addEventListener(event, callback.bind(this));
    }
  }, {
    key: "init",
    value: function init() {
      this.initElement(); // create scsaver event

      this.initStateEvent();
      this.initAddEvents();

      if (this.settings.progressBar) {
        this.initProgressBar();
      }

      this.element.dispatchEvent(new CustomEvent('init'));

      if (this.settings.autoStart) {
        this.start();
      }
    }
  }, {
    key: "initElement",
    value: function initElement() {
      // only one element
      this.element = document.querySelector(this.selector);

      if (null === this.element) {
        throw Error('Scsaver element not found.');
      }
    }
  }, {
    key: "initStateEvent",
    value: function initStateEvent() {
      this.stateEventName = "".concat(this.eventPrefix, "ChangeState");
      var self = this;
      this.element.addEventListener(this.stateEventName, function (e) {
        self.stateController(e.detail.beforeState, e.detail.currentState);
      });
    }
  }, {
    key: "initAddEvents",
    value: function initAddEvents() {
      if (!this.settings.on) return;

      for (var key in this.settings.on) {
        this.on(key, this.settings.on[key]);
      }
    } // TODO: private method

  }, {
    key: "changeState",
    value: function changeState(state) {
      this.beforeState = this.currentState;
      this.currentState = state;
      this.element.dispatchEvent(new CustomEvent("".concat(this.stateEventName), {
        detail: {
          beforeState: this.beforeState,
          currentState: this.currentState
        }
      }));
    }
  }, {
    key: "stateController",
    value: function stateController(beforeState, currentState) {
      switch (currentState) {
        case this.states.Wait:
          this.element.dispatchEvent(new CustomEvent('waitStart', {
            detail: {
              beforeState: beforeState,
              currentState: currentState
            }
          }));
          this.waitState();
          break;

        case this.states.Show:
          this.element.dispatchEvent(new CustomEvent('showStart', {
            detail: {
              beforeState: beforeState,
              currentState: currentState
            }
          }));
          this.showState();
          break;

        case this.states.ShowFadeInComplete:
          this.element.dispatchEvent(new CustomEvent('showFadeInComplete', {
            detail: {
              beforeState: beforeState,
              currentState: currentState
            }
          }));
          break;

        case this.states.Hide:
          this.element.dispatchEvent(new CustomEvent('hideStart', {
            detail: {
              beforeState: beforeState,
              currentState: currentState
            }
          }));
          this.hideState();
          break;

        case this.states.HideFadeOutComplete:
          this.element.dispatchEvent(new CustomEvent('hideFadeOutComplete', {
            detail: {
              beforeState: beforeState,
              currentState: currentState
            }
          }));
          break;

        case this.states.Disabled:
          this.element.dispatchEvent(new CustomEvent('disabledStart', {
            detail: {
              beforeState: beforeState,
              currentState: currentState
            }
          }));
          this.disabledState();
          break;

        case this.states.Enabled:
          this.element.dispatchEvent(new CustomEvent('enabledStart', {
            detail: {
              beforeState: beforeState,
              currentState: currentState
            }
          }));
          this.enabledState();
          break;

        case this.states.Default:
          break;
      }
    }
  }, {
    key: "initProgressBar",
    value: function initProgressBar() {
      this.progressBar.wrapperElement = document.createElement('div');
      this.progressBar.wrapperElement.classList.add('scsaver-progress-wrapper');
      this.progressBar.wrapperElement.style.display = 'none';
      var progressBg = document.createElement('div');
      progressBg.classList.add('scsaver-progress-bg');
      this.progressBar.barElement = document.createElement('div');
      this.progressBar.barElement.classList.add('scsaver-progress-bar');
      this.progressBar.barElement.id = 'scsaver-progress-bar';
      progressBg.appendChild(this.progressBar.barElement);
      this.progressBar.wrapperElement.appendChild(progressBg);

      if (this.settings.progressBarParent) {
        var progressBarParentElm = document.querySelector(this.settings.progressBarParent);

        if (null === progressBarParentElm) {
          throw Error('Scsaver progress bar parent element not found.');
        }

        this.progressBar.wrapperElement.classList.add('is-child');
        progressBarParentElm.appendChild(this.progressBar.wrapperElement);
      } else {
        document.body.appendChild(this.progressBar.wrapperElement);
      }
    }
  }, {
    key: "start",
    value: function start() {
      this.registerDoing();
      this.wait();
    }
  }, {
    key: "registerDoing",
    value: function registerDoing() {
      var self = this; // TODO: if non array

      this.settings.events.forEach(function (event) {
        window.addEventListener(event, self.intervalDoing.bind(self));
      });
    }
  }, {
    key: "unregisterDoing",
    value: function unregisterDoing() {
      var self = this; // TODO: if non array

      this.settings.events.forEach(function (event) {
        window.removeEventListener(event, self.intervalDoing);
      });
    }
  }, {
    key: "intervalDoing",
    value: function intervalDoing() {
      if (performance.now() - this.lastEventNow <= this.settings.doInterval) return;
      this.doing();
      this.lastEventNow = performance.now();
    }
  }, {
    key: "doing",
    value: function doing() {
      switch (this.currentState) {
        case this.states.Wait:
          this.cancelWait();
          this.wait();
          break;

        case this.states.Show:
          this.cancelFadeIn();
          this.hide();
          break;

        case this.states.ShowFadeInComplete:
          this.cancelFadeIn();
          this.hide();
          break;

        case this.states.Hide:
          if (this.isHidden) this.wait();
          break;

        case this.states.HideFadeOutComplete:
          if (this.isHidden) this.wait();
          break;

        case this.states.Default:
      }
    }
  }, {
    key: "disabled",
    value: function disabled() {
      this.changeState(this.states.Disabled);
    }
  }, {
    key: "enabled",
    value: function enabled() {
      this.changeState(this.states.Enabled);
    }
  }, {
    key: "wait",
    value: function wait() {
      this.changeState(this.states.Wait);
    }
  }, {
    key: "show",
    value: function show() {
      this.changeState(this.states.Show);
    }
  }, {
    key: "hide",
    value: function hide() {
      this.changeState(this.states.Hide);
    }
  }, {
    key: "disabledState",
    value: function disabledState() {
      this.unregisterDoing();
      this.cancelWait();

      if (this.isShowing) {
        this.cancelFadeIn();
        this.fadeOut();
      } // TODO: if fadeIn or FadeOut

    }
  }, {
    key: "enabledState",
    value: function enabledState() {
      this.start();
    }
  }, {
    key: "waitState",
    value: function () {
      var _waitState = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;

                if (!this.isWaiting) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return");

              case 3:
                this.waitStateCancelToken = new CancellationToken();
                _context.next = 6;
                return this.waiting(this.settings.waitTime, this.waitStateCancelToken);

              case 6:
                this.show();
                this.cancelWait();
                _context.next = 15;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](0);

                if (this.settings.debug) {
                  _context.next = 14;
                  break;
                }

                return _context.abrupt("return");

              case 14:
                console.log(_context.t0.cancelled ? 'Waiting is cancelled.' : 'some other err');

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 10]]);
      }));

      function waitState() {
        return _waitState.apply(this, arguments);
      }

      return waitState;
    }()
  }, {
    key: "showState",
    value: function () {
      var _showState = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                this.isHidden = false;
                this.fadeInData.cancelToken = new CancellationToken();
                _context2.next = 5;
                return this.fadeIn(this.element, this.settings.showFadeTime, 'block', this.fadeInData.cancelToken);

              case 5:
                this.clearFadeIn();
                this.changeState(this.states.ShowFadeInComplete);
                this.isShowing = true;
                _context2.next = 15;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](0);

                if (this.settings.debug) {
                  _context2.next = 14;
                  break;
                }

                return _context2.abrupt("return");

              case 14:
                console.log(_context2.t0.cancelled ? 'Fade in is cancelled.' : 'some other err');

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 10]]);
      }));

      function showState() {
        return _showState.apply(this, arguments);
      }

      return showState;
    }()
  }, {
    key: "hideState",
    value: function () {
      var _hideState = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                this.isShowing = false;
                this.fadeOutData.cancelToken = new CancellationToken();
                _context3.next = 5;
                return this.fadeOut(this.element, this.settings.hideFadeTime, this.fadeOutData.cancelToken);

              case 5:
                this.clearFadeOut();
                this.changeState(this.states.HideFadeOutComplete);
                this.isHidden = true;
                this.wait();
                _context3.next = 16;
                break;

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](0);

                if (this.settings.debug) {
                  _context3.next = 15;
                  break;
                }

                return _context3.abrupt("return");

              case 15:
                console.log(_context3.t0.cancelled ? 'Fade out is cancelled.' : 'some other err');

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 11]]);
      }));

      function hideState() {
        return _hideState.apply(this, arguments);
      }

      return hideState;
    }()
  }, {
    key: "cancelWait",
    value: function cancelWait() {
      if (null !== this.waitStateCancelToken) {
        this.waitStateCancelToken.cancel();
        this.waitStateCancelToken = null;
      }

      if (null !== this.waitingAnimID) {
        cancelAnimationFrame(this.waitingAnimID);
        this.waitingAnimID = null;
      }

      if (this.settings.progressBar) {
        this.disabledProgressBar();
      }

      this.isWaiting = false;
    }
    /**
     * Wait for the next process for the specified number of milliseconds.
     * @param {number} time - The number of milliseconds to wait.
     * @param {CancellationToken} cancellationToken - The cancellation token.
     * @returns {Promise<number>}
     */

  }, {
    key: "waiting",
    value: function waiting(waitTime) {
      var cancellationToken = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      this.isWaiting = true;
      var defaultValue = 0;
      var finalValue = 1;
      var start = performance.now();
      var self = this;

      if (this.settings.progressBar) {
        this.enabledProgressBar();
        this.progressBar.barElement.classList.remove('is-filled');
        this.progressBar.barElement.style.width = "".concat(defaultValue, "%");
      }

      return new Promise(function (resolve, reject) {
        self.waitingAnimID = requestAnimationFrame(function waitingProgress(time) {
          var timeFraction = (time - start) / waitTime;
          var progress = Math.min(timeFraction, 1);

          if (self.settings.progressBar) {
            self.progressBar.barElement.style.width = "".concat(progress * 100, "%");
          }

          if (progress < finalValue) {
            self.waitingAnimID = requestAnimationFrame(waitingProgress);
          } else {
            if (self.settings.progressBar) {
              self.progressBar.barElement.classList.add('is-filled');
              self.progressBar.wrapperElement.style.display = 'none';
            }

            self.isWaiting = false;
            resolve();
          }

          if (cancellationToken) {
            cancellationToken.register(reject);
          }
        });
      });
    }
  }, {
    key: "enabledProgressBar",
    value: function enabledProgressBar() {
      this.progressBar.wrapperElement.style.display = 'block';
    }
  }, {
    key: "disabledProgressBar",
    value: function disabledProgressBar() {
      this.progressBar.wrapperElement.style.display = 'none';
    }
  }, {
    key: "fadeIn",
    value: function fadeIn(el) {
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;
      var display = arguments.length > 2 ? arguments[2] : undefined;
      var cancellationToken = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      this.isFadeIn = true;
      var defaultOpacity = parseFloat(window.getComputedStyle(el).opacity);
      var finalOpacity = 1;
      var start = performance.now();
      var self = this;
      el.style.opacity = defaultOpacity;
      el.style.display = display || 'block';
      return new Promise(function (resolve, reject) {
        self.fadeInData.animReqID = requestAnimationFrame(function fade(time) {
          var timeFraction = (time - start) / duration;
          var progress = Math.min(timeFraction, 1);
          el.style.opacity = defaultOpacity + (finalOpacity - defaultOpacity) * progress;

          if (+el.style.opacity < finalOpacity) {
            self.fadeInData.animReqID = requestAnimationFrame(fade);
          } else {
            el.classList.add('is-fade-in-done');
            el.classList.remove('is-fade-out-done');
            self.isFadeIn = false;
            resolve();
          }

          if (cancellationToken) {
            cancellationToken.register(reject);
          }
        });
      });
    }
  }, {
    key: "fadeOut",
    value: function fadeOut(el) {
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;
      var cancellationToken = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      this.isFadeOut = true;
      var defaultOpacity = parseFloat(window.getComputedStyle(el).opacity);
      var finalOpacity = 0;
      var start = performance.now();
      var self = this;
      return new Promise(function (resolve, reject) {
        self.fadeOutData.animReqID = requestAnimationFrame(function fade(time) {
          var timeFraction = (time - start) / duration;
          var progress = Math.min(timeFraction, 1);
          el.style.opacity = defaultOpacity - defaultOpacity * progress;

          if (+el.style.opacity > finalOpacity) {
            self.fadeOutData.animReqID = requestAnimationFrame(fade);
          } else {
            el.style.display = 'none';
            el.classList.add('is-fade-out-done');
            el.classList.remove('is-fade-in-done');
            self.isFadeOut = false;
            resolve();
          }

          if (cancellationToken) {
            cancellationToken.register(reject);
          }
        });
      });
    }
  }, {
    key: "clearFadeIn",
    value: function clearFadeIn() {
      this.fadeInData.cancelToken = null;
      this.fadeInData.animReqID = null;
    }
  }, {
    key: "clearFadeOut",
    value: function clearFadeOut() {
      this.fadeOutData.cancelToken = null;
      this.fadeOutData.animReqID = null;
    }
  }, {
    key: "cancelFadeIn",
    value: function cancelFadeIn() {
      if (null !== this.fadeInData.cancelToken) {
        this.fadeInData.cancelToken.cancel();
        this.fadeInData.cancelToken = null;
      }

      if (null !== this.fadeInData.animReqID) {
        cancelAnimationFrame(this.fadeInData.animReqID);
        this.fadeInData.animReqID = null;
      }

      if (this.isFadeIn && null == this.fadeInData.cancelToken && null == this.fadeInData.animReqID) {
        this.isFadeIn = false;
      }
    }
  }, {
    key: "cancelFadeOut",
    value: function cancelFadeOut() {
      if (null !== this.fadeOutData.cancelToken) {
        this.fadeOutData.cancelToken.cancel();
        this.fadeOutData.cancelToken = null;
      }

      if (null !== this.fadeOutData.animReqID) {
        cancelAnimationFrame(this.fadeOutData.animReqID);
        this.fadeOutData.animReqID = null;
      }

      if (this.isFadeOut && null == this.fadeOutData.cancelToken && null == this.fadeOutData.animReqID) {
        this.isFadeOut = false;
      }
    }
  }]);

  return Scsaver;
}();

module.exports = Scsaver;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NzYXZlci5janMuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2R1bGVzL2NhbmNlbGxhdGlvblRva2VuLmpzIiwiLi4vc3JjL3Njc2F2ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIENhbmNlbGxhdGlvblRva2VuIHtcbiAgaXNDYW5jZWxsYXRpb25SZXF1ZXN0ZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihwYXJlbnRUb2tlbiA9IG51bGwpIHtcbiAgICB0aGlzLmNhbmNlbGxhdGlvblByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5jYW5jZWwgPSAoZSkgPT4ge1xuICAgICAgICB0aGlzLmlzQ2FuY2VsbGF0aW9uUmVxdWVzdGVkID0gdHJ1ZTtcbiAgICAgICAgaWYgKGUpIHtcbiAgICAgICAgICByZXNvbHZlKGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ2NhbmNlbGxlZCcpO1xuICAgICAgICAgIGVyci5jYW5jZWxsZWQgPSB0cnVlO1xuICAgICAgICAgIHJlc29sdmUoZXJyKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KTtcbiAgICBpZiAocGFyZW50VG9rZW4gJiYgcGFyZW50VG9rZW4gaW5zdGFuY2VvZiBDYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgcGFyZW50VG9rZW4ucmVnaXN0ZXIodGhpcy5jYW5jZWwpO1xuICAgIH1cbiAgfVxuXG4gIHJlZ2lzdGVyKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5jYW5jZWxsYXRpb25Qcm9taXNlLnRoZW4oY2FsbGJhY2spO1xuICB9XG5cbiAgY3JlYXRlRGVwZW5kZW50VG9rZW4oKSB7XG4gICAgcmV0dXJuIG5ldyBDYW5jZWxsYXRpb25Ub2tlbih0aGlzKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ2FuY2VsbGF0aW9uVG9rZW4gfSBmcm9tICcuL21vZHVsZXMvY2FuY2VsbGF0aW9uVG9rZW4uanMnO1xuXG4vKipcbiAqIFdlYiBwYWdlIHNjcmVlbnNhdmVyIEphdmFTY3JpcHQgbGlicmFyeS5cbiAqIEBwYXJhbSAgey4uLmFueX0gYXJncyBTZWxlY3Rvciwgb3B0aW9ucy5cbiAqIEByZXR1cm5zIHtTY3NhdmVyfVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY3NhdmVyIHtcbiAgLyoqXG4gICAqIERlZmF1bHRzIGZvciBvcHRpb25zLlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgZGVmYXVsdHMgPSB7XG4gICAgd2FpdFRpbWU6IDMyMDAsXG4gICAgZXZlbnRzOiBbJ2tleWRvd24nLCAnbW91c2Vtb3ZlJywgJ3RvdWNoc3RhcnQnLCAnY2xpY2snXSxcbiAgICBkb0ludGVydmFsOiAyMDAsXG4gICAgc2hvd0ZhZGVUaW1lOiAxMDAwLFxuICAgIGhpZGVGYWRlVGltZTogMTAwMCxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgcHJvZ3Jlc3NCYXI6IGZhbHNlLFxuICAgIHByb2dyZXNzQmFyUGFyZW50OiBudWxsLFxuICAgIG9uOiBudWxsLFxuICAgIGRlYnVnOiBmYWxzZVxuICB9O1xuXG4gIC8qKlxuICAgKiBTY3NhdmVyIGVsZW1lbnQuXG4gICAqIEB0eXBlIHtFbGVtZW50fVxuICAgKi9cbiAgZWxlbWVudDtcblxuICAvKipcbiAgICogRWxlbWVudCBkZWZhdWx0IHNlbGVjdG9yLlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgc2VsZWN0b3IgPSAnI3Njc2F2ZXInO1xuICB3YWl0U3RhdGVDYW5jZWxUb2tlbiA9IG51bGw7XG4gIHdhaXRpbmdUaW1lb3V0SUQgPSBudWxsO1xuICB3YWl0aW5nQW5pbUlEID0gbnVsbDtcblxuICBpc1dhaXRpbmcgPSBmYWxzZTtcbiAgaXNTaG93aW5nID0gZmFsc2U7XG4gIGlzSGlkZGVuID0gdHJ1ZTtcbiAgaXNGYWRlSW4gPSBmYWxzZTtcbiAgaXNGYWRlT3V0ID0gZmFsc2U7XG5cbiAgc3RhdGVzID0ge1xuICAgIERlZmF1bHQ6IFN5bWJvbCgnRGVmYXVsdCcpLFxuICAgIFdhaXQ6IFN5bWJvbCgnV2FpdCcpLFxuICAgIFNob3c6IFN5bWJvbCgnU2hvdycpLFxuICAgIFNob3dGYWRlSW5Db21wbGV0ZTogU3ltYm9sKCdTaG93RmFkZUluQ29tcGxldGUnKSxcbiAgICBIaWRlOiBTeW1ib2woJ0hpZGUnKSxcbiAgICBIaWRlRmFkZU91dDogU3ltYm9sKCdIaWRlRmFkZU91dENvbXBsZXRlJyksXG4gICAgRGlzYWJsZWQ6IFN5bWJvbCgnRGlzYWJsZWQnKSxcbiAgICBFbmFibGVkOiBTeW1ib2woJ0VuYWJsZWQnKVxuICB9O1xuXG4gIGV2ZW50UHJlZml4ID0gJ3Njc2F2ZXInO1xuICBiZWZvcmVTdGF0ZSA9IHRoaXMuc3RhdGVzLkRlZmF1bHQ7XG4gIGN1cnJlbnRTdGF0ZSA9IHRoaXMuc3RhdGVzLkRlZmF1bHQ7XG4gIHN0YXRlRXZlbnROYW1lID0gJyc7XG4gIGxhc3RFdmVudE5vdyA9IDA7XG5cbiAgcHJvZ3Jlc3NCYXIgPSB7XG4gICAgd3JhcHBlckVsZW1lbnQ6IG51bGwsXG4gICAgYmFyRWxlbWVudDogbnVsbCxcbiAgICBwcm9ncmVzczogMFxuICB9O1xuXG4gIC8qKlxuICAgKiBGYWRlIGluIGRhdGEuXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICBmYWRlSW5EYXRhID0ge1xuICAgIGFuaW1SZXFJRDogbnVsbCxcbiAgICBjYW5jZWxUb2tlbjogbnVsbFxuICB9O1xuXG4gIC8qKlxuICAgKiBGYWRlIG91dCBkYXRhLlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgZmFkZU91dERhdGEgPSB7XG4gICAgYW5pbVJlcUlEOiBudWxsLFxuICAgIGNhbmNlbFRva2VuOiBudWxsXG4gIH07XG5cbiAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgIC8vIE1lcmdlIG9wdGlvbnNcbiAgICB0aGlzLnNldHRpbmdzID0geyAuLi50aGlzLmRlZmF1bHRzLCAuLi5hcmdzWzFdIH07XG5cbiAgICB0aGlzLnNlbGVjdG9yID0gYXJnc1swXSB8fCB0aGlzLnNlbGVjdG9yO1xuXG4gICAgLy8gU2NzYXZlciBJbnN0YW5jZVxuICAgIGNvbnN0IHNjc2F2ZXIgPSB0aGlzO1xuXG4gICAgdGhpcy5pbml0KCk7XG5cbiAgICByZXR1cm4gc2NzYXZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGUgZXZlbnQuXG4gICAqIEBwYXJhbSB7Kn0gZXZlbnRcbiAgICogQHBhcmFtIHsqfSBjYWxsYmFja1xuICAgKi9cbiAgb24oZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGNhbGxiYWNrLmJpbmQodGhpcykpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmluaXRFbGVtZW50KCk7XG5cbiAgICAvLyBjcmVhdGUgc2NzYXZlciBldmVudFxuICAgIHRoaXMuaW5pdFN0YXRlRXZlbnQoKTtcblxuICAgIHRoaXMuaW5pdEFkZEV2ZW50cygpO1xuXG4gICAgaWYgKHRoaXMuc2V0dGluZ3MucHJvZ3Jlc3NCYXIpIHtcbiAgICAgIHRoaXMuaW5pdFByb2dyZXNzQmFyKCk7XG4gICAgfVxuXG4gICAgdGhpcy5lbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdpbml0JykpO1xuXG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuYXV0b1N0YXJ0KSB7XG4gICAgICB0aGlzLnN0YXJ0KCk7XG4gICAgfVxuICB9XG5cbiAgaW5pdEVsZW1lbnQoKSB7XG4gICAgLy8gb25seSBvbmUgZWxlbWVudFxuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5zZWxlY3Rvcik7XG5cbiAgICBpZiAobnVsbCA9PT0gdGhpcy5lbGVtZW50KSB7XG4gICAgICB0aHJvdyBFcnJvcignU2NzYXZlciBlbGVtZW50IG5vdCBmb3VuZC4nKTtcbiAgICB9XG4gIH1cblxuICBpbml0U3RhdGVFdmVudCgpIHtcbiAgICB0aGlzLnN0YXRlRXZlbnROYW1lID0gYCR7dGhpcy5ldmVudFByZWZpeH1DaGFuZ2VTdGF0ZWA7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLnN0YXRlRXZlbnROYW1lLCAoZSkgPT4ge1xuICAgICAgc2VsZi5zdGF0ZUNvbnRyb2xsZXIoZS5kZXRhaWwuYmVmb3JlU3RhdGUsIGUuZGV0YWlsLmN1cnJlbnRTdGF0ZSk7XG4gICAgfSk7XG4gIH1cblxuICBpbml0QWRkRXZlbnRzKCkge1xuICAgIGlmICghdGhpcy5zZXR0aW5ncy5vbikgcmV0dXJuO1xuXG4gICAgZm9yIChsZXQga2V5IGluIHRoaXMuc2V0dGluZ3Mub24pIHtcbiAgICAgIHRoaXMub24oa2V5LCB0aGlzLnNldHRpbmdzLm9uW2tleV0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIFRPRE86IHByaXZhdGUgbWV0aG9kXG4gIGNoYW5nZVN0YXRlKHN0YXRlKSB7XG4gICAgdGhpcy5iZWZvcmVTdGF0ZSA9IHRoaXMuY3VycmVudFN0YXRlO1xuICAgIHRoaXMuY3VycmVudFN0YXRlID0gc3RhdGU7XG5cbiAgICB0aGlzLmVsZW1lbnQuZGlzcGF0Y2hFdmVudChcbiAgICAgIG5ldyBDdXN0b21FdmVudChgJHt0aGlzLnN0YXRlRXZlbnROYW1lfWAsIHtcbiAgICAgICAgZGV0YWlsOiB7IGJlZm9yZVN0YXRlOiB0aGlzLmJlZm9yZVN0YXRlLCBjdXJyZW50U3RhdGU6IHRoaXMuY3VycmVudFN0YXRlIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHN0YXRlQ29udHJvbGxlcihiZWZvcmVTdGF0ZSwgY3VycmVudFN0YXRlKSB7XG4gICAgc3dpdGNoIChjdXJyZW50U3RhdGUpIHtcbiAgICAgIGNhc2UgdGhpcy5zdGF0ZXMuV2FpdDpcbiAgICAgICAgdGhpcy5lbGVtZW50LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCd3YWl0U3RhcnQnLCB7IGRldGFpbDogeyBiZWZvcmVTdGF0ZTogYmVmb3JlU3RhdGUsIGN1cnJlbnRTdGF0ZTogY3VycmVudFN0YXRlIH0gfSlcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy53YWl0U3RhdGUoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRoaXMuc3RhdGVzLlNob3c6XG4gICAgICAgIHRoaXMuZWxlbWVudC5kaXNwYXRjaEV2ZW50KFxuICAgICAgICAgIG5ldyBDdXN0b21FdmVudCgnc2hvd1N0YXJ0JywgeyBkZXRhaWw6IHsgYmVmb3JlU3RhdGU6IGJlZm9yZVN0YXRlLCBjdXJyZW50U3RhdGU6IGN1cnJlbnRTdGF0ZSB9IH0pXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc2hvd1N0YXRlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0aGlzLnN0YXRlcy5TaG93RmFkZUluQ29tcGxldGU6XG4gICAgICAgIHRoaXMuZWxlbWVudC5kaXNwYXRjaEV2ZW50KFxuICAgICAgICAgIG5ldyBDdXN0b21FdmVudCgnc2hvd0ZhZGVJbkNvbXBsZXRlJywgeyBkZXRhaWw6IHsgYmVmb3JlU3RhdGU6IGJlZm9yZVN0YXRlLCBjdXJyZW50U3RhdGU6IGN1cnJlbnRTdGF0ZSB9IH0pXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0aGlzLnN0YXRlcy5IaWRlOlxuICAgICAgICB0aGlzLmVsZW1lbnQuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ2hpZGVTdGFydCcsIHsgZGV0YWlsOiB7IGJlZm9yZVN0YXRlOiBiZWZvcmVTdGF0ZSwgY3VycmVudFN0YXRlOiBjdXJyZW50U3RhdGUgfSB9KVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmhpZGVTdGF0ZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdGhpcy5zdGF0ZXMuSGlkZUZhZGVPdXRDb21wbGV0ZTpcbiAgICAgICAgdGhpcy5lbGVtZW50LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdoaWRlRmFkZU91dENvbXBsZXRlJywgeyBkZXRhaWw6IHsgYmVmb3JlU3RhdGU6IGJlZm9yZVN0YXRlLCBjdXJyZW50U3RhdGU6IGN1cnJlbnRTdGF0ZSB9IH0pXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0aGlzLnN0YXRlcy5EaXNhYmxlZDpcbiAgICAgICAgdGhpcy5lbGVtZW50LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdkaXNhYmxlZFN0YXJ0JywgeyBkZXRhaWw6IHsgYmVmb3JlU3RhdGU6IGJlZm9yZVN0YXRlLCBjdXJyZW50U3RhdGU6IGN1cnJlbnRTdGF0ZSB9IH0pXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZGlzYWJsZWRTdGF0ZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdGhpcy5zdGF0ZXMuRW5hYmxlZDpcbiAgICAgICAgdGhpcy5lbGVtZW50LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdlbmFibGVkU3RhcnQnLCB7IGRldGFpbDogeyBiZWZvcmVTdGF0ZTogYmVmb3JlU3RhdGUsIGN1cnJlbnRTdGF0ZTogY3VycmVudFN0YXRlIH0gfSlcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5lbmFibGVkU3RhdGUoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRoaXMuc3RhdGVzLkRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaW5pdFByb2dyZXNzQmFyKCkge1xuICAgIHRoaXMucHJvZ3Jlc3NCYXIud3JhcHBlckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnByb2dyZXNzQmFyLndyYXBwZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3Njc2F2ZXItcHJvZ3Jlc3Mtd3JhcHBlcicpO1xuICAgIHRoaXMucHJvZ3Jlc3NCYXIud3JhcHBlckVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuICAgIGNvbnN0IHByb2dyZXNzQmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwcm9ncmVzc0JnLmNsYXNzTGlzdC5hZGQoJ3Njc2F2ZXItcHJvZ3Jlc3MtYmcnKTtcblxuICAgIHRoaXMucHJvZ3Jlc3NCYXIuYmFyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucHJvZ3Jlc3NCYXIuYmFyRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzY3NhdmVyLXByb2dyZXNzLWJhcicpO1xuICAgIHRoaXMucHJvZ3Jlc3NCYXIuYmFyRWxlbWVudC5pZCA9ICdzY3NhdmVyLXByb2dyZXNzLWJhcic7XG5cbiAgICBwcm9ncmVzc0JnLmFwcGVuZENoaWxkKHRoaXMucHJvZ3Jlc3NCYXIuYmFyRWxlbWVudCk7XG4gICAgdGhpcy5wcm9ncmVzc0Jhci53cmFwcGVyRWxlbWVudC5hcHBlbmRDaGlsZChwcm9ncmVzc0JnKTtcblxuICAgIGlmICh0aGlzLnNldHRpbmdzLnByb2dyZXNzQmFyUGFyZW50KSB7XG4gICAgICBjb25zdCBwcm9ncmVzc0JhclBhcmVudEVsbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5zZXR0aW5ncy5wcm9ncmVzc0JhclBhcmVudCk7XG5cbiAgICAgIGlmIChudWxsID09PSBwcm9ncmVzc0JhclBhcmVudEVsbSkge1xuICAgICAgICB0aHJvdyBFcnJvcignU2NzYXZlciBwcm9ncmVzcyBiYXIgcGFyZW50IGVsZW1lbnQgbm90IGZvdW5kLicpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnByb2dyZXNzQmFyLndyYXBwZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2lzLWNoaWxkJyk7XG4gICAgICBwcm9ncmVzc0JhclBhcmVudEVsbS5hcHBlbmRDaGlsZCh0aGlzLnByb2dyZXNzQmFyLndyYXBwZXJFbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnByb2dyZXNzQmFyLndyYXBwZXJFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICB0aGlzLnJlZ2lzdGVyRG9pbmcoKTtcblxuICAgIHRoaXMud2FpdCgpO1xuICB9XG5cbiAgcmVnaXN0ZXJEb2luZygpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIC8vIFRPRE86IGlmIG5vbiBhcnJheVxuICAgIHRoaXMuc2V0dGluZ3MuZXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgc2VsZi5pbnRlcnZhbERvaW5nLmJpbmQoc2VsZikpO1xuICAgIH0pO1xuICB9XG5cbiAgdW5yZWdpc3RlckRvaW5nKCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgLy8gVE9ETzogaWYgbm9uIGFycmF5XG4gICAgdGhpcy5zZXR0aW5ncy5ldmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBzZWxmLmludGVydmFsRG9pbmcpO1xuICAgIH0pO1xuICB9XG5cbiAgaW50ZXJ2YWxEb2luZygpIHtcbiAgICBpZiAocGVyZm9ybWFuY2Uubm93KCkgLSB0aGlzLmxhc3RFdmVudE5vdyA8PSB0aGlzLnNldHRpbmdzLmRvSW50ZXJ2YWwpIHJldHVybjtcblxuICAgIHRoaXMuZG9pbmcoKTtcbiAgICB0aGlzLmxhc3RFdmVudE5vdyA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICB9XG5cbiAgZG9pbmcoKSB7XG4gICAgc3dpdGNoICh0aGlzLmN1cnJlbnRTdGF0ZSkge1xuICAgICAgY2FzZSB0aGlzLnN0YXRlcy5XYWl0OlxuICAgICAgICB0aGlzLmNhbmNlbFdhaXQoKTtcbiAgICAgICAgdGhpcy53YWl0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0aGlzLnN0YXRlcy5TaG93OlxuICAgICAgICB0aGlzLmNhbmNlbEZhZGVJbigpO1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRoaXMuc3RhdGVzLlNob3dGYWRlSW5Db21wbGV0ZTpcbiAgICAgICAgdGhpcy5jYW5jZWxGYWRlSW4oKTtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0aGlzLnN0YXRlcy5IaWRlOlxuICAgICAgICBpZiAodGhpcy5pc0hpZGRlbikgdGhpcy53YWl0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0aGlzLnN0YXRlcy5IaWRlRmFkZU91dENvbXBsZXRlOlxuICAgICAgICBpZiAodGhpcy5pc0hpZGRlbikgdGhpcy53YWl0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0aGlzLnN0YXRlcy5EZWZhdWx0OlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgZGlzYWJsZWQoKSB7XG4gICAgdGhpcy5jaGFuZ2VTdGF0ZSh0aGlzLnN0YXRlcy5EaXNhYmxlZCk7XG4gIH1cblxuICBlbmFibGVkKCkge1xuICAgIHRoaXMuY2hhbmdlU3RhdGUodGhpcy5zdGF0ZXMuRW5hYmxlZCk7XG4gIH1cblxuICB3YWl0KCkge1xuICAgIHRoaXMuY2hhbmdlU3RhdGUodGhpcy5zdGF0ZXMuV2FpdCk7XG4gIH1cblxuICBzaG93KCkge1xuICAgIHRoaXMuY2hhbmdlU3RhdGUodGhpcy5zdGF0ZXMuU2hvdyk7XG4gIH1cblxuICBoaWRlKCkge1xuICAgIHRoaXMuY2hhbmdlU3RhdGUodGhpcy5zdGF0ZXMuSGlkZSk7XG4gIH1cblxuICBkaXNhYmxlZFN0YXRlKCkge1xuICAgIHRoaXMudW5yZWdpc3RlckRvaW5nKCk7XG4gICAgdGhpcy5jYW5jZWxXYWl0KCk7XG5cbiAgICBpZiAodGhpcy5pc1Nob3dpbmcpIHtcbiAgICAgIHRoaXMuY2FuY2VsRmFkZUluKCk7XG4gICAgICB0aGlzLmZhZGVPdXQoKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBpZiBmYWRlSW4gb3IgRmFkZU91dFxuICB9XG5cbiAgZW5hYmxlZFN0YXRlKCkge1xuICAgIHRoaXMuc3RhcnQoKTtcbiAgfVxuXG4gIGFzeW5jIHdhaXRTdGF0ZSgpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKHRoaXMuaXNXYWl0aW5nKSByZXR1cm47XG5cbiAgICAgIHRoaXMud2FpdFN0YXRlQ2FuY2VsVG9rZW4gPSBuZXcgQ2FuY2VsbGF0aW9uVG9rZW4oKTtcblxuICAgICAgYXdhaXQgdGhpcy53YWl0aW5nKHRoaXMuc2V0dGluZ3Mud2FpdFRpbWUsIHRoaXMud2FpdFN0YXRlQ2FuY2VsVG9rZW4pO1xuXG4gICAgICB0aGlzLnNob3coKTtcblxuICAgICAgdGhpcy5jYW5jZWxXYWl0KCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLmRlYnVnKSByZXR1cm47XG4gICAgICBjb25zb2xlLmxvZyhlLmNhbmNlbGxlZCA/ICdXYWl0aW5nIGlzIGNhbmNlbGxlZC4nIDogJ3NvbWUgb3RoZXIgZXJyJyk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgc2hvd1N0YXRlKCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmlzSGlkZGVuID0gZmFsc2U7XG5cbiAgICAgIHRoaXMuZmFkZUluRGF0YS5jYW5jZWxUb2tlbiA9IG5ldyBDYW5jZWxsYXRpb25Ub2tlbigpO1xuXG4gICAgICBhd2FpdCB0aGlzLmZhZGVJbih0aGlzLmVsZW1lbnQsIHRoaXMuc2V0dGluZ3Muc2hvd0ZhZGVUaW1lLCAnYmxvY2snLCB0aGlzLmZhZGVJbkRhdGEuY2FuY2VsVG9rZW4pO1xuXG4gICAgICB0aGlzLmNsZWFyRmFkZUluKCk7XG5cbiAgICAgIHRoaXMuY2hhbmdlU3RhdGUodGhpcy5zdGF0ZXMuU2hvd0ZhZGVJbkNvbXBsZXRlKTtcblxuICAgICAgdGhpcy5pc1Nob3dpbmcgPSB0cnVlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmICghdGhpcy5zZXR0aW5ncy5kZWJ1ZykgcmV0dXJuO1xuICAgICAgY29uc29sZS5sb2coZS5jYW5jZWxsZWQgPyAnRmFkZSBpbiBpcyBjYW5jZWxsZWQuJyA6ICdzb21lIG90aGVyIGVycicpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGhpZGVTdGF0ZSgpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5pc1Nob3dpbmcgPSBmYWxzZTtcblxuICAgICAgdGhpcy5mYWRlT3V0RGF0YS5jYW5jZWxUb2tlbiA9IG5ldyBDYW5jZWxsYXRpb25Ub2tlbigpO1xuXG4gICAgICBhd2FpdCB0aGlzLmZhZGVPdXQodGhpcy5lbGVtZW50LCB0aGlzLnNldHRpbmdzLmhpZGVGYWRlVGltZSwgdGhpcy5mYWRlT3V0RGF0YS5jYW5jZWxUb2tlbik7XG5cbiAgICAgIHRoaXMuY2xlYXJGYWRlT3V0KCk7XG5cbiAgICAgIHRoaXMuY2hhbmdlU3RhdGUodGhpcy5zdGF0ZXMuSGlkZUZhZGVPdXRDb21wbGV0ZSk7XG5cbiAgICAgIHRoaXMuaXNIaWRkZW4gPSB0cnVlO1xuXG4gICAgICB0aGlzLndhaXQoKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoIXRoaXMuc2V0dGluZ3MuZGVidWcpIHJldHVybjtcbiAgICAgIGNvbnNvbGUubG9nKGUuY2FuY2VsbGVkID8gJ0ZhZGUgb3V0IGlzIGNhbmNlbGxlZC4nIDogJ3NvbWUgb3RoZXIgZXJyJyk7XG4gICAgfVxuICB9XG5cbiAgY2FuY2VsV2FpdCgpIHtcbiAgICBpZiAobnVsbCAhPT0gdGhpcy53YWl0U3RhdGVDYW5jZWxUb2tlbikge1xuICAgICAgdGhpcy53YWl0U3RhdGVDYW5jZWxUb2tlbi5jYW5jZWwoKTtcbiAgICAgIHRoaXMud2FpdFN0YXRlQ2FuY2VsVG9rZW4gPSBudWxsO1xuICAgIH1cblxuICAgIGlmIChudWxsICE9PSB0aGlzLndhaXRpbmdBbmltSUQpIHtcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMud2FpdGluZ0FuaW1JRCk7XG4gICAgICB0aGlzLndhaXRpbmdBbmltSUQgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNldHRpbmdzLnByb2dyZXNzQmFyKSB7XG4gICAgICB0aGlzLmRpc2FibGVkUHJvZ3Jlc3NCYXIoKTtcbiAgICB9XG5cbiAgICB0aGlzLmlzV2FpdGluZyA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFdhaXQgZm9yIHRoZSBuZXh0IHByb2Nlc3MgZm9yIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcy5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgLSBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byB3YWl0LlxuICAgKiBAcGFyYW0ge0NhbmNlbGxhdGlvblRva2VufSBjYW5jZWxsYXRpb25Ub2tlbiAtIFRoZSBjYW5jZWxsYXRpb24gdG9rZW4uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPG51bWJlcj59XG4gICAqL1xuICB3YWl0aW5nKHdhaXRUaW1lLCBjYW5jZWxsYXRpb25Ub2tlbiA9IG51bGwpIHtcbiAgICB0aGlzLmlzV2FpdGluZyA9IHRydWU7XG4gICAgY29uc3QgZGVmYXVsdFZhbHVlID0gMDtcbiAgICBjb25zdCBmaW5hbFZhbHVlID0gMTtcbiAgICBjb25zdCBzdGFydCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgaWYgKHRoaXMuc2V0dGluZ3MucHJvZ3Jlc3NCYXIpIHtcbiAgICAgIHRoaXMuZW5hYmxlZFByb2dyZXNzQmFyKCk7XG4gICAgICB0aGlzLnByb2dyZXNzQmFyLmJhckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtZmlsbGVkJyk7XG4gICAgICB0aGlzLnByb2dyZXNzQmFyLmJhckVsZW1lbnQuc3R5bGUud2lkdGggPSBgJHtkZWZhdWx0VmFsdWV9JWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHNlbGYud2FpdGluZ0FuaW1JRCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiB3YWl0aW5nUHJvZ3Jlc3ModGltZSkge1xuICAgICAgICBsZXQgdGltZUZyYWN0aW9uID0gKHRpbWUgLSBzdGFydCkgLyB3YWl0VGltZTtcbiAgICAgICAgbGV0IHByb2dyZXNzID0gTWF0aC5taW4odGltZUZyYWN0aW9uLCAxKTtcblxuICAgICAgICBpZiAoc2VsZi5zZXR0aW5ncy5wcm9ncmVzc0Jhcikge1xuICAgICAgICAgIHNlbGYucHJvZ3Jlc3NCYXIuYmFyRWxlbWVudC5zdHlsZS53aWR0aCA9IGAke3Byb2dyZXNzICogMTAwfSVgO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb2dyZXNzIDwgZmluYWxWYWx1ZSkge1xuICAgICAgICAgIHNlbGYud2FpdGluZ0FuaW1JRCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh3YWl0aW5nUHJvZ3Jlc3MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChzZWxmLnNldHRpbmdzLnByb2dyZXNzQmFyKSB7XG4gICAgICAgICAgICBzZWxmLnByb2dyZXNzQmFyLmJhckVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaXMtZmlsbGVkJyk7XG4gICAgICAgICAgICBzZWxmLnByb2dyZXNzQmFyLndyYXBwZXJFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2VsZi5pc1dhaXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgICBjYW5jZWxsYXRpb25Ub2tlbi5yZWdpc3RlcihyZWplY3QpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGVuYWJsZWRQcm9ncmVzc0JhcigpIHtcbiAgICB0aGlzLnByb2dyZXNzQmFyLndyYXBwZXJFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICB9XG5cbiAgZGlzYWJsZWRQcm9ncmVzc0JhcigpIHtcbiAgICB0aGlzLnByb2dyZXNzQmFyLndyYXBwZXJFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH1cblxuICBmYWRlSW4oZWwsIGR1cmF0aW9uID0gMjAwMCwgZGlzcGxheSwgY2FuY2VsbGF0aW9uVG9rZW4gPSBudWxsKSB7XG4gICAgdGhpcy5pc0ZhZGVJbiA9IHRydWU7XG4gICAgY29uc3QgZGVmYXVsdE9wYWNpdHkgPSBwYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKS5vcGFjaXR5KTtcbiAgICBjb25zdCBmaW5hbE9wYWNpdHkgPSAxO1xuICAgIGNvbnN0IHN0YXJ0ID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICBlbC5zdHlsZS5vcGFjaXR5ID0gZGVmYXVsdE9wYWNpdHk7XG4gICAgZWwuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXkgfHwgJ2Jsb2NrJztcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBzZWxmLmZhZGVJbkRhdGEuYW5pbVJlcUlEID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uIGZhZGUodGltZSkge1xuICAgICAgICBsZXQgdGltZUZyYWN0aW9uID0gKHRpbWUgLSBzdGFydCkgLyBkdXJhdGlvbjtcbiAgICAgICAgbGV0IHByb2dyZXNzID0gTWF0aC5taW4odGltZUZyYWN0aW9uLCAxKTtcblxuICAgICAgICBlbC5zdHlsZS5vcGFjaXR5ID0gZGVmYXVsdE9wYWNpdHkgKyAoZmluYWxPcGFjaXR5IC0gZGVmYXVsdE9wYWNpdHkpICogcHJvZ3Jlc3M7XG5cbiAgICAgICAgaWYgKCtlbC5zdHlsZS5vcGFjaXR5IDwgZmluYWxPcGFjaXR5KSB7XG4gICAgICAgICAgc2VsZi5mYWRlSW5EYXRhLmFuaW1SZXFJRCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShmYWRlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdpcy1mYWRlLWluLWRvbmUnKTtcbiAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1mYWRlLW91dC1kb25lJyk7XG4gICAgICAgICAgc2VsZi5pc0ZhZGVJbiA9IGZhbHNlO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICAgIGNhbmNlbGxhdGlvblRva2VuLnJlZ2lzdGVyKHJlamVjdCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZmFkZU91dChlbCwgZHVyYXRpb24gPSAyMDAwLCBjYW5jZWxsYXRpb25Ub2tlbiA9IG51bGwpIHtcbiAgICB0aGlzLmlzRmFkZU91dCA9IHRydWU7XG4gICAgY29uc3QgZGVmYXVsdE9wYWNpdHkgPSBwYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKS5vcGFjaXR5KTtcbiAgICBjb25zdCBmaW5hbE9wYWNpdHkgPSAwO1xuICAgIGNvbnN0IHN0YXJ0ID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgc2VsZi5mYWRlT3V0RGF0YS5hbmltUmVxSUQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gZmFkZSh0aW1lKSB7XG4gICAgICAgIGxldCB0aW1lRnJhY3Rpb24gPSAodGltZSAtIHN0YXJ0KSAvIGR1cmF0aW9uO1xuICAgICAgICBsZXQgcHJvZ3Jlc3MgPSBNYXRoLm1pbih0aW1lRnJhY3Rpb24sIDEpO1xuXG4gICAgICAgIGVsLnN0eWxlLm9wYWNpdHkgPSBkZWZhdWx0T3BhY2l0eSAtIGRlZmF1bHRPcGFjaXR5ICogcHJvZ3Jlc3M7XG5cbiAgICAgICAgaWYgKCtlbC5zdHlsZS5vcGFjaXR5ID4gZmluYWxPcGFjaXR5KSB7XG4gICAgICAgICAgc2VsZi5mYWRlT3V0RGF0YS5hbmltUmVxSUQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZmFkZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdpcy1mYWRlLW91dC1kb25lJyk7XG4gICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnaXMtZmFkZS1pbi1kb25lJyk7XG4gICAgICAgICAgc2VsZi5pc0ZhZGVPdXQgPSBmYWxzZTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgICBjYW5jZWxsYXRpb25Ub2tlbi5yZWdpc3RlcihyZWplY3QpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGNsZWFyRmFkZUluKCkge1xuICAgIHRoaXMuZmFkZUluRGF0YS5jYW5jZWxUb2tlbiA9IG51bGw7XG4gICAgdGhpcy5mYWRlSW5EYXRhLmFuaW1SZXFJRCA9IG51bGw7XG4gIH1cblxuICBjbGVhckZhZGVPdXQoKSB7XG4gICAgdGhpcy5mYWRlT3V0RGF0YS5jYW5jZWxUb2tlbiA9IG51bGw7XG4gICAgdGhpcy5mYWRlT3V0RGF0YS5hbmltUmVxSUQgPSBudWxsO1xuICB9XG5cbiAgY2FuY2VsRmFkZUluKCkge1xuICAgIGlmIChudWxsICE9PSB0aGlzLmZhZGVJbkRhdGEuY2FuY2VsVG9rZW4pIHtcbiAgICAgIHRoaXMuZmFkZUluRGF0YS5jYW5jZWxUb2tlbi5jYW5jZWwoKTtcbiAgICAgIHRoaXMuZmFkZUluRGF0YS5jYW5jZWxUb2tlbiA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKG51bGwgIT09IHRoaXMuZmFkZUluRGF0YS5hbmltUmVxSUQpIHtcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuZmFkZUluRGF0YS5hbmltUmVxSUQpO1xuICAgICAgdGhpcy5mYWRlSW5EYXRhLmFuaW1SZXFJRCA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNGYWRlSW4gJiYgbnVsbCA9PSB0aGlzLmZhZGVJbkRhdGEuY2FuY2VsVG9rZW4gJiYgbnVsbCA9PSB0aGlzLmZhZGVJbkRhdGEuYW5pbVJlcUlEKSB7XG4gICAgICB0aGlzLmlzRmFkZUluID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgY2FuY2VsRmFkZU91dCgpIHtcbiAgICBpZiAobnVsbCAhPT0gdGhpcy5mYWRlT3V0RGF0YS5jYW5jZWxUb2tlbikge1xuICAgICAgdGhpcy5mYWRlT3V0RGF0YS5jYW5jZWxUb2tlbi5jYW5jZWwoKTtcbiAgICAgIHRoaXMuZmFkZU91dERhdGEuY2FuY2VsVG9rZW4gPSBudWxsO1xuICAgIH1cblxuICAgIGlmIChudWxsICE9PSB0aGlzLmZhZGVPdXREYXRhLmFuaW1SZXFJRCkge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5mYWRlT3V0RGF0YS5hbmltUmVxSUQpO1xuICAgICAgdGhpcy5mYWRlT3V0RGF0YS5hbmltUmVxSUQgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzRmFkZU91dCAmJiBudWxsID09IHRoaXMuZmFkZU91dERhdGEuY2FuY2VsVG9rZW4gJiYgbnVsbCA9PSB0aGlzLmZhZGVPdXREYXRhLmFuaW1SZXFJRCkge1xuICAgICAgdGhpcy5pc0ZhZGVPdXQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJDYW5jZWxsYXRpb25Ub2tlbiIsInBhcmVudFRva2VuIiwiY2FuY2VsbGF0aW9uUHJvbWlzZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiY2FuY2VsIiwiZSIsImlzQ2FuY2VsbGF0aW9uUmVxdWVzdGVkIiwiZXJyIiwiRXJyb3IiLCJjYW5jZWxsZWQiLCJyZWdpc3RlciIsImNhbGxiYWNrIiwidGhlbiIsIlNjc2F2ZXIiLCJ3YWl0VGltZSIsImV2ZW50cyIsImRvSW50ZXJ2YWwiLCJzaG93RmFkZVRpbWUiLCJoaWRlRmFkZVRpbWUiLCJhdXRvU3RhcnQiLCJwcm9ncmVzc0JhciIsInByb2dyZXNzQmFyUGFyZW50Iiwib24iLCJkZWJ1ZyIsIkRlZmF1bHQiLCJTeW1ib2wiLCJXYWl0IiwiU2hvdyIsIlNob3dGYWRlSW5Db21wbGV0ZSIsIkhpZGUiLCJIaWRlRmFkZU91dCIsIkRpc2FibGVkIiwiRW5hYmxlZCIsInN0YXRlcyIsIndyYXBwZXJFbGVtZW50IiwiYmFyRWxlbWVudCIsInByb2dyZXNzIiwiYW5pbVJlcUlEIiwiY2FuY2VsVG9rZW4iLCJzZXR0aW5ncyIsIl9vYmplY3RTcHJlYWQiLCJkZWZhdWx0cyIsInNlbGVjdG9yIiwic2NzYXZlciIsImluaXQiLCJldmVudCIsImVsZW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiYmluZCIsImluaXRFbGVtZW50IiwiaW5pdFN0YXRlRXZlbnQiLCJpbml0QWRkRXZlbnRzIiwiaW5pdFByb2dyZXNzQmFyIiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50Iiwic3RhcnQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJzdGF0ZUV2ZW50TmFtZSIsImV2ZW50UHJlZml4Iiwic2VsZiIsInN0YXRlQ29udHJvbGxlciIsImRldGFpbCIsImJlZm9yZVN0YXRlIiwiY3VycmVudFN0YXRlIiwia2V5Iiwic3RhdGUiLCJ3YWl0U3RhdGUiLCJzaG93U3RhdGUiLCJoaWRlU3RhdGUiLCJIaWRlRmFkZU91dENvbXBsZXRlIiwiZGlzYWJsZWRTdGF0ZSIsImVuYWJsZWRTdGF0ZSIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJzdHlsZSIsImRpc3BsYXkiLCJwcm9ncmVzc0JnIiwiaWQiLCJhcHBlbmRDaGlsZCIsInByb2dyZXNzQmFyUGFyZW50RWxtIiwiYm9keSIsInJlZ2lzdGVyRG9pbmciLCJ3YWl0IiwiZm9yRWFjaCIsIndpbmRvdyIsImludGVydmFsRG9pbmciLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicGVyZm9ybWFuY2UiLCJub3ciLCJsYXN0RXZlbnROb3ciLCJkb2luZyIsImNhbmNlbFdhaXQiLCJjYW5jZWxGYWRlSW4iLCJoaWRlIiwiaXNIaWRkZW4iLCJjaGFuZ2VTdGF0ZSIsInVucmVnaXN0ZXJEb2luZyIsImlzU2hvd2luZyIsImZhZGVPdXQiLCJpc1dhaXRpbmciLCJ3YWl0U3RhdGVDYW5jZWxUb2tlbiIsIndhaXRpbmciLCJzaG93IiwiY29uc29sZSIsImxvZyIsImZhZGVJbkRhdGEiLCJmYWRlSW4iLCJjbGVhckZhZGVJbiIsImZhZGVPdXREYXRhIiwiY2xlYXJGYWRlT3V0Iiwid2FpdGluZ0FuaW1JRCIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwiZGlzYWJsZWRQcm9ncmVzc0JhciIsImNhbmNlbGxhdGlvblRva2VuIiwiZGVmYXVsdFZhbHVlIiwiZmluYWxWYWx1ZSIsImVuYWJsZWRQcm9ncmVzc0JhciIsInJlbW92ZSIsIndpZHRoIiwicmVqZWN0IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2FpdGluZ1Byb2dyZXNzIiwidGltZSIsInRpbWVGcmFjdGlvbiIsIk1hdGgiLCJtaW4iLCJlbCIsImR1cmF0aW9uIiwiaXNGYWRlSW4iLCJkZWZhdWx0T3BhY2l0eSIsInBhcnNlRmxvYXQiLCJnZXRDb21wdXRlZFN0eWxlIiwib3BhY2l0eSIsImZpbmFsT3BhY2l0eSIsImZhZGUiLCJpc0ZhZGVPdXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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
