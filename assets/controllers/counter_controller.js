import { Controller } from '@hotwired/stimulus';

/**
 * Counter Controller
 * Animates numbers counting up from 0 to the target value when visible.
 *
 * Turbo-compatible: skips re-animation on restoration visits.
 */
export default class extends Controller {
    static targets = ['number'];

    connect() {
        this._observer = new IntersectionObserver(
            (entries) => this._onIntersect(entries),
            { threshold: 0.3 }
        );

        this.numberTargets.forEach((el) => {
            /* Already counted (Turbo restoration) — skip */
            if (el.hasAttribute('data-counted')) return;
            this._observer.observe(el);
        });

        this._beforeCache = () => this._prepareCache();
        document.addEventListener('turbo:before-cache', this._beforeCache);
    }

    disconnect() {
        this._observer?.disconnect();
        document.removeEventListener('turbo:before-cache', this._beforeCache);
    }

    _onIntersect(entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                this._animateCount(entry.target);
                this._observer.unobserve(entry.target);
            }
        });
    }

    _animateCount(el) {
        const target = parseInt(el.dataset.counterValue, 10);
        const suffix = el.dataset.counterSuffix || '';
        const duration = 2000;
        const startTime = performance.now();

        const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);

            el.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.setAttribute('data-counted', '');
            }
        };

        requestAnimationFrame(step);
    }

    /**
     * Set final counter values in the Turbo snapshot
     * so they don't re-animate on back navigation.
     */
    _prepareCache() {
        this._observer?.disconnect();
        this.numberTargets.forEach((el) => {
            const target = parseInt(el.dataset.counterValue, 10);
            const suffix = el.dataset.counterSuffix || '';
            el.textContent = target + suffix;
            el.setAttribute('data-counted', '');
        });
    }
}
