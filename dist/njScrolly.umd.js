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
          if (Math.abs(_this2.diff) > _this2.o.diffThreshold && _this2.o.preventLinks) {
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
        this.els.wrap.removeEventListener('mousedown', this.handlers.mousedown);
        delete this.handlers.mousedown;
        this.stopMoveListen();

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
    preventLinks: true,
    diffThreshold: 5
  };

  return njScrolly;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmpTY3JvbGx5LnVtZC5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgbmpTY3JvbGx5IHtcclxuXHQvL29wdGlvbnNcclxuXHRjb25zdHJ1Y3RvcihvcHRzKSB7XHJcblxyXG5cdFx0dGhpcy5pbml0KG9wdHMpO1xyXG5cdH1cclxuXHRpbml0KG9wdHMpIHtcclxuXHRcdC8vIGZpeGVzIHdlaXJkIHNhZmFyaSAxMCBidWcgd2hlcmUgcHJldmVudERlZmF1bHQgaXMgcHJldmVudGVkXHJcblx0XHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tZXRhZml6enkvZmxpY2tpdHkvaXNzdWVzLzQ1NyNpc3N1ZWNvbW1lbnQtMjU0NTAxMzU2XHJcblx0XHRpZiAoIXdpbmRvdykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgZnVuY3Rpb24gKCkge30pO1xyXG5cclxuXHRcdHRoaXMuZWxzID0ge307XHJcblx0XHR0aGlzLm1vdmVTdGFydGVkO1xyXG5cdFx0dGhpcy5pbml0aWFsWDtcclxuXHRcdHRoaXMuaW5pdGlhbFNjcm9sbExlZnQ7XHJcblx0XHR0aGlzLmN1cnJlbnRYO1xyXG5cclxuXHRcdHRoaXMuaGFuZGxlcnMgPSB7fTtcclxuXHJcblx0XHRsZXQgb3B0aW9ucyA9IHt9O1xyXG5cdFx0aWYgKHR5cGVvZiBvcHRzID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRvcHRpb25zLmVsID0gb3B0cztcclxuXHRcdH0gZWxzZSBpZiAodHlwZW9mIG9wdHMgPT09ICdvYmplY3QnKSB7XHJcblx0XHRcdGlmIChvcHRzIGluc3RhbmNlb2YgRWxlbWVudCkge1xyXG5cdFx0XHRcdG9wdGlvbnMuZWwgPSBvcHRzO1xyXG5cdFx0XHR9IGVsc2UgaWYgKG9wdHNbMF0gJiYgb3B0c1swXSBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcclxuXHRcdFx0XHRvcHRpb25zLmVsID0gb3B0c1swXTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRvcHRpb25zID0gb3B0cztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMubyA9IE9iamVjdC5hc3NpZ24oe30sIF9kZWZhdWx0cywgb3B0aW9ucyk7XHJcblx0XHRjb25zdCBnYXRoZXJSZXN1bHRzID0gdGhpcy5nYXRoZXJFbGVtZW50cygpO1xyXG5cdFx0aWYgKGdhdGhlclJlc3VsdHMgPT09IGZhbHNlKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmFkZExpc3RlbmVycygpO1xyXG5cdH1cclxuXHJcblx0Z2F0aGVyRWxlbWVudHMoKSB7XHJcblx0XHR0aGlzLmVscyA9IHt9O1xyXG5cclxuXHRcdGlmICh0eXBlb2YgdGhpcy5vLmVsID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aGlzLmVscy53cmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLm8uZWwpXHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuby5lbCkge1xyXG5cdFx0XHR0aGlzLmVscy53cmFwID0gdGhpcy5vLmVsO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCF0aGlzLmVscy53cmFwKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ25qU2Nyb2xseTogc291cmNlIChvLmVsKSBub3QgZm91bmQuJyk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9XHJcblx0YWRkTGlzdGVuZXJzKCkge1xyXG5cdFx0dGhpcy5lbHMud3JhcC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZXJzLm1vdXNlZG93biA9IChlKSA9PiB7XHJcblx0XHRcdGlmICghdGhpcy5jbG9zZXN0KGUudGFyZ2V0LCB0aGlzLmVscy53cmFwKSkge1xyXG5cdFx0XHRcdC8vbW92ZSBvbmx5IGluc2lkZSB3cmFwIGNvbXBvbmVudFxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5tb3ZlU3RhcnRlZCA9IHRydWU7XHJcblx0XHRcdHRoaXMuaW5pdGlhbFggPSBlLnBhZ2VYO1xyXG5cdFx0XHR0aGlzLmN1cnJlbnRYID0gZS5wYWdlWDtcclxuXHRcdFx0dGhpcy5pbml0aWFsU2Nyb2xsTGVmdCA9IHRoaXMuZWxzLndyYXAuc2Nyb2xsTGVmdDtcclxuXHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdHRoaXMuc3RhcnRNb3ZlTGlzdGVuKCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblx0c3RhcnRNb3ZlTGlzdGVuKCkge1xyXG5cdFx0aWYgKHRoaXMubW92ZUhhbmRsZXJzKSByZXR1cm47XHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZXJzLm1vdXNlbW92ZSA9IChlKSA9PiB7XHJcblx0XHRcdGlmICghdGhpcy5tb3ZlU3RhcnRlZCkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHR5cGVvZiBlLmJ1dHRvbnMgPT09ICdudW1iZXInICYmIGUuYnV0dG9ucyA9PT0gMCkge1xyXG5cdFx0XHRcdHN0b3BNb3ZlKCk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmN1cnJlbnRYID0gZS5wYWdlWDtcclxuXHRcdFx0dGhpcy5kaWZmID0gdGhpcy5pbml0aWFsWCAtIHRoaXMuY3VycmVudFg7XHJcblx0XHRcdHRoaXMuZWxzLndyYXAuc2Nyb2xsTGVmdCA9IHRoaXMuaW5pdGlhbFNjcm9sbExlZnQgKyB0aGlzLmRpZmY7XHJcblx0XHR9KTtcclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVycy5tb3VzZXVwID0gKGUpID0+IHtcclxuXHRcdFx0XHJcblx0XHRcdGlmIChNYXRoLmFicyh0aGlzLmRpZmYpID4gdGhpcy5vLmRpZmZUaHJlc2hvbGQgJiYgdGhpcy5vLnByZXZlbnRMaW5rcykge1xyXG5cdFx0XHRcdC8vdHJ5IHRvIHByZXZlbnQgZGVmYXVsdCBsaW5rKGEgdGFnKVxyXG5cdFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVycy5kcmFnY2xpY2sgPSAoZSkgPT4ge1xyXG5cdFx0XHRcdFx0aWYgKCFlLnRhcmdldC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdBJykgcmV0dXJuO1xyXG5cdFx0XHRcdFx0aWYgKCF0aGlzLmNsb3Nlc3QoZS50YXJnZXQsIHRoaXMuZWxzLndyYXApKSByZXR1cm47XHJcblxyXG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZXJzLmRyYWdjbGljayk7XHJcblx0XHRcdFx0XHRkZWxldGUgdGhpcy5oYW5kbGVycy5kcmFnY2xpY2s7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdC8vd2FpdCA1MG1zIGZvciBjbGljayBldmVudCB0byBwcmV2ZW50IGxpbmsgaHJlZiBiZWhhdmlvdXJcclxuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRcdGlmKCF0aGlzLmhhbmRsZXJzLmRyYWdjbGljaykgcmV0dXJuO1xyXG5cdFx0XHRcdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZXJzLmRyYWdjbGljayk7XHJcblx0XHRcdFx0XHRkZWxldGUgdGhpcy5oYW5kbGVycy5kcmFnY2xpY2s7XHJcblx0XHRcdFx0fSwgNTApO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzdG9wTW92ZSgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Y29uc3Qgc3RvcE1vdmUgPSAoKSA9PiB7XHJcblx0XHRcdGlmICghdGhpcy5tb3ZlU3RhcnRlZCkgcmV0dXJuO1xyXG5cdFx0XHR0aGlzLmluaXRpYWxYID0gbnVsbDtcclxuXHRcdFx0dGhpcy5jdXJyZW50WCA9IG51bGxcclxuXHRcdFx0dGhpcy5kaWZmID0gbnVsbDtcclxuXHRcdFx0dGhpcy5pbml0aWFsU2Nyb2xsTGVmdCA9IG51bGw7XHJcblxyXG5cdFx0XHR0aGlzLm1vdmVTdGFydGVkID0gZmFsc2U7XHJcblxyXG5cdFx0XHR0aGlzLnN0b3BNb3ZlTGlzdGVuKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5tb3ZlSGFuZGxlcnMgPSB0cnVlO1xyXG5cdH1cclxuXHRzdG9wTW92ZUxpc3RlbigpIHtcclxuXHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuaGFuZGxlcnMubW91c2Vtb3ZlKVxyXG5cdFx0ZGVsZXRlIHRoaXMuaGFuZGxlcnMubW91c2Vtb3ZlO1xyXG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlcnMubW91c2V1cClcclxuXHRcdGRlbGV0ZSB0aGlzLmhhbmRsZXJzLm1vdXNldXA7XHJcblxyXG5cdFx0dGhpcy5tb3ZlSGFuZGxlcnMgPSBmYWxzZTtcclxuXHR9XHJcblx0cmVtb3ZlTGlzdGVuZXJzKCkge1xyXG5cdFx0dGhpcy5lbHMud3JhcC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZXJzLm1vdXNlZG93bik7XHJcblx0XHRkZWxldGUgdGhpcy5oYW5kbGVycy5tb3VzZWRvd247XHJcblx0XHRcclxuXHRcdHRoaXMuc3RvcE1vdmVMaXN0ZW4oKTtcclxuXHJcblx0XHRpZiAodGhpcy5oYW5kbGVycy5kcmFnY2xpY2spIHtcclxuXHRcdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZXJzLmRyYWdjbGljayk7XHJcblx0XHRcdGRlbGV0ZSB0aGlzLmhhbmRsZXJzLmRyYWdjbGljaztcclxuXHRcdH1cclxuXHR9XHJcblx0Y2xvc2VzdChlbCwgdGFyZ2V0KSB7XHJcblx0XHRpZiAoIWVsIHx8ICF0YXJnZXQpIHJldHVybjtcclxuXHRcdGxldCBjdXJyZW50ID0gZWw7XHJcblx0XHRkbyB7XHJcblx0XHRcdGlmIChjdXJyZW50ID09PSB0YXJnZXQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjdXJyZW50ID0gY3VycmVudC5wYXJlbnROb2RlXHJcblx0XHR9IHdoaWxlIChjdXJyZW50LnBhcmVudE5vZGUpO1xyXG5cdH1cclxuXHRkZXN0cm95KCkge1xyXG5cclxuXHRcdHRoaXMucmVtb3ZlTGlzdGVuZXJzKCk7XHJcblx0fVxyXG59XHJcblxyXG5jb25zdCBfZGVmYXVsdHMgPSB7XHJcblx0ZWw6IHVuZGVmaW5lZCxcclxuXHRwcmV2ZW50TGlua3M6IHRydWUsXHJcblx0ZGlmZlRocmVzaG9sZDogNVxyXG59Il0sIm5hbWVzIjpbIm5qU2Nyb2xseSIsIm9wdHMiLCJpbml0Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImVscyIsIm1vdmVTdGFydGVkIiwiaW5pdGlhbFgiLCJpbml0aWFsU2Nyb2xsTGVmdCIsImN1cnJlbnRYIiwiaGFuZGxlcnMiLCJvcHRpb25zIiwiZWwiLCJFbGVtZW50IiwibyIsIk9iamVjdCIsImFzc2lnbiIsIl9kZWZhdWx0cyIsImdhdGhlclJlc3VsdHMiLCJnYXRoZXJFbGVtZW50cyIsImFkZExpc3RlbmVycyIsIndyYXAiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjb25zb2xlIiwiZXJyb3IiLCJtb3VzZWRvd24iLCJlIiwiY2xvc2VzdCIsInRhcmdldCIsInBhZ2VYIiwic2Nyb2xsTGVmdCIsInByZXZlbnREZWZhdWx0Iiwic3RhcnRNb3ZlTGlzdGVuIiwibW92ZUhhbmRsZXJzIiwibW91c2Vtb3ZlIiwiYnV0dG9ucyIsInN0b3BNb3ZlIiwiZGlmZiIsIm1vdXNldXAiLCJNYXRoIiwiYWJzIiwiZGlmZlRocmVzaG9sZCIsInByZXZlbnRMaW5rcyIsImRyYWdjbGljayIsInRhZ05hbWUiLCJ0b1VwcGVyQ2FzZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJzZXRUaW1lb3V0Iiwic3RvcE1vdmVMaXN0ZW4iLCJjdXJyZW50IiwicGFyZW50Tm9kZSIsInJlbW92ZUxpc3RlbmVycyIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BQXFCQTs7O0VBQ3BCO0VBQ0EscUJBQVlDLElBQVosRUFBa0I7RUFBQTs7RUFFakIsU0FBS0MsSUFBTCxDQUFVRCxJQUFWO0VBQ0E7Ozs7MkJBQ0lBLE1BQU07RUFDVjtFQUNBO0VBQ0EsVUFBSSxDQUFDRSxNQUFMLEVBQWE7RUFDWjtFQUNBOztFQUNEQSxNQUFBQSxNQUFNLENBQUNDLGdCQUFQLENBQXdCLFdBQXhCLEVBQXFDLFlBQVksRUFBakQ7RUFFQSxXQUFLQyxHQUFMLEdBQVcsRUFBWDtFQUNBLFdBQUtDLFdBQUw7RUFDQSxXQUFLQyxRQUFMO0VBQ0EsV0FBS0MsaUJBQUw7RUFDQSxXQUFLQyxRQUFMO0VBRUEsV0FBS0MsUUFBTCxHQUFnQixFQUFoQjtFQUVBLFVBQUlDLE9BQU8sR0FBRyxFQUFkOztFQUNBLFVBQUksT0FBT1YsSUFBUCxLQUFnQixRQUFwQixFQUE4QjtFQUM3QlUsUUFBQUEsT0FBTyxDQUFDQyxFQUFSLEdBQWFYLElBQWI7RUFDQSxPQUZELE1BRU8sSUFBSSxRQUFPQSxJQUFQLE1BQWdCLFFBQXBCLEVBQThCO0VBQ3BDLFlBQUlBLElBQUksWUFBWVksT0FBcEIsRUFBNkI7RUFDNUJGLFVBQUFBLE9BQU8sQ0FBQ0MsRUFBUixHQUFhWCxJQUFiO0VBQ0EsU0FGRCxNQUVPLElBQUlBLElBQUksQ0FBQyxDQUFELENBQUosSUFBV0EsSUFBSSxDQUFDLENBQUQsQ0FBSixZQUFtQlksT0FBbEMsRUFBMkM7RUFDakRGLFVBQUFBLE9BQU8sQ0FBQ0MsRUFBUixHQUFhWCxJQUFJLENBQUMsQ0FBRCxDQUFq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
