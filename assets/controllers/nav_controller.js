import { Controller } from '@hotwired/stimulus';

/**
 * Navigation Controller
 * Handles scroll-based navbar style transitions (transparent → solid).
 * Switches between light logo (on hero) and principal logo (scrolled).
 * Transitions link colors from white to dark on scroll.
 */
export default class extends Controller {
    static targets = ['logoLight', 'logoPrincipal', 'link', 'localeSep', 'localeInactive'];

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

            // Nav links — active links get primary color, inactive get gray
            this.linkTargets.forEach((link) => {
                if (link.hasAttribute('data-active')) {
                    link.classList.remove('text-white');
                    link.classList.add('text-primary');
                } else {
                    link.classList.remove('text-white/80');
                    link.classList.add('text-gray-600');
                }
            });

            // Locale switcher — separator and inactive link
            this.localeSepTargets.forEach((el) => {
                el.classList.remove('text-white/40');
                el.classList.add('text-gray-300');
            });
            this.localeInactiveTargets.forEach((el) => {
                el.classList.remove('text-white/60');
                el.classList.add('text-gray-500');
            });
        } else {
            this.element.classList.add('nav-transparent');
            this.element.classList.remove('nav-scrolled');

            // Switch to light (white) logo
            if (this.hasLogoLightTarget) this.logoLightTarget.classList.remove('hidden');
            if (this.hasLogoPrincipalTarget) this.logoPrincipalTarget.classList.add('hidden');

            // Nav links — restore white tones
            this.linkTargets.forEach((link) => {
                if (link.hasAttribute('data-active')) {
                    link.classList.remove('text-primary');
                    link.classList.add('text-white');
                } else {
                    link.classList.remove('text-gray-600');
                    link.classList.add('text-white/80');
                }
            });

            // Locale switcher — restore white tones
            this.localeSepTargets.forEach((el) => {
                el.classList.remove('text-gray-300');
                el.classList.add('text-white/40');
            });
            this.localeInactiveTargets.forEach((el) => {
                el.classList.remove('text-gray-500');
                el.classList.add('text-white/60');
            });
        }
    }
}
