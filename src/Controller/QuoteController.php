<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class QuoteController extends AbstractController
{
    #[Route('/quote', name: 'app_quote', methods: ['GET'])]
    public function index(): Response
    {
        return $this->render('quote/index.html.twig');
    }
}
