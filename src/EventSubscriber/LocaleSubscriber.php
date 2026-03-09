<?php

declare(strict_types=1);

namespace App\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;

/**
 * Detects the user's preferred locale from the browser Accept-Language header
 * and stores it in the session. Manual locale switching takes precedence.
 */
final class LocaleSubscriber implements EventSubscriberInterface
{
    private const SUPPORTED_LOCALES = ['fr', 'en'];

    public function __construct(
        private readonly string $defaultLocale = 'fr',
    ) {
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::REQUEST => [['onKernelRequest', 20]],
        ];
    }

    public function onKernelRequest(RequestEvent $event): void
    {
        $request = $event->getRequest();

        if (!$event->isMainRequest()) {
            return;
        }

        $session = $request->hasSession() ? $request->getSession() : null;

        // If a locale was explicitly set (via locale switcher), use it
        if ($session !== null && $session->has('_locale')) {
            $request->setLocale($session->get('_locale'));

            return;
        }

        // Otherwise, detect from browser Accept-Language header
        $preferredLocale = $request->getPreferredLanguage(self::SUPPORTED_LOCALES);

        if ($preferredLocale !== null) {
            $request->setLocale($preferredLocale);

            if ($session !== null) {
                $session->set('_locale', $preferredLocale);
            }
        } else {
            $request->setLocale($this->defaultLocale);
        }
    }
}
