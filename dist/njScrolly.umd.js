(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.njScrolly = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
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
    return Constructor;
  }

  var njScrolly =
  /*#__PURE__*/
  function () {
    //options
    function njScrolly(opts) {
      _classCallCheck(this, njScrolly);

      this.init(opts);
    }

    _createClass(njScrolly, [{
      key: "init",
      value: function init(opts) {
        // fixes weird safari 10 bug where preventDefault is prevented
        // @see https://github.com/metafizzy/flickity/issues/457#issuecomment-254501356
        if (!window) {
          return;
        }

        window.addEventListener('touchmove', function () {});
        this.els = {};
        this.moveStarted;
        this.initialX;
        this.initialScrollLeft;
        this.currentX;
        this.handlers = {};
        var options = {};

        if (typeof opts === 'string') {
          options.el = opts;
        } else if (_typeof(opts) === 'object') {
          if (opts instanceof Element) {
            options.el = opts;
          } else if (opts[0] && opts[0] instanceof Element) {
            options.el = opts[0];
          } else {
            options = opts;
          }
        }

        this.o = Object.assign({}, _defaults$1, options);
        var gatherResults = this.gatherElements();

        if (gatherResults === false) {
          return;
        }

        this.addListeners();
      }
    }, {
      key: "gatherElements",
      value: function gatherElements() {
        this.els = {};

        if (typeof this.o.el === 'string') {
          this.els.wrap = document.querySelector(this.o.el);
        } else if (this.o.el) {
          this.els.wrap = this.o.el;
        }

        if (!this.els.wrap) {
          console.error('njScrolly: source (o.el) not found.');
          return false;
        }
      }
    }, {
      key: "addListeners",
      value: function addListeners() {
        var _this = this;

        this.els.wrap.addEventListener('mousedown', this.handlers.mousedown = function (e) {
          if (!_this.closest(e.target, _this.els.wrap)) {
            //move only inside wrap component
            return;
          }

          _this.moveStarted = true;
          _this.initialX = e.pageX;
          _this.currentX = e.pageX;
          _this.initialScrollLeft = _this.els.wrap.scrollLeft;
          e.preventDefault();

          _this.startMoveListen();
        });
      }
    }, {
      key: "startMoveListen",
      value: function startMoveListen() {
        var _this2 = this;

        if (this.moveHandlers) return;
        document.addEventListener('mousemove', this.handlers.mousemove = function (e) {
          if (!_this2.moveStarted) {
            return;
          }

          if (typeof e.buttons === 'number' && e.buttons === 0) {
            stopMove();
            return;
          }

          _this2.currentX = e.pageX;
          _this2.diff = _this2.initialX - _this2.currentX;
          _this2.els.wrap.scrollLeft = _this2.initialScrollLeft + _this2.diff;
        });
        document.addEventListener('mouseup', this.handlers.mouseup = function (e) {
          if (_this2.o.fixLinks) {
            //try to prevent default link(a tag)
            document.addEventListener('click', _this2.handlers.dragclick = function (e) {
              if (!e.target.tagName.toUpperCase() === 'A') return;
              if (!_this2.closest(e.target, _this2.els.wrap)) return;
              e.preventDefault();
              document.removeEventListener('click', _this2.handlers.dragclick);
              delete _this2.handlers.dragclick;
            }); //wait 50ms for click event to prevent link href behaviour

            setTimeout(function () {
              document.removeEventListener('click', _this2.handlers.dragclick);
              delete _this2.handlers.dragclick;
            }, 50);
          }

          stopMove();
        });

        var stopMove = function stopMove() {
          if (!_this2.moveStarted) return;
          _this2.initialX = null;
          _this2.currentX = null;
          _this2.diff = null;
          _this2.initialScrollLeft = null;
          _this2.moveStarted = false;

          _this2.stopMoveListen();
        };

        this.moveHandlers = true;
      }
    }, {
      key: "stopMoveListen",
      value: function stopMoveListen() {
        document.removeEventListener('mousemove', this.handlers.mousemove);
        delete this.handlers.mousemove;
        document.removeEventListener('mouseup', this.handlers.mouseup);
        delete this.handlers.mouseup;
        this.moveHandlers = false;
      }
    }, {
      key: "removeListeners",
      value: function removeListeners() {
        this.stopMoveListen();
        this.els.wrap.addEventListener('mousedown', this.handlers.mousedown);
        delete this.handlers.mousedown;

        if (this.handlers.dragclick) {
          document.removeEventListener('click', this.handlers.dragclick);
          delete this.handlers.dragclick;
        }
      }
    }, {
      key: "closest",
      value: function closest(el, target) {
        if (!el || !target) return;
        var current = el;

        do {
          if (current === target) {
            return true;
          }

          current = current.parentNode;
        } while (current.parentNode);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.removeListeners();
      }
    }]);

    return njScrolly;
  }();
  var _defaults$1 = {
    el: undefined,
    fixLinks: true
  };

  return njScrolly;

})));
