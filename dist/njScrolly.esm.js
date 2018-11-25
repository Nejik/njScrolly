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

export default njScrolly;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmpTY3JvbGx5LmVzbS5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgbmpTY3JvbGx5IHtcclxuXHQvL29wdGlvbnNcclxuXHRjb25zdHJ1Y3RvcihvcHRzKSB7XHJcblxyXG5cdFx0dGhpcy5pbml0KG9wdHMpO1xyXG5cdH1cclxuXHRpbml0KG9wdHMpIHtcclxuXHRcdC8vIGZpeGVzIHdlaXJkIHNhZmFyaSAxMCBidWcgd2hlcmUgcHJldmVudERlZmF1bHQgaXMgcHJldmVudGVkXHJcblx0XHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tZXRhZml6enkvZmxpY2tpdHkvaXNzdWVzLzQ1NyNpc3N1ZWNvbW1lbnQtMjU0NTAxMzU2XHJcblx0XHRpZiAoIXdpbmRvdykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgZnVuY3Rpb24gKCkge30pO1xyXG5cclxuXHRcdHRoaXMuZWxzID0ge307XHJcblx0XHR0aGlzLm1vdmVTdGFydGVkO1xyXG5cdFx0dGhpcy5pbml0aWFsWDtcclxuXHRcdHRoaXMuaW5pdGlhbFNjcm9sbExlZnQ7XHJcblx0XHR0aGlzLmN1cnJlbnRYO1xyXG5cclxuXHRcdHRoaXMuaGFuZGxlcnMgPSB7fTtcclxuXHJcblx0XHRsZXQgb3B0aW9ucyA9IHt9O1xyXG5cdFx0aWYgKHR5cGVvZiBvcHRzID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRvcHRpb25zLmVsID0gb3B0cztcclxuXHRcdH0gZWxzZSBpZiAodHlwZW9mIG9wdHMgPT09ICdvYmplY3QnKSB7XHJcblx0XHRcdGlmIChvcHRzIGluc3RhbmNlb2YgRWxlbWVudCkge1xyXG5cdFx0XHRcdG9wdGlvbnMuZWwgPSBvcHRzO1xyXG5cdFx0XHR9IGVsc2UgaWYgKG9wdHNbMF0gJiYgb3B0c1swXSBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcclxuXHRcdFx0XHRvcHRpb25zLmVsID0gb3B0c1swXTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRvcHRpb25zID0gb3B0cztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMubyA9IE9iamVjdC5hc3NpZ24oe30sIF9kZWZhdWx0cywgb3B0aW9ucyk7XHJcblx0XHRjb25zdCBnYXRoZXJSZXN1bHRzID0gdGhpcy5nYXRoZXJFbGVtZW50cygpO1xyXG5cdFx0aWYgKGdhdGhlclJlc3VsdHMgPT09IGZhbHNlKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmFkZExpc3RlbmVycygpO1xyXG5cdH1cclxuXHJcblx0Z2F0aGVyRWxlbWVudHMoKSB7XHJcblx0XHR0aGlzLmVscyA9IHt9O1xyXG5cclxuXHRcdGlmICh0eXBlb2YgdGhpcy5vLmVsID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aGlzLmVscy53cmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLm8uZWwpXHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuby5lbCkge1xyXG5cdFx0XHR0aGlzLmVscy53cmFwID0gdGhpcy5vLmVsO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCF0aGlzLmVscy53cmFwKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ25qU2Nyb2xseTogc291cmNlIChvLmVsKSBub3QgZm91bmQuJyk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9XHJcblx0YWRkTGlzdGVuZXJzKCkge1xyXG5cdFx0dGhpcy5lbHMud3JhcC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZXJzLm1vdXNlZG93biA9IChlKSA9PiB7XHJcblx0XHRcdGlmICghdGhpcy5jbG9zZXN0KGUudGFyZ2V0LCB0aGlzLmVscy53cmFwKSkge1xyXG5cdFx0XHRcdC8vbW92ZSBvbmx5IGluc2lkZSB3cmFwIGNvbXBvbmVudFxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5tb3ZlU3RhcnRlZCA9IHRydWU7XHJcblx0XHRcdHRoaXMuaW5pdGlhbFggPSBlLnBhZ2VYO1xyXG5cdFx0XHR0aGlzLmN1cnJlbnRYID0gZS5wYWdlWDtcclxuXHRcdFx0dGhpcy5pbml0aWFsU2Nyb2xsTGVmdCA9IHRoaXMuZWxzLndyYXAuc2Nyb2xsTGVmdDtcclxuXHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdHRoaXMuc3RhcnRNb3ZlTGlzdGVuKCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblx0c3RhcnRNb3ZlTGlzdGVuKCkge1xyXG5cdFx0aWYgKHRoaXMubW92ZUhhbmRsZXJzKSByZXR1cm47XHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZXJzLm1vdXNlbW92ZSA9IChlKSA9PiB7XHJcblx0XHRcdGlmICghdGhpcy5tb3ZlU3RhcnRlZCkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHR5cGVvZiBlLmJ1dHRvbnMgPT09ICdudW1iZXInICYmIGUuYnV0dG9ucyA9PT0gMCkge1xyXG5cdFx0XHRcdHN0b3BNb3ZlKCk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmN1cnJlbnRYID0gZS5wYWdlWDtcclxuXHRcdFx0dGhpcy5kaWZmID0gdGhpcy5pbml0aWFsWCAtIHRoaXMuY3VycmVudFg7XHJcblx0XHRcdHRoaXMuZWxzLndyYXAuc2Nyb2xsTGVmdCA9IHRoaXMuaW5pdGlhbFNjcm9sbExlZnQgKyB0aGlzLmRpZmY7XHJcblx0XHR9KTtcclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVycy5tb3VzZXVwID0gKGUpID0+IHtcclxuXHRcdFx0XHJcblx0XHRcdGlmIChNYXRoLmFicyh0aGlzLmRpZmYpID4gdGhpcy5vLmRpZmZUaHJlc2hvbGQgJiYgdGhpcy5vLnByZXZlbnRMaW5rcykge1xyXG5cdFx0XHRcdC8vdHJ5IHRvIHByZXZlbnQgZGVmYXVsdCBsaW5rKGEgdGFnKVxyXG5cdFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVycy5kcmFnY2xpY2sgPSAoZSkgPT4ge1xyXG5cdFx0XHRcdFx0aWYgKCFlLnRhcmdldC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdBJykgcmV0dXJuO1xyXG5cdFx0XHRcdFx0aWYgKCF0aGlzLmNsb3Nlc3QoZS50YXJnZXQsIHRoaXMuZWxzLndyYXApKSByZXR1cm47XHJcblxyXG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZXJzLmRyYWdjbGljayk7XHJcblx0XHRcdFx0XHRkZWxldGUgdGhpcy5oYW5kbGVycy5kcmFnY2xpY2s7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdC8vd2FpdCA1MG1zIGZvciBjbGljayBldmVudCB0byBwcmV2ZW50IGxpbmsgaHJlZiBiZWhhdmlvdXJcclxuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRcdGlmKCF0aGlzLmhhbmRsZXJzLmRyYWdjbGljaykgcmV0dXJuO1xyXG5cdFx0XHRcdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZXJzLmRyYWdjbGljayk7XHJcblx0XHRcdFx0XHRkZWxldGUgdGhpcy5oYW5kbGVycy5kcmFnY2xpY2s7XHJcblx0XHRcdFx0fSwgNTApO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzdG9wTW92ZSgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Y29uc3Qgc3RvcE1vdmUgPSAoKSA9PiB7XHJcblx0XHRcdGlmICghdGhpcy5tb3ZlU3RhcnRlZCkgcmV0dXJuO1xyXG5cdFx0XHR0aGlzLmluaXRpYWxYID0gbnVsbDtcclxuXHRcdFx0dGhpcy5jdXJyZW50WCA9IG51bGxcclxuXHRcdFx0dGhpcy5kaWZmID0gbnVsbDtcclxuXHRcdFx0dGhpcy5pbml0aWFsU2Nyb2xsTGVmdCA9IG51bGw7XHJcblxyXG5cdFx0XHR0aGlzLm1vdmVTdGFydGVkID0gZmFsc2U7XHJcblxyXG5cdFx0XHR0aGlzLnN0b3BNb3ZlTGlzdGVuKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5tb3ZlSGFuZGxlcnMgPSB0cnVlO1xyXG5cdH1cclxuXHRzdG9wTW92ZUxpc3RlbigpIHtcclxuXHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuaGFuZGxlcnMubW91c2Vtb3ZlKVxyXG5cdFx0ZGVsZXRlIHRoaXMuaGFuZGxlcnMubW91c2Vtb3ZlO1xyXG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlcnMubW91c2V1cClcclxuXHRcdGRlbGV0ZSB0aGlzLmhhbmRsZXJzLm1vdXNldXA7XHJcblxyXG5cdFx0dGhpcy5tb3ZlSGFuZGxlcnMgPSBmYWxzZTtcclxuXHR9XHJcblx0cmVtb3ZlTGlzdGVuZXJzKCkge1xyXG5cdFx0dGhpcy5lbHMud3JhcC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZXJzLm1vdXNlZG93bik7XHJcblx0XHRkZWxldGUgdGhpcy5oYW5kbGVycy5tb3VzZWRvd247XHJcblx0XHRcclxuXHRcdHRoaXMuc3RvcE1vdmVMaXN0ZW4oKTtcclxuXHJcblx0XHRpZiAodGhpcy5oYW5kbGVycy5kcmFnY2xpY2spIHtcclxuXHRcdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZXJzLmRyYWdjbGljayk7XHJcblx0XHRcdGRlbGV0ZSB0aGlzLmhhbmRsZXJzLmRyYWdjbGljaztcclxuXHRcdH1cclxuXHR9XHJcblx0Y2xvc2VzdChlbCwgdGFyZ2V0KSB7XHJcblx0XHRpZiAoIWVsIHx8ICF0YXJnZXQpIHJldHVybjtcclxuXHRcdGxldCBjdXJyZW50ID0gZWw7XHJcblx0XHRkbyB7XHJcblx0XHRcdGlmIChjdXJyZW50ID09PSB0YXJnZXQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjdXJyZW50ID0gY3VycmVudC5wYXJlbnROb2RlXHJcblx0XHR9IHdoaWxlIChjdXJyZW50LnBhcmVudE5vZGUpO1xyXG5cdH1cclxuXHRkZXN0cm95KCkge1xyXG5cclxuXHRcdHRoaXMucmVtb3ZlTGlzdGVuZXJzKCk7XHJcblx0fVxyXG59XHJcblxyXG5jb25zdCBfZGVmYXVsdHMgPSB7XHJcblx0ZWw6IHVuZGVmaW5lZCxcclxuXHRwcmV2ZW50TGlua3M6IHRydWUsXHJcblx0ZGlmZlRocmVzaG9sZDogNVxyXG59Il0sIm5hbWVzIjpbIm5qU2Nyb2xseSIsImNvbnN0cnVjdG9yIiwib3B0cyIsImluaXQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZWxzIiwibW92ZVN0YXJ0ZWQiLCJpbml0aWFsWCIsImluaXRpYWxTY3JvbGxMZWZ0IiwiY3VycmVudFgiLCJoYW5kbGVycyIsIm9wdGlvbnMiLCJlbCIsIkVsZW1lbnQiLCJvIiwiT2JqZWN0IiwiYXNzaWduIiwiX2RlZmF1bHRzIiwiZ2F0aGVyUmVzdWx0cyIsImdhdGhlckVsZW1lbnRzIiwiYWRkTGlzdGVuZXJzIiwid3JhcCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNvbnNvbGUiLCJlcnJvciIsIm1vdXNlZG93biIsImUiLCJjbG9zZXN0IiwidGFyZ2V0IiwicGFnZVgiLCJzY3JvbGxMZWZ0IiwicHJldmVudERlZmF1bHQiLCJzdGFydE1vdmVMaXN0ZW4iLCJtb3ZlSGFuZGxlcnMiLCJtb3VzZW1vdmUiLCJidXR0b25zIiwic3RvcE1vdmUiLCJkaWZmIiwibW91c2V1cCIsIk1hdGgiLCJhYnMiLCJkaWZmVGhyZXNob2xkIiwicHJldmVudExpbmtzIiwiZHJhZ2NsaWNrIiwidGFnTmFtZSIsInRvVXBwZXJDYXNlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInNldFRpbWVvdXQiLCJzdG9wTW92ZUxpc3RlbiIsInJlbW92ZUxpc3RlbmVycyIsImN1cnJlbnQiLCJwYXJlbnROb2RlIiwiZGVzdHJveSIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6IkFBQWUsTUFBTUEsU0FBTixDQUFnQjs7RUFFOUJDLFdBQVcsQ0FBQ0MsSUFBRCxFQUFPO1NBRVpDLElBQUwsQ0FBVUQsSUFBVjs7O0VBRURDLElBQUksQ0FBQ0QsSUFBRCxFQUFPOzs7UUFHTixDQUFDRSxNQUFMLEVBQWE7Ozs7SUFHYkEsTUFBTSxDQUFDQyxnQkFBUCxDQUF3QixXQUF4QixFQUFxQyxZQUFZLEVBQWpEO1NBRUtDLEdBQUwsR0FBVyxFQUFYO1NBQ0tDLFdBQUw7U0FDS0MsUUFBTDtTQUNLQyxpQkFBTDtTQUNLQyxRQUFMO1NBRUtDLFFBQUwsR0FBZ0IsRUFBaEI7UUFFSUMsT0FBTyxHQUFHLEVBQWQ7O1FBQ0ksT0FBT1YsSUFBUCxLQUFnQixRQUFwQixFQUE4QjtNQUM3QlUsT0FBTyxDQUFDQyxFQUFSLEdBQWFYLElBQWI7S0FERCxNQUVPLElBQUksT0FBT0EsSUFBUCxLQUFnQixRQUFwQixFQUE4QjtVQUNoQ0EsSUFBSSxZQUFZWSxPQUFwQixFQUE2QjtRQUM1QkYsT0FBTyxDQUFDQyxFQUFSLEdBQWFYLElBQWI7T0FERCxNQUVPLElBQUlBLElBQUksQ0FBQyxDQUFELENBQUosSUFBV0EsSUFBSSxDQUFDLENBQUQsQ0FBSixZQUFtQlksT0FBbEMsRUFBMkM7UUFDakRGLE9BQU8sQ0FBQ0MsRUFBUixHQUFhWCxJQUFJLENBQUMsQ0FBRCxDQUFqQjtPQURNLE1BRUE7UUFDTlUsT0FBTyxHQUFHVixJQUFWOzs7O1NBSUdhLENBQUwsR0FBU0MsTUFBTSxDQUFDQyxNQUFQLENBQWMsRUFBZCxFQUFrQkMsU0FBbEIsRUFBNkJOLE9BQTdCLENB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
