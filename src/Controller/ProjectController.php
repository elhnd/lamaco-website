<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/projects', name: 'app_projects_')]
final class ProjectController extends AbstractController
{
    /** @var array<string, array<string, mixed>> Static project catalog */
    private const PROJECTS = [
        'dakar-port-expansion' => [
            'title' => 'Dakar Port Expansion Project',
            'category' => 'Infrastructure',
            'location' => 'Dakar, Senegal',
            'status' => 'Completed',
            'year' => '2024',
            'duration' => '18 Months',
            'heroImage' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuATZw85lA-bBx_tJ5sJJuGf1FXuL-wtGpqZj90ZgsWRNuL2TS_q5jzcqOZh6GcFDbTwXt89n8-jRydjxxrKg9dDzbkXeaBYny6VtPU3tDrz-syfUDgJY64peD2CFBlgMmBDIx8UIKXQUkkGvyd2MVnv0GyPdif2SU7irDy_lSbe3AmrQcHBB1v9x2-bAsNgLP5fKE5-w65JbNl2qmT2AZ0EN8qXUoCJMChQ3AN-VqJ4f3aQmJxr6gMF5qSCCKSmKePSDYw3XEDWMKc',
            'narrative' => [
                "The Dakar Port Expansion represented one of LAMACO's most significant technical challenges to date. As the primary logistics and materials partner, we were tasked with the delivery of over 200,000 tons of high-grade basalt and coordinating a complex supply chain amidst active port operations.",
                "Our solution involved a multi-modal transport strategy, utilizing our specialized fleet of heavy-duty tippers and maritime logistics expertise. We implemented a 24/7 delivery schedule to ensure the construction of the new terminal foundation stayed ahead of the rainy season, mitigating potential delays and environmental risks.",
                "LAMACO's commitment to quality was evident in our rigorous testing protocols for all Grade A basalt supplied, ensuring the long-term structural integrity of the breakwater and berth structures against the harsh Atlantic maritime environment.",
            ],
            'highlights' => [
                '200k+ Tons of Basalt Grade A Supplied',
                'Zero Lost-Time Injuries (LTI)',
                'Specialized Excavation Fleet Deployment',
                'Advanced Geotextile Integration',
                'Environmentally Conscious Logistics',
            ],
            'gallery' => [
                ['alt' => 'Site Progress', 'class' => 'masonry-item-tall', 'src' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwXA1MOaOMWdDKbR9ee1g8kmKb1vAp3Don4L5CiJMHzl8eo_qqeU0AGcctzJ797qg-QKILSQuq8bzW2C9ANelRgb_Y-cFaXTxYytwOz33_xe9GzhNZRuk9ac89awyF0jkBSjLFqY6oMI1uZk6dH56yl-gZ5RDLQFXdNK9JYB7pbn225ibJ94B66hscKvlukJf_-ltMMiqkzM2fDuaRtSxdU4oj5hwfq9-fzJydPJTcFHjO57h3KcoX7KyZZLAVqo8ydznQX4sBJ9A'],
                ['alt' => 'Material Delivery', 'class' => '', 'src' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdGwCEbAtUtF1wsstkjH-Bvx5kAdu2cZSXELr604eQGYKdXg8tAFH6af-GySHwqaeEbKKq3mZCegJhb7CTXiNPDqKbSi8KCckr9xbcjKldkiysqQlO94Ks20yaaTbSHU-DQcye1VrR-1AWShxGLGqY5gqPHDdE27_eRwDngxiVV6Vl1GaaD4B7oiESXXExXbD7dv5Gs9IUH2JhThMlPiYYkc8t7hNr7zDNWKSCIwcz7zHYYHDrW9FDrrjaP9JWR0Ioa8JiunbnT70'],
                ['alt' => 'Port Final', 'class' => 'masonry-item-wide', 'src' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcC4mKOpXSwjglb4Ge9d9gyJumxyZOHuTs2_qXTllKs7WgTpAt50V_a8uGokLUhu1H7XWY-llm5vm9l_Fg2wjecpOIgm4OasTmkzmMmBh6xZT3CvU72l_6FvtpogYk6XtFA0s2rka_VdOJfsjx5929QM0xib24FYJ8v4bYDMGlW4r6rikQZgoddQoNi3stku_3tzh5ABHZsmdJWMHSgl7T7sRnXBozS1hFOQ7_5wVysepzkFJs2x0mq1WFvHigH8F-3UPfK88J6r0'],
                ['alt' => 'Logistics Fleet', 'class' => '', 'src' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoV1xRQJ_TTTXj4AkDE8gDY0VrRhQ9WzHU1RC_Xoi7BzfF-J8afWoaufs-7UN6r84N1wrPs7ugBhjQen05MLDhTsxBjmHYoARszZHVDEuUaFsFRtllBQYbawA1wIOM8e73m484Hlx9QhQLinuxdkCLcVmGNGu8dBgIVOsl6UaWN3oDio-viOe8aoDrCHC2spQXEHI3cZH9LlWoZefO2RMV3bCWv9Au5J8Y7P8IusMNhPJHyskz50ntAcc5K821YhnQHcpznKoWwkY'],
                ['alt' => 'Construction Detail', 'class' => 'masonry-item-tall', 'src' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzmI73GChfhfQBbgWlnU9u5lLT1_pOZAweYMyW1y7y0bn8EUdjO-BEAlpTtRRFdc5F__6EZsAbb_YYbrA3V0kUY3S1PA2Kv3mTxPawsaqxFTNrf4mADKBOVNaJKeGCzQa8i2QjyvGo-kkNn_zCsH5vhQye7K7tyujRBKfMAc0W_37ced7feerwYaIOqRrPfI8swsPehV5Ww_rNlvzj6RC_XD3d_CS9RmohPGtpJB1TehbYFczcHJFBgj3i-7_uYkQAqLERDOtYcko'],
            ],
            'resources' => [
                ['icon' => 'layers', 'title' => 'Basalt Grade A', 'description' => 'Superior hardness and durability for maritime foundations.', 'linkText' => 'View Service', 'linkUrl' => 'basalt-8-16'],
                ['icon' => 'engineering', 'title' => 'Excavator Fleet', 'description' => 'Heavy-duty machinery for complex soil displacement.', 'linkText' => 'View Fleet', 'linkUrl' => null],
                ['icon' => 'local_shipping', 'title' => 'Bulk Logistics', 'description' => 'End-to-end transport management for large-scale materials.', 'linkText' => 'View Logistics', 'linkUrl' => null],
            ],
            'testimonial' => [
                'quote' => "LAMACO's ability to maintain material quality while meeting aggressive delivery schedules was pivotal for the Dakar Port expansion. Their expertise in the local Senegalese landscape made them more than a supplier — they were a critical project partner.",
                'author' => 'Moussa Diouf',
                'role' => 'Site Operations Manager, Dakar Port Authority',
            ],
        ],
        'almadies-heights' => [
            'title' => 'Almadies Heights',
            'category' => 'Residential',
            'location' => 'Almadies, Dakar',
            'status' => 'Completed',
            'year' => '2023',
            'duration' => '14 Months',
            'heroImage' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1MO7QCpkkZTqtkS4IHBvEHwFKa1x5VdzAt1U2GSbLn9ROXP7or9aY5wMwgrNdllWzZKxpShd9fl9lNt5MJVYgjfrq32FI2xHmOIqdhU9zxNhFaRYYbHqPyUT4dVCe5dWWywc9e0JL5MA0G6QuFeuPOBiKRuA8jiENSwJTHEbz4F1mb7JX75nhbs_fXxT6NAaNc1iX6yBly3txb4BRqxEEIhWHkHdGnfu-PlAEmFutlq4cbjvp4xV9wb0XdvEzp2sFXAYF3fTMS34',
            'narrative' => [
                'Almadies Heights is a flagship residential development that brought LAMACO into the premium real estate sector. We supplied all structural aggregates including basalt and high-quality sand for the complex, which features 12 luxury apartments over 8 floors.',
                'Our team coordinated just-in-time deliveries to a constrained urban site in one of Dakar\'s most exclusive neighborhoods, requiring meticulous scheduling to minimize local disruption while meeting aggressive construction timelines.',
                'The project showcased LAMACO\'s versatility — from supplying fine-grade sand for decorative plastering to heavy basalt for the reinforced foundation system designed to withstand coastal conditions.',
            ],
            'highlights' => [
                '45,000 Tons of Mixed Aggregates',
                'Urban Site Logistics Management',
                'Premium Finish Sand Supply',
                'On-Time Delivery Record',
                'Zero Community Complaints',
            ],
            'gallery' => [
                ['alt' => 'Foundation Works', 'class' => 'masonry-item-tall', 'src' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1MO7QCpkkZTqtkS4IHBvEHwFKa1x5VdzAt1U2GSbLn9ROXP7or9aY5wMwgrNdllWzZKxpShd9fl9lNt5MJVYgjfrq32FI2xHmOIqdhU9zxNhFaRYYbHqPyUT4dVCe5dWWywc9e0JL5MA0G6QuFeuPOBiKRuA8jiENSwJTHEbz4F1mb7JX75nhbs_fXxT6NAaNc1iX6yBly3txb4BRqxEEIhWHkHdGnfu-PlAEmFutlq4cbjvp4xV9wb0XdvEzp2sFXAYF3fTMS34'],
                ['alt' => 'Aggregate Delivery', 'class' => '', 'src' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuATZw85lA-bBx_tJ5sJJuGf1FXuL-wtGpqZj90ZgsWRNuL2TS_q5jzcqOZh6GcFDbTwXt89n8-jRydjxxrKg9dDzbkXeaBYny6VtPU3tDrz-syfUDgJY64peD2CFBlgMmBDIx8UIKXQUkkGvyd2MVnv0GyPdif2SU7irDy_lSbe3AmrQcHBB1v9x2-bAsNgLP5fKE5-w65JbNl2qmT2AZ0EN8qXUoCJMChQ3AN-VqJ4f3aQmJxr6gMF5qSCCKSmKePSDYw3XEDWMKc'],
                ['alt' => 'Structural Phase', 'class' => 'masonry-item-wide', 'src' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuAD-l47uLuZzEiU3gHZZ2t9IanqnVdB0_fiGcMWnKxTUWyFEflPEvlgSSCitsWpVNDFxeNX4RBsOdGhGLigbgJUCkq8mrWiEP-nUmaFqQCq1hdJYPeldCgdIuySHS4m0p6esokMtYJige7De4tBO-a7gkNbJMDhXiWMEmm205wASMAjZKG5Em_lxkhUTzs3OzRg8GM9fLTv4UcuaWezyJ239iQh_Fe6VuojOMv2e_g3Ciol--EQU_VBpKjvFrcA25JovP2ENkQ4qtM'],
                ['alt' => 'Sand Supply', 'class' => '', 'src' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbTC9kOnzIQ7SC52jRaTmlXqB4pl0id08QA-CfkkJZuyLuMmjlPbhASb_dpdsWbKk_nM1g6eKI_PplkqamTZYwGNwDt3oMb9scInBAs90dkjTtGTaN6MzrANKURtDhoqPVABiVPRFnJLUMxSK6a1ksAScb_tf4GscdfYriMUe8oEu3M8beg4TAe3OMimfjbXkGPDPCWhAUlzlWXRH9SbzyhjqaShNogp9k2dhoHjv63BTiXVDp9wDJRW66eC4dHMdSCr1PvdWOkTs'],
            ],
            'resources' => [
                ['icon' => 'layers', 'title' => 'Mixed Aggregates', 'description' => 'Graded basalt and sand for residential construction.', 'linkText' => 'View Products', 'linkUrl' => 'basalt-3-8'],
                ['icon' => 'water_drop', 'title' => 'Tasseb Sand', 'description' => 'Fine-quality sand for plastering and finishing.', 'linkText' => 'View Sand', 'linkUrl' => 'tasseb-sand'],
                ['icon' => 'local_shipping', 'title' => 'Urban Delivery', 'description' => 'Precise scheduling for constrained city sites.', 'linkText' => 'View Logistics', 'linkUrl' => null],
            ],
            'testimonial' => [
                'quote' => 'Working with LAMACO on Almadies Heights was seamless. Their understanding of urban delivery constraints and material quality control exceeded our expectations for this premium project.',
                'author' => 'Aissatou Ndiaye',
                'role' => 'Project Director, Almadies Development Group',
            ],
        ],
        'diamniadio-business-hub' => [
            'title' => 'Diamniadio Business Hub',
            'category' => 'Commercial',
            'location' => 'Diamniadio',
            'status' => 'Completed',
            'year' => '2024',
            'duration' => '22 Months',
            'heroImage' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuAD-l47uLuZzEiU3gHZZ2t9IanqnVdB0_fiGcMWnKxTUWyFEflPEvlgSSCitsWpVNDFxeNX4RBsOdGhGLigbgJUCkq8mrWiEP-nUmaFqQCq1hdJYPeldCgdIuySHS4m0p6esokMtYJige7De4tBO-a7gkNbJMDhXiWMEmm205wASMAjZKG5Em_lxkhUTzs3OzRg8GM9fLTv4UcuaWezyJ239iQh_Fe6VuojOMv2e_g3Ciol--EQU_VBpKjvFrcA25JovP2ENkQ4qtM',
            'narrative' => [
                'The Diamniadio Business Hub is the new economic heart of Senegal, and LAMACO played a central role in its material supply chain. This sprawling commercial complex required over 150,000 tons of diverse construction aggregates delivered over 22 months.',
                'Our logistics team designed a multi-route delivery strategy connecting our quarries to the Diamniadio site, optimizing fuel costs and delivery windows. We deployed our full fleet of heavy-duty tippers for continuous operations.',
                'LAMACO provided comprehensive material consulting services, helping architects specify the right aggregate grades for each building phase — from deep foundations to decorative concrete façades.',
            ],
            'highlights' => [
                '150k+ Tons of Aggregates Delivered',
                'Multi-Phase Material Consulting',
                'Full Fleet Deployment',
                'Custom Grade Specifications',
                'Continuous 22-Month Supply Chain',
            ],
            'gallery' => [
                ['alt' => 'Hub Construction', 'class' => 'masonry-item-tall', 'src' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuAD-l47uLuZzEiU3gHZZ2t9IanqnVdB0_fiGcMWnKxTUWyFEflPEvlgSSCitsWpVNDFxeNX4RBsOdGhGLigbgJUCkq8mrWiEP-nUmaFqQCq1hdJYPeldCgdIuySHS4m0p6esokMtYJige7De4tBO-a7gkNbJMDhXiWMEmm205wASMAjZKG5Em_lxkhUTzs3OzRg8GM9fLTv4UcuaWezyJ239iQh_Fe6VuojOMv2e_g3Ciol--EQU_VBpKjvFrcA25JovP2ENkQ4qtM'],
                ['alt' => 'Foundation Phase', 'class' => 'masonry-item-wide', 'src' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuATZw85lA-bBx_tJ5sJJuGf1FXuL-wtGpqZj90ZgsWRNuL2TS_q5jzcqOZh6GcFDbTwXt89n8-jRydjxxrKg9dDzbkXeaBYny6VtPU3tDrz-syfUDgJY64peD2CFBlgMmBDIx8UIKXQUkkGvyd2MVnv0GyPdif2SU7irDy_lSbe3AmrQcHBB1v9x2-bAsNgLP5fKE5-w65JbNl2qmT2AZ0EN8qXUoCJMChQ3AN-VqJ4f3aQmJxr6gMF5qSCCKSmKePSDYw3XEDWMKc'],
                ['alt' => 'Material Staging', 'class' => '', 'src' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiLXsqC_CHqdj4vRFGSIAtifEnDe0pYtypqOe9-McynDc6c2TnCxmJv82nhM7eDis8nOvqMDauVmO0f-XRLmKDpZ7dH7Rq-3cs4F0E0YYCf3mg7If-kodK5Ph5EMSPYdoWQF6fKcVrXfoeCLxDX5Kmy02gSA-AuFBRPJjhMu3WJti1Vw-vusHGj2-u1GolszL6-8Yg4nRZM_BDn_MuGG_LzHEQQDWSBgYxb_AQL8ldhY_UL738uKZ7Kz1IaTJ2YhZC-mI7zbmbQMk'],
                ['alt' => 'Fleet Operations', 'class' => '', 'src' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1MO7QCpkkZTqtkS4IHBvEHwFKa1x5VdzAt1U2GSbLn9ROXP7or9aY5wMwgrNdllWzZKxpShd9fl9lNt5MJVYgjfrq32FI2xHmOIqdhU9zxNhFaRYYbHqPyUT4dVCe5dWWywc9e0JL5MA0G6QuFeuPOBiKRuA8jiENSwJTHEbz4F1mb7JX75nhbs_fXxT6NAaNc1iX6yBly3txb4BRqxEEIhWHkHdGnfu-PlAEmFutlq4cbjvp4xV9wb0XdvEzp2sFXAYF3fTMS34'],
            ],
            'resources' => [
                ['icon' => 'diamond', 'title' => 'Basalt 8/16', 'description' => 'Heavy-grade aggregates for deep commercial foundations.', 'linkText' => 'View Product', 'linkUrl' => 'basalt-8-16'],
                ['icon' => 'filter_list', 'title' => 'Basalt 3/8', 'description' => 'Fine aggregates for decorative concrete façades.', 'linkText' => 'View Product', 'linkUrl' => 'basalt-3-8'],
                ['icon' => 'calculate', 'title' => 'Material Consulting', 'description' => 'Expert specifications for multi-phase projects.', 'linkText' => 'Learn More', 'linkUrl' => null],
            ],
            'testimonial' => [
                'quote' => 'LAMACO delivered on every promise. Their material consulting saved us significant costs, and the consistent aggregate quality across 22 months of supply was remarkable.',
                'author' => 'Ibrahima Sall',
                'role' => 'Chief Engineer, Diamniadio Business Hub',
            ],
        ],
        'coastal-roadway-phase-ii' => [
            'title' => 'Coastal Roadway Phase II',
            'category' => 'Public Works',
            'location' => 'Saint-Louis',
            'status' => 'Completed',
            'year' => '2023',
            'duration' => '24 Months',
            'heroImage' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbTC9kOnzIQ7SC52jRaTmlXqB4pl0id08QA-CfkkJZuyLuMmjlPbhASb_dpdsWbKk_nM1g6eKI_PplkqamTZYwGNwDt3oMb9scInBAs90dkjTtGTaN6MzrANKURtDhoqPVABiVPRFnJLUMxSK6a1ksAScb_tf4GscdfYriMUe8oEu3M8beg4TAe3OMimfjbXkGPDPCWhAUlzlWXRH9SbzyhjqaShNogp9k2dhoHjv63BTiXVDp9wDJRW66eC4dHMdSCr1PvdWOkTs',
            'narrative' => [
                "The Coastal Roadway Phase II project strengthened Saint-Louis's connection to northern Senegal with a 45km stretch of reinforced highway. LAMACO was the exclusive aggregate supplier, delivering road-grade basalt and sub-base materials throughout the project's 24-month duration.",
                'We mobilized a dedicated logistics chain from our quarries, with a fleet of 30+ heavy tippers maintaining a constant supply flow. Our 0/3 basalt was specially processed for the road sub-base, while 8/16 grade was used for the reinforced asphalt layer.',
                'Environmental management was paramount — LAMACO implemented dust suppression systems and scheduled deliveries to minimize impact on local communities along the construction corridor.',
            ],
            'highlights' => [
                '300k+ Tons of Road-Grade Aggregates',
                '45km Highway Supply Coverage',
                '30+ Dedicated Heavy Tippers',
                'Dust Suppression Systems Deployed',
                'Community Impact Minimization',
            ],
            'gallery' => [
                ['alt' => 'Road Construction', 'class' => 'masonry-item-wide', 'src' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbTC9kOnzIQ7SC52jRaTmlXqB4pl0id08QA-CfkkJZuyLuMmjlPbhASb_dpdsWbKk_nM1g6eKI_PplkqamTZYwGNwDt3oMb9scInBAs90dkjTtGTaN6MzrANKURtDhoqPVABiVPRFnJLUMxSK6a1ksAScb_tf4GscdfYriMUe8oEu3M8beg4TAe3OMimfjbXkGPDPCWhAUlzlWXRH9SbzyhjqaShNogp9k2dhoHjv63BTiXVDp9wDJRW66eC4dHMdSCr1PvdWOkTs'],
                ['alt' => 'Aggregate Stockpile', 'class' => 'masonry-item-tall', 'src' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiLXsqC_CHqdj4vRFGSIAtifEnDe0pYtypqOe9-McynDc6c2TnCxmJv82nhM7eDis8nOvqMDauVmO0f-XRLmKDpZ7dH7Rq-3cs4F0E0YYCf3mg7If-kodK5Ph5EMSPYdoWQF6fKcVrXfoeCLxDX5Kmy02gSA-AuFBRPJjhMu3WJti1Vw-vusHGj2-u1GolszL6-8Yg4nRZM_BDn_MuGG_LzHEQQDWSBgYxb_AQL8ldhY_UL738uKZ7Kz1IaTJ2YhZC-mI7zbmbQMk'],
                ['alt' => 'Fleet on Route', 'class' => '', 'src' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoV1xRQJ_TTTXj4AkDE8gDY0VrRhQ9WzHU1RC_Xoi7BzfF-J8afWoaufs-7UN6r84N1wrPs7ugBhjQen05MLDhTsxBjmHYoARszZHVDEuUaFsFRtllBQYbawA1wIOM8e73m484Hlx9QhQLinuxdkCLcVmGNGu8dBgIVOsl6UaWN3oDio-viOe8aoDrCHC2spQXEHI3cZH9LlWoZefO2RMV3bCWv9Au5J8Y7P8IusMNhPJHyskz50ntAcc5K821YhnQHcpznKoWwkY'],
                ['alt' => 'Completed Section', 'class' => '', 'src' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwXA1MOaOMWdDKbR9ee1g8kmKb1vAp3Don4L5CiJMHzl8eo_qqeU0AGcctzJ797qg-QKILSQuq8bzW2C9ANelRgb_Y-cFaXTxYytwOz33_xe9GzhNZRuk9ac89awyF0jkBSjLFqY6oMI1uZk6dH56yl-gZ5RDLQFXdNK9JYB7pbn225ibJ94B66hscKvlukJf_-ltMMiqkzM2fDuaRtSxdU4oj5hwfq9-fzJydPJTcFHjO57h3KcoX7KyZZLAVqo8ydznQX4sBJ9A'],
            ],
            'resources' => [
                ['icon' => 'diamond', 'title' => 'Basalt 8/16', 'description' => 'Heavy-grade aggregate for reinforced asphalt layers.', 'linkText' => 'View Product', 'linkUrl' => 'basalt-8-16'],
                ['icon' => 'construction', 'title' => 'Basalt 0/3', 'description' => 'Sub-base material for road foundation layers.', 'linkText' => 'View Product', 'linkUrl' => 'basalt-0-3'],
                ['icon' => 'local_shipping', 'title' => 'Fleet Operations', 'description' => '30+ heavy tippers for continuous supply.', 'linkText' => 'View Fleet', 'linkUrl' => null],
            ],
            'testimonial' => [
                'quote' => 'LAMACO managed 300,000+ tons of aggregate delivery without a single supply disruption. Their environmental management practices set a new standard for public works projects in Senegal.',
                'author' => 'Ousmane Ba',
                'role' => 'Regional Director, Ministry of Infrastructure',
            ],
        ],
        'thies-logistics-center' => [
            'title' => 'Thies Logistics & Distribution Center',
            'category' => 'Industrial',
            'location' => 'Thies Industrial Zone',
            'status' => 'Completed',
            'year' => '2024',
            'duration' => '16 Months',
            'heroImage' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiLXsqC_CHqdj4vRFGSIAtifEnDe0pYtypqOe9-McynDc6c2TnCxmJv82nhM7eDis8nOvqMDauVmO0f-XRLmKDpZ7dH7Rq-3cs4F0E0YYCf3mg7If-kodK5Ph5EMSPYdoWQF6fKcVrXfoeCLxDX5Kmy02gSA-AuFBRPJjhMu3WJti1Vw-vusHGj2-u1GolszL6-8Yg4nRZM_BDn_MuGG_LzHEQQDWSBgYxb_AQL8ldhY_UL738uKZ7Kz1IaTJ2YhZC-mI7zbmbQMk',
            'narrative' => [
                "The Thies Logistics & Distribution Center is a state-of-the-art industrial complex spanning 25,000m². LAMACO served as the primary construction material partner, providing all foundation aggregates and heavy earthworks support.",
                'Our excavator fleet performed extensive site preparation including ground leveling, drainage channel excavation, and foundation trenching for the massive warehouse structures. The industrial-grade flooring required specially graded basalt aggregates for maximum load-bearing capacity.',
                'LAMACO coordinated deliveries from multiple quarry sources to maintain supply continuity, with real-time logistics tracking ensuring each phase received materials exactly when needed.',
            ],
            'highlights' => [
                '25,000m² Industrial Complex',
                '120k+ Tons of Aggregates Supplied',
                'Full Excavation Fleet Deployed',
                'Real-Time Logistics Tracking',
                'Multi-Source Quarry Coordination',
            ],
            'gallery' => [
                ['alt' => 'Site Preparation', 'class' => 'masonry-item-tall', 'src' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiLXsqC_CHqdj4vRFGSIAtifEnDe0pYtypqOe9-McynDc6c2TnCxmJv82nhM7eDis8nOvqMDauVmO0f-XRLmKDpZ7dH7Rq-3cs4F0E0YYCf3mg7If-kodK5Ph5EMSPYdoWQF6fKcVrXfoeCLxDX5Kmy02gSA-AuFBRPJjhMu3WJti1Vw-vusHGj2-u1GolszL6-8Yg4nRZM_BDn_MuGG_LzHEQQDWSBgYxb_AQL8ldhY_UL738uKZ7Kz1IaTJ2YhZC-mI7zbmbQMk'],
                ['alt' => 'Excavation Works', 'class' => 'masonry-item-wide', 'src' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdGwCEbAtUtF1wsstkjH-Bvx5kAdu2cZSXELr604eQGYKdXg8tAFH6af-GySHwqaeEbKKq3mZCegJhb7CTXiNPDqKbSi8KCckr9xbcjKldkiysqQlO94Ks20yaaTbSHU-DQcye1VrR-1AWShxGLGqY5gqPHDdE27_eRwDngxiVV6Vl1GaaD4B7oiESXXExXbD7dv5Gs9IUH2JhThMlPiYYkc8t7hNr7zDNWKSCIwcz7zHYYHDrW9FDrrjaP9JWR0Ioa8JiunbnT70'],
                ['alt' => 'Warehouse Structure', 'class' => '', 'src' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcC4mKOpXSwjglb4Ge9d9gyJumxyZOHuTs2_qXTllKs7WgTpAt50V_a8uGokLUhu1H7XWY-llm5vm9l_Fg2wjecpOIgm4OasTmkzmMmBh6xZT3CvU72l_6FvtpogYk6XtFA0s2rka_VdOJfsjx5929QM0xib24FYJ8v4bYDMGlW4r6rikQZgoddQoNi3stku_3tzh5ABHZsmdJWMHSgl7T7sRnXBozS1hFOQ7_5wVysepzkFJs2x0mq1WFvHigH8F-3UPfK88J6r0'],
                ['alt' => 'Final Complex', 'class' => 'masonry-item-tall', 'src' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzmI73GChfhfQBbgWlnU9u5lLT1_pOZAweYMyW1y7y0bn8EUdjO-BEAlpTtRRFdc5F__6EZsAbb_YYbrA3V0kUY3S1PA2Kv3mTxPawsaqxFTNrf4mADKBOVNaJKeGCzQa8i2QjyvGo-kkNn_zCsH5vhQye7K7tyujRBKfMAc0W_37ced7feerwYaIOqRrPfI8swsPehV5Ww_rNlvzj6RC_XD3d_CS9RmohPGtpJB1TehbYFczcHJFBgj3i-7_uYkQAqLERDOtYcko'],
            ],
            'resources' => [
                ['icon' => 'diamond', 'title' => 'Basalt 8/16', 'description' => 'Industrial-grade aggregate for heavy load-bearing foundations.', 'linkText' => 'View Product', 'linkUrl' => 'basalt-8-16'],
                ['icon' => 'engineering', 'title' => 'Excavator Fleet', 'description' => 'Full earthworks fleet for site preparation.', 'linkText' => 'View Fleet', 'linkUrl' => null],
                ['icon' => 'construction', 'title' => 'Basalt 0/3', 'description' => 'Fine aggregate for industrial flooring applications.', 'linkText' => 'View Product', 'linkUrl' => 'basalt-0-3'],
            ],
            'testimonial' => [
                'quote' => "LAMACO's integrated approach — combining material supply with excavation services — simplified our vendor management and accelerated the project by two months. Their real-time tracking gave us complete visibility into the supply chain.",
                'author' => 'Fatou Diop',
                'role' => 'Operations Manager, Thies Industrial Development Authority',
            ],
        ],
    ];

    #[Route('', name: 'index', methods: ['GET'])]
    public function index(): Response
    {
        return $this->render('projects/index.html.twig');
    }

    #[Route('/{slug}', name: 'show', methods: ['GET'])]
    public function show(string $slug): Response
    {
        $project = self::PROJECTS[$slug] ?? null;

        if (null === $project) {
            throw new NotFoundHttpException('Project not found.');
        }

        return $this->render('projects/show.html.twig', [
            'project' => $project,
            'slug' => $slug,
        ]);
    }
}
