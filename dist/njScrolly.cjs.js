'use strict';

class njScrolly {
  //options
  constructor(opts) {
    this.init(opts);
  }

  init(opts) {
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
    let options = {};

    if (typeof opts === 'string') {
      options.el = opts;
    } else if (typeof opts === 'object') {
      if (opts instanceof Element) {
        options.el = opts;
      } else if (opts[0] && opts[0] instanceof Element) {
        options.el = opts[0];
      } else {
        options = opts;
      }
    }

    this.o = Object.assign({}, _defaults, options);
    const gatherResults = this.gatherElements();

    if (gatherResults === false) {
      return;
    }

    this.addListeners();
  }

  destroy() {
    this.removeListeners();
  }

  gatherElements() {
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

  closest(el, target) {
    if (!el || !target) return;
    let current = el;

    do {
      if (current === target) {
        return true;
      }

      current = current.parentNode;
    } while (current.parentNode);
  }

  addListeners() {
    document.addEventListener('mousedown', this.handlers.mousedown = e => {
      if (!this.closest(e.target, this.els.wrap)) {
        //move only inside wrap component
        return;
      }

      this.moveStarted = true;
      this.initialX = e.pageX;
      this.currentX = e.pageX;
      this.initialScrollLeft = this.els.wrap.scrollLeft;
      e.preventDefault(); // e.stopPropagation();
    });
    document.addEventListener('mousemove', this.handlers.mousemove = e => {
      if (!this.moveStarted) {
        return;
      }

      if (typeof e.buttons === 'number' && e.buttons === 0) {
        stopMove();
        return;
      }

      this.currentX = e.pageX;
      this.x = this.initialX - this.currentX;
      this.els.wrap.scrollLeft = this.initialScrollLeft + this.x;
    });
    document.addEventListener('mouseup', this.handlers.mouseup = e => {
      stopMove();
    });

    const stopMove = () => {
      if (!this.moveStarted) return;
      this.initialX = null;
      this.currentX = null;
      this.x = null;
      this.initialScrollLeft = null;
      this.moveStarted = false; // this.unlistenMove();
    };
  }

  removeListeners() {
    document.removeEventListener('mousedown', this.handlers.mousedown);
    delete this.handlers.mousedown;
    document.removeEventListener('mousemove', this.handlers.mousemove);
    delete this.handlers.mousemove;
    document.removeEventListener('mouseup', this.handlers.mouseup);
    delete this.handlers.mouseup;
  }

}
const _defaults = {
  el: undefined
};

module.exports = njScrolly;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmpTY3JvbGx5LmNqcy5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgbmpTY3JvbGx5IHtcclxuXHQvL29wdGlvbnNcclxuXHRjb25zdHJ1Y3RvcihvcHRzKSB7XHJcblxyXG5cdFx0dGhpcy5pbml0KG9wdHMpO1xyXG5cdH1cclxuXHRpbml0KG9wdHMpIHtcclxuXHRcdC8vIGZpeGVzIHdlaXJkIHNhZmFyaSAxMCBidWcgd2hlcmUgcHJldmVudERlZmF1bHQgaXMgcHJldmVudGVkXHJcblx0XHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tZXRhZml6enkvZmxpY2tpdHkvaXNzdWVzLzQ1NyNpc3N1ZWNvbW1lbnQtMjU0NTAxMzU2XHJcblx0XHRpZiAoIXdpbmRvdykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgZnVuY3Rpb24gKCkge30pO1xyXG5cclxuXHRcdHRoaXMuZWxzID0ge307XHJcblx0XHR0aGlzLm1vdmVTdGFydGVkID0gZmFsc2U7XHJcblx0XHR0aGlzLmluaXRpYWxYID0gbnVsbDtcclxuXHRcdHRoaXMuaW5pdGlhbFNjcm9sbExlZnQgPSBudWxsO1xyXG5cdFx0dGhpcy5jdXJyZW50WCA9IG51bGw7XHJcblxyXG5cdFx0dGhpcy5oYW5kbGVycyA9IHt9O1xyXG5cclxuXHRcdGxldCBvcHRpb25zID0ge307XHJcblx0XHRpZiAodHlwZW9mIG9wdHMgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdG9wdGlvbnMuZWwgPSBvcHRzO1xyXG5cdFx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0cyA9PT0gJ29iamVjdCcpIHtcclxuXHRcdFx0aWYgKG9wdHMgaW5zdGFuY2VvZiBFbGVtZW50KSB7XHJcblx0XHRcdFx0b3B0aW9ucy5lbCA9IG9wdHM7XHJcblx0XHRcdH0gZWxzZSBpZiAob3B0c1swXSAmJiBvcHRzWzBdIGluc3RhbmNlb2YgRWxlbWVudCkge1xyXG5cdFx0XHRcdG9wdGlvbnMuZWwgPSBvcHRzWzBdO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdG9wdGlvbnMgPSBvcHRzO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5vID0gT2JqZWN0LmFzc2lnbih7fSwgX2RlZmF1bHRzLCBvcHRpb25zKTtcclxuXHRcdGNvbnN0IGdhdGhlclJlc3VsdHMgPSB0aGlzLmdhdGhlckVsZW1lbnRzKCk7XHJcblx0XHRpZiAoZ2F0aGVyUmVzdWx0cyA9PT0gZmFsc2UpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuYWRkTGlzdGVuZXJzKCk7XHJcblx0fVxyXG5cdGRlc3Ryb3koKSB7XHJcblxyXG5cdFx0dGhpcy5yZW1vdmVMaXN0ZW5lcnMoKTtcclxuXHR9XHJcblx0Z2F0aGVyRWxlbWVudHMoKSB7XHJcblx0XHR0aGlzLmVscyA9IHt9O1xyXG5cclxuXHRcdGlmICh0eXBlb2YgdGhpcy5vLmVsID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aGlzLmVscy53cmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLm8uZWwpXHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuby5lbCkge1xyXG5cdFx0XHR0aGlzLmVscy53cmFwID0gdGhpcy5vLmVsO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCF0aGlzLmVscy53cmFwKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ25qU2Nyb2xseTogc291cmNlIChvLmVsKSBub3QgZm91bmQuJyk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9XHJcblx0Y2xvc2VzdChlbCwgdGFyZ2V0KSB7XHJcblx0XHRpZiAoIWVsIHx8ICF0YXJnZXQpIHJldHVybjtcclxuXHRcdGxldCBjdXJyZW50ID0gZWw7XHJcblx0XHRkbyB7XHJcblx0XHRcdGlmIChjdXJyZW50ID09PSB0YXJnZXQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjdXJyZW50ID0gY3VycmVudC5wYXJlbnROb2RlXHJcblx0XHR9IHdoaWxlIChjdXJyZW50LnBhcmVudE5vZGUpO1xyXG5cdH1cclxuXHRhZGRMaXN0ZW5lcnMoKSB7XHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZXJzLm1vdXNlZG93biA9IChlKSA9PiB7XHJcblx0XHRcdGlmICghdGhpcy5jbG9zZXN0KGUudGFyZ2V0LCB0aGlzLmVscy53cmFwKSkge1xyXG5cdFx0XHRcdC8vbW92ZSBvbmx5IGluc2lkZSB3cmFwIGNvbXBvbmVudFxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLm1vdmVTdGFydGVkID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5pbml0aWFsWCA9IGUucGFnZVg7XHJcblx0XHRcdHRoaXMuY3VycmVudFggPSBlLnBhZ2VYO1xyXG5cdFx0XHR0aGlzLmluaXRpYWxTY3JvbGxMZWZ0ID0gdGhpcy5lbHMud3JhcC5zY3JvbGxMZWZ0O1xyXG5cclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHQvLyBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVycy5tb3VzZW1vdmUgPSAoZSkgPT4ge1xyXG5cdFx0XHRpZiAoIXRoaXMubW92ZVN0YXJ0ZWQpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0eXBlb2YgZS5idXR0b25zID09PSAnbnVtYmVyJyAmJiBlLmJ1dHRvbnMgPT09IDApIHtcclxuXHRcdFx0XHRzdG9wTW92ZSgpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmN1cnJlbnRYID0gZS5wYWdlWDtcclxuXHRcdFx0dGhpcy54ID0gdGhpcy5pbml0aWFsWCAtIHRoaXMuY3VycmVudFg7XHJcblx0XHRcdHRoaXMuZWxzLndyYXAuc2Nyb2xsTGVmdCA9IHRoaXMuaW5pdGlhbFNjcm9sbExlZnQgKyB0aGlzLng7XHJcblx0XHR9KTtcclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVycy5tb3VzZXVwID0gKGUpID0+IHtcclxuXHRcdFx0c3RvcE1vdmUoKTtcclxuXHRcdH0pO1xyXG5cdFx0Y29uc3Qgc3RvcE1vdmUgPSAoKSA9PiB7XHJcblx0XHRcdGlmICghdGhpcy5tb3ZlU3RhcnRlZCkgcmV0dXJuO1xyXG5cdFx0XHR0aGlzLmluaXRpYWxYID0gbnVsbDtcclxuXHRcdFx0dGhpcy5jdXJyZW50WCA9IG51bGxcclxuXHRcdFx0dGhpcy54ID0gbnVsbDtcclxuXHRcdFx0dGhpcy5pbml0aWFsU2Nyb2xsTGVmdCA9IG51bGw7XHJcblxyXG5cdFx0XHR0aGlzLm1vdmVTdGFydGVkID0gZmFsc2U7XHJcblx0XHRcdC8vIHRoaXMudW5saXN0ZW5Nb3ZlKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHJlbW92ZUxpc3RlbmVycygpIHtcclxuXHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlcnMubW91c2Vkb3duKVxyXG5cdFx0ZGVsZXRlIHRoaXMuaGFuZGxlcnMubW91c2Vkb3duO1xyXG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVycy5tb3VzZW1vdmUpXHJcblx0XHRkZWxldGUgdGhpcy5oYW5kbGVycy5tb3VzZW1vdmU7XHJcblx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVycy5tb3VzZXVwKVxyXG5cdFx0ZGVsZXRlIHRoaXMuaGFuZGxlcnMubW91c2V1cDtcclxuXHR9XHJcbn1cclxuXHJcbmNvbnN0IF9kZWZhdWx0cyA9IHtcclxuXHRlbDogdW5kZWZpbmVkXHJcbn0iXSwibmFtZXMiOlsibmpTY3JvbGx5IiwiY29uc3RydWN0b3IiLCJvcHRzIiwiaW5pdCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJlbHMiLCJtb3ZlU3RhcnRlZCIsImluaXRpYWxYIiwiaW5pdGlhbFNjcm9sbExlZnQiLCJjdXJyZW50WCIsImhhbmRsZXJzIiwib3B0aW9ucyIsImVsIiwiRWxlbWVudCIsIm8iLCJPYmplY3QiLCJhc3NpZ24iLCJfZGVmYXVsdHMiLCJnYXRoZXJSZXN1bHRzIiwiZ2F0aGVyRWxlbWVudHMiLCJhZGRMaXN0ZW5lcnMiLCJkZXN0cm95IiwicmVtb3ZlTGlzdGVuZXJzIiwid3JhcCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNvbnNvbGUiLCJlcnJvciIsImNsb3Nlc3QiLCJ0YXJnZXQiLCJjdXJyZW50IiwicGFyZW50Tm9kZSIsIm1vdXNlZG93biIsImUiLCJwYWdlWCIsInNjcm9sbExlZnQiLCJwcmV2ZW50RGVmYXVsdCIsIm1vdXNlbW92ZSIsImJ1dHRvbnMiLCJzdG9wTW92ZSIsIngiLCJtb3VzZXVwIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7QUFBZSxNQUFNQSxTQUFOLENBQWdCOztFQUU5QkMsV0FBVyxDQUFDQyxJQUFELEVBQU87U0FFWkMsSUFBTCxDQUFVRCxJQUFWOzs7RUFFREMsSUFBSSxDQUFDRCxJQUFELEVBQU87OztRQUdOLENBQUNFLE1BQUwsRUFBYTs7OztJQUdiQSxNQUFNLENBQUNDLGdCQUFQLENBQXdCLFdBQXhCLEVBQXFDLFlBQVksRUFBakQ7U0FFS0MsR0FBTCxHQUFXLEVBQVg7U0FDS0MsV0FBTCxHQUFtQixLQUFuQjtTQUNLQyxRQUFMLEdBQWdCLElBQWhCO1NBQ0tDLGlCQUFMLEdBQXlCLElBQXpCO1NBQ0tDLFFBQUwsR0FBZ0IsSUFBaEI7U0FFS0MsUUFBTCxHQUFnQixFQUFoQjtRQUVJ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
