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
			this.els.wrap = document.querySelector(this.o.el)
		} else if (this.o.el) {
			this.els.wrap = this.o.el;
		}
		if (!this.els.wrap) {
			console.error('njScrolly: source (o.el) not found.');
			return false;
		}
	}
	addListeners() {
		this.els.wrap.addEventListener('mousedown', this.handlers.mousedown = (e) => {
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
		document.addEventListener('mousemove', this.handlers.mousemove = (e) => {
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

		document.addEventListener('mouseup', this.handlers.mouseup = (e) => {
			
			if (this.o.fixLinks) {
				//try to prevent default link(a tag)
				document.addEventListener('click', this.handlers.dragclick = (e) => {
					if (!e.target.tagName.toUpperCase() === 'A') return;
					if (!this.closest(e.target, this.els.wrap)) return;

					e.preventDefault();
					document.removeEventListener('click', this.handlers.dragclick);
					delete this.handlers.dragclick;
				});

				//wait 50ms for click event to prevent link href behaviour
				setTimeout(() => {
					document.removeEventListener('click', this.handlers.dragclick);
					delete this.handlers.dragclick;
				}, 50);
			}

			stopMove();
		});

		const stopMove = () => {
			if (!this.moveStarted) return;
			this.initialX = null;
			this.currentX = null
			this.diff = null;
			this.initialScrollLeft = null;

			this.moveStarted = false;

			this.stopMoveListen();
		}

		this.moveHandlers = true;
	}
	stopMoveListen() {
		document.removeEventListener('mousemove', this.handlers.mousemove)
		delete this.handlers.mousemove;
		document.removeEventListener('mouseup', this.handlers.mouseup)
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
				return true
			}

			current = current.parentNode
		} while (current.parentNode);
	}
	destroy() {

		this.removeListeners();
	}
}

const _defaults = {
	el: undefined,
	fixLinks: true
}