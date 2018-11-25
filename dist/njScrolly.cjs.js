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
      if (Math.abs(this.diff) > this.o.minDiff && this.o.fixLinks) {
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
    this.stopMoveListen();
    this.els.wrap.addEventListener('mousedown', this.handlers.mousedown);
    delete this.handlers.mousedown;

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
  fixLinks: true,
  minDiff: 5
};

module.exports = njScrolly;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmpTY3JvbGx5LmNqcy5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgbmpTY3JvbGx5IHtcclxuXHQvL29wdGlvbnNcclxuXHRjb25zdHJ1Y3RvcihvcHRzKSB7XHJcblxyXG5cdFx0dGhpcy5pbml0KG9wdHMpO1xyXG5cdH1cclxuXHRpbml0KG9wdHMpIHtcclxuXHRcdC8vIGZpeGVzIHdlaXJkIHNhZmFyaSAxMCBidWcgd2hlcmUgcHJldmVudERlZmF1bHQgaXMgcHJldmVudGVkXHJcblx0XHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tZXRhZml6enkvZmxpY2tpdHkvaXNzdWVzLzQ1NyNpc3N1ZWNvbW1lbnQtMjU0NTAxMzU2XHJcblx0XHRpZiAoIXdpbmRvdykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgZnVuY3Rpb24gKCkge30pO1xyXG5cclxuXHRcdHRoaXMuZWxzID0ge307XHJcblx0XHR0aGlzLm1vdmVTdGFydGVkO1xyXG5cdFx0dGhpcy5pbml0aWFsWDtcclxuXHRcdHRoaXMuaW5pdGlhbFNjcm9sbExlZnQ7XHJcblx0XHR0aGlzLmN1cnJlbnRYO1xyXG5cclxuXHRcdHRoaXMuaGFuZGxlcnMgPSB7fTtcclxuXHJcblx0XHRsZXQgb3B0aW9ucyA9IHt9O1xyXG5cdFx0aWYgKHR5cGVvZiBvcHRzID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRvcHRpb25zLmVsID0gb3B0cztcclxuXHRcdH0gZWxzZSBpZiAodHlwZW9mIG9wdHMgPT09ICdvYmplY3QnKSB7XHJcblx0XHRcdGlmIChvcHRzIGluc3RhbmNlb2YgRWxlbWVudCkge1xyXG5cdFx0XHRcdG9wdGlvbnMuZWwgPSBvcHRzO1xyXG5cdFx0XHR9IGVsc2UgaWYgKG9wdHNbMF0gJiYgb3B0c1swXSBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcclxuXHRcdFx0XHRvcHRpb25zLmVsID0gb3B0c1swXTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRvcHRpb25zID0gb3B0cztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMubyA9IE9iamVjdC5hc3NpZ24oe30sIF9kZWZhdWx0cywgb3B0aW9ucyk7XHJcblx0XHRjb25zdCBnYXRoZXJSZXN1bHRzID0gdGhpcy5nYXRoZXJFbGVtZW50cygpO1xyXG5cdFx0aWYgKGdhdGhlclJlc3VsdHMgPT09IGZhbHNlKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmFkZExpc3RlbmVycygpO1xyXG5cdH1cclxuXHJcblx0Z2F0aGVyRWxlbWVudHMoKSB7XHJcblx0XHR0aGlzLmVscyA9IHt9O1xyXG5cclxuXHRcdGlmICh0eXBlb2YgdGhpcy5vLmVsID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aGlzLmVscy53cmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLm8uZWwpXHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuby5lbCkge1xyXG5cdFx0XHR0aGlzLmVscy53cmFwID0gdGhpcy5vLmVsO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCF0aGlzLmVscy53cmFwKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ25qU2Nyb2xseTogc291cmNlIChvLmVsKSBub3QgZm91bmQuJyk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9XHJcblx0YWRkTGlzdGVuZXJzKCkge1xyXG5cdFx0dGhpcy5lbHMud3JhcC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZXJzLm1vdXNlZG93biA9IChlKSA9PiB7XHJcblx0XHRcdGlmICghdGhpcy5jbG9zZXN0KGUudGFyZ2V0LCB0aGlzLmVscy53cmFwKSkge1xyXG5cdFx0XHRcdC8vbW92ZSBvbmx5IGluc2lkZSB3cmFwIGNvbXBvbmVudFxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5tb3ZlU3RhcnRlZCA9IHRydWU7XHJcblx0XHRcdHRoaXMuaW5pdGlhbFggPSBlLnBhZ2VYO1xyXG5cdFx0XHR0aGlzLmN1cnJlbnRYID0gZS5wYWdlWDtcclxuXHRcdFx0dGhpcy5pbml0aWFsU2Nyb2xsTGVmdCA9IHRoaXMuZWxzLndyYXAuc2Nyb2xsTGVmdDtcclxuXHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdHRoaXMuc3RhcnRNb3ZlTGlzdGVuKCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblx0c3RhcnRNb3ZlTGlzdGVuKCkge1xyXG5cdFx0aWYgKHRoaXMubW92ZUhhbmRsZXJzKSByZXR1cm47XHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZXJzLm1vdXNlbW92ZSA9IChlKSA9PiB7XHJcblx0XHRcdGlmICghdGhpcy5tb3ZlU3RhcnRlZCkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHR5cGVvZiBlLmJ1dHRvbnMgPT09ICdudW1iZXInICYmIGUuYnV0dG9ucyA9PT0gMCkge1xyXG5cdFx0XHRcdHN0b3BNb3ZlKCk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmN1cnJlbnRYID0gZS5wYWdlWDtcclxuXHRcdFx0dGhpcy5kaWZmID0gdGhpcy5pbml0aWFsWCAtIHRoaXMuY3VycmVudFg7XHJcblx0XHRcdHRoaXMuZWxzLndyYXAuc2Nyb2xsTGVmdCA9IHRoaXMuaW5pdGlhbFNjcm9sbExlZnQgKyB0aGlzLmRpZmY7XHJcblx0XHR9KTtcclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVycy5tb3VzZXVwID0gKGUpID0+IHtcclxuXHRcdFx0XHJcblx0XHRcdGlmIChNYXRoLmFicyh0aGlzLmRpZmYpID4gdGhpcy5vLm1pbkRpZmYgJiYgdGhpcy5vLmZpeExpbmtzKSB7XHJcblx0XHRcdFx0Ly90cnkgdG8gcHJldmVudCBkZWZhdWx0IGxpbmsoYSB0YWcpXHJcblx0XHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZXJzLmRyYWdjbGljayA9IChlKSA9PiB7XHJcblx0XHRcdFx0XHRpZiAoIWUudGFyZ2V0LnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gJ0EnKSByZXR1cm47XHJcblx0XHRcdFx0XHRpZiAoIXRoaXMuY2xvc2VzdChlLnRhcmdldCwgdGhpcy5lbHMud3JhcCkpIHJldHVybjtcclxuXHJcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlcnMuZHJhZ2NsaWNrKTtcclxuXHRcdFx0XHRcdGRlbGV0ZSB0aGlzLmhhbmRsZXJzLmRyYWdjbGljaztcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0Ly93YWl0IDUwbXMgZm9yIGNsaWNrIGV2ZW50IHRvIHByZXZlbnQgbGluayBocmVmIGJlaGF2aW91clxyXG5cdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdFx0aWYoIXRoaXMuaGFuZGxlcnMuZHJhZ2NsaWNrKSByZXR1cm47XHJcblx0XHRcdFx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlcnMuZHJhZ2NsaWNrKTtcclxuXHRcdFx0XHRcdGRlbGV0ZSB0aGlzLmhhbmRsZXJzLmRyYWdjbGljaztcclxuXHRcdFx0XHR9LCA1MCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHN0b3BNb3ZlKCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRjb25zdCBzdG9wTW92ZSA9ICgpID0+IHtcclxuXHRcdFx0aWYgKCF0aGlzLm1vdmVTdGFydGVkKSByZXR1cm47XHJcblx0XHRcdHRoaXMuaW5pdGlhbFggPSBudWxsO1xyXG5cdFx0XHR0aGlzLmN1cnJlbnRYID0gbnVsbFxyXG5cdFx0XHR0aGlzLmRpZmYgPSBudWxsO1xyXG5cdFx0XHR0aGlzLmluaXRpYWxTY3JvbGxMZWZ0ID0gbnVsbDtcclxuXHJcblx0XHRcdHRoaXMubW92ZVN0YXJ0ZWQgPSBmYWxzZTtcclxuXHJcblx0XHRcdHRoaXMuc3RvcE1vdmVMaXN0ZW4oKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLm1vdmVIYW5kbGVycyA9IHRydWU7XHJcblx0fVxyXG5cdHN0b3BNb3ZlTGlzdGVuKCkge1xyXG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVycy5tb3VzZW1vdmUpXHJcblx0XHRkZWxldGUgdGhpcy5oYW5kbGVycy5tb3VzZW1vdmU7XHJcblx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVycy5tb3VzZXVwKVxyXG5cdFx0ZGVsZXRlIHRoaXMuaGFuZGxlcnMubW91c2V1cDtcclxuXHJcblx0XHR0aGlzLm1vdmVIYW5kbGVycyA9IGZhbHNlO1xyXG5cdH1cclxuXHRyZW1vdmVMaXN0ZW5lcnMoKSB7XHJcblx0XHR0aGlzLnN0b3BNb3ZlTGlzdGVuKCk7XHJcblxyXG5cdFx0dGhpcy5lbHMud3JhcC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZXJzLm1vdXNlZG93bik7XHJcblx0XHRkZWxldGUgdGhpcy5oYW5kbGVycy5tb3VzZWRvd247XHJcblxyXG5cdFx0aWYgKHRoaXMuaGFuZGxlcnMuZHJhZ2NsaWNrKSB7XHJcblx0XHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVycy5kcmFnY2xpY2spO1xyXG5cdFx0XHRkZWxldGUgdGhpcy5oYW5kbGVycy5kcmFnY2xpY2s7XHJcblx0XHR9XHJcblx0fVxyXG5cdGNsb3Nlc3QoZWwsIHRhcmdldCkge1xyXG5cdFx0aWYgKCFlbCB8fCAhdGFyZ2V0KSByZXR1cm47XHJcblx0XHRsZXQgY3VycmVudCA9IGVsO1xyXG5cdFx0ZG8ge1xyXG5cdFx0XHRpZiAoY3VycmVudCA9PT0gdGFyZ2V0KSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWVcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y3VycmVudCA9IGN1cnJlbnQucGFyZW50Tm9kZVxyXG5cdFx0fSB3aGlsZSAoY3VycmVudC5wYXJlbnROb2RlKTtcclxuXHR9XHJcblx0ZGVzdHJveSgpIHtcclxuXHJcblx0XHR0aGlzLnJlbW92ZUxpc3RlbmVycygpO1xyXG5cdH1cclxufVxyXG5cclxuY29uc3QgX2RlZmF1bHRzID0ge1xyXG5cdGVsOiB1bmRlZmluZWQsXHJcblx0Zml4TGlua3M6IHRydWUsXHJcblx0bWluRGlmZjogNVxyXG59Il0sIm5hbWVzIjpbIm5qU2Nyb2xseSIsImNvbnN0cnVjdG9yIiwib3B0cyIsImluaXQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZWxzIiwibW92ZVN0YXJ0ZWQiLCJpbml0aWFsWCIsImluaXRpYWxTY3JvbGxMZWZ0IiwiY3VycmVudFgiLCJoYW5kbGVycyIsIm9wdGlvbnMiLCJlbCIsIkVsZW1lbnQiLCJvIiwiT2JqZWN0IiwiYXNzaWduIiwiX2RlZmF1bHRzIiwiZ2F0aGVyUmVzdWx0cyIsImdhdGhlckVsZW1lbnRzIiwiYWRkTGlzdGVuZXJzIiwid3JhcCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNvbnNvbGUiLCJlcnJvciIsIm1vdXNlZG93biIsImUiLCJjbG9zZXN0IiwidGFyZ2V0IiwicGFnZVgiLCJzY3JvbGxMZWZ0IiwicHJldmVudERlZmF1bHQiLCJzdGFydE1vdmVMaXN0ZW4iLCJtb3ZlSGFuZGxlcnMiLCJtb3VzZW1vdmUiLCJidXR0b25zIiwic3RvcE1vdmUiLCJkaWZmIiwibW91c2V1cCIsIk1hdGgiLCJhYnMiLCJtaW5EaWZmIiwiZml4TGlua3MiLCJkcmFnY2xpY2siLCJ0YWdOYW1lIiwidG9VcHBlckNhc2UiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic2V0VGltZW91dCIsInN0b3BNb3ZlTGlzdGVuIiwicmVtb3ZlTGlzdGVuZXJzIiwiY3VycmVudCIsInBhcmVudE5vZGUiLCJkZXN0cm95IiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOztBQUFlLE1BQU1BLFNBQU4sQ0FBZ0I7O0VBRTlCQyxXQUFXLENBQUNDLElBQUQsRUFBTztTQUVaQyxJQUFMLENBQVVELElBQVY7OztFQUVEQyxJQUFJLENBQUNELElBQUQsRUFBTzs7O1FBR04sQ0FBQ0UsTUFBTCxFQUFhOzs7O0lBR2JBLE1BQU0sQ0FBQ0MsZ0JBQVAsQ0FBd0IsV0FBeEIsRUFBcUMsWUFBWSxFQUFqRDtTQUVLQyxHQUFMLEdBQVcsRUFBWDtTQUNLQyxXQUFMO1NBQ0tDLFFBQUw7U0FDS0MsaUJBQUw7U0FDS0MsUUFBTDtTQUVLQyxRQUFMLEdBQWdCLEVBQWhCO1FBRUlDLE9BQU8sR0FBRyxFQUFkOztRQUNJLE9BQU9WLElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7TUFDN0JVLE9BQU8sQ0FBQ0MsRUFBUixHQUFhWCxJQUFiO0tBREQsTUFFTyxJQUFJLE9BQU9BLElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7VUFDaENBLElBQUksWUFBWVksT0FBcEIsRUFBNkI7UUFDNUJGLE9BQU8sQ0FBQ0MsRUFBUixHQUFhWCxJQUFiO09BREQsTUFFTyxJQUFJQSxJQUFJLENBQUMsQ0FBRCxDQUFKLElBQVdBLElBQUksQ0FBQyxDQUFELENBQUosWUFBbUJZLE9BQWxDLEVBQTJDO1FBQ2pERixPQUFPLENBQUNDLEVBQVIsR0FBYVgsSUFBSSxDQUFDLENBQUQsQ0FBakI7T0FETSxNQUVBO1FBQ05VLE9BQU8sR0FBR1YsSUFBVjs7OztTQUlHYSxDQUFMLEdBQVNDLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JDLFNBQWxCLEVBQTZCTixPQUE3QixDQUFUO1VBQ01PLGFBQWEsR0FBRyxLQUFLQyxjQUFMLEVBQXRC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
