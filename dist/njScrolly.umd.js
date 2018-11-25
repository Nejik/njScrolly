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
          if (Math.abs(_this2.diff) > _this2.o.minDiff && _this2.o.fixLinks) {
            //try to prevent default link(a tag)
            document.addEventListener('click', _this2.handlers.dragclick = function (e) {
              if (!e.target.tagName.toUpperCase() === 'A') return;
              if (!_this2.closest(e.target, _this2.els.wrap)) return;
              e.preventDefault();
              document.removeEventListener('click', _this2.handlers.dragclick);
              delete _this2.handlers.dragclick;
            }); //wait 50ms for click event to prevent link href behaviour

            setTimeout(function () {
              if (!_this2.handlers.dragclick) return;
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
    fixLinks: true,
    minDiff: 5
  };

  return njScrolly;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmpTY3JvbGx5LnVtZC5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgbmpTY3JvbGx5IHtcclxuXHQvL29wdGlvbnNcclxuXHRjb25zdHJ1Y3RvcihvcHRzKSB7XHJcblxyXG5cdFx0dGhpcy5pbml0KG9wdHMpO1xyXG5cdH1cclxuXHRpbml0KG9wdHMpIHtcclxuXHRcdC8vIGZpeGVzIHdlaXJkIHNhZmFyaSAxMCBidWcgd2hlcmUgcHJldmVudERlZmF1bHQgaXMgcHJldmVudGVkXHJcblx0XHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tZXRhZml6enkvZmxpY2tpdHkvaXNzdWVzLzQ1NyNpc3N1ZWNvbW1lbnQtMjU0NTAxMzU2XHJcblx0XHRpZiAoIXdpbmRvdykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgZnVuY3Rpb24gKCkge30pO1xyXG5cclxuXHRcdHRoaXMuZWxzID0ge307XHJcblx0XHR0aGlzLm1vdmVTdGFydGVkO1xyXG5cdFx0dGhpcy5pbml0aWFsWDtcclxuXHRcdHRoaXMuaW5pdGlhbFNjcm9sbExlZnQ7XHJcblx0XHR0aGlzLmN1cnJlbnRYO1xyXG5cclxuXHRcdHRoaXMuaGFuZGxlcnMgPSB7fTtcclxuXHJcblx0XHRsZXQgb3B0aW9ucyA9IHt9O1xyXG5cdFx0aWYgKHR5cGVvZiBvcHRzID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRvcHRpb25zLmVsID0gb3B0cztcclxuXHRcdH0gZWxzZSBpZiAodHlwZW9mIG9wdHMgPT09ICdvYmplY3QnKSB7XHJcblx0XHRcdGlmIChvcHRzIGluc3RhbmNlb2YgRWxlbWVudCkge1xyXG5cdFx0XHRcdG9wdGlvbnMuZWwgPSBvcHRzO1xyXG5cdFx0XHR9IGVsc2UgaWYgKG9wdHNbMF0gJiYgb3B0c1swXSBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcclxuXHRcdFx0XHRvcHRpb25zLmVsID0gb3B0c1swXTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRvcHRpb25zID0gb3B0cztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMubyA9IE9iamVjdC5hc3NpZ24oe30sIF9kZWZhdWx0cywgb3B0aW9ucyk7XHJcblx0XHRjb25zdCBnYXRoZXJSZXN1bHRzID0gdGhpcy5nYXRoZXJFbGVtZW50cygpO1xyXG5cdFx0aWYgKGdhdGhlclJlc3VsdHMgPT09IGZhbHNlKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmFkZExpc3RlbmVycygpO1xyXG5cdH1cclxuXHJcblx0Z2F0aGVyRWxlbWVudHMoKSB7XHJcblx0XHR0aGlzLmVscyA9IHt9O1xyXG5cclxuXHRcdGlmICh0eXBlb2YgdGhpcy5vLmVsID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aGlzLmVscy53cmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLm8uZWwpXHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuby5lbCkge1xyXG5cdFx0XHR0aGlzLmVscy53cmFwID0gdGhpcy5vLmVsO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCF0aGlzLmVscy53cmFwKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ25qU2Nyb2xseTogc291cmNlIChvLmVsKSBub3QgZm91bmQuJyk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9XHJcblx0YWRkTGlzdGVuZXJzKCkge1xyXG5cdFx0dGhpcy5lbHMud3JhcC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZXJzLm1vdXNlZG93biA9IChlKSA9PiB7XHJcblx0XHRcdGlmICghdGhpcy5jbG9zZXN0KGUudGFyZ2V0LCB0aGlzLmVscy53cmFwKSkge1xyXG5cdFx0XHRcdC8vbW92ZSBvbmx5IGluc2lkZSB3cmFwIGNvbXBvbmVudFxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5tb3ZlU3RhcnRlZCA9IHRydWU7XHJcblx0XHRcdHRoaXMuaW5pdGlhbFggPSBlLnBhZ2VYO1xyXG5cdFx0XHR0aGlzLmN1cnJlbnRYID0gZS5wYWdlWDtcclxuXHRcdFx0dGhpcy5pbml0aWFsU2Nyb2xsTGVmdCA9IHRoaXMuZWxzLndyYXAuc2Nyb2xsTGVmdDtcclxuXHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdHRoaXMuc3RhcnRNb3ZlTGlzdGVuKCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblx0c3RhcnRNb3ZlTGlzdGVuKCkge1xyXG5cdFx0aWYgKHRoaXMubW92ZUhhbmRsZXJzKSByZXR1cm47XHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZXJzLm1vdXNlbW92ZSA9IChlKSA9PiB7XHJcblx0XHRcdGlmICghdGhpcy5tb3ZlU3RhcnRlZCkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHR5cGVvZiBlLmJ1dHRvbnMgPT09ICdudW1iZXInICYmIGUuYnV0dG9ucyA9PT0gMCkge1xyXG5cdFx0XHRcdHN0b3BNb3ZlKCk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmN1cnJlbnRYID0gZS5wYWdlWDtcclxuXHRcdFx0dGhpcy5kaWZmID0gdGhpcy5pbml0aWFsWCAtIHRoaXMuY3VycmVudFg7XHJcblx0XHRcdHRoaXMuZWxzLndyYXAuc2Nyb2xsTGVmdCA9IHRoaXMuaW5pdGlhbFNjcm9sbExlZnQgKyB0aGlzLmRpZmY7XHJcblx0XHR9KTtcclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVycy5tb3VzZXVwID0gKGUpID0+IHtcclxuXHRcdFx0XHJcblx0XHRcdGlmIChNYXRoLmFicyh0aGlzLmRpZmYpID4gdGhpcy5vLm1pbkRpZmYgJiYgdGhpcy5vLmZpeExpbmtzKSB7XHJcblx0XHRcdFx0Ly90cnkgdG8gcHJldmVudCBkZWZhdWx0IGxpbmsoYSB0YWcpXHJcblx0XHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZXJzLmRyYWdjbGljayA9IChlKSA9PiB7XHJcblx0XHRcdFx0XHRpZiAoIWUudGFyZ2V0LnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gJ0EnKSByZXR1cm47XHJcblx0XHRcdFx0XHRpZiAoIXRoaXMuY2xvc2VzdChlLnRhcmdldCwgdGhpcy5lbHMud3JhcCkpIHJldHVybjtcclxuXHJcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlcnMuZHJhZ2NsaWNrKTtcclxuXHRcdFx0XHRcdGRlbGV0ZSB0aGlzLmhhbmRsZXJzLmRyYWdjbGljaztcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0Ly93YWl0IDUwbXMgZm9yIGNsaWNrIGV2ZW50IHRvIHByZXZlbnQgbGluayBocmVmIGJlaGF2aW91clxyXG5cdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdFx0aWYoIXRoaXMuaGFuZGxlcnMuZHJhZ2NsaWNrKSByZXR1cm47XHJcblx0XHRcdFx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlcnMuZHJhZ2NsaWNrKTtcclxuXHRcdFx0XHRcdGRlbGV0ZSB0aGlzLmhhbmRsZXJzLmRyYWdjbGljaztcclxuXHRcdFx0XHR9LCA1MCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHN0b3BNb3ZlKCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRjb25zdCBzdG9wTW92ZSA9ICgpID0+IHtcclxuXHRcdFx0aWYgKCF0aGlzLm1vdmVTdGFydGVkKSByZXR1cm47XHJcblx0XHRcdHRoaXMuaW5pdGlhbFggPSBudWxsO1xyXG5cdFx0XHR0aGlzLmN1cnJlbnRYID0gbnVsbFxyXG5cdFx0XHR0aGlzLmRpZmYgPSBudWxsO1xyXG5cdFx0XHR0aGlzLmluaXRpYWxTY3JvbGxMZWZ0ID0gbnVsbDtcclxuXHJcblx0XHRcdHRoaXMubW92ZVN0YXJ0ZWQgPSBmYWxzZTtcclxuXHJcblx0XHRcdHRoaXMuc3RvcE1vdmVMaXN0ZW4oKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLm1vdmVIYW5kbGVycyA9IHRydWU7XHJcblx0fVxyXG5cdHN0b3BNb3ZlTGlzdGVuKCkge1xyXG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVycy5tb3VzZW1vdmUpXHJcblx0XHRkZWxldGUgdGhpcy5oYW5kbGVycy5tb3VzZW1vdmU7XHJcblx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVycy5tb3VzZXVwKVxyXG5cdFx0ZGVsZXRlIHRoaXMuaGFuZGxlcnMubW91c2V1cDtcclxuXHJcblx0XHR0aGlzLm1vdmVIYW5kbGVycyA9IGZhbHNlO1xyXG5cdH1cclxuXHRyZW1vdmVMaXN0ZW5lcnMoKSB7XHJcblx0XHR0aGlzLnN0b3BNb3ZlTGlzdGVuKCk7XHJcblxyXG5cdFx0dGhpcy5lbHMud3JhcC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZXJzLm1vdXNlZG93bik7XHJcblx0XHRkZWxldGUgdGhpcy5oYW5kbGVycy5tb3VzZWRvd247XHJcblxyXG5cdFx0aWYgKHRoaXMuaGFuZGxlcnMuZHJhZ2NsaWNrKSB7XHJcblx0XHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVycy5kcmFnY2xpY2spO1xyXG5cdFx0XHRkZWxldGUgdGhpcy5oYW5kbGVycy5kcmFnY2xpY2s7XHJcblx0XHR9XHJcblx0fVxyXG5cdGNsb3Nlc3QoZWwsIHRhcmdldCkge1xyXG5cdFx0aWYgKCFlbCB8fCAhdGFyZ2V0KSByZXR1cm47XHJcblx0XHRsZXQgY3VycmVudCA9IGVsO1xyXG5cdFx0ZG8ge1xyXG5cdFx0XHRpZiAoY3VycmVudCA9PT0gdGFyZ2V0KSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWVcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y3VycmVudCA9IGN1cnJlbnQucGFyZW50Tm9kZVxyXG5cdFx0fSB3aGlsZSAoY3VycmVudC5wYXJlbnROb2RlKTtcclxuXHR9XHJcblx0ZGVzdHJveSgpIHtcclxuXHJcblx0XHR0aGlzLnJlbW92ZUxpc3RlbmVycygpO1xyXG5cdH1cclxufVxyXG5cclxuY29uc3QgX2RlZmF1bHRzID0ge1xyXG5cdGVsOiB1bmRlZmluZWQsXHJcblx0Zml4TGlua3M6IHRydWUsXHJcblx0bWluRGlmZjogNVxyXG59Il0sIm5hbWVzIjpbIm5qU2Nyb2xseSIsIm9wdHMiLCJpbml0Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImVscyIsIm1vdmVTdGFydGVkIiwiaW5pdGlhbFgiLCJpbml0aWFsU2Nyb2xsTGVmdCIsImN1cnJlbnRYIiwiaGFuZGxlcnMiLCJvcHRpb25zIiwiZWwiLCJFbGVtZW50IiwibyIsIk9iamVjdCIsImFzc2lnbiIsIl9kZWZhdWx0cyIsImdhdGhlclJlc3VsdHMiLCJnYXRoZXJFbGVtZW50cyIsImFkZExpc3RlbmVycyIsIndyYXAiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjb25zb2xlIiwiZXJyb3IiLCJtb3VzZWRvd24iLCJlIiwiY2xvc2VzdCIsInRhcmdldCIsInBhZ2VYIiwic2Nyb2xsTGVmdCIsInByZXZlbnREZWZhdWx0Iiwic3RhcnRNb3ZlTGlzdGVuIiwibW92ZUhhbmRsZXJzIiwibW91c2Vtb3ZlIiwiYnV0dG9ucyIsInN0b3BNb3ZlIiwiZGlmZiIsIm1vdXNldXAiLCJNYXRoIiwiYWJzIiwibWluRGlmZiIsImZpeExpbmtzIiwiZHJhZ2NsaWNrIiwidGFnTmFtZSIsInRvVXBwZXJDYXNlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInNldFRpbWVvdXQiLCJzdG9wTW92ZUxpc3RlbiIsImN1cnJlbnQiLCJwYXJlbnROb2RlIiwicmVtb3ZlTGlzdGVuZXJzIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFBcUJBOzs7RUFDcEI7RUFDQSxxQkFBWUMsSUFBWixFQUFrQjtFQUFBOztFQUVqQixTQUFLQyxJQUFMLENBQVVELElBQVY7RUFDQTs7OzsyQkFDSUEsTUFBTTtFQUNWO0VBQ0E7RUFDQSxVQUFJLENBQUNFLE1BQUwsRUFBYTtFQUNaO0VBQ0E7O0VBQ0RBLE1BQUFBLE1BQU0sQ0FBQ0MsZ0JBQVAsQ0FBd0IsV0FBeEIsRUFBcUMsWUFBWSxFQUFqRDtFQUVBLFdBQUtDLEdBQUwsR0FBVyxFQUFYO0VBQ0EsV0FBS0MsV0FBTDtFQUNBLFdBQUtDLFFBQUw7RUFDQSxXQUFLQyxpQkFBTDtFQUNBLFdBQUtDLFFBQUw7RUFFQSxXQUFLQyxRQUFMLEdBQWdCLEVBQWhCO0VBRUEsVUFBSUMsT0FBTyxHQUFHLEVBQWQ7O0VBQ0EsVUFBSSxPQUFPVixJQUFQLEtBQWdCLFFBQXBCLEVBQThCO0VBQzdCVSxRQUFBQSxPQUFPLENBQUNDLEVBQVIsR0FBYVgsSUFBYjtFQUNBLE9BRkQsTUFFTyxJQUFJLFFBQU9BLElBQVAsTUFBZ0IsUUFBcEIsRUFBOEI7RUFDcEMsWUFBSUEsSUFBSSxZQUFZWSxPQUFwQixFQUE2QjtFQUM1QkYsVUFBQUEsT0FBTyxDQUFDQyxFQUFSLEdBQWFYLElBQWI7RUFDQSxTQUZELE1BRU8sSUFBSUEsSUFBSSxDQUFDLENBQUQsQ0FBSixJQUFXQSxJQUFJLENBQUMsQ0FBRCxDQUFKLFlBQW1CWSxPQUFsQyxFQUEyQztFQUNqREYsVUFBQUEsT0FBTyxDQUFDQyxFQUFSLEdBQWFYLElBQUksQ0FBQyxDQUFELENBQWpCO0VBQ0EsU0FGTSxNQUVBO0VBQ05VLFVBQUFBLE9BQU8sR0FB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
