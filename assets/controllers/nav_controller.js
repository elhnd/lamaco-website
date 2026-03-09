import { Controller } from '@hotwired/stimulus';

/**
 * Navigation Controller
 * Handles scroll-based navbar style transitions (transparent → solid).
 * Switches between light logo (on hero) and principal logo (scrolled).
 * Transitions link colors from white to dark on scroll.
 */
export default class extends Controller {
    static targets = ['logoLight', 'logoPrincipal', 'link'];

    connect() {
        this._onScroll = this._handleScroll.bind(this);
        window.addEventListener('scroll', this._onScroll, { passive: true });
        this._handleScroll();
    }

    disconnect() {
        window.removeEventListener('scroll', this._onScroll);
    }

    _handleScroll() {
        const isScrolled = window.scrollY > 50;

        if (isScrolled) {
            this.element.classList.remove('nav-transparent');
            this.element.classList.add('nav-scrolled');

            // Switch to principal (colored) logo
            if (this.hasLogoLightTarget) this.logoLightTarget.classList.add('hidden');
            if (this.hasLogoPrincipalTarget) this.logoPrincipalTarget.classList.remove('hidden');

            this.linkTargets.forEach((link) => {
                link.classList.remove('text-white', 'text-white/80');
                link.classList.add('text-gray-600', 'dark:text-gray-400');
            });
        } else {
            this.element.classList.add('nav-transparent');
            this.element.classList.remove('nav-scrolled');

            // Switch to light (white) logo
            if (this.hasLogoLightTarget) this.logoLightTarget.classList.remove('hidden');
            if (this.hasLogoPrincipalTarget) this.logoPrincipalTarget.classList.add('hidden');

            this.linkTargets.forEach((link) => {
                link.classList.add('text-white', 'text-white/80');
                link.classList.remove('text-gray-600', 'dark:text-gray-400');
            });
        }
    }
}
