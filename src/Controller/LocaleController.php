<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Handles manual locale switching via navbar language toggle.
 */
final class LocaleController extends AbstractController
{
    private const SUPPORTED_LOCALES = ['fr', 'en'];

    #[Route('/switch-locale/{locale}', name: 'app_switch_locale', methods: ['GET'])]
    public function switchLocale(string $locale, Request $request): Response
    {
        if (!\in_array($locale, self::SUPPORTED_LOCALES, true)) {
            $locale = 'fr';
        }

        $request->getSession()->set('_locale', $locale);

        // Redirect back to the referring page, or home if no referer
        $referer = $request->headers->get('referer');

        return $this->redirect($referer ?: $this->generateUrl('app_home'));
    }
}
