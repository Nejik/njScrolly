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

        document.addEventListener('mousedown', this.handlers.mousedown = function (e) {
          if (!_this.closest(e.target, _this.els.wrap)) {
            //move only inside wrap component
            return;
          }

          _this.moveStarted = true;
          _this.initialX = e.pageX;
          _this.currentX = e.pageX;
          _this.initialScrollLeft = _this.els.wrap.scrollLeft;
          e.preventDefault(); // e.stopPropagation();
        });
        document.addEventListener('mousemove', this.handlers.mousemove = function (e) {
          if (!_this.moveStarted) {
            return;
          }

          if (typeof e.buttons === 'number' && e.buttons === 0) {
            stopMove();
            return;
          }

          _this.currentX = e.pageX;
          _this.x = _this.initialX - _this.currentX;
          _this.els.wrap.scrollLeft = _this.initialScrollLeft + _this.x;
        });
        document.addEventListener('mouseup', this.handlers.mouseup = function (e) {
          stopMove();
        });

        var stopMove = function stopMove() {
          if (!_this.moveStarted) return;
          _this.initialX = null;
          _this.currentX = null;
          _this.x = null;
          _this.initialScrollLeft = null;
          _this.moveStarted = false; // this.unlistenMove();
        };
      }
    }, {
      key: "removeListeners",
      value: function removeListeners() {
        document.removeEventListener('mousedown', this.handlers.mousedown);
        delete this.handlers.mousedown;
        document.removeEventListener('mousemove', this.handlers.mousemove);
        delete this.handlers.mousemove;
        document.removeEventListener('mouseup', this.handlers.mouseup);
        delete this.handlers.mouseup;
      }
    }]);

    return njScrolly;
  }();
  var _defaults$1 = {
    el: undefined
  };

  return njScrolly;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmpTY3JvbGx5LnVtZC5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgbmpTY3JvbGx5IHtcclxuXHQvL29wdGlvbnNcclxuXHRjb25zdHJ1Y3RvcihvcHRzKSB7XHJcblxyXG5cdFx0dGhpcy5pbml0KG9wdHMpO1xyXG5cdH1cclxuXHRpbml0KG9wdHMpIHtcclxuXHRcdC8vIGZpeGVzIHdlaXJkIHNhZmFyaSAxMCBidWcgd2hlcmUgcHJldmVudERlZmF1bHQgaXMgcHJldmVudGVkXHJcblx0XHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tZXRhZml6enkvZmxpY2tpdHkvaXNzdWVzLzQ1NyNpc3N1ZWNvbW1lbnQtMjU0NTAxMzU2XHJcblx0XHRpZiAoIXdpbmRvdykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgZnVuY3Rpb24gKCkge30pO1xyXG5cclxuXHRcdHRoaXMuZWxzID0ge307XHJcblx0XHR0aGlzLm1vdmVTdGFydGVkID0gZmFsc2U7XHJcblx0XHR0aGlzLmluaXRpYWxYID0gbnVsbDtcclxuXHRcdHRoaXMuaW5pdGlhbFNjcm9sbExlZnQgPSBudWxsO1xyXG5cdFx0dGhpcy5jdXJyZW50WCA9IG51bGw7XHJcblxyXG5cdFx0dGhpcy5oYW5kbGVycyA9IHt9O1xyXG5cclxuXHRcdGxldCBvcHRpb25zID0ge307XHJcblx0XHRpZiAodHlwZW9mIG9wdHMgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdG9wdGlvbnMuZWwgPSBvcHRzO1xyXG5cdFx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0cyA9PT0gJ29iamVjdCcpIHtcclxuXHRcdFx0aWYgKG9wdHMgaW5zdGFuY2VvZiBFbGVtZW50KSB7XHJcblx0XHRcdFx0b3B0aW9ucy5lbCA9IG9wdHM7XHJcblx0XHRcdH0gZWxzZSBpZiAob3B0c1swXSAmJiBvcHRzWzBdIGluc3RhbmNlb2YgRWxlbWVudCkge1xyXG5cdFx0XHRcdG9wdGlvbnMuZWwgPSBvcHRzWzBdO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdG9wdGlvbnMgPSBvcHRzO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5vID0gT2JqZWN0LmFzc2lnbih7fSwgX2RlZmF1bHRzLCBvcHRpb25zKTtcclxuXHRcdGNvbnN0IGdhdGhlclJlc3VsdHMgPSB0aGlzLmdhdGhlckVsZW1lbnRzKCk7XHJcblx0XHRpZiAoZ2F0aGVyUmVzdWx0cyA9PT0gZmFsc2UpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuYWRkTGlzdGVuZXJzKCk7XHJcblx0fVxyXG5cdGRlc3Ryb3koKSB7XHJcblxyXG5cdFx0dGhpcy5yZW1vdmVMaXN0ZW5lcnMoKTtcclxuXHR9XHJcblx0Z2F0aGVyRWxlbWVudHMoKSB7XHJcblx0XHR0aGlzLmVscyA9IHt9O1xyXG5cclxuXHRcdGlmICh0eXBlb2YgdGhpcy5vLmVsID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aGlzLmVscy53cmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLm8uZWwpXHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuby5lbCkge1xyXG5cdFx0XHR0aGlzLmVscy53cmFwID0gdGhpcy5vLmVsO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCF0aGlzLmVscy53cmFwKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ25qU2Nyb2xseTogc291cmNlIChvLmVsKSBub3QgZm91bmQuJyk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9XHJcblx0Y2xvc2VzdChlbCwgdGFyZ2V0KSB7XHJcblx0XHRpZiAoIWVsIHx8ICF0YXJnZXQpIHJldHVybjtcclxuXHRcdGxldCBjdXJyZW50ID0gZWw7XHJcblx0XHRkbyB7XHJcblx0XHRcdGlmIChjdXJyZW50ID09PSB0YXJnZXQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjdXJyZW50ID0gY3VycmVudC5wYXJlbnROb2RlXHJcblx0XHR9IHdoaWxlIChjdXJyZW50LnBhcmVudE5vZGUpO1xyXG5cdH1cclxuXHRhZGRMaXN0ZW5lcnMoKSB7XHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZXJzLm1vdXNlZG93biA9IChlKSA9PiB7XHJcblx0XHRcdGlmICghdGhpcy5jbG9zZXN0KGUudGFyZ2V0LCB0aGlzLmVscy53cmFwKSkge1xyXG5cdFx0XHRcdC8vbW92ZSBvbmx5IGluc2lkZSB3cmFwIGNvbXBvbmVudFxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLm1vdmVTdGFydGVkID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5pbml0aWFsWCA9IGUucGFnZVg7XHJcblx0XHRcdHRoaXMuY3VycmVudFggPSBlLnBhZ2VYO1xyXG5cdFx0XHR0aGlzLmluaXRpYWxTY3JvbGxMZWZ0ID0gdGhpcy5lbHMud3JhcC5zY3JvbGxMZWZ0O1xyXG5cclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHQvLyBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVycy5tb3VzZW1vdmUgPSAoZSkgPT4ge1xyXG5cdFx0XHRpZiAoIXRoaXMubW92ZVN0YXJ0ZWQpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0eXBlb2YgZS5idXR0b25zID09PSAnbnVtYmVyJyAmJiBlLmJ1dHRvbnMgPT09IDApIHtcclxuXHRcdFx0XHRzdG9wTW92ZSgpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmN1cnJlbnRYID0gZS5wYWdlWDtcclxuXHRcdFx0dGhpcy54ID0gdGhpcy5pbml0aWFsWCAtIHRoaXMuY3VycmVudFg7XHJcblx0XHRcdHRoaXMuZWxzLndyYXAuc2Nyb2xsTGVmdCA9IHRoaXMuaW5pdGlhbFNjcm9sbExlZnQgKyB0aGlzLng7XHJcblx0XHR9KTtcclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVycy5tb3VzZXVwID0gKGUpID0+IHtcclxuXHRcdFx0c3RvcE1vdmUoKTtcclxuXHRcdH0pO1xyXG5cdFx0Y29uc3Qgc3RvcE1vdmUgPSAoKSA9PiB7XHJcblx0XHRcdGlmICghdGhpcy5tb3ZlU3RhcnRlZCkgcmV0dXJuO1xyXG5cdFx0XHR0aGlzLmluaXRpYWxYID0gbnVsbDtcclxuXHRcdFx0dGhpcy5jdXJyZW50WCA9IG51bGxcclxuXHRcdFx0dGhpcy54ID0gbnVsbDtcclxuXHRcdFx0dGhpcy5pbml0aWFsU2Nyb2xsTGVmdCA9IG51bGw7XHJcblxyXG5cdFx0XHR0aGlzLm1vdmVTdGFydGVkID0gZmFsc2U7XHJcblx0XHRcdC8vIHRoaXMudW5saXN0ZW5Nb3ZlKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHJlbW92ZUxpc3RlbmVycygpIHtcclxuXHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlcnMubW91c2Vkb3duKVxyXG5cdFx0ZGVsZXRlIHRoaXMuaGFuZGxlcnMubW91c2Vkb3duO1xyXG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVycy5tb3VzZW1vdmUpXHJcblx0XHRkZWxldGUgdGhpcy5oYW5kbGVycy5tb3VzZW1vdmU7XHJcblx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVycy5tb3VzZXVwKVxyXG5cdFx0ZGVsZXRlIHRoaXMuaGFuZGxlcnMubW91c2V1cDtcclxuXHR9XHJcbn1cclxuXHJcbmNvbnN0IF9kZWZhdWx0cyA9IHtcclxuXHRlbDogdW5kZWZpbmVkXHJcbn0iXSwibmFtZXMiOlsibmpTY3JvbGx5Iiwib3B0cyIsImluaXQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZWxzIiwibW92ZVN0YXJ0ZWQiLCJpbml0aWFsWCIsImluaXRpYWxTY3JvbGxMZWZ0IiwiY3VycmVudFgiLCJoYW5kbGVycyIsIm9wdGlvbnMiLCJlbCIsIkVsZW1lbnQiLCJvIiwiT2JqZWN0IiwiYXNzaWduIiwiX2RlZmF1bHRzIiwiZ2F0aGVyUmVzdWx0cyIsImdhdGhlckVsZW1lbnRzIiwiYWRkTGlzdGVuZXJzIiwicmVtb3ZlTGlzdGVuZXJzIiwid3JhcCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNvbnNvbGUiLCJlcnJvciIsInRhcmdldCIsImN1cnJlbnQiLCJwYXJlbnROb2RlIiwibW91c2Vkb3duIiwiZSIsImNsb3Nlc3QiLCJwYWdlWCIsInNjcm9sbExlZnQiLCJwcmV2ZW50RGVmYXVsdCIsIm1vdXNlbW92ZSIsImJ1dHRvbnMiLCJzdG9wTW92ZSIsIngiLCJtb3VzZXVwIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BQXFCQTs7O0VBQ3BCO0VBQ0EscUJBQVlDLElBQVosRUFBa0I7RUFBQTs7RUFFakIsU0FBS0MsSUFBTCxDQUFVRCxJQUFWO0VBQ0E7Ozs7MkJBQ0lBLE1BQU07RUFDVjtFQUNBO0VBQ0EsVUFBSSxDQUFDRSxNQUFMLEVBQWE7RUFDWjtFQUNBOztFQUNEQSxNQUFBQSxNQUFNLENBQUNDLGdCQUFQLENBQXdCLFdBQXhCLEVBQXFDLFlBQVksRUFBakQ7RUFFQSxXQUFLQyxHQUFMLEdBQVcsRUFBWDtFQUNBLFdBQUtDLFdBQUwsR0FBbUIsS0FBbkI7RUFDQSxXQUFLQyxRQUFMLEdBQWdCLElBQWhCO0VBQ0EsV0FBS0MsaUJBQUwsR0FBeUIsSUFBekI7RUFDQSxXQUFLQyxRQUFMLEdBQWdCLElBQWhCO0VBRUEsV0FBS0MsUUFBTCxHQUFnQixFQUFoQjtFQUVBLFVBQUlDLE9BQU8sR0FBRyxFQUFkOztFQUNBLFVBQUksT0FBT1YsSUFBUCxLQUFnQixRQUFwQixFQUE4QjtFQUM3QlUsUUFBQUEsT0FBTyxDQUFDQyxFQUFSLEdBQWFYLElBQWI7RUFDQSxPQUZELE1BRU8sSUFBSSxRQUFPQSxJQUFQLE1BQWdCLFFBQXBCLEVBQThCO0VBQ3BDLFlBQUlBLElBQUksWUFBWVksT0FBcEIsRUFBNkI7RUFDNUJGLFVBQUFBLE9BQU8sQ0FBQ0MsRUFBUixHQUFhWCxJQUFiO0VBQ0EsU0FGRCxNQUVPLElBQUlBLElBQUksQ0FBQyxDQUFELENBQUosSUFBV0EsSUFBSSxDQUFDLENBQUQsQ0FBSixZQUFtQlksT0FBbEMsRUFBMkM7RUFDakRGLFVBQUFBLE9BQU8sQ0FBQ0MsRUFBUixHQUFhWCxJQUFJLENBQUMsQ0FBRCxDQUFqQjtFQUNBLFNBRk0sTUFFQTtFQUNOVSxVQUFBQSxPQUFPLEdBQUdWLElBQVY7RUFDQTtFQUNEOztFQUVELFdBQUthLENBQUwsR0FBU0MsTUFBTSxDQUFDQyxNQUFQLENBQWMsRUFBZCxFQUFrQkMsV0FBbEIsRUFBNkJOLE9BQTdCLENBQVQ7RUFDQSxVQUFNTyxhQUFhLEdBQUcsS0FBS0MsY0FBTCxFQUF0Qjs7RUFDQSxVQUFJRCxhQUFhLEtBQUssS0FBdEIsRUFBNkI7RUFDNUI7RUFDQTs7RUFFRCxXQUFLRSxZQUFMO0VBQ0E7OztnQ0FDUztFQUVULFdBQUtDLGVBQUw7RUFDQTs7O3VDQUNnQjtFQUNoQixXQUFLaEIsR0FBTCxHQUFXLEVBQVg7O0VBRUEsVUFBSSxPQUFPLEtBQUtTLENBQUwsQ0FBT0YsRUFBZCxLQUFxQixRQUF6QixFQUFtQztFQUNsQyxhQUFLUCxHQUFMLENBQVNpQixJQUFULEdBQWdCQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsS0FBS1YsQ0FBTCxDQUFPRixFQUE5QixDQUFoQjtFQUNBLE9BRkQsTUFFTyxJQUFJLEtBQUtFLENBQUwsQ0FBT0YsRUFBWCxFQUFlO0VBQ3JCLGFBQUtQLEdBQUwsQ0FBU2lCLElBQVQsR0FBZ0IsS0FBS1IsQ0FBTCxDQUFPRixFQUF2QjtFQUNBOztFQUNELFVBQUksQ0FBQyxLQUFLUCxHQUFMLENBQVNpQixJQUFkLEVBQW9CO0VBQ25CRyxRQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBYyxxQ0FBZDtFQUNBLGVBQU8sS0FBUDtFQUNBO0VBQ0Q7Ozs4QkFDT2QsSUFBSWUsUUFBUTtFQUNuQixVQUFJLENBQUNmLEVBQUQsSUFBTyxDQUFDZSxNQUFaLEVBQW9CO0VBQ3BCLFVBQUlDLE9BQU8sR0FBR2hCLEVBQWQ7O0VBQ0EsU0FBRztFQUNGLFlBQUlnQixPQUFPLEtBQUtELE1BQWhCLEVBQXdCO0VBQ3ZCLGlCQUFPLElBQVA7RUFDQTs7RUFFREMsUUFBQUEsT0FBTyxHQUFHQSxPQUFPLENBQUNDLFVBQWxCO0VBQ0EsT0FORCxRQU1TRCxPQUFPLENBQUNDLFVBTmpCO0VBT0E7OztxQ0FDYztFQUFBOztFQUNkTixNQUFBQSxRQUFRLENBQUNuQixnQkFBVCxDQUEwQixXQUExQixFQUF1QyxLQUFLTSxRQUFMLENBQWNvQixTQUFkLEdBQTBCLFVBQUNDLENBQUQsRUFBTztFQUN2RSxZQUFJLENBQUMsS0FBSSxDQUFDQyxPQUFMLENBQWFELENBQUMsQ0FBQ0osTUFBZixFQUF1QixLQUFJLENBQUN0QixHQUFMLENBQVNpQixJQUFoQyxDQUFMLEVBQTRDO0VBQzNDO0VBQ0E7RUFDQTs7RUFDRCxRQUFBLEtBQUksQ0FBQ2hCLFdBQUwsR0FBbUIsSUFBbkI7RUFDQSxRQUFBLEtBQUksQ0FBQ0MsUUFBTCxHQUFnQndCLENBQUMsQ0FBQ0UsS0FBbEI7RUFDQSxRQUFBLEtBQUksQ0FBQ3hCLFFBQUwsR0FBZ0JzQixDQUFDLENBQUNFLEtBQWxCO0VBQ0EsUUFBQSxLQUFJLENBQUN6QixpQkFBTCxHQUF5QixLQUFJLENBQUNILEdBQUwsQ0FBU2lCLElBQVQsQ0FBY1ksVUFBdkM7RUFFQUgsUUFBQUEsQ0FBQyxDQUFDSSxjQUFGLEdBVnVFO0VBWXZFLE9BWkQ7RUFjQVosTUFBQUEsUUFBUSxDQUFDbkIsZ0JBQVQsQ0FBMEIsV0FBMUIsRUFBdUMsS0FBS00sUUFBTCxDQUFjMEIsU0FBZCxHQUEwQixVQUFDTCxDQUFELEVBQU87RUFDdkUsWUFBSSxDQUFDLEtBQUksQ0FBQ3pCLFdBQVYsRUFBdUI7RUFDdEI7RUFDQTs7RUFFRCxZQUFJLE9BQU95QixDQUFDLENBQUNNLE9BQVQsS0FBcUIsUUFBckIsSUFBaUNOLENBQUMsQ0FBQ00sT0FBRixLQUFjLENBQW5ELEVBQXNEO0VBQ3JEQyxVQUFBQSxRQUFRO0VBQ1I7RUFDQTs7RUFDRCxRQUFBLEtBQUksQ0FBQzdCLFFBQUwsR0FBZ0JzQixDQUFDLENBQUNFLEtBQWxCO0VBQ0EsUUFBQSxLQUFJLENBQUNNLENBQUwsR0FBUyxLQUFJLENBQUNoQyxRQUFMLEdBQWdCLEtBQUksQ0FBQ0UsUUFBOUI7RUFDQSxRQUFBLEtBQUksQ0FBQ0osR0FBTCxDQUFTaUIsSUFBVCxDQUFjWSxVQUFkLEdBQTJCLEtBQUksQ0FBQzFCLGlCQUFMLEdBQXlCLEtBQUksQ0FBQytCLENBQXpEO0VBQ0EsT0FaRDtFQWNBaEIsTUFBQUEsUUFBUSxDQUFDbkIsZ0JBQVQsQ0FBMEIsU0FBMUIsRUFBcUMsS0FBS00sUUFBTCxDQUFjOEIsT0FBZCxHQUF3QixVQUFDVCxDQUFELEVBQU87RUFDbkVPLFFBQUFBLFFBQVE7RUFDUixPQUZEOztFQUdBLFVBQU1BLFFBQVEsR0FBRyxTQUFYQSxRQUFXLEdBQU07RUFDdEIsWUFBSSxDQUFDLEtBQUksQ0FBQ2hDLFdBQVYsRUFBdUI7RUFDdkIsUUFBQSxLQUFJLENBQUNDLFFBQUwsR0FBZ0IsSUFBaEI7RUFDQSxRQUFBLEtBQUksQ0FBQ0UsUUFBTCxHQUFnQixJQUFoQjtFQUNBLFFBQUEsS0FBSSxDQUFDOEIsQ0FBTCxHQUFTLElBQVQ7RUFDQSxRQUFBLEtBQUksQ0FBQy9CLGlCQUFMLEdBQXlCLElBQXpCO0VBRUEsUUFBQSxLQUFJLENBQUNGLFdBQUwsR0FBbUIsS0FBbkIsQ0FQc0I7RUFTdEIsT0FURDtFQVVBOzs7d0NBQ2lCO0VBQ2pCaUIsTUFBQUEsUUFBUSxDQUFDa0IsbUJBQVQsQ0FBNkIsV0FBN0IsRUFBMEMsS0FBSy9CLFFBQUwsQ0FBY29CLFNBQXhEO0VBQ0EsYUFBTyxLQUFLcEIsUUFBTCxDQUFjb0IsU0FBckI7RUFDQVAsTUFBQUEsUUFBUSxDQUFDa0IsbUJBQVQsQ0FBNkIsV0FBN0IsRUFBMEMsS0FBSy9CLFFBQUwsQ0FBYzBCLFNBQXhEO0VBQ0EsYUFBTyxLQUFLMUIsUUFBTCxDQUFjMEIsU0FBckI7RUFDQWIsTUFBQUEsUUFBUSxDQUFDa0IsbUJBQVQsQ0FBNkIsU0FBN0IsRUFBd0MsS0FBSy9CLFFBQUwsQ0FBYzhCLE9BQXREO0VBQ0EsYUFBTyxLQUFLOUIsUUFBTCxDQUFjOEIsT0FBckI7RUFDQTs7Ozs7RUFHRixJQUFNdkIsV0FBUyxHQUFHO0VBQ2pCTCxFQUFBQSxFQUFFLEVBQUU4QjtFQURhLENBQWxCOzs7Ozs7OzsifQ==
