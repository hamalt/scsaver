
  /**
   * @license
   * Scsaver.js v0.3.6
   * Released under the MIT License.
   */

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

export { Scsaver as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NzYXZlci5lcy5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZXMvY2FuY2VsbGF0aW9uVG9rZW4uanMiLCIuLi9zcmMvc2NzYXZlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQ2FuY2VsbGF0aW9uVG9rZW4ge1xuICBpc0NhbmNlbGxhdGlvblJlcXVlc3RlZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHBhcmVudFRva2VuID0gbnVsbCkge1xuICAgIHRoaXMuY2FuY2VsbGF0aW9uUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICB0aGlzLmNhbmNlbCA9IChlKSA9PiB7XG4gICAgICAgIHRoaXMuaXNDYW5jZWxsYXRpb25SZXF1ZXN0ZWQgPSB0cnVlO1xuICAgICAgICBpZiAoZSkge1xuICAgICAgICAgIHJlc29sdmUoZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignY2FuY2VsbGVkJyk7XG4gICAgICAgICAgZXJyLmNhbmNlbGxlZCA9IHRydWU7XG4gICAgICAgICAgcmVzb2x2ZShlcnIpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuICAgIGlmIChwYXJlbnRUb2tlbiAmJiBwYXJlbnRUb2tlbiBpbnN0YW5jZW9mIENhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICBwYXJlbnRUb2tlbi5yZWdpc3Rlcih0aGlzLmNhbmNlbCk7XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXIoY2FsbGJhY2spIHtcbiAgICB0aGlzLmNhbmNlbGxhdGlvblByb21pc2UudGhlbihjYWxsYmFjayk7XG4gIH1cblxuICBjcmVhdGVEZXBlbmRlbnRUb2tlbigpIHtcbiAgICByZXR1cm4gbmV3IENhbmNlbGxhdGlvblRva2VuKHRoaXMpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDYW5jZWxsYXRpb25Ub2tlbiB9IGZyb20gJy4vbW9kdWxlcy9jYW5jZWxsYXRpb25Ub2tlbi5qcyc7XG5cbi8qKlxuICogV2ViIHBhZ2Ugc2NyZWVuc2F2ZXIgSmF2YVNjcmlwdCBsaWJyYXJ5LlxuICogQHBhcmFtICB7Li4uYW55fSBhcmdzIFNlbGVjdG9yLCBvcHRpb25zLlxuICogQHJldHVybnMge1Njc2F2ZXJ9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjc2F2ZXIge1xuICAvKipcbiAgICogRGVmYXVsdHMgZm9yIG9wdGlvbnMuXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICBkZWZhdWx0cyA9IHtcbiAgICB3YWl0VGltZTogMzIwMCxcbiAgICBldmVudHM6IFsna2V5ZG93bicsICdtb3VzZW1vdmUnLCAndG91Y2hzdGFydCcsICdjbGljayddLFxuICAgIGRvSW50ZXJ2YWw6IDIwMCxcbiAgICBzaG93RmFkZVRpbWU6IDEwMDAsXG4gICAgaGlkZUZhZGVUaW1lOiAxMDAwLFxuICAgIGF1dG9TdGFydDogdHJ1ZSxcbiAgICBwcm9ncmVzc0JhcjogZmFsc2UsXG4gICAgcHJvZ3Jlc3NCYXJQYXJlbnQ6IG51bGwsXG4gICAgb246IG51bGwsXG4gICAgZGVidWc6IGZhbHNlXG4gIH07XG5cbiAgLyoqXG4gICAqIFNjc2F2ZXIgZWxlbWVudC5cbiAgICogQHR5cGUge0VsZW1lbnR9XG4gICAqL1xuICBlbGVtZW50O1xuXG4gIC8qKlxuICAgKiBFbGVtZW50IGRlZmF1bHQgc2VsZWN0b3IuXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBzZWxlY3RvciA9ICcjc2NzYXZlcic7XG4gIHdhaXRTdGF0ZUNhbmNlbFRva2VuID0gbnVsbDtcbiAgd2FpdGluZ1RpbWVvdXRJRCA9IG51bGw7XG4gIHdhaXRpbmdBbmltSUQgPSBudWxsO1xuXG4gIGlzV2FpdGluZyA9IGZhbHNlO1xuICBpc1Nob3dpbmcgPSBmYWxzZTtcbiAgaXNIaWRkZW4gPSB0cnVlO1xuICBpc0ZhZGVJbiA9IGZhbHNlO1xuICBpc0ZhZGVPdXQgPSBmYWxzZTtcblxuICBzdGF0ZXMgPSB7XG4gICAgRGVmYXVsdDogU3ltYm9sKCdEZWZhdWx0JyksXG4gICAgV2FpdDogU3ltYm9sKCdXYWl0JyksXG4gICAgU2hvdzogU3ltYm9sKCdTaG93JyksXG4gICAgU2hvd0ZhZGVJbkNvbXBsZXRlOiBTeW1ib2woJ1Nob3dGYWRlSW5Db21wbGV0ZScpLFxuICAgIEhpZGU6IFN5bWJvbCgnSGlkZScpLFxuICAgIEhpZGVGYWRlT3V0OiBTeW1ib2woJ0hpZGVGYWRlT3V0Q29tcGxldGUnKSxcbiAgICBEaXNhYmxlZDogU3ltYm9sKCdEaXNhYmxlZCcpLFxuICAgIEVuYWJsZWQ6IFN5bWJvbCgnRW5hYmxlZCcpXG4gIH07XG5cbiAgZXZlbnRQcmVmaXggPSAnc2NzYXZlcic7XG4gIGJlZm9yZVN0YXRlID0gdGhpcy5zdGF0ZXMuRGVmYXVsdDtcbiAgY3VycmVudFN0YXRlID0gdGhpcy5zdGF0ZXMuRGVmYXVsdDtcbiAgc3RhdGVFdmVudE5hbWUgPSAnJztcbiAgbGFzdEV2ZW50Tm93ID0gMDtcblxuICBwcm9ncmVzc0JhciA9IHtcbiAgICB3cmFwcGVyRWxlbWVudDogbnVsbCxcbiAgICBiYXJFbGVtZW50OiBudWxsLFxuICAgIHByb2dyZXNzOiAwXG4gIH07XG5cbiAgLyoqXG4gICAqIEZhZGUgaW4gZGF0YS5cbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIGZhZGVJbkRhdGEgPSB7XG4gICAgYW5pbVJlcUlEOiBudWxsLFxuICAgIGNhbmNlbFRva2VuOiBudWxsXG4gIH07XG5cbiAgLyoqXG4gICAqIEZhZGUgb3V0IGRhdGEuXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICBmYWRlT3V0RGF0YSA9IHtcbiAgICBhbmltUmVxSUQ6IG51bGwsXG4gICAgY2FuY2VsVG9rZW46IG51bGxcbiAgfTtcblxuICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgLy8gTWVyZ2Ugb3B0aW9uc1xuICAgIHRoaXMuc2V0dGluZ3MgPSB7IC4uLnRoaXMuZGVmYXVsdHMsIC4uLmFyZ3NbMV0gfTtcblxuICAgIHRoaXMuc2VsZWN0b3IgPSBhcmdzWzBdIHx8IHRoaXMuc2VsZWN0b3I7XG5cbiAgICAvLyBTY3NhdmVyIEluc3RhbmNlXG4gICAgY29uc3Qgc2NzYXZlciA9IHRoaXM7XG5cbiAgICB0aGlzLmluaXQoKTtcblxuICAgIHJldHVybiBzY3NhdmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBldmVudC5cbiAgICogQHBhcmFtIHsqfSBldmVudFxuICAgKiBAcGFyYW0geyp9IGNhbGxiYWNrXG4gICAqL1xuICBvbihldmVudCwgY2FsbGJhY2spIHtcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgY2FsbGJhY2suYmluZCh0aGlzKSk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuaW5pdEVsZW1lbnQoKTtcblxuICAgIC8vIGNyZWF0ZSBzY3NhdmVyIGV2ZW50XG4gICAgdGhpcy5pbml0U3RhdGVFdmVudCgpO1xuXG4gICAgdGhpcy5pbml0QWRkRXZlbnRzKCk7XG5cbiAgICBpZiAodGhpcy5zZXR0aW5ncy5wcm9ncmVzc0Jhcikge1xuICAgICAgdGhpcy5pbml0UHJvZ3Jlc3NCYXIoKTtcbiAgICB9XG5cbiAgICB0aGlzLmVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2luaXQnKSk7XG5cbiAgICBpZiAodGhpcy5zZXR0aW5ncy5hdXRvU3RhcnQpIHtcbiAgICAgIHRoaXMuc3RhcnQoKTtcbiAgICB9XG4gIH1cblxuICBpbml0RWxlbWVudCgpIHtcbiAgICAvLyBvbmx5IG9uZSBlbGVtZW50XG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnNlbGVjdG9yKTtcblxuICAgIGlmIChudWxsID09PSB0aGlzLmVsZW1lbnQpIHtcbiAgICAgIHRocm93IEVycm9yKCdTY3NhdmVyIGVsZW1lbnQgbm90IGZvdW5kLicpO1xuICAgIH1cbiAgfVxuXG4gIGluaXRTdGF0ZUV2ZW50KCkge1xuICAgIHRoaXMuc3RhdGVFdmVudE5hbWUgPSBgJHt0aGlzLmV2ZW50UHJlZml4fUNoYW5nZVN0YXRlYDtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHRoaXMuc3RhdGVFdmVudE5hbWUsIChlKSA9PiB7XG4gICAgICBzZWxmLnN0YXRlQ29udHJvbGxlcihlLmRldGFpbC5iZWZvcmVTdGF0ZSwgZS5kZXRhaWwuY3VycmVudFN0YXRlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGluaXRBZGRFdmVudHMoKSB7XG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLm9uKSByZXR1cm47XG5cbiAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5zZXR0aW5ncy5vbikge1xuICAgICAgdGhpcy5vbihrZXksIHRoaXMuc2V0dGluZ3Mub25ba2V5XSk7XG4gICAgfVxuICB9XG5cbiAgLy8gVE9ETzogcHJpdmF0ZSBtZXRob2RcbiAgY2hhbmdlU3RhdGUoc3RhdGUpIHtcbiAgICB0aGlzLmJlZm9yZVN0YXRlID0gdGhpcy5jdXJyZW50U3RhdGU7XG4gICAgdGhpcy5jdXJyZW50U3RhdGUgPSBzdGF0ZTtcblxuICAgIHRoaXMuZWxlbWVudC5kaXNwYXRjaEV2ZW50KFxuICAgICAgbmV3IEN1c3RvbUV2ZW50KGAke3RoaXMuc3RhdGVFdmVudE5hbWV9YCwge1xuICAgICAgICBkZXRhaWw6IHsgYmVmb3JlU3RhdGU6IHRoaXMuYmVmb3JlU3RhdGUsIGN1cnJlbnRTdGF0ZTogdGhpcy5jdXJyZW50U3RhdGUgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgc3RhdGVDb250cm9sbGVyKGJlZm9yZVN0YXRlLCBjdXJyZW50U3RhdGUpIHtcbiAgICBzd2l0Y2ggKGN1cnJlbnRTdGF0ZSkge1xuICAgICAgY2FzZSB0aGlzLnN0YXRlcy5XYWl0OlxuICAgICAgICB0aGlzLmVsZW1lbnQuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ3dhaXRTdGFydCcsIHsgZGV0YWlsOiB7IGJlZm9yZVN0YXRlOiBiZWZvcmVTdGF0ZSwgY3VycmVudFN0YXRlOiBjdXJyZW50U3RhdGUgfSB9KVxuICAgICAgICApO1xuICAgICAgICB0aGlzLndhaXRTdGF0ZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdGhpcy5zdGF0ZXMuU2hvdzpcbiAgICAgICAgdGhpcy5lbGVtZW50LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdzaG93U3RhcnQnLCB7IGRldGFpbDogeyBiZWZvcmVTdGF0ZTogYmVmb3JlU3RhdGUsIGN1cnJlbnRTdGF0ZTogY3VycmVudFN0YXRlIH0gfSlcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zaG93U3RhdGUoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRoaXMuc3RhdGVzLlNob3dGYWRlSW5Db21wbGV0ZTpcbiAgICAgICAgdGhpcy5lbGVtZW50LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdzaG93RmFkZUluQ29tcGxldGUnLCB7IGRldGFpbDogeyBiZWZvcmVTdGF0ZTogYmVmb3JlU3RhdGUsIGN1cnJlbnRTdGF0ZTogY3VycmVudFN0YXRlIH0gfSlcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRoaXMuc3RhdGVzLkhpZGU6XG4gICAgICAgIHRoaXMuZWxlbWVudC5kaXNwYXRjaEV2ZW50KFxuICAgICAgICAgIG5ldyBDdXN0b21FdmVudCgnaGlkZVN0YXJ0JywgeyBkZXRhaWw6IHsgYmVmb3JlU3RhdGU6IGJlZm9yZVN0YXRlLCBjdXJyZW50U3RhdGU6IGN1cnJlbnRTdGF0ZSB9IH0pXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuaGlkZVN0YXRlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0aGlzLnN0YXRlcy5IaWRlRmFkZU91dENvbXBsZXRlOlxuICAgICAgICB0aGlzLmVsZW1lbnQuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ2hpZGVGYWRlT3V0Q29tcGxldGUnLCB7IGRldGFpbDogeyBiZWZvcmVTdGF0ZTogYmVmb3JlU3RhdGUsIGN1cnJlbnRTdGF0ZTogY3VycmVudFN0YXRlIH0gfSlcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRoaXMuc3RhdGVzLkRpc2FibGVkOlxuICAgICAgICB0aGlzLmVsZW1lbnQuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ2Rpc2FibGVkU3RhcnQnLCB7IGRldGFpbDogeyBiZWZvcmVTdGF0ZTogYmVmb3JlU3RhdGUsIGN1cnJlbnRTdGF0ZTogY3VycmVudFN0YXRlIH0gfSlcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5kaXNhYmxlZFN0YXRlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0aGlzLnN0YXRlcy5FbmFibGVkOlxuICAgICAgICB0aGlzLmVsZW1lbnQuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ2VuYWJsZWRTdGFydCcsIHsgZGV0YWlsOiB7IGJlZm9yZVN0YXRlOiBiZWZvcmVTdGF0ZSwgY3VycmVudFN0YXRlOiBjdXJyZW50U3RhdGUgfSB9KVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmVuYWJsZWRTdGF0ZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdGhpcy5zdGF0ZXMuRGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBpbml0UHJvZ3Jlc3NCYXIoKSB7XG4gICAgdGhpcy5wcm9ncmVzc0Jhci53cmFwcGVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucHJvZ3Jlc3NCYXIud3JhcHBlckVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2NzYXZlci1wcm9ncmVzcy13cmFwcGVyJyk7XG4gICAgdGhpcy5wcm9ncmVzc0Jhci53cmFwcGVyRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgY29uc3QgcHJvZ3Jlc3NCZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHByb2dyZXNzQmcuY2xhc3NMaXN0LmFkZCgnc2NzYXZlci1wcm9ncmVzcy1iZycpO1xuXG4gICAgdGhpcy5wcm9ncmVzc0Jhci5iYXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5wcm9ncmVzc0Jhci5iYXJFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3Njc2F2ZXItcHJvZ3Jlc3MtYmFyJyk7XG4gICAgdGhpcy5wcm9ncmVzc0Jhci5iYXJFbGVtZW50LmlkID0gJ3Njc2F2ZXItcHJvZ3Jlc3MtYmFyJztcblxuICAgIHByb2dyZXNzQmcuYXBwZW5kQ2hpbGQodGhpcy5wcm9ncmVzc0Jhci5iYXJFbGVtZW50KTtcbiAgICB0aGlzLnByb2dyZXNzQmFyLndyYXBwZXJFbGVtZW50LmFwcGVuZENoaWxkKHByb2dyZXNzQmcpO1xuXG4gICAgaWYgKHRoaXMuc2V0dGluZ3MucHJvZ3Jlc3NCYXJQYXJlbnQpIHtcbiAgICAgIGNvbnN0IHByb2dyZXNzQmFyUGFyZW50RWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnNldHRpbmdzLnByb2dyZXNzQmFyUGFyZW50KTtcblxuICAgICAgaWYgKG51bGwgPT09IHByb2dyZXNzQmFyUGFyZW50RWxtKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdTY3NhdmVyIHByb2dyZXNzIGJhciBwYXJlbnQgZWxlbWVudCBub3QgZm91bmQuJyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucHJvZ3Jlc3NCYXIud3JhcHBlckVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaXMtY2hpbGQnKTtcbiAgICAgIHByb2dyZXNzQmFyUGFyZW50RWxtLmFwcGVuZENoaWxkKHRoaXMucHJvZ3Jlc3NCYXIud3JhcHBlckVsZW1lbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMucHJvZ3Jlc3NCYXIud3JhcHBlckVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIHRoaXMucmVnaXN0ZXJEb2luZygpO1xuXG4gICAgdGhpcy53YWl0KCk7XG4gIH1cblxuICByZWdpc3RlckRvaW5nKCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgLy8gVE9ETzogaWYgbm9uIGFycmF5XG4gICAgdGhpcy5zZXR0aW5ncy5ldmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBzZWxmLmludGVydmFsRG9pbmcuYmluZChzZWxmKSk7XG4gICAgfSk7XG4gIH1cblxuICB1bnJlZ2lzdGVyRG9pbmcoKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAvLyBUT0RPOiBpZiBub24gYXJyYXlcbiAgICB0aGlzLnNldHRpbmdzLmV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIHNlbGYuaW50ZXJ2YWxEb2luZyk7XG4gICAgfSk7XG4gIH1cblxuICBpbnRlcnZhbERvaW5nKCkge1xuICAgIGlmIChwZXJmb3JtYW5jZS5ub3coKSAtIHRoaXMubGFzdEV2ZW50Tm93IDw9IHRoaXMuc2V0dGluZ3MuZG9JbnRlcnZhbCkgcmV0dXJuO1xuXG4gICAgdGhpcy5kb2luZygpO1xuICAgIHRoaXMubGFzdEV2ZW50Tm93ID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gIH1cblxuICBkb2luZygpIHtcbiAgICBzd2l0Y2ggKHRoaXMuY3VycmVudFN0YXRlKSB7XG4gICAgICBjYXNlIHRoaXMuc3RhdGVzLldhaXQ6XG4gICAgICAgIHRoaXMuY2FuY2VsV2FpdCgpO1xuICAgICAgICB0aGlzLndhaXQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRoaXMuc3RhdGVzLlNob3c6XG4gICAgICAgIHRoaXMuY2FuY2VsRmFkZUluKCk7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdGhpcy5zdGF0ZXMuU2hvd0ZhZGVJbkNvbXBsZXRlOlxuICAgICAgICB0aGlzLmNhbmNlbEZhZGVJbigpO1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRoaXMuc3RhdGVzLkhpZGU6XG4gICAgICAgIGlmICh0aGlzLmlzSGlkZGVuKSB0aGlzLndhaXQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRoaXMuc3RhdGVzLkhpZGVGYWRlT3V0Q29tcGxldGU6XG4gICAgICAgIGlmICh0aGlzLmlzSGlkZGVuKSB0aGlzLndhaXQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRoaXMuc3RhdGVzLkRlZmF1bHQ6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBkaXNhYmxlZCgpIHtcbiAgICB0aGlzLmNoYW5nZVN0YXRlKHRoaXMuc3RhdGVzLkRpc2FibGVkKTtcbiAgfVxuXG4gIGVuYWJsZWQoKSB7XG4gICAgdGhpcy5jaGFuZ2VTdGF0ZSh0aGlzLnN0YXRlcy5FbmFibGVkKTtcbiAgfVxuXG4gIHdhaXQoKSB7XG4gICAgdGhpcy5jaGFuZ2VTdGF0ZSh0aGlzLnN0YXRlcy5XYWl0KTtcbiAgfVxuXG4gIHNob3coKSB7XG4gICAgdGhpcy5jaGFuZ2VTdGF0ZSh0aGlzLnN0YXRlcy5TaG93KTtcbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgdGhpcy5jaGFuZ2VTdGF0ZSh0aGlzLnN0YXRlcy5IaWRlKTtcbiAgfVxuXG4gIGRpc2FibGVkU3RhdGUoKSB7XG4gICAgdGhpcy51bnJlZ2lzdGVyRG9pbmcoKTtcbiAgICB0aGlzLmNhbmNlbFdhaXQoKTtcblxuICAgIGlmICh0aGlzLmlzU2hvd2luZykge1xuICAgICAgdGhpcy5jYW5jZWxGYWRlSW4oKTtcbiAgICAgIHRoaXMuZmFkZU91dCgpO1xuICAgIH1cblxuICAgIC8vIFRPRE86IGlmIGZhZGVJbiBvciBGYWRlT3V0XG4gIH1cblxuICBlbmFibGVkU3RhdGUoKSB7XG4gICAgdGhpcy5zdGFydCgpO1xuICB9XG5cbiAgYXN5bmMgd2FpdFN0YXRlKCkge1xuICAgIHRyeSB7XG4gICAgICBpZiAodGhpcy5pc1dhaXRpbmcpIHJldHVybjtcblxuICAgICAgdGhpcy53YWl0U3RhdGVDYW5jZWxUb2tlbiA9IG5ldyBDYW5jZWxsYXRpb25Ub2tlbigpO1xuXG4gICAgICBhd2FpdCB0aGlzLndhaXRpbmcodGhpcy5zZXR0aW5ncy53YWl0VGltZSwgdGhpcy53YWl0U3RhdGVDYW5jZWxUb2tlbik7XG5cbiAgICAgIHRoaXMuc2hvdygpO1xuXG4gICAgICB0aGlzLmNhbmNlbFdhaXQoKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoIXRoaXMuc2V0dGluZ3MuZGVidWcpIHJldHVybjtcbiAgICAgIGNvbnNvbGUubG9nKGUuY2FuY2VsbGVkID8gJ1dhaXRpbmcgaXMgY2FuY2VsbGVkLicgOiAnc29tZSBvdGhlciBlcnInKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBzaG93U3RhdGUoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuaXNIaWRkZW4gPSBmYWxzZTtcblxuICAgICAgdGhpcy5mYWRlSW5EYXRhLmNhbmNlbFRva2VuID0gbmV3IENhbmNlbGxhdGlvblRva2VuKCk7XG5cbiAgICAgIGF3YWl0IHRoaXMuZmFkZUluKHRoaXMuZWxlbWVudCwgdGhpcy5zZXR0aW5ncy5zaG93RmFkZVRpbWUsICdibG9jaycsIHRoaXMuZmFkZUluRGF0YS5jYW5jZWxUb2tlbik7XG5cbiAgICAgIHRoaXMuY2xlYXJGYWRlSW4oKTtcblxuICAgICAgdGhpcy5jaGFuZ2VTdGF0ZSh0aGlzLnN0YXRlcy5TaG93RmFkZUluQ29tcGxldGUpO1xuXG4gICAgICB0aGlzLmlzU2hvd2luZyA9IHRydWU7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLmRlYnVnKSByZXR1cm47XG4gICAgICBjb25zb2xlLmxvZyhlLmNhbmNlbGxlZCA/ICdGYWRlIGluIGlzIGNhbmNlbGxlZC4nIDogJ3NvbWUgb3RoZXIgZXJyJyk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgaGlkZVN0YXRlKCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmlzU2hvd2luZyA9IGZhbHNlO1xuXG4gICAgICB0aGlzLmZhZGVPdXREYXRhLmNhbmNlbFRva2VuID0gbmV3IENhbmNlbGxhdGlvblRva2VuKCk7XG5cbiAgICAgIGF3YWl0IHRoaXMuZmFkZU91dCh0aGlzLmVsZW1lbnQsIHRoaXMuc2V0dGluZ3MuaGlkZUZhZGVUaW1lLCB0aGlzLmZhZGVPdXREYXRhLmNhbmNlbFRva2VuKTtcblxuICAgICAgdGhpcy5jbGVhckZhZGVPdXQoKTtcblxuICAgICAgdGhpcy5jaGFuZ2VTdGF0ZSh0aGlzLnN0YXRlcy5IaWRlRmFkZU91dENvbXBsZXRlKTtcblxuICAgICAgdGhpcy5pc0hpZGRlbiA9IHRydWU7XG5cbiAgICAgIHRoaXMud2FpdCgpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmICghdGhpcy5zZXR0aW5ncy5kZWJ1ZykgcmV0dXJuO1xuICAgICAgY29uc29sZS5sb2coZS5jYW5jZWxsZWQgPyAnRmFkZSBvdXQgaXMgY2FuY2VsbGVkLicgOiAnc29tZSBvdGhlciBlcnInKTtcbiAgICB9XG4gIH1cblxuICBjYW5jZWxXYWl0KCkge1xuICAgIGlmIChudWxsICE9PSB0aGlzLndhaXRTdGF0ZUNhbmNlbFRva2VuKSB7XG4gICAgICB0aGlzLndhaXRTdGF0ZUNhbmNlbFRva2VuLmNhbmNlbCgpO1xuICAgICAgdGhpcy53YWl0U3RhdGVDYW5jZWxUb2tlbiA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKG51bGwgIT09IHRoaXMud2FpdGluZ0FuaW1JRCkge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy53YWl0aW5nQW5pbUlEKTtcbiAgICAgIHRoaXMud2FpdGluZ0FuaW1JRCA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2V0dGluZ3MucHJvZ3Jlc3NCYXIpIHtcbiAgICAgIHRoaXMuZGlzYWJsZWRQcm9ncmVzc0JhcigpO1xuICAgIH1cblxuICAgIHRoaXMuaXNXYWl0aW5nID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogV2FpdCBmb3IgdGhlIG5leHQgcHJvY2VzcyBmb3IgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgbWlsbGlzZWNvbmRzLlxuICAgKiBAcGFyYW0ge251bWJlcn0gdGltZSAtIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHdhaXQuXG4gICAqIEBwYXJhbSB7Q2FuY2VsbGF0aW9uVG9rZW59IGNhbmNlbGxhdGlvblRva2VuIC0gVGhlIGNhbmNlbGxhdGlvbiB0b2tlbi5cbiAgICogQHJldHVybnMge1Byb21pc2U8bnVtYmVyPn1cbiAgICovXG4gIHdhaXRpbmcod2FpdFRpbWUsIGNhbmNlbGxhdGlvblRva2VuID0gbnVsbCkge1xuICAgIHRoaXMuaXNXYWl0aW5nID0gdHJ1ZTtcbiAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSAwO1xuICAgIGNvbnN0IGZpbmFsVmFsdWUgPSAxO1xuICAgIGNvbnN0IHN0YXJ0ID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICBpZiAodGhpcy5zZXR0aW5ncy5wcm9ncmVzc0Jhcikge1xuICAgICAgdGhpcy5lbmFibGVkUHJvZ3Jlc3NCYXIoKTtcbiAgICAgIHRoaXMucHJvZ3Jlc3NCYXIuYmFyRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1maWxsZWQnKTtcbiAgICAgIHRoaXMucHJvZ3Jlc3NCYXIuYmFyRWxlbWVudC5zdHlsZS53aWR0aCA9IGAke2RlZmF1bHRWYWx1ZX0lYDtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgc2VsZi53YWl0aW5nQW5pbUlEID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uIHdhaXRpbmdQcm9ncmVzcyh0aW1lKSB7XG4gICAgICAgIGxldCB0aW1lRnJhY3Rpb24gPSAodGltZSAtIHN0YXJ0KSAvIHdhaXRUaW1lO1xuICAgICAgICBsZXQgcHJvZ3Jlc3MgPSBNYXRoLm1pbih0aW1lRnJhY3Rpb24sIDEpO1xuXG4gICAgICAgIGlmIChzZWxmLnNldHRpbmdzLnByb2dyZXNzQmFyKSB7XG4gICAgICAgICAgc2VsZi5wcm9ncmVzc0Jhci5iYXJFbGVtZW50LnN0eWxlLndpZHRoID0gYCR7cHJvZ3Jlc3MgKiAxMDB9JWA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvZ3Jlc3MgPCBmaW5hbFZhbHVlKSB7XG4gICAgICAgICAgc2VsZi53YWl0aW5nQW5pbUlEID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHdhaXRpbmdQcm9ncmVzcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHNlbGYuc2V0dGluZ3MucHJvZ3Jlc3NCYXIpIHtcbiAgICAgICAgICAgIHNlbGYucHJvZ3Jlc3NCYXIuYmFyRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpcy1maWxsZWQnKTtcbiAgICAgICAgICAgIHNlbGYucHJvZ3Jlc3NCYXIud3JhcHBlckVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzZWxmLmlzV2FpdGluZyA9IGZhbHNlO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICAgIGNhbmNlbGxhdGlvblRva2VuLnJlZ2lzdGVyKHJlamVjdCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZW5hYmxlZFByb2dyZXNzQmFyKCkge1xuICAgIHRoaXMucHJvZ3Jlc3NCYXIud3JhcHBlckVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gIH1cblxuICBkaXNhYmxlZFByb2dyZXNzQmFyKCkge1xuICAgIHRoaXMucHJvZ3Jlc3NCYXIud3JhcHBlckVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgfVxuXG4gIGZhZGVJbihlbCwgZHVyYXRpb24gPSAyMDAwLCBkaXNwbGF5LCBjYW5jZWxsYXRpb25Ub2tlbiA9IG51bGwpIHtcbiAgICB0aGlzLmlzRmFkZUluID0gdHJ1ZTtcbiAgICBjb25zdCBkZWZhdWx0T3BhY2l0eSA9IHBhcnNlRmxvYXQod2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpLm9wYWNpdHkpO1xuICAgIGNvbnN0IGZpbmFsT3BhY2l0eSA9IDE7XG4gICAgY29uc3Qgc3RhcnQgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIGVsLnN0eWxlLm9wYWNpdHkgPSBkZWZhdWx0T3BhY2l0eTtcbiAgICBlbC5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheSB8fCAnYmxvY2snO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHNlbGYuZmFkZUluRGF0YS5hbmltUmVxSUQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gZmFkZSh0aW1lKSB7XG4gICAgICAgIGxldCB0aW1lRnJhY3Rpb24gPSAodGltZSAtIHN0YXJ0KSAvIGR1cmF0aW9uO1xuICAgICAgICBsZXQgcHJvZ3Jlc3MgPSBNYXRoLm1pbih0aW1lRnJhY3Rpb24sIDEpO1xuXG4gICAgICAgIGVsLnN0eWxlLm9wYWNpdHkgPSBkZWZhdWx0T3BhY2l0eSArIChmaW5hbE9wYWNpdHkgLSBkZWZhdWx0T3BhY2l0eSkgKiBwcm9ncmVzcztcblxuICAgICAgICBpZiAoK2VsLnN0eWxlLm9wYWNpdHkgPCBmaW5hbE9wYWNpdHkpIHtcbiAgICAgICAgICBzZWxmLmZhZGVJbkRhdGEuYW5pbVJlcUlEID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZhZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2lzLWZhZGUtaW4tZG9uZScpO1xuICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWZhZGUtb3V0LWRvbmUnKTtcbiAgICAgICAgICBzZWxmLmlzRmFkZUluID0gZmFsc2U7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgICAgY2FuY2VsbGF0aW9uVG9rZW4ucmVnaXN0ZXIocmVqZWN0KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmYWRlT3V0KGVsLCBkdXJhdGlvbiA9IDIwMDAsIGNhbmNlbGxhdGlvblRva2VuID0gbnVsbCkge1xuICAgIHRoaXMuaXNGYWRlT3V0ID0gdHJ1ZTtcbiAgICBjb25zdCBkZWZhdWx0T3BhY2l0eSA9IHBhcnNlRmxvYXQod2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpLm9wYWNpdHkpO1xuICAgIGNvbnN0IGZpbmFsT3BhY2l0eSA9IDA7XG4gICAgY29uc3Qgc3RhcnQgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBzZWxmLmZhZGVPdXREYXRhLmFuaW1SZXFJRCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiBmYWRlKHRpbWUpIHtcbiAgICAgICAgbGV0IHRpbWVGcmFjdGlvbiA9ICh0aW1lIC0gc3RhcnQpIC8gZHVyYXRpb247XG4gICAgICAgIGxldCBwcm9ncmVzcyA9IE1hdGgubWluKHRpbWVGcmFjdGlvbiwgMSk7XG5cbiAgICAgICAgZWwuc3R5bGUub3BhY2l0eSA9IGRlZmF1bHRPcGFjaXR5IC0gZGVmYXVsdE9wYWNpdHkgKiBwcm9ncmVzcztcblxuICAgICAgICBpZiAoK2VsLnN0eWxlLm9wYWNpdHkgPiBmaW5hbE9wYWNpdHkpIHtcbiAgICAgICAgICBzZWxmLmZhZGVPdXREYXRhLmFuaW1SZXFJRCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShmYWRlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2lzLWZhZGUtb3V0LWRvbmUnKTtcbiAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1mYWRlLWluLWRvbmUnKTtcbiAgICAgICAgICBzZWxmLmlzRmFkZU91dCA9IGZhbHNlO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICAgIGNhbmNlbGxhdGlvblRva2VuLnJlZ2lzdGVyKHJlamVjdCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgY2xlYXJGYWRlSW4oKSB7XG4gICAgdGhpcy5mYWRlSW5EYXRhLmNhbmNlbFRva2VuID0gbnVsbDtcbiAgICB0aGlzLmZhZGVJbkRhdGEuYW5pbVJlcUlEID0gbnVsbDtcbiAgfVxuXG4gIGNsZWFyRmFkZU91dCgpIHtcbiAgICB0aGlzLmZhZGVPdXREYXRhLmNhbmNlbFRva2VuID0gbnVsbDtcbiAgICB0aGlzLmZhZGVPdXREYXRhLmFuaW1SZXFJRCA9IG51bGw7XG4gIH1cblxuICBjYW5jZWxGYWRlSW4oKSB7XG4gICAgaWYgKG51bGwgIT09IHRoaXMuZmFkZUluRGF0YS5jYW5jZWxUb2tlbikge1xuICAgICAgdGhpcy5mYWRlSW5EYXRhLmNhbmNlbFRva2VuLmNhbmNlbCgpO1xuICAgICAgdGhpcy5mYWRlSW5EYXRhLmNhbmNlbFRva2VuID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAobnVsbCAhPT0gdGhpcy5mYWRlSW5EYXRhLmFuaW1SZXFJRCkge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5mYWRlSW5EYXRhLmFuaW1SZXFJRCk7XG4gICAgICB0aGlzLmZhZGVJbkRhdGEuYW5pbVJlcUlEID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0ZhZGVJbiAmJiBudWxsID09IHRoaXMuZmFkZUluRGF0YS5jYW5jZWxUb2tlbiAmJiBudWxsID09IHRoaXMuZmFkZUluRGF0YS5hbmltUmVxSUQpIHtcbiAgICAgIHRoaXMuaXNGYWRlSW4gPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBjYW5jZWxGYWRlT3V0KCkge1xuICAgIGlmIChudWxsICE9PSB0aGlzLmZhZGVPdXREYXRhLmNhbmNlbFRva2VuKSB7XG4gICAgICB0aGlzLmZhZGVPdXREYXRhLmNhbmNlbFRva2VuLmNhbmNlbCgpO1xuICAgICAgdGhpcy5mYWRlT3V0RGF0YS5jYW5jZWxUb2tlbiA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKG51bGwgIT09IHRoaXMuZmFkZU91dERhdGEuYW5pbVJlcUlEKSB7XG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmZhZGVPdXREYXRhLmFuaW1SZXFJRCk7XG4gICAgICB0aGlzLmZhZGVPdXREYXRhLmFuaW1SZXFJRCA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNGYWRlT3V0ICYmIG51bGwgPT0gdGhpcy5mYWRlT3V0RGF0YS5jYW5jZWxUb2tlbiAmJiBudWxsID09IHRoaXMuZmFkZU91dERhdGEuYW5pbVJlcUlEKSB7XG4gICAgICB0aGlzLmlzRmFkZU91dCA9IGZhbHNlO1xuICAgIH1cbiAgfVxufVxuIl0sIm5hbWVzIjpbIkNhbmNlbGxhdGlvblRva2VuIiwicGFyZW50VG9rZW4iLCJjYW5jZWxsYXRpb25Qcm9taXNlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJjYW5jZWwiLCJlIiwiaXNDYW5jZWxsYXRpb25SZXF1ZXN0ZWQiLCJlcnIiLCJFcnJvciIsImNhbmNlbGxlZCIsInJlZ2lzdGVyIiwiY2FsbGJhY2siLCJ0aGVuIiwiU2NzYXZlciIsIndhaXRUaW1lIiwiZXZlbnRzIiwiZG9JbnRlcnZhbCIsInNob3dGYWRlVGltZSIsImhpZGVGYWRlVGltZSIsImF1dG9TdGFydCIsInByb2dyZXNzQmFyIiwicHJvZ3Jlc3NCYXJQYXJlbnQiLCJvbiIsImRlYnVnIiwiRGVmYXVsdCIsIlN5bWJvbCIsIldhaXQiLCJTaG93IiwiU2hvd0ZhZGVJbkNvbXBsZXRlIiwiSGlkZSIsIkhpZGVGYWRlT3V0IiwiRGlzYWJsZWQiLCJFbmFibGVkIiwic3RhdGVzIiwid3JhcHBlckVsZW1lbnQiLCJiYXJFbGVtZW50IiwicHJvZ3Jlc3MiLCJhbmltUmVxSUQiLCJjYW5jZWxUb2tlbiIsInNldHRpbmdzIiwiX29iamVjdFNwcmVhZCIsImRlZmF1bHRzIiwic2VsZWN0b3IiLCJzY3NhdmVyIiwiaW5pdCIsImV2ZW50IiwiZWxlbWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJiaW5kIiwiaW5pdEVsZW1lbnQiLCJpbml0U3RhdGVFdmVudCIsImluaXRBZGRFdmVudHMiLCJpbml0UHJvZ3Jlc3NCYXIiLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJzdGFydCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInN0YXRlRXZlbnROYW1lIiwiZXZlbnRQcmVmaXgiLCJzZWxmIiwic3RhdGVDb250cm9sbGVyIiwiZGV0YWlsIiwiYmVmb3JlU3RhdGUiLCJjdXJyZW50U3RhdGUiLCJrZXkiLCJzdGF0ZSIsIndhaXRTdGF0ZSIsInNob3dTdGF0ZSIsImhpZGVTdGF0ZSIsIkhpZGVGYWRlT3V0Q29tcGxldGUiLCJkaXNhYmxlZFN0YXRlIiwiZW5hYmxlZFN0YXRlIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsInN0eWxlIiwiZGlzcGxheSIsInByb2dyZXNzQmciLCJpZCIsImFwcGVuZENoaWxkIiwicHJvZ3Jlc3NCYXJQYXJlbnRFbG0iLCJib2R5IiwicmVnaXN0ZXJEb2luZyIsIndhaXQiLCJmb3JFYWNoIiwid2luZG93IiwiaW50ZXJ2YWxEb2luZyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJwZXJmb3JtYW5jZSIsIm5vdyIsImxhc3RFdmVudE5vdyIsImRvaW5nIiwiY2FuY2VsV2FpdCIsImNhbmNlbEZhZGVJbiIsImhpZGUiLCJpc0hpZGRlbiIsImNoYW5nZVN0YXRlIiwidW5yZWdpc3RlckRvaW5nIiwiaXNTaG93aW5nIiwiZmFkZU91dCIsImlzV2FpdGluZyIsIndhaXRTdGF0ZUNhbmNlbFRva2VuIiwid2FpdGluZyIsInNob3ciLCJjb25zb2xlIiwibG9nIiwiZmFkZUluRGF0YSIsImZhZGVJbiIsImNsZWFyRmFkZUluIiwiZmFkZU91dERhdGEiLCJjbGVhckZhZGVPdXQiLCJ3YWl0aW5nQW5pbUlEIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJkaXNhYmxlZFByb2dyZXNzQmFyIiwiY2FuY2VsbGF0aW9uVG9rZW4iLCJkZWZhdWx0VmFsdWUiLCJmaW5hbFZhbHVlIiwiZW5hYmxlZFByb2dyZXNzQmFyIiwicmVtb3ZlIiwid2lkdGgiLCJyZWplY3QiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ3YWl0aW5nUHJvZ3Jlc3MiLCJ0aW1lIiwidGltZUZyYWN0aW9uIiwiTWF0aCIsIm1pbiIsImVsIiwiZHVyYXRpb24iLCJpc0ZhZGVJbiIsImRlZmF1bHRPcGFjaXR5IiwicGFyc2VGbG9hdCIsImdldENvbXB1dGVkU3R5bGUiLCJvcGFjaXR5IiwiZmluYWxPcGFjaXR5IiwiZmFkZSIsImlzRmFkZU91dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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
