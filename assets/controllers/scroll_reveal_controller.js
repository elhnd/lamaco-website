import { Controller } from '@hotwired/stimulus';

/**
 * Scroll Reveal Controller
 * ========================
 * Animates elements into view on scroll with IntersectionObserver.
 *
 * Initial hidden state is handled by CSS (app.css):
 *   [data-scroll-reveal-target="item"]:not([data-revealed]) { opacity:0; transform:translateY(30px); }
 *
 * This means elements are hidden the instant the HTML is parsed — no flash.
 * After animation, `data-revealed` is set so the CSS rule no longer applies.
 *
 * Turbo compatibility:
 *   - before-cache: marks all items as revealed → cache snapshot shows full page
 *   - Restoration visit: `data-revealed` present → connect() skips → no re-animation
 *   - `no-preview` meta prevents the cache→fresh flash on advance visits
 */
export default class extends Controller {
    static targets = ['item'];
    static values = {
        threshold: { type: Number, default: 0.15 },
        delay: { type: Number, default: 120 },
    };

    connect() {
        this._observer = new IntersectionObserver(
            (entries) => this._onIntersect(entries),
            { threshold: this.thresholdValue, rootMargin: '0px 0px -40px 0px' }
        );

        this.itemTargets.forEach((el) => {
            /* Already revealed (Turbo restoration) — skip */
            if (el.hasAttribute('data-revealed')) return;

            /* Transition is added by JS so the initial CSS hide has no transition */
            el.style.transition = 'opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)';
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
                const el = entry.target;
                const index = this.itemTargets.indexOf(el);
                const delay = index * this.delayValue;

                setTimeout(() => {
                    /* Setting data-revealed removes the CSS hide rule;
                       the transition property (set in connect) animates the change */
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                    el.setAttribute('data-revealed', '');
                    el.classList.remove('opacity-0');
                }, delay);

                this._observer.unobserve(el);
            }
        });
    }

    /**
     * Before Turbo caches, mark all items revealed so the snapshot
     * shows the full page (for restoration visits / back button).
     */
    _prepareCache() {
        this._observer?.disconnect();
        this.itemTargets.forEach((el) => {
            el.style.opacity = '';
            el.style.transform = '';
            el.style.transition = '';
            el.setAttribute('data-revealed', '');
            el.classList.remove('opacity-0');
        });
    }
}
