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
        this.moveStarted = false;
        this.initialX = null;
        this.initialScrollLeft = null;
        this.currentX = null;
        this.handlers = {};
        this.mouseMoveListenersAdded = false;
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
      key: "destroy",
      value: function destroy() {
        this.removeListeners();
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
      key: "addListeners",
      value: function addListeners() {
        var _this = this;

        this.els.wrap.addEventListener('mouseenter', this.handlers.wrapMouseenter = function (e) {
          _this.listenMove();
        });
        this.els.wrap.addEventListener('mouseleave', this.handlers.wrapMouseleave = function (e) {
          _this.unlistenMove();
        });
      }
    }, {
      key: "listenMove",
      value: function listenMove() {
        var _this2 = this;

        if (this.mouseMoveListenersAdded) return;
        document.addEventListener('mousedown', this.handlers.mousedown = function (e) {
          if (!_this2.closest(e.target, _this2.els.wrap)) {
            //move only inside wrap component
            return;
          }

          _this2.moveStarted = true;
          _this2.initialX = e.pageX;
          _this2.currentX = e.pageX;
          _this2.initialScrollLeft = _this2.els.wrap.scrollLeft;
          e.preventDefault();
          e.stopPropagation();
        });
        document.addEventListener('mousemove', this.handlers.mousemove = function (e) {
          if (!_this2.moveStarted) {
            return;
          }

          if (typeof e.buttons === 'number' && e.buttons === 0) {
            stopMove();
            return;
          }

          _this2.currentX = e.pageX;
          _this2.x = _this2.initialX - _this2.currentX;
          _this2.els.wrap.scrollLeft = _this2.initialScrollLeft + _this2.x;
        });
        document.addEventListener('mouseup', this.handlers.mouseup = function (e) {
          stopMove();
        });

        var stopMove = function stopMove() {
          if (!_this2.moveStarted) return;
          _this2.initialX = null;
          _this2.currentX = null;
          _this2.x = null;
          _this2.initialScrollLeft = null;
          _this2.moveStarted = false;

          _this2.unlistenMove();
        };

        this.mouseMoveListenersAdded = true;
      }
    }, {
      key: "unlistenMove",
      value: function unlistenMove() {
        if (this.moveStarted) return;
        if (!this.mouseMoveListenersAdded) return;
        document.removeEventListener('mousedown', this.handlers.mousedown);
        delete this.handlers.mousedown;
        document.removeEventListener('mousemove', this.handlers.mousemove);
        delete this.handlers.mousemove;
        document.removeEventListener('mouseup', this.handlers.mouseup);
        delete this.handlers.mouseup;
        this.mouseMoveListenersAdded = false;
      }
    }, {
      key: "removeListeners",
      value: function removeListeners() {
        this.els.wrap.removeEventListener('mousedown', this.handlers.wrapMouseenter);
        delete this.handlers.wrapMouseenter;
        this.els.wrap.removeEventListener('mouseleave', this.handlers.wrapMouseleave);
        delete this.handlers.wrapMouseleave;
      }
    }]);

    return njScrolly;
  }();
  var _defaults$1 = {
    el: undefined
  };

  return njScrolly;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmpTY3JvbGx5LnVtZC5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgbmpTY3JvbGx5IHtcclxuXHQvL29wdGlvbnNcclxuXHRjb25zdHJ1Y3RvcihvcHRzKSB7XHJcblxyXG5cdFx0dGhpcy5pbml0KG9wdHMpO1xyXG5cdH1cclxuXHRpbml0KG9wdHMpIHtcclxuXHRcdC8vIGZpeGVzIHdlaXJkIHNhZmFyaSAxMCBidWcgd2hlcmUgcHJldmVudERlZmF1bHQgaXMgcHJldmVudGVkXHJcblx0XHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tZXRhZml6enkvZmxpY2tpdHkvaXNzdWVzLzQ1NyNpc3N1ZWNvbW1lbnQtMjU0NTAxMzU2XHJcblx0XHRpZiAoIXdpbmRvdykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgZnVuY3Rpb24gKCkge30pO1xyXG5cclxuXHRcdHRoaXMuZWxzID0ge307XHJcblx0XHR0aGlzLm1vdmVTdGFydGVkID0gZmFsc2U7XHJcblx0XHR0aGlzLmluaXRpYWxYID0gbnVsbDtcclxuXHRcdHRoaXMuaW5pdGlhbFNjcm9sbExlZnQgPSBudWxsO1xyXG5cdFx0dGhpcy5jdXJyZW50WCA9IG51bGw7XHJcblxyXG5cdFx0dGhpcy5oYW5kbGVycyA9IHt9O1xyXG5cdFx0dGhpcy5tb3VzZU1vdmVMaXN0ZW5lcnNBZGRlZCA9IGZhbHNlO1xyXG5cclxuXHRcdGxldCBvcHRpb25zID0ge307XHJcblx0XHRpZiAodHlwZW9mIG9wdHMgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdG9wdGlvbnMuZWwgPSBvcHRzO1xyXG5cdFx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0cyA9PT0gJ29iamVjdCcpIHtcclxuXHRcdFx0aWYgKG9wdHMgaW5zdGFuY2VvZiBFbGVtZW50KSB7XHJcblx0XHRcdFx0b3B0aW9ucy5lbCA9IG9wdHM7XHJcblx0XHRcdH0gZWxzZSBpZiAob3B0c1swXSAmJiBvcHRzWzBdIGluc3RhbmNlb2YgRWxlbWVudCkge1xyXG5cdFx0XHRcdG9wdGlvbnMuZWwgPSBvcHRzWzBdO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdG9wdGlvbnMgPSBvcHRzO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5vID0gT2JqZWN0LmFzc2lnbih7fSwgX2RlZmF1bHRzLCBvcHRpb25zKTtcclxuXHRcdGNvbnN0IGdhdGhlclJlc3VsdHMgPSB0aGlzLmdhdGhlckVsZW1lbnRzKCk7XHJcblx0XHRpZiAoZ2F0aGVyUmVzdWx0cyA9PT0gZmFsc2UpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuYWRkTGlzdGVuZXJzKCk7XHJcblx0fVxyXG5cdGRlc3Ryb3koKSB7XHJcblxyXG5cdFx0dGhpcy5yZW1vdmVMaXN0ZW5lcnMoKTtcclxuXHR9XHJcblx0Z2F0aGVyRWxlbWVudHMoKSB7XHJcblx0XHR0aGlzLmVscyA9IHt9O1xyXG5cclxuXHRcdGlmICh0eXBlb2YgdGhpcy5vLmVsID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aGlzLmVscy53cmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLm8uZWwpXHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuby5lbCkge1xyXG5cdFx0XHR0aGlzLmVscy53cmFwID0gdGhpcy5vLmVsO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCF0aGlzLmVscy53cmFwKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ25qU2Nyb2xseTogc291cmNlIChvLmVsKSBub3QgZm91bmQuJyk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9XHJcblx0Y2xvc2VzdChlbCwgdGFyZ2V0KSB7XHJcblx0XHRpZiAoIWVsIHx8ICF0YXJnZXQpIHJldHVybjtcclxuXHRcdGxldCBjdXJyZW50ID0gZWw7XHJcblx0XHRkbyB7XHJcblx0XHRcdGlmIChjdXJyZW50ID09PSB0YXJnZXQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjdXJyZW50ID0gY3VycmVudC5wYXJlbnROb2RlXHJcblx0XHR9IHdoaWxlIChjdXJyZW50LnBhcmVudE5vZGUpO1xyXG5cdH1cclxuXHRhZGRMaXN0ZW5lcnMoKSB7XHJcblx0XHR0aGlzLmVscy53cmFwLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLmhhbmRsZXJzLndyYXBNb3VzZWVudGVyID0gKGUpID0+IHtcclxuXHRcdFx0dGhpcy5saXN0ZW5Nb3ZlKCk7XHJcblx0XHR9KVxyXG5cdFx0dGhpcy5lbHMud3JhcC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5oYW5kbGVycy53cmFwTW91c2VsZWF2ZSA9IChlKSA9PiB7XHJcblx0XHRcdHRoaXMudW5saXN0ZW5Nb3ZlKCk7XHJcblx0XHR9KVxyXG5cdH1cclxuXHRsaXN0ZW5Nb3ZlKCkge1xyXG5cdFx0aWYgKHRoaXMubW91c2VNb3ZlTGlzdGVuZXJzQWRkZWQpIHJldHVybjtcclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlcnMubW91c2Vkb3duID0gKGUpID0+IHtcclxuXHRcdFx0aWYgKCF0aGlzLmNsb3Nlc3QoZS50YXJnZXQsIHRoaXMuZWxzLndyYXApKSB7XHJcblx0XHRcdFx0Ly9tb3ZlIG9ubHkgaW5zaWRlIHdyYXAgY29tcG9uZW50XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMubW92ZVN0YXJ0ZWQgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLmluaXRpYWxYID0gZS5wYWdlWDtcclxuXHRcdFx0dGhpcy5jdXJyZW50WCA9IGUucGFnZVg7XHJcblx0XHRcdHRoaXMuaW5pdGlhbFNjcm9sbExlZnQgPSB0aGlzLmVscy53cmFwLnNjcm9sbExlZnQ7XHJcblxyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZXJzLm1vdXNlbW92ZSA9IChlKSA9PiB7XHJcblx0XHRcdGlmICghdGhpcy5tb3ZlU3RhcnRlZCkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0aWYgKHR5cGVvZiBlLmJ1dHRvbnMgPT09ICdudW1iZXInICYmIGUuYnV0dG9ucyA9PT0gMCkge1xyXG5cdFx0XHRcdHN0b3BNb3ZlKCk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuY3VycmVudFggPSBlLnBhZ2VYO1xyXG5cdFx0XHR0aGlzLnggPSB0aGlzLmluaXRpYWxYIC0gdGhpcy5jdXJyZW50WDtcclxuXHRcdFx0dGhpcy5lbHMud3JhcC5zY3JvbGxMZWZ0ID0gdGhpcy5pbml0aWFsU2Nyb2xsTGVmdCArIHRoaXMueDtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZXJzLm1vdXNldXAgPSAoZSkgPT4ge1xyXG5cdFx0XHRzdG9wTW92ZSgpO1xyXG5cdFx0fSk7XHJcblx0XHRjb25zdCBzdG9wTW92ZSA9ICgpID0+IHtcclxuXHRcdFx0aWYgKCF0aGlzLm1vdmVTdGFydGVkKSByZXR1cm47XHJcblx0XHRcdHRoaXMuaW5pdGlhbFggPSBudWxsO1xyXG5cdFx0XHR0aGlzLmN1cnJlbnRYID0gbnVsbFxyXG5cdFx0XHR0aGlzLnggPSBudWxsO1xyXG5cdFx0XHR0aGlzLmluaXRpYWxTY3JvbGxMZWZ0ID0gbnVsbDtcclxuXHRcdFx0XHJcblx0XHRcdHRoaXMubW92ZVN0YXJ0ZWQgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy51bmxpc3Rlbk1vdmUoKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0dGhpcy5tb3VzZU1vdmVMaXN0ZW5lcnNBZGRlZCA9IHRydWU7XHJcblx0fVxyXG5cdHVubGlzdGVuTW92ZSgpIHtcclxuXHRcdGlmKHRoaXMubW92ZVN0YXJ0ZWQpIHJldHVybjtcclxuXHRcdGlmICghdGhpcy5tb3VzZU1vdmVMaXN0ZW5lcnNBZGRlZCkgcmV0dXJuO1xyXG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVycy5tb3VzZWRvd24pXHJcblx0XHRkZWxldGUgdGhpcy5oYW5kbGVycy5tb3VzZWRvd247XHJcblx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZXJzLm1vdXNlbW92ZSlcclxuXHRcdGRlbGV0ZSB0aGlzLmhhbmRsZXJzLm1vdXNlbW92ZTtcclxuXHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZXJzLm1vdXNldXApXHJcblx0XHRkZWxldGUgdGhpcy5oYW5kbGVycy5tb3VzZXVwO1xyXG5cdFx0dGhpcy5tb3VzZU1vdmVMaXN0ZW5lcnNBZGRlZCA9IGZhbHNlO1xyXG5cdH1cclxuXHRyZW1vdmVMaXN0ZW5lcnMoKSB7XHJcblx0XHR0aGlzLmVscy53cmFwLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlcnMud3JhcE1vdXNlZW50ZXIpXHJcblx0XHRkZWxldGUgdGhpcy5oYW5kbGVycy53cmFwTW91c2VlbnRlcjtcclxuXHRcdFxyXG5cdFx0dGhpcy5lbHMud3JhcC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5oYW5kbGVycy53cmFwTW91c2VsZWF2ZSlcclxuXHRcdGRlbGV0ZSB0aGlzLmhhbmRsZXJzLndyYXBNb3VzZWxlYXZlO1xyXG5cdH1cclxufVxyXG5cclxuY29uc3QgX2RlZmF1bHRzID0ge1xyXG5cdGVsOiB1bmRlZmluZWRcclxufSJdLCJuYW1lcyI6WyJualNjcm9sbHkiLCJvcHRzIiwiaW5pdCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJlbHMiLCJtb3ZlU3RhcnRlZCIsImluaXRpYWxYIiwiaW5pdGlhbFNjcm9sbExlZnQiLCJjdXJyZW50WCIsImhhbmRsZXJzIiwibW91c2VNb3ZlTGlzdGVuZXJzQWRkZWQiLCJvcHRpb25zIiwiZWwiLCJFbGVtZW50IiwibyIsIk9iamVjdCIsImFzc2lnbiIsIl9kZWZhdWx0cyIsImdhdGhlclJlc3VsdHMiLCJnYXRoZXJFbGVtZW50cyIsImFkZExpc3RlbmVycyIsInJlbW92ZUxpc3RlbmVycyIsIndyYXAiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjb25zb2xlIiwiZXJyb3IiLCJ0YXJnZXQiLCJjdXJyZW50IiwicGFyZW50Tm9kZSIsIndyYXBNb3VzZWVudGVyIiwiZSIsImxpc3Rlbk1vdmUiLCJ3cmFwTW91c2VsZWF2ZSIsInVubGlzdGVuTW92ZSIsIm1vdXNlZG93biIsImNsb3Nlc3QiLCJwYWdlWCIsInNjcm9sbExlZnQiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsIm1vdXNlbW92ZSIsImJ1dHRvbnMiLCJzdG9wTW92ZSIsIngiLCJtb3VzZXVwIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BQXFCQTs7O0VBQ3BCO0VBQ0EscUJBQVlDLElBQVosRUFBa0I7RUFBQTs7RUFFakIsU0FBS0MsSUFBTCxDQUFVRCxJQUFWO0VBQ0E7Ozs7MkJBQ0lBLE1BQU07RUFDVjtFQUNBO0VBQ0EsVUFBSSxDQUFDRSxNQUFMLEVBQWE7RUFDWjtFQUNBOztFQUNEQSxNQUFBQSxNQUFNLENBQUNDLGdCQUFQLENBQXdCLFdBQXhCLEVBQXFDLFlBQVksRUFBakQ7RUFFQSxXQUFLQyxHQUFMLEdBQVcsRUFBWDtFQUNBLFdBQUtDLFdBQUwsR0FBbUIsS0FBbkI7RUFDQSxXQUFLQyxRQUFMLEdBQWdCLElBQWhCO0VBQ0EsV0FBS0MsaUJBQUwsR0FBeUIsSUFBekI7RUFDQSxXQUFLQyxRQUFMLEdBQWdCLElBQWhCO0VBRUEsV0FBS0MsUUFBTCxHQUFnQixFQUFoQjtFQUNBLFdBQUtDLHVCQUFMLEdBQStCLEtBQS9CO0VBRUEsVUFBSUMsT0FBTyxHQUFHLEVBQWQ7O0VBQ0EsVUFBSSxPQUFPWCxJQUFQLEtBQWdCLFFBQXBCLEVBQThCO0VBQzdCVyxRQUFBQSxPQUFPLENBQUNDLEVBQVIsR0FBYVosSUFBYjtFQUNBLE9BRkQsTUFFTyxJQUFJLFFBQU9BLElBQVAsTUFBZ0IsUUFBcEIsRUFBOEI7RUFDcEMsWUFBSUEsSUFBSSxZQUFZYSxPQUFwQixFQUE2QjtFQUM1QkYsVUFBQUEsT0FBTyxDQUFDQyxFQUFSLEdBQWFaLElBQWI7RUFDQSxTQUZELE1BRU8sSUFBSUEsSUFBSSxDQUFDLENBQUQsQ0FBSixJQUFXQSxJQUFJLENBQUMsQ0FBRCxDQUFKLFlBQW1CYSxPQUFsQyxFQUEyQztFQUNqREYsVUFBQUEsT0FBTyxDQUFDQyxFQUFSLEdBQWFaLElBQUksQ0FBQyxDQUFELENBQWpCO0VBQ0EsU0FGTSxNQUVBO0VBQ05XLFVBQUFBLE9BQU8sR0FBR1gsSUFBVjtFQUNBO0VBQ0Q7O0VBRUQsV0FBS2MsQ0FBTCxHQUFTQyxNQUFNLENBQUNDLE1BQVAsQ0FBYyxFQUFkLEVBQWtCQyxXQUFsQixFQUE2Qk4sT0FBN0IsQ0FBVDtFQUNBLFVBQU1PLGFBQWEsR0FBRyxLQUFLQyxjQUFMLEVBQXRCOztFQUNBLFVBQUlELGFBQWEsS0FBSyxLQUF0QixFQUE2QjtFQUM1QjtFQUNBOztFQUVELFdBQUtFLFlBQUw7RUFDQTs7O2dDQUNTO0VBRVQsV0FBS0MsZUFBTDtFQUNBOzs7dUNBQ2dCO0VBQ2hCLFdBQUtqQixHQUFMLEdBQVcsRUFBWDs7RUFFQSxVQUFJLE9BQU8sS0FBS1UsQ0FBTCxDQUFPRixFQUFkLEtBQXFCLFFBQXpCLEVBQW1DO0VBQ2xDLGFBQUtSLEdBQUwsQ0FBU2tCLElBQVQsR0FBZ0JDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixLQUFLVixDQUFMLENBQU9GLEVBQTlCLENBQWhCO0VBQ0EsT0FGRCxNQUVPLElBQUksS0FBS0UsQ0FBTCxDQUFPRixFQUFYLEVBQWU7RUFDckIsYUFBS1IsR0FBTCxDQUFTa0IsSUFBVCxHQUFnQixLQUFLUixDQUFMLENBQU9GLEVBQXZCO0VBQ0E7O0VBQ0QsVUFBSSxDQUFDLEtBQUtSLEdBQUwsQ0FBU2tCLElBQWQsRUFBb0I7RUFDbkJHLFFBQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLHFDQUFkO0VBQ0EsZUFBTyxLQUFQO0VBQ0E7RUFDRDs7OzhCQUNPZCxJQUFJZSxRQUFRO0VBQ25CLFVBQUksQ0FBQ2YsRUFBRCxJQUFPLENBQUNlLE1BQVosRUFBb0I7RUFDcEIsVUFBSUMsT0FBTyxHQUFHaEIsRUFBZDs7RUFDQSxTQUFHO0VBQ0YsWUFBSWdCLE9BQU8sS0FBS0QsTUFBaEIsRUFBd0I7RUFDdkIsaUJBQU8sSUFBUDtFQUNBOztFQUVEQyxRQUFBQSxPQUFPLEdBQUdBLE9BQU8sQ0FBQ0MsVUFBbEI7RUFDQSxPQU5ELFFBTVNELE9BQU8sQ0FBQ0MsVUFOakI7RUFPQTs7O3FDQUNjO0VBQUE7O0VBQ2QsV0FBS3pCLEdBQUwsQ0FBU2tCLElBQVQsQ0FBY25CLGdCQUFkLENBQStCLFlBQS9CLEVBQTZDLEtBQUtNLFFBQUwsQ0FBY3FCLGNBQWQsR0FBK0IsVUFBQ0MsQ0FBRCxFQUFPO0VBQ2xGLFFBQUEsS0FBSSxDQUFDQyxVQUFMO0VBQ0EsT0FGRDtFQUdBLFdBQUs1QixHQUFMLENBQVNrQixJQUFULENBQWNuQixnQkFBZCxDQUErQixZQUEvQixFQUE2QyxLQUFLTSxRQUFMLENBQWN3QixjQUFkLEdBQStCLFVBQUNGLENBQUQsRUFBTztFQUNsRixRQUFBLEtBQUksQ0FBQ0csWUFBTDtFQUNBLE9BRkQ7RUFHQTs7O21DQUNZO0VBQUE7O0VBQ1osVUFBSSxLQUFLeEIsdUJBQVQsRUFBa0M7RUFDbENhLE1BQUFBLFFBQVEsQ0FBQ3BCLGdCQUFULENBQTBCLFdBQTFCLEVBQXVDLEtBQUtNLFFBQUwsQ0FBYzBCLFNBQWQsR0FBMEIsVUFBQ0osQ0FBRCxFQUFPO0VBQ3ZFLFlBQUksQ0FBQyxNQUFJLENBQUNLLE9BQUwsQ0FBYUwsQ0FBQyxDQUFDSixNQUFmLEVBQXVCLE1BQUksQ0FBQ3ZCLEdBQUwsQ0FBU2tCLElBQWhDLENBQUwsRUFBNEM7RUFDM0M7RUFDQTtFQUNBOztFQUNELFFBQUEsTUFBSSxDQUFDakIsV0FBTCxHQUFtQixJQUFuQjtFQUNBLFFBQUEsTUFBSSxDQUFDQyxRQUFMLEdBQWdCeUIsQ0FBQyxDQUFDTSxLQUFsQjtFQUNBLFFBQUEsTUFBSSxDQUFDN0IsUUFBTCxHQUFnQnVCLENBQUMsQ0FBQ00sS0FBbEI7RUFDQSxRQUFBLE1BQUksQ0FBQzlCLGlCQUFMLEdBQXlCLE1BQUksQ0FBQ0gsR0FBTCxDQUFTa0IsSUFBVCxDQUFjZ0IsVUFBdkM7RUFFQVAsUUFBQUEsQ0FBQyxDQUFDUSxjQUFGO0VBQ0FSLFFBQUFBLENBQUMsQ0FBQ1MsZUFBRjtFQUNBLE9BWkQ7RUFjQWpCLE1BQUFBLFFBQVEsQ0FBQ3BCLGdCQUFULENBQTBCLFdBQTFCLEVBQXVDLEtBQUtNLFFBQUwsQ0FBY2dDLFNBQWQsR0FBMEIsVUFBQ1YsQ0FBRCxFQUFPO0VBQ3ZFLFlBQUksQ0FBQyxNQUFJLENBQUMxQixXQUFWLEVBQXVCO0VBQ3RCO0VBQ0E7O0VBRUQsWUFBSSxPQUFPMEIsQ0FBQyxDQUFDVyxPQUFULEtBQXFCLFFBQXJCLElBQWlDWCxDQUFDLENBQUNXLE9BQUYsS0FBYyxDQUFuRCxFQUFzRDtFQUNyREMsVUFBQUEsUUFBUTtFQUNSO0VBQ0E7O0VBQ0QsUUFBQSxNQUFJLENBQUNuQyxRQUFMLEdBQWdCdUIsQ0FBQyxDQUFDTSxLQUFsQjtFQUNBLFFBQUEsTUFBSSxDQUFDTyxDQUFMLEdBQVMsTUFBSSxDQUFDdEMsUUFBTCxHQUFnQixNQUFJLENBQUNFLFFBQTlCO0VBQ0EsUUFBQSxNQUFJLENBQUNKLEdBQUwsQ0FBU2tCLElBQVQsQ0FBY2dCLFVBQWQsR0FBMkIsTUFBSSxDQUFDL0IsaUJBQUwsR0FBeUIsTUFBSSxDQUFDcUMsQ0FBekQ7RUFDQSxPQVpEO0VBY0FyQixNQUFBQSxRQUFRLENBQUNwQixnQkFBVCxDQUEwQixTQUExQixFQUFxQyxLQUFLTSxRQUFMLENBQWNvQyxPQUFkLEdBQXdCLFVBQUNkLENBQUQsRUFBTztFQUNuRVksUUFBQUEsUUFBUTtFQUNSLE9BRkQ7O0VBR0EsVUFBTUEsUUFBUSxHQUFHLFNBQVhBLFFBQVcsR0FBTTtFQUN0QixZQUFJLENBQUMsTUFBSSxDQUFDdEMsV0FBVixFQUF1QjtFQUN2QixRQUFBLE1BQUksQ0FBQ0MsUUFBTCxHQUFnQixJQUFoQjtFQUNBLFFBQUEsTUFBSSxDQUFDRSxRQUFMLEdBQWdCLElBQWhCO0VBQ0EsUUFBQSxNQUFJLENBQUNvQyxDQUFMLEdBQVMsSUFBVDtFQUNBLFFBQUEsTUFBSSxDQUFDckMsaUJBQUwsR0FBeUIsSUFBekI7RUFFQSxRQUFBLE1BQUksQ0FBQ0YsV0FBTCxHQUFtQixLQUFuQjs7RUFDQSxRQUFBLE1BQUksQ0FBQzZCLFlBQUw7RUFDQSxPQVREOztFQVdBLFdBQUt4Qix1QkFBTCxHQUErQixJQUEvQjtFQUNBOzs7cUNBQ2M7RUFDZCxVQUFHLEtBQUtMLFdBQVIsRUFBcUI7RUFDckIsVUFBSSxDQUFDLEtBQUtLLHVCQUFWLEVBQW1DO0VBQ25DYSxNQUFBQSxRQUFRLENBQUN1QixtQkFBVCxDQUE2QixXQUE3QixFQUEwQyxLQUFLckMsUUFBTCxDQUFjMEIsU0FBeEQ7RUFDQSxhQUFPLEtBQUsxQixRQUFMLENBQWMwQixTQUFyQjtFQUNBWixNQUFBQSxRQUFRLENBQUN1QixtQkFBVCxDQUE2QixXQUE3QixFQUEwQyxLQUFLckMsUUFBTCxDQUFjZ0MsU0FBeEQ7RUFDQSxhQUFPLEtBQUtoQyxRQUFMLENBQWNnQyxTQUFyQjtFQUNBbEIsTUFBQUEsUUFBUSxDQUFDdUIsbUJBQVQsQ0FBNkIsU0FBN0IsRUFBd0MsS0FBS3JDLFFBQUwsQ0FBY29DLE9BQXREO0VBQ0EsYUFBTyxLQUFLcEMsUUFBTCxDQUFjb0MsT0FBckI7RUFDQSxXQUFLbkMsdUJBQUwsR0FBK0IsS0FBL0I7RUFDQTs7O3dDQUNpQjtFQUNqQixXQUFLTixHQUFMLENBQVNrQixJQUFULENBQWN3QixtQkFBZCxDQUFrQyxXQUFsQyxFQUErQyxLQUFLckMsUUFBTCxDQUFjcUIsY0FBN0Q7RUFDQSxhQUFPLEtBQUtyQixRQUFMLENBQWNxQixjQUFyQjtFQUVBLFdBQUsxQixHQUFMLENBQVNrQixJQUFULENBQWN3QixtQkFBZCxDQUFrQyxZQUFsQyxFQUFnRCxLQUFLckMsUUFBTCxDQUFjd0IsY0FBOUQ7RUFDQSxhQUFPLEtBQUt4QixRQUFMLENBQWN3QixjQUFyQjtFQUNBOzs7OztFQUdGLElBQU1oQixXQUFTLEdBQUc7RUFDakJMLEVBQUFBLEVBQUUsRUFBRW1DO0VBRGEsQ0FBbEI7Ozs7Ozs7OyJ9
