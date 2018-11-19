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
    this.mouseMoveListenersAdded = false;
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
    this.els.wrap.addEventListener('mouseenter', this.handlers.wrapMouseenter = e => {
      this.listenMove();
    });
    this.els.wrap.addEventListener('mouseleave', this.handlers.wrapMouseleave = e => {
      this.unlistenMove();
    });
  }

  listenMove() {
    if (this.mouseMoveListenersAdded) return;
    document.addEventListener('mousedown', this.handlers.mousedown = e => {
      if (!this.closest(e.target, this.els.wrap)) {
        //move only inside wrap component
        return;
      }

      this.moveStarted = true;
      this.initialX = e.pageX;
      this.currentX = e.pageX;
      this.initialScrollLeft = this.els.wrap.scrollLeft;
      e.preventDefault();
      e.stopPropagation();
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
      this.moveStarted = false;
      this.unlistenMove();
    };

    this.mouseMoveListenersAdded = true;
  }

  unlistenMove() {
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

  removeListeners() {
    this.els.wrap.removeEventListener('mousedown', this.handlers.wrapMouseenter);
    delete this.handlers.wrapMouseenter;
    this.els.wrap.removeEventListener('mouseleave', this.handlers.wrapMouseleave);
    delete this.handlers.wrapMouseleave;
  }

}
const _defaults = {
  el: undefined
};

module.exports = njScrolly;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmpTY3JvbGx5LmNqcy5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgbmpTY3JvbGx5IHtcclxuXHQvL29wdGlvbnNcclxuXHRjb25zdHJ1Y3RvcihvcHRzKSB7XHJcblxyXG5cdFx0dGhpcy5pbml0KG9wdHMpO1xyXG5cdH1cclxuXHRpbml0KG9wdHMpIHtcclxuXHRcdC8vIGZpeGVzIHdlaXJkIHNhZmFyaSAxMCBidWcgd2hlcmUgcHJldmVudERlZmF1bHQgaXMgcHJldmVudGVkXHJcblx0XHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tZXRhZml6enkvZmxpY2tpdHkvaXNzdWVzLzQ1NyNpc3N1ZWNvbW1lbnQtMjU0NTAxMzU2XHJcblx0XHRpZiAoIXdpbmRvdykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgZnVuY3Rpb24gKCkge30pO1xyXG5cclxuXHRcdHRoaXMuZWxzID0ge307XHJcblx0XHR0aGlzLm1vdmVTdGFydGVkID0gZmFsc2U7XHJcblx0XHR0aGlzLmluaXRpYWxYID0gbnVsbDtcclxuXHRcdHRoaXMuaW5pdGlhbFNjcm9sbExlZnQgPSBudWxsO1xyXG5cdFx0dGhpcy5jdXJyZW50WCA9IG51bGw7XHJcblxyXG5cdFx0dGhpcy5oYW5kbGVycyA9IHt9O1xyXG5cdFx0dGhpcy5tb3VzZU1vdmVMaXN0ZW5lcnNBZGRlZCA9IGZhbHNlO1xyXG5cclxuXHRcdGxldCBvcHRpb25zID0ge307XHJcblx0XHRpZiAodHlwZW9mIG9wdHMgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdG9wdGlvbnMuZWwgPSBvcHRzO1xyXG5cdFx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0cyA9PT0gJ29iamVjdCcpIHtcclxuXHRcdFx0aWYgKG9wdHMgaW5zdGFuY2VvZiBFbGVtZW50KSB7XHJcblx0XHRcdFx0b3B0aW9ucy5lbCA9IG9wdHM7XHJcblx0XHRcdH0gZWxzZSBpZiAob3B0c1swXSAmJiBvcHRzWzBdIGluc3RhbmNlb2YgRWxlbWVudCkge1xyXG5cdFx0XHRcdG9wdGlvbnMuZWwgPSBvcHRzWzBdO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdG9wdGlvbnMgPSBvcHRzO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5vID0gT2JqZWN0LmFzc2lnbih7fSwgX2RlZmF1bHRzLCBvcHRpb25zKTtcclxuXHRcdGNvbnN0IGdhdGhlclJlc3VsdHMgPSB0aGlzLmdhdGhlckVsZW1lbnRzKCk7XHJcblx0XHRpZiAoZ2F0aGVyUmVzdWx0cyA9PT0gZmFsc2UpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuYWRkTGlzdGVuZXJzKCk7XHJcblx0fVxyXG5cdGRlc3Ryb3koKSB7XHJcblxyXG5cdFx0dGhpcy5yZW1vdmVMaXN0ZW5lcnMoKTtcclxuXHR9XHJcblx0Z2F0aGVyRWxlbWVudHMoKSB7XHJcblx0XHR0aGlzLmVscyA9IHt9O1xyXG5cclxuXHRcdGlmICh0eXBlb2YgdGhpcy5vLmVsID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aGlzLmVscy53cmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLm8uZWwpXHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuby5lbCkge1xyXG5cdFx0XHR0aGlzLmVscy53cmFwID0gdGhpcy5vLmVsO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCF0aGlzLmVscy53cmFwKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ25qU2Nyb2xseTogc291cmNlIChvLmVsKSBub3QgZm91bmQuJyk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9XHJcblx0Y2xvc2VzdChlbCwgdGFyZ2V0KSB7XHJcblx0XHRpZiAoIWVsIHx8ICF0YXJnZXQpIHJldHVybjtcclxuXHRcdGxldCBjdXJyZW50ID0gZWw7XHJcblx0XHRkbyB7XHJcblx0XHRcdGlmIChjdXJyZW50ID09PSB0YXJnZXQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjdXJyZW50ID0gY3VycmVudC5wYXJlbnROb2RlXHJcblx0XHR9IHdoaWxlIChjdXJyZW50LnBhcmVudE5vZGUpO1xyXG5cdH1cclxuXHRhZGRMaXN0ZW5lcnMoKSB7XHJcblx0XHR0aGlzLmVscy53cmFwLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLmhhbmRsZXJzLndyYXBNb3VzZWVudGVyID0gKGUpID0+IHtcclxuXHRcdFx0dGhpcy5saXN0ZW5Nb3ZlKCk7XHJcblx0XHR9KVxyXG5cdFx0dGhpcy5lbHMud3JhcC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5oYW5kbGVycy53cmFwTW91c2VsZWF2ZSA9IChlKSA9PiB7XHJcblx0XHRcdHRoaXMudW5saXN0ZW5Nb3ZlKCk7XHJcblx0XHR9KVxyXG5cdH1cclxuXHRsaXN0ZW5Nb3ZlKCkge1xyXG5cdFx0aWYgKHRoaXMubW91c2VNb3ZlTGlzdGVuZXJzQWRkZWQpIHJldHVybjtcclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlcnMubW91c2Vkb3duID0gKGUpID0+IHtcclxuXHRcdFx0aWYgKCF0aGlzLmNsb3Nlc3QoZS50YXJnZXQsIHRoaXMuZWxzLndyYXApKSB7XHJcblx0XHRcdFx0Ly9tb3ZlIG9ubHkgaW5zaWRlIHdyYXAgY29tcG9uZW50XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMubW92ZVN0YXJ0ZWQgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLmluaXRpYWxYID0gZS5wYWdlWDtcclxuXHRcdFx0dGhpcy5jdXJyZW50WCA9IGUucGFnZVg7XHJcblx0XHRcdHRoaXMuaW5pdGlhbFNjcm9sbExlZnQgPSB0aGlzLmVscy53cmFwLnNjcm9sbExlZnQ7XHJcblxyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZXJzLm1vdXNlbW92ZSA9IChlKSA9PiB7XHJcblx0XHRcdGlmICghdGhpcy5tb3ZlU3RhcnRlZCkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0aWYgKHR5cGVvZiBlLmJ1dHRvbnMgPT09ICdudW1iZXInICYmIGUuYnV0dG9ucyA9PT0gMCkge1xyXG5cdFx0XHRcdHN0b3BNb3ZlKCk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuY3VycmVudFggPSBlLnBhZ2VYO1xyXG5cdFx0XHR0aGlzLnggPSB0aGlzLmluaXRpYWxYIC0gdGhpcy5jdXJyZW50WDtcclxuXHRcdFx0dGhpcy5lbHMud3JhcC5zY3JvbGxMZWZ0ID0gdGhpcy5pbml0aWFsU2Nyb2xsTGVmdCArIHRoaXMueDtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZXJzLm1vdXNldXAgPSAoZSkgPT4ge1xyXG5cdFx0XHRzdG9wTW92ZSgpO1xyXG5cdFx0fSk7XHJcblx0XHRjb25zdCBzdG9wTW92ZSA9ICgpID0+IHtcclxuXHRcdFx0aWYgKCF0aGlzLm1vdmVTdGFydGVkKSByZXR1cm47XHJcblx0XHRcdHRoaXMuaW5pdGlhbFggPSBudWxsO1xyXG5cdFx0XHR0aGlzLmN1cnJlbnRYID0gbnVsbFxyXG5cdFx0XHR0aGlzLnggPSBudWxsO1xyXG5cdFx0XHR0aGlzLmluaXRpYWxTY3JvbGxMZWZ0ID0gbnVsbDtcclxuXHRcdFx0XHJcblx0XHRcdHRoaXMubW92ZVN0YXJ0ZWQgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy51bmxpc3Rlbk1vdmUoKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0dGhpcy5tb3VzZU1vdmVMaXN0ZW5lcnNBZGRlZCA9IHRydWU7XHJcblx0fVxyXG5cdHVubGlzdGVuTW92ZSgpIHtcclxuXHRcdGlmKHRoaXMubW92ZVN0YXJ0ZWQpIHJldHVybjtcclxuXHRcdGlmICghdGhpcy5tb3VzZU1vdmVMaXN0ZW5lcnNBZGRlZCkgcmV0dXJuO1xyXG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVycy5tb3VzZWRvd24pXHJcblx0XHRkZWxldGUgdGhpcy5oYW5kbGVycy5tb3VzZWRvd247XHJcblx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZXJzLm1vdXNlbW92ZSlcclxuXHRcdGRlbGV0ZSB0aGlzLmhhbmRsZXJzLm1vdXNlbW92ZTtcclxuXHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZXJzLm1vdXNldXApXHJcblx0XHRkZWxldGUgdGhpcy5oYW5kbGVycy5tb3VzZXVwO1xyXG5cdFx0dGhpcy5tb3VzZU1vdmVMaXN0ZW5lcnNBZGRlZCA9IGZhbHNlO1xyXG5cdH1cclxuXHRyZW1vdmVMaXN0ZW5lcnMoKSB7XHJcblx0XHR0aGlzLmVscy53cmFwLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlcnMud3JhcE1vdXNlZW50ZXIpXHJcblx0XHRkZWxldGUgdGhpcy5oYW5kbGVycy53cmFwTW91c2VlbnRlcjtcclxuXHRcdFxyXG5cdFx0dGhpcy5lbHMud3JhcC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5oYW5kbGVycy53cmFwTW91c2VsZWF2ZSlcclxuXHRcdGRlbGV0ZSB0aGlzLmhhbmRsZXJzLndyYXBNb3VzZWxlYXZlO1xyXG5cdH1cclxufVxyXG5cclxuY29uc3QgX2RlZmF1bHRzID0ge1xyXG5cdGVsOiB1bmRlZmluZWRcclxufSJdLCJuYW1lcyI6WyJualNjcm9sbHkiLCJjb25zdHJ1Y3RvciIsIm9wdHMiLCJpbml0Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImVscyIsIm1vdmVTdGFydGVkIiwiaW5pdGlhbFgiLCJpbml0aWFsU2Nyb2xsTGVmdCIsImN1cnJlbnRYIiwiaGFuZGxlcnMiLCJtb3VzZU1vdmVMaXN0ZW5lcnNBZGRlZCIsIm9wdGlvbnMiLCJlbCIsIkVsZW1lbnQiLCJvIiwiT2JqZWN0IiwiYXNzaWduIiwiX2RlZmF1bHRzIiwiZ2F0aGVyUmVzdWx0cyIsImdhdGhlckVsZW1lbnRzIiwiYWRkTGlzdGVuZXJzIiwiZGVzdHJveSIsInJlbW92ZUxpc3RlbmVycyIsIndyYXAiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjb25zb2xlIiwiZXJyb3IiLCJjbG9zZXN0IiwidGFyZ2V0IiwiY3VycmVudCIsInBhcmVudE5vZGUiLCJ3cmFwTW91c2VlbnRlciIsImUiLCJsaXN0ZW5Nb3ZlIiwid3JhcE1vdXNlbGVhdmUiLCJ1bmxpc3Rlbk1vdmUiLCJtb3VzZWRvd24iLCJwYWdlWCIsInNjcm9sbExlZnQiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsIm1vdXNlbW92ZSIsImJ1dHRvbnMiLCJzdG9wTW92ZSIsIngiLCJtb3VzZXVwIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7QUFBZSxNQUFNQSxTQUFOLENBQWdCOztFQUU5QkMsV0FBVyxDQUFDQyxJQUFELEVBQU87U0FFWkMsSUFBTCxDQUFVRCxJQUFWOzs7RUFFREMsSUFBSSxDQUFDRCxJQUFELEVBQU87OztRQUdOLENBQUNFLE1BQUwsRUFBYTs7OztJQUdiQSxNQUFNLENBQUNDLGdCQUFQLENBQXdCLFdBQXhCLEVBQXFDLFlBQVksRUFBakQ7U0FFS0MsR0FBTCxHQUFXLEVBQVg7U0FDS0MsV0FBTCxHQUFtQixLQUFuQjtTQUNLQyxRQUFMLEdBQWdCLElBQWhCO1NB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
