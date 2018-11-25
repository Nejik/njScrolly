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
    this.moveStarted;
    this.initialX;
    this.initialScrollLeft;
    this.currentX;
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

  addListeners() {
    this.els.wrap.addEventListener('mousedown', this.handlers.mousedown = e => {
      if (!this.closest(e.target, this.els.wrap)) {
        //move only inside wrap component
        return;
      }

      this.moveStarted = true;
      this.initialX = e.pageX;
      this.currentX = e.pageX;
      this.initialScrollLeft = this.els.wrap.scrollLeft;
      e.preventDefault();
      this.startMoveListen();
    });
  }

  startMoveListen() {
    if (this.moveHandlers) return;
    document.addEventListener('mousemove', this.handlers.mousemove = e => {
      if (!this.moveStarted) {
        return;
      }

      if (typeof e.buttons === 'number' && e.buttons === 0) {
        stopMove();
        return;
      }

      this.currentX = e.pageX;
      this.diff = this.initialX - this.currentX;
      this.els.wrap.scrollLeft = this.initialScrollLeft + this.diff;
    });
    document.addEventListener('mouseup', this.handlers.mouseup = e => {
      if (Math.abs(this.diff) > this.o.diffThreshold && this.o.preventLinks) {
        //try to prevent default link(a tag)
        document.addEventListener('click', this.handlers.dragclick = e => {
          if (!e.target.tagName.toUpperCase() === 'A') return;
          if (!this.closest(e.target, this.els.wrap)) return;
          e.preventDefault();
          document.removeEventListener('click', this.handlers.dragclick);
          delete this.handlers.dragclick;
        }); //wait 50ms for click event to prevent link href behaviour

        setTimeout(() => {
          if (!this.handlers.dragclick) return;
          document.removeEventListener('click', this.handlers.dragclick);
          delete this.handlers.dragclick;
        }, 50);
      }

      stopMove();
    });

    const stopMove = () => {
      if (!this.moveStarted) return;
      this.initialX = null;
      this.currentX = null;
      this.diff = null;
      this.initialScrollLeft = null;
      this.moveStarted = false;
      this.stopMoveListen();
    };

    this.moveHandlers = true;
  }

  stopMoveListen() {
    document.removeEventListener('mousemove', this.handlers.mousemove);
    delete this.handlers.mousemove;
    document.removeEventListener('mouseup', this.handlers.mouseup);
    delete this.handlers.mouseup;
    this.moveHandlers = false;
  }

  removeListeners() {
    this.els.wrap.removeEventListener('mousedown', this.handlers.mousedown);
    delete this.handlers.mousedown;
    this.stopMoveListen();

    if (this.handlers.dragclick) {
      document.removeEventListener('click', this.handlers.dragclick);
      delete this.handlers.dragclick;
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

  destroy() {
    this.removeListeners();
  }

}
const _defaults = {
  el: undefined,
  preventLinks: true,
  diffThreshold: 5
};

module.exports = njScrolly;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmpTY3JvbGx5LmNqcy5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgbmpTY3JvbGx5IHtcclxuXHQvL29wdGlvbnNcclxuXHRjb25zdHJ1Y3RvcihvcHRzKSB7XHJcblxyXG5cdFx0dGhpcy5pbml0KG9wdHMpO1xyXG5cdH1cclxuXHRpbml0KG9wdHMpIHtcclxuXHRcdC8vIGZpeGVzIHdlaXJkIHNhZmFyaSAxMCBidWcgd2hlcmUgcHJldmVudERlZmF1bHQgaXMgcHJldmVudGVkXHJcblx0XHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tZXRhZml6enkvZmxpY2tpdHkvaXNzdWVzLzQ1NyNpc3N1ZWNvbW1lbnQtMjU0NTAxMzU2XHJcblx0XHRpZiAoIXdpbmRvdykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgZnVuY3Rpb24gKCkge30pO1xyXG5cclxuXHRcdHRoaXMuZWxzID0ge307XHJcblx0XHR0aGlzLm1vdmVTdGFydGVkO1xyXG5cdFx0dGhpcy5pbml0aWFsWDtcclxuXHRcdHRoaXMuaW5pdGlhbFNjcm9sbExlZnQ7XHJcblx0XHR0aGlzLmN1cnJlbnRYO1xyXG5cclxuXHRcdHRoaXMuaGFuZGxlcnMgPSB7fTtcclxuXHJcblx0XHRsZXQgb3B0aW9ucyA9IHt9O1xyXG5cdFx0aWYgKHR5cGVvZiBvcHRzID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRvcHRpb25zLmVsID0gb3B0cztcclxuXHRcdH0gZWxzZSBpZiAodHlwZW9mIG9wdHMgPT09ICdvYmplY3QnKSB7XHJcblx0XHRcdGlmIChvcHRzIGluc3RhbmNlb2YgRWxlbWVudCkge1xyXG5cdFx0XHRcdG9wdGlvbnMuZWwgPSBvcHRzO1xyXG5cdFx0XHR9IGVsc2UgaWYgKG9wdHNbMF0gJiYgb3B0c1swXSBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcclxuXHRcdFx0XHRvcHRpb25zLmVsID0gb3B0c1swXTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRvcHRpb25zID0gb3B0cztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMubyA9IE9iamVjdC5hc3NpZ24oe30sIF9kZWZhdWx0cywgb3B0aW9ucyk7XHJcblx0XHRjb25zdCBnYXRoZXJSZXN1bHRzID0gdGhpcy5nYXRoZXJFbGVtZW50cygpO1xyXG5cdFx0aWYgKGdhdGhlclJlc3VsdHMgPT09IGZhbHNlKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmFkZExpc3RlbmVycygpO1xyXG5cdH1cclxuXHJcblx0Z2F0aGVyRWxlbWVudHMoKSB7XHJcblx0XHR0aGlzLmVscyA9IHt9O1xyXG5cclxuXHRcdGlmICh0eXBlb2YgdGhpcy5vLmVsID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aGlzLmVscy53cmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLm8uZWwpXHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuby5lbCkge1xyXG5cdFx0XHR0aGlzLmVscy53cmFwID0gdGhpcy5vLmVsO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCF0aGlzLmVscy53cmFwKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ25qU2Nyb2xseTogc291cmNlIChvLmVsKSBub3QgZm91bmQuJyk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9XHJcblx0YWRkTGlzdGVuZXJzKCkge1xyXG5cdFx0dGhpcy5lbHMud3JhcC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZXJzLm1vdXNlZG93biA9IChlKSA9PiB7XHJcblx0XHRcdGlmICghdGhpcy5jbG9zZXN0KGUudGFyZ2V0LCB0aGlzLmVscy53cmFwKSkge1xyXG5cdFx0XHRcdC8vbW92ZSBvbmx5IGluc2lkZSB3cmFwIGNvbXBvbmVudFxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5tb3ZlU3RhcnRlZCA9IHRydWU7XHJcblx0XHRcdHRoaXMuaW5pdGlhbFggPSBlLnBhZ2VYO1xyXG5cdFx0XHR0aGlzLmN1cnJlbnRYID0gZS5wYWdlWDtcclxuXHRcdFx0dGhpcy5pbml0aWFsU2Nyb2xsTGVmdCA9IHRoaXMuZWxzLndyYXAuc2Nyb2xsTGVmdDtcclxuXHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdHRoaXMuc3RhcnRNb3ZlTGlzdGVuKCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblx0c3RhcnRNb3ZlTGlzdGVuKCkge1xyXG5cdFx0aWYgKHRoaXMubW92ZUhhbmRsZXJzKSByZXR1cm47XHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZXJzLm1vdXNlbW92ZSA9IChlKSA9PiB7XHJcblx0XHRcdGlmICghdGhpcy5tb3ZlU3RhcnRlZCkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHR5cGVvZiBlLmJ1dHRvbnMgPT09ICdudW1iZXInICYmIGUuYnV0dG9ucyA9PT0gMCkge1xyXG5cdFx0XHRcdHN0b3BNb3ZlKCk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmN1cnJlbnRYID0gZS5wYWdlWDtcclxuXHRcdFx0dGhpcy5kaWZmID0gdGhpcy5pbml0aWFsWCAtIHRoaXMuY3VycmVudFg7XHJcblx0XHRcdHRoaXMuZWxzLndyYXAuc2Nyb2xsTGVmdCA9IHRoaXMuaW5pdGlhbFNjcm9sbExlZnQgKyB0aGlzLmRpZmY7XHJcblx0XHR9KTtcclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVycy5tb3VzZXVwID0gKGUpID0+IHtcclxuXHRcdFx0XHJcblx0XHRcdGlmIChNYXRoLmFicyh0aGlzLmRpZmYpID4gdGhpcy5vLmRpZmZUaHJlc2hvbGQgJiYgdGhpcy5vLnByZXZlbnRMaW5rcykge1xyXG5cdFx0XHRcdC8vdHJ5IHRvIHByZXZlbnQgZGVmYXVsdCBsaW5rKGEgdGFnKVxyXG5cdFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVycy5kcmFnY2xpY2sgPSAoZSkgPT4ge1xyXG5cdFx0XHRcdFx0aWYgKCFlLnRhcmdldC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdBJykgcmV0dXJuO1xyXG5cdFx0XHRcdFx0aWYgKCF0aGlzLmNsb3Nlc3QoZS50YXJnZXQsIHRoaXMuZWxzLndyYXApKSByZXR1cm47XHJcblxyXG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZXJzLmRyYWdjbGljayk7XHJcblx0XHRcdFx0XHRkZWxldGUgdGhpcy5oYW5kbGVycy5kcmFnY2xpY2s7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdC8vd2FpdCA1MG1zIGZvciBjbGljayBldmVudCB0byBwcmV2ZW50IGxpbmsgaHJlZiBiZWhhdmlvdXJcclxuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRcdGlmKCF0aGlzLmhhbmRsZXJzLmRyYWdjbGljaykgcmV0dXJuO1xyXG5cdFx0XHRcdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZXJzLmRyYWdjbGljayk7XHJcblx0XHRcdFx0XHRkZWxldGUgdGhpcy5oYW5kbGVycy5kcmFnY2xpY2s7XHJcblx0XHRcdFx0fSwgNTApO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzdG9wTW92ZSgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Y29uc3Qgc3RvcE1vdmUgPSAoKSA9PiB7XHJcblx0XHRcdGlmICghdGhpcy5tb3ZlU3RhcnRlZCkgcmV0dXJuO1xyXG5cdFx0XHR0aGlzLmluaXRpYWxYID0gbnVsbDtcclxuXHRcdFx0dGhpcy5jdXJyZW50WCA9IG51bGxcclxuXHRcdFx0dGhpcy5kaWZmID0gbnVsbDtcclxuXHRcdFx0dGhpcy5pbml0aWFsU2Nyb2xsTGVmdCA9IG51bGw7XHJcblxyXG5cdFx0XHR0aGlzLm1vdmVTdGFydGVkID0gZmFsc2U7XHJcblxyXG5cdFx0XHR0aGlzLnN0b3BNb3ZlTGlzdGVuKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5tb3ZlSGFuZGxlcnMgPSB0cnVlO1xyXG5cdH1cclxuXHRzdG9wTW92ZUxpc3RlbigpIHtcclxuXHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuaGFuZGxlcnMubW91c2Vtb3ZlKVxyXG5cdFx0ZGVsZXRlIHRoaXMuaGFuZGxlcnMubW91c2Vtb3ZlO1xyXG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlcnMubW91c2V1cClcclxuXHRcdGRlbGV0ZSB0aGlzLmhhbmRsZXJzLm1vdXNldXA7XHJcblxyXG5cdFx0dGhpcy5tb3ZlSGFuZGxlcnMgPSBmYWxzZTtcclxuXHR9XHJcblx0cmVtb3ZlTGlzdGVuZXJzKCkge1xyXG5cdFx0dGhpcy5lbHMud3JhcC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZXJzLm1vdXNlZG93bik7XHJcblx0XHRkZWxldGUgdGhpcy5oYW5kbGVycy5tb3VzZWRvd247XHJcblx0XHRcclxuXHRcdHRoaXMuc3RvcE1vdmVMaXN0ZW4oKTtcclxuXHJcblx0XHRpZiAodGhpcy5oYW5kbGVycy5kcmFnY2xpY2spIHtcclxuXHRcdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZXJzLmRyYWdjbGljayk7XHJcblx0XHRcdGRlbGV0ZSB0aGlzLmhhbmRsZXJzLmRyYWdjbGljaztcclxuXHRcdH1cclxuXHR9XHJcblx0Y2xvc2VzdChlbCwgdGFyZ2V0KSB7XHJcblx0XHRpZiAoIWVsIHx8ICF0YXJnZXQpIHJldHVybjtcclxuXHRcdGxldCBjdXJyZW50ID0gZWw7XHJcblx0XHRkbyB7XHJcblx0XHRcdGlmIChjdXJyZW50ID09PSB0YXJnZXQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjdXJyZW50ID0gY3VycmVudC5wYXJlbnROb2RlXHJcblx0XHR9IHdoaWxlIChjdXJyZW50LnBhcmVudE5vZGUpO1xyXG5cdH1cclxuXHRkZXN0cm95KCkge1xyXG5cclxuXHRcdHRoaXMucmVtb3ZlTGlzdGVuZXJzKCk7XHJcblx0fVxyXG59XHJcblxyXG5jb25zdCBfZGVmYXVsdHMgPSB7XHJcblx0ZWw6IHVuZGVmaW5lZCxcclxuXHRwcmV2ZW50TGlua3M6IHRydWUsXHJcblx0ZGlmZlRocmVzaG9sZDogNVxyXG59Il0sIm5hbWVzIjpbIm5qU2Nyb2xseSIsImNvbnN0cnVjdG9yIiwib3B0cyIsImluaXQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZWxzIiwibW92ZVN0YXJ0ZWQiLCJpbml0aWFsWCIsImluaXRpYWxTY3JvbGxMZWZ0IiwiY3VycmVudFgiLCJoYW5kbGVycyIsIm9wdGlvbnMiLCJlbCIsIkVsZW1lbnQiLCJvIiwiT2JqZWN0IiwiYXNzaWduIiwiX2RlZmF1bHRzIiwiZ2F0aGVyUmVzdWx0cyIsImdhdGhlckVsZW1lbnRzIiwiYWRkTGlzdGVuZXJzIiwid3JhcCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNvbnNvbGUiLCJlcnJvciIsIm1vdXNlZG93biIsImUiLCJjbG9zZXN0IiwidGFyZ2V0IiwicGFnZVgiLCJzY3JvbGxMZWZ0IiwicHJldmVudERlZmF1bHQiLCJzdGFydE1vdmVMaXN0ZW4iLCJtb3ZlSGFuZGxlcnMiLCJtb3VzZW1vdmUiLCJidXR0b25zIiwic3RvcE1vdmUiLCJkaWZmIiwibW91c2V1cCIsIk1hdGgiLCJhYnMiLCJkaWZmVGhyZXNob2xkIiwicHJldmVudExpbmtzIiwiZHJhZ2NsaWNrIiwidGFnTmFtZSIsInRvVXBwZXJDYXNlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInNldFRpbWVvdXQiLCJzdG9wTW92ZUxpc3RlbiIsInJlbW92ZUxpc3RlbmVycyIsImN1cnJlbnQiLCJwYXJlbnROb2RlIiwiZGVzdHJveSIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7QUFBZSxNQUFNQSxTQUFOLENBQWdCOztFQUU5QkMsV0FBVyxDQUFDQyxJQUFELEVBQU87U0FFWkMsSUFBTCxDQUFVRCxJQUFWOzs7RUFFREMsSUFBSSxDQUFDRCxJQUFELEVBQU87OztRQUdOLENBQUNFLE1BQUwsRUFBYTs7OztJQUdiQSxNQUFNLENBQUNDLGdCQUFQLENBQXdCLFdBQXhCLEVBQXFDLFlBQVksRUFBakQ7U0FFS0MsR0FBTCxHQUFXLEVBQVg7U0FDS0MsV0FBTDtTQUNLQyxRQUFMO1NBQ0tDLGlCQUFMO1NBQ0tDLFFBQUw7U0FFS0MsUUFBTCxHQUFnQixFQUFoQjtRQUVJQyxPQUFPLEdBQUcsRUFBZDs7UUFDSSxPQUFPVixJQUFQLEtBQWdCLFFBQXBCLEVBQThCO01BQzdCVSxPQUFPLENBQUNDLEVBQVIsR0FBYVgsSUFBYjtLQURELE1BRU8sSUFBSSxPQUFPQSxJQUFQLEtBQWdCLFFBQXBCLEVBQThCO1VBQ2hDQSxJQUFJLFlBQVlZLE9BQXBCLEVBQTZCO1FBQzVCRixPQUFPLENBQUNDLEVBQVIsR0FBYVgsSUFBYjtPQURELE1BRU8sSUFBSUEsSUFBSSxDQUFDLENBQUQsQ0FBSixJQUFXQSxJQUFJLENBQUMsQ0FBRCxDQUFKLFlBQW1CWSxPQUFsQyxFQUEyQztRQUNqREYsT0FBTyxDQUFDQyxFQUFSLEdBQWFYLElBQUksQ0FBQyxDQUFELENBQWpCO09BRE0sTUFFQTtRQUNOVSxPQUFPLEdBQUdWLElBQVY7Ozs7U0FJR2EsQ0FBTCxHQUFTQyxNQUFNLENBQUNDLE1BQVAsQ0FBYyxFQUFkLEVBQWtCQyxTQUFsQixFQUE2Qk4sT0FBN0Is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
