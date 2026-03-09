import { Controller } from '@hotwired/stimulus';

/**
 * Testimonial Controller
 * Handles carousel navigation for client testimonials.
 */
export default class extends Controller {
    static targets = ['slide', 'dot'];

    connect() {
        this._currentIndex = 0;
        this._updateView();
    }

    next() {
        this._currentIndex = (this._currentIndex + 1) % this.slideTargets.length;
        this._updateView();
    }

    previous() {
        this._currentIndex = (this._currentIndex - 1 + this.slideTargets.length) % this.slideTargets.length;
        this._updateView();
    }

    goTo(event) {
        const index = parseInt(event.currentTarget.dataset.index, 10);
        if (!isNaN(index)) {
            this._currentIndex = index;
            this._updateView();
        }
    }

    _updateView() {
        this.slideTargets.forEach((slide, i) => {
            slide.style.display = i === this._currentIndex ? '' : 'none';
        });

        this.dotTargets.forEach((dot, i) => {
            const isActive = i === this._currentIndex;
            dot.classList.toggle('bg-accent', isActive);
            dot.classList.toggle('bg-gray-300', !isActive);
            dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
    }
}
