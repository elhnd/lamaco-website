<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/products', name: 'app_products_')]
final class ProductController extends AbstractController
{
    /** @var array<string, array<string, mixed>> Static product catalog (replace with Doctrine later) */
    private const PRODUCTS = [
        'basalt-8-16' => [
            'name' => 'Basalt 8/16',
            'category' => 'Basalt',
            'badge' => 'Reinforced Black Concrete',
            'description' => "The premium choice for durability and strength in heavy infrastructure. Our high-density basalt aggregates provide the structural integrity required for Dakar's largest civil engineering projects.",
            'status' => 'Stocked',
            'mainImage' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiLXsqC_CHqdj4vRFGSIAtifEnDe0pYtypqOe9-McynDc6c2TnCxmJv82nhM7eDis8nOvqMDauVmO0f-XRLmKDpZ7dH7Rq-3cs4F0E0YYCf3mg7If-kodK5Ph5EMSPYdoWQF6fKcVrXfoeCLxDX5Kmy02gSA-AuFBRPJjhMu3WJti1Vw-vusHGj2-u1GolszL6-8Yg4nRZM_BDn_MuGG_LzHEQQDWSBgYxb_AQL8ldhY_UL738uKZ7Kz1IaTJ2YhZC-mI7zbmbQMk',
            'thumbnails' => [
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDiLXsqC_CHqdj4vRFGSIAtifEnDe0pYtypqOe9-McynDc6c2TnCxmJv82nhM7eDis8nOvqMDauVmO0f-XRLmKDpZ7dH7Rq-3cs4F0E0YYCf3mg7If-kodK5Ph5EMSPYdoWQF6fKcVrXfoeCLxDX5Kmy02gSA-AuFBRPJjhMu3WJti1Vw-vusHGj2-u1GolszL6-8Yg4nRZM_BDn_MuGG_LzHEQQDWSBgYxb_AQL8ldhY_UL738uKZ7Kz1IaTJ2YhZC-mI7zbmbQMk',
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDiLXsqC_CHqdj4vRFGSIAtifEnDe0pYtypqOe9-McynDc6c2TnCxmJv82nhM7eDis8nOvqMDauVmO0f-XRLmKDpZ7dH7Rq-3cs4F0E0YYCf3mg7If-kodK5Ph5EMSPYdoWQF6fKcVrXfoeCLxDX5Kmy02gSA-AuFBRPJjhMu3WJti1Vw-vusHGj2-u1GolszL6-8Yg4nRZM_BDn_MuGG_LzHEQQDWSBgYxb_AQL8ldhY_UL738uKZ7Kz1IaTJ2YhZC-mI7zbmbQMk',
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDiLXsqC_CHqdj4vRFGSIAtifEnDe0pYtypqOe9-McynDc6c2TnCxmJv82nhM7eDis8nOvqMDauVmO0f-XRLmKDpZ7dH7Rq-3cs4F0E0YYCf3mg7If-kodK5Ph5EMSPYdoWQF6fKcVrXfoeCLxDX5Kmy02gSA-AuFBRPJjhMu3WJti1Vw-vusHGj2-u1GolszL6-8Yg4nRZM_BDn_MuGG_LzHEQQDWSBgYxb_AQL8ldhY_UL738uKZ7Kz1IaTJ2YhZC-mI7zbmbQMk',
                'https://lh3.googleusercontent.com/aida-public/AB6AXuCrdZruw9pdcDz0UKj-BBkn8RlT0uZKK9cmeVX1Hj4szBkDAPRjXb6wNm-SNFVx-WmC1CIOBkbAb_KYk976vdOWXG1iHwsoAfUvFHvPxES_NrwGP8PRag3ied27YEDkMMj3lZMUVPUEhht1cp5ehx7Q10GRJt6uzB5Osfpx3qoJyfM0W7Br7Rl1o2D4kZH2UN-b1_1Io3W2AQjwu-b3-vKkUTKY7TryOjSZv1TX-iId3CjvHwpK1N0_uZan3RT8ISNWIp7naCDr_ck',
            ],
            'specs' => [
                ['label' => 'Grain Size', 'value' => '8 - 16 mm'],
                ['label' => 'Origin', 'value' => 'Senegal'],
                ['label' => 'Resistance', 'value' => 'High'],
                ['label' => 'Ideal For', 'value' => 'Bridges, Heavy Pavements, Foundations', 'small' => true],
            ],
            'features' => [
                ['icon' => 'fitness_center', 'title' => 'High Load Capacity', 'description' => 'Engineered for extreme structural loads and durability.'],
                ['icon' => 'verified', 'title' => 'Dust-Free Guarantee', 'description' => 'Advanced washing process ensures clean, reactive surfaces.'],
                ['icon' => 'local_shipping', 'title' => 'Fast Logistics', 'description' => 'Direct site delivery with our specialized vehicle fleet.'],
            ],
            'projectContext' => [
                'name' => 'Dakar Port Expansion Project',
                'image' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuChXRkxSBFm8rzaYpM3mdBJfjmGJCL3nCqteUuRt9xmlxo3UEMZ1gNMakAcHVQ8IVGduAqTIpBExP5RlQwnwsFroaWqr2zxaUtFfmRcB77iVefMXtGeGcQSeUJoxMIYG77eWSMoCW_6ugGOGhjkljGOlZEG1nJtJZqv8jiLrZTbp9ITCAeRDi0Lx-4vLuSLCmlMhYpF9emcWwlCI2aCCiBEvAJHTAYu6ctBhbqiOsXP59d9mCnq-Owrbw3GM3OBWcWxTXd9sBKIMAE',
            ],
            'related' => ['basalt-3-8', 'basalt-0-3', 'tasseb-sand'],
        ],
        'basalt-3-8' => [
            'name' => 'Basalt 3/8',
            'category' => 'Basalt',
            'badge' => 'Fine Aggregate',
            'description' => 'Ideal for fine concrete mixes and surface finishing. Our Basalt 3/8 offers excellent workability and consistent grading for high-quality construction.',
            'status' => 'Stocked',
            'mainImage' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiLXsqC_CHqdj4vRFGSIAtifEnDe0pYtypqOe9-McynDc6c2TnCxmJv82nhM7eDis8nOvqMDauVmO0f-XRLmKDpZ7dH7Rq-3cs4F0E0YYCf3mg7If-kodK5Ph5EMSPYdoWQF6fKcVrXfoeCLxDX5Kmy02gSA-AuFBRPJjhMu3WJti1Vw-vusHGj2-u1GolszL6-8Yg4nRZM_BDn_MuGG_LzHEQQDWSBgYxb_AQL8ldhY_UL738uKZ7Kz1IaTJ2YhZC-mI7zbmbQMk',
            'thumbnails' => [],
            'specs' => [
                ['label' => 'Grain Size', 'value' => '3 - 8 mm'],
                ['label' => 'Origin', 'value' => 'Senegal'],
                ['label' => 'Resistance', 'value' => 'High'],
                ['label' => 'Ideal For', 'value' => 'Concrete Mixes, Surface Finishing', 'small' => true],
            ],
            'features' => [
                ['icon' => 'grain', 'title' => 'Consistent Grading', 'description' => 'Uniform particle size for reliable concrete quality.'],
                ['icon' => 'verified', 'title' => 'Clean Aggregate', 'description' => 'Washed and processed for optimal bonding.'],
                ['icon' => 'local_shipping', 'title' => 'Fast Logistics', 'description' => 'Direct site delivery with our specialized vehicle fleet.'],
            ],
            'projectContext' => null,
            'related' => ['basalt-8-16', 'basalt-0-3', 'tasseb-sand'],
        ],
        'basalt-0-3' => [
            'name' => 'Basalt 0/3',
            'category' => 'Basalt',
            'badge' => 'Dust & Fine Mix',
            'description' => 'Versatile fine basalt aggregate used as a base material and in mortar preparation. Essential for road construction and foundation layers.',
            'status' => 'Stocked',
            'mainImage' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiLXsqC_CHqdj4vRFGSIAtifEnDe0pYtypqOe9-McynDc6c2TnCxmJv82nhM7eDis8nOvqMDauVmO0f-XRLmKDpZ7dH7Rq-3cs4F0E0YYCf3mg7If-kodK5Ph5EMSPYdoWQF6fKcVrXfoeCLxDX5Kmy02gSA-AuFBRPJjhMu3WJti1Vw-vusHGj2-u1GolszL6-8Yg4nRZM_BDn_MuGG_LzHEQQDWSBgYxb_AQL8ldhY_UL738uKZ7Kz1IaTJ2YhZC-mI7zbmbQMk',
            'thumbnails' => [],
            'specs' => [
                ['label' => 'Grain Size', 'value' => '0 - 3 mm'],
                ['label' => 'Origin', 'value' => 'Senegal'],
                ['label' => 'Resistance', 'value' => 'Medium-High'],
                ['label' => 'Ideal For', 'value' => 'Roads, Mortar, Foundation Layers', 'small' => true],
            ],
            'features' => [
                ['icon' => 'layers', 'title' => 'Base Material', 'description' => 'Perfect sub-base for roads and heavy structures.'],
                ['icon' => 'construction', 'title' => 'Mortar Ready', 'description' => 'Optimized grading for mortar and plaster mixes.'],
                ['icon' => 'local_shipping', 'title' => 'Fast Logistics', 'description' => 'Direct site delivery with our specialized vehicle fleet.'],
            ],
            'projectContext' => null,
            'related' => ['basalt-8-16', 'basalt-3-8', 'tasseb-sand'],
        ],
        'tasseb-sand' => [
            'name' => 'Tasseb Sand',
            'category' => 'Sand',
            'badge' => 'Premium Construction Sand',
            'description' => 'High-quality Tasseb sand sourced from the best deposits in Senegal. Ideal for concrete, masonry, and general construction use.',
            'status' => 'Stocked',
            'mainImage' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiLXsqC_CHqdj4vRFGSIAtifEnDe0pYtypqOe9-McynDc6c2TnCxmJv82nhM7eDis8nOvqMDauVmO0f-XRLmKDpZ7dH7Rq-3cs4F0E0YYCf3mg7If-kodK5Ph5EMSPYdoWQF6fKcVrXfoeCLxDX5Kmy02gSA-AuFBRPJjhMu3WJti1Vw-vusHGj2-u1GolszL6-8Yg4nRZM_BDn_MuGG_LzHEQQDWSBgYxb_AQL8ldhY_UL738uKZ7Kz1IaTJ2YhZC-mI7zbmbQMk',
            'thumbnails' => [],
            'specs' => [
                ['label' => 'Grain Size', 'value' => '0 - 2 mm'],
                ['label' => 'Origin', 'value' => 'Tasseb, Senegal'],
                ['label' => 'Type', 'value' => 'Natural Sand'],
                ['label' => 'Ideal For', 'value' => 'Concrete, Masonry, Plastering', 'small' => true],
            ],
            'features' => [
                ['icon' => 'water_drop', 'title' => 'Low Moisture', 'description' => 'Naturally low moisture content for optimal mixing ratios.'],
                ['icon' => 'grain', 'title' => 'Fine & Clean', 'description' => 'Consistent fine grain with minimal impurities.'],
                ['icon' => 'local_shipping', 'title' => 'Fast Logistics', 'description' => 'Direct site delivery with our specialized vehicle fleet.'],
            ],
            'projectContext' => null,
            'related' => ['basalt-8-16', 'basalt-3-8', 'basalt-0-3'],
        ],
    ];

    #[Route('', name: 'index', methods: ['GET'])]
    public function index(): Response
    {
        return $this->render('products/index.html.twig');
    }

    #[Route('/{slug}', name: 'show', methods: ['GET'])]
    public function show(string $slug): Response
    {
        $product = self::PRODUCTS[$slug] ?? null;

        if (null === $product) {
            throw new NotFoundHttpException('Product not found.');
        }

        // Build related products data
        $relatedProducts = array_filter(
            array_map(
                fn (string $key): ?array => isset(self::PRODUCTS[$key])
                    ? array_merge(self::PRODUCTS[$key], ['slug' => $key])
                    : null,
                $product['related']
            )
        );

        return $this->render('products/show.html.twig', [
            'product' => $product,
            'slug' => $slug,
            'relatedProducts' => $relatedProducts,
        ]);
    }
}
