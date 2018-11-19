export default class njScrolly {
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
			this.els.wrap = document.querySelector(this.o.el)
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
				return true
			}

			current = current.parentNode
		} while (current.parentNode);
	}
	addListeners() {
		this.els.wrap.addEventListener('mouseenter', this.handlers.wrapMouseenter = (e) => {
			this.listenMove();
		})
		this.els.wrap.addEventListener('mouseleave', this.handlers.wrapMouseleave = (e) => {
			this.unlistenMove();
		})
	}
	listenMove() {
		if (this.mouseMoveListenersAdded) return;
		document.addEventListener('mousedown', this.handlers.mousedown = (e) => {
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

		document.addEventListener('mousemove', this.handlers.mousemove = (e) => {
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

		document.addEventListener('mouseup', this.handlers.mouseup = (e) => {
			stopMove();
		});
		const stopMove = () => {
			if (!this.moveStarted) return;
			this.initialX = null;
			this.currentX = null
			this.x = null;
			this.initialScrollLeft = null;
			
			this.moveStarted = false;
			this.unlistenMove();
		}
		
		this.mouseMoveListenersAdded = true;
	}
	unlistenMove() {
		if(this.moveStarted) return;
		if (!this.mouseMoveListenersAdded) return;
		document.removeEventListener('mousedown', this.handlers.mousedown)
		delete this.handlers.mousedown;
		document.removeEventListener('mousemove', this.handlers.mousemove)
		delete this.handlers.mousemove;
		document.removeEventListener('mouseup', this.handlers.mouseup)
		delete this.handlers.mouseup;
		this.mouseMoveListenersAdded = false;
	}
	removeListeners() {
		this.els.wrap.removeEventListener('mousedown', this.handlers.wrapMouseenter)
		delete this.handlers.wrapMouseenter;
		
		this.els.wrap.removeEventListener('mouseleave', this.handlers.wrapMouseleave)
		delete this.handlers.wrapMouseleave;
	}
}

const _defaults = {
	el: undefined
}