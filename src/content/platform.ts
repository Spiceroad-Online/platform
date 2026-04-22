import installerScreen from '../assets/installer-screen.png';
import installerScreen2 from '../assets/installer-screen2.png';
import installerScreen3 from '../assets/installer-screen3.png';
import launcherScreen from '../assets/launcher-screen.png';
import launcherScreen2 from '../assets/launcher-screen2.png';
import serverManagerScreen from '../assets/server-manager-screen.png';
import serverManagerScreen2 from '../assets/server-manager-screen2.png';
import { routes } from '../lib/routes';

export type ActionLink = {
    label: string;
    href: string;
};

export type FeaturedProduct = {
    slug?: string;
    name: string;
    description: string;
    priceLabel: string;
    pricePrefix?: string;
    badge: string;
    href: string;
    imageSrc?: string;
    imageAlt?: string;
    monogram?: string;
    artwork?: 'artifact' | 'monogram';
    ctaLabel?: string;
};

export type ProductStat = {
    label: string;
    value: string;
};

export type ComparisonRow = {
    tier: string;
    price: string;
    includes: string;
};

export type ProductFaq = {
    question: string;
    answer: string;
};

export type ProductDetail = FeaturedProduct & {
    heroBadges: string[];
    sideNote: string;
    sideList: string[];
    gallery: Array<{ src: string; alt: string }>;
    subtitle: string;
    stats: ProductStat[];
    included: string[];
    goodFit: string[];
    comparisonTitle: string;
    comparisonHeaders: [string, string, string];
    comparisonRows: ComparisonRow[];
    faqs: ProductFaq[];
    primaryActionLabel: string;
    secondaryActionLabel: string;
};

export type GuideSummary = {
    title: string;
    description: string;
    meta: string;
};

export type ResourceSummary = {
    title: string;
    description: string;
    meta: string;
    ctaLabel: string;
    href: string;
};

export type DashboardMetric = {
    value: string;
    label: string;
};

export type DashboardOrder = {
    product: string;
    status: string;
    updated: string;
    action: string;
};

export const homepageHero = {
    titleLines: ['Premium', 'Silkroad Online', 'Private Server Resources'],
    copy: 'A real storefront for serious private-server operators: launcher UI, custom installer builds, PK2 workflow tools, gated free downloads, and technical resources delivered through a polished member platform.',
    primaryAction: { label: 'Browse Products', href: routes.products },
    secondaryAction: { label: 'Get Membership', href: routes.dashboard },
};

export const featuredProducts: FeaturedProduct[] = [
    {
        slug: 'installer',
        name: 'Game Installer',
        description:
            'Upload your client files to generate a custom installer package aligned with your server branding.',
        priceLabel: '$79',
        badge: 'SRO Core',
        href: routes.installer,
        imageSrc: installerScreen.src,
        imageAlt: 'Game installer',
        ctaLabel: 'Order Now',
    },
    {
        slug: 'launcher',
        name: 'Game Launcher',
        description:
            'Fully customizable game launcher package inspired by in-game launcher aesthetics and modern product UX.',
        pricePrefix: 'From',
        priceLabel: '$149',
        badge: 'Source',
        href: routes.launcher,
        imageSrc: launcherScreen.src,
        imageAlt: 'Game launcher',
        ctaLabel: 'Get Now',
    },
    {
        slug: 'pk2-tools',
        name: 'PK2 Tools Suite',
        description: 'Free gated toolkit area for PK2 editing, extraction, and archive workflow resources.',
        priceLabel: 'Free',
        badge: 'Login',
        href: routes.freeResources,
        artwork: 'artifact',
        monogram: 'PK2',
        ctaLabel: 'Login to Download',
    },
];

export const productCatalog: ProductDetail[] = [
    {
        slug: 'launcher',
        name: 'Game Launcher',
        description: 'Branded launcher package with home, settings, progress, and premium player-entry screens.',
        priceLabel: 'From $149',
        badge: 'Flagship',
        href: routes.launcher,
        imageSrc: launcherScreen.src,
        imageAlt: 'Launcher main screenshot',
        ctaLabel: 'View Product',
        heroBadges: ['Flagship Product', 'Source Included'],
        sideNote:
            'Premium game launcher source package with visuals and structure tailored for Silkroad private-server branding.',
        sideList: [
            'Instant dashboard delivery',
            'Commercial presentation-ready',
            'Pairs well with custom installer service',
            'Expandable with bespoke work',
        ],
        gallery: [
            { src: launcherScreen.src, alt: 'Launcher main screenshot' },
            { src: launcherScreen2.src, alt: 'Launcher settings screenshot' },
        ],
        subtitle:
            'A premium launcher package built around the in-game Silkroad look, with polished screens for patching, settings, promotion, and entry flow. This product is designed for servers that want a branded launcher experience that feels production-ready from first boot.',
        stats: [
            { value: '4 screens', label: 'Landing, settings, progress, legal' },
            { value: 'Brand ready', label: 'Replace logo, links, artwork' },
            { value: 'Delivery', label: 'Source package + assets' },
        ],
        included: [
            'Main launcher shell with navigation, patch status, and branded home panel.',
            'Settings screen with launcher-side controls for language, resolution, graphics, and audio.',
            'Installer/progress-ready visual language so the full product family stays cohesive.',
            'Editable artwork, logo placement, links, and footer/legal sections.',
        ],
        goodFit: [
            'Servers that want a premium first impression before the client even launches.',
            'Projects packaging updates, trailers, settings, and support links into one desktop flow.',
            'Teams that want a presentable launcher base they can iterate on over time.',
            'Storefronts selling branded launcher themes or premium client distribution packages.',
        ],
        comparisonTitle: 'Package comparison',
        comparisonHeaders: ['Tier', 'Price', 'Includes'],
        comparisonRows: [
            {
                tier: 'Starter',
                price: '$149',
                includes: 'Main launcher source, settings screen, and asset placeholders',
            },
            {
                tier: 'Branded',
                price: '$249',
                includes: 'Starter + logo/colors/content setup and polished screen pack',
            },
            {
                tier: 'Custom',
                price: 'Quote',
                includes: 'Custom flows, extra screens, service wiring, and store integration',
            },
        ],
        faqs: [
            {
                question: 'Does this include the settings screen too?',
                answer: 'Yes. The package is presented as a launcher family, not just a single landing panel.',
            },
            {
                question: 'Can I white-label it?',
                answer: 'Yes. The package is structured so your logo, links, artwork, and labels can be replaced quickly.',
            },
            {
                question: 'Can this pair with the installer flow?',
                answer: 'Yes. The installer page and launcher page are designed to feel like one product ecosystem.',
            },
        ],
        primaryActionLabel: 'Buy Now',
        secondaryActionLabel: 'Add to Wishlist',
    },
    {
        slug: 'installer',
        name: 'Game Installer',
        description:
            'Upload-based installer service with destination, progress, and agreement screens for branded delivery.',
        priceLabel: '$79',
        badge: 'Upload',
        href: routes.installer,
        imageSrc: installerScreen.src,
        imageAlt: 'Installer destination screenshot',
        ctaLabel: 'View Product',
        heroBadges: ['Upload-Based Service', 'Custom Delivery'],
        sideNote:
            'Designed for bespoke delivery, not generic instant download. Ideal for the upload-based product flow you requested.',
        sideList: [
            'Upload required before fulfillment',
            'Per-order review process',
            'Private finished build delivery',
            'Upgradeable to custom branding',
        ],
        gallery: [
            { src: installerScreen.src, alt: 'Installer destination screenshot' },
            { src: installerScreen2.src, alt: 'Installer progress screenshot' },
            { src: installerScreen3.src, alt: 'Installer agreement screenshot' },
        ],
        subtitle:
            'A branded installer service for servers that want a polished client setup experience, from destination selection to progress flow and legal acceptance screens.',
        stats: [
            { value: '3 screens', label: 'Destination, progress, agreements' },
            { value: 'Upload intake', label: 'Client + branding assets' },
            { value: 'Private delivery', label: 'Dashboard only' },
        ],
        included: [
            'Installer destination selection, browse flow, and branded setup shell.',
            'Live installation progress screen with download and current-file states.',
            'EULA / terms acceptance step for a complete professional installer journey.',
            'Artwork and copy setup so the installer feels aligned with the rest of your platform.',
        ],
        goodFit: [
            'Servers that want a premium first-run setup experience instead of a plain installer shell.',
            'Projects shipping branded clients to members or customers through private delivery.',
            'Teams pairing an installer package with a launcher and account dashboard flow.',
            'Operators who need a cleaner legal/EULA acceptance step for their client distribution.',
        ],
        comparisonTitle: 'Order requirements',
        comparisonHeaders: ['Item', 'Required', 'Notes'],
        comparisonRows: [
            { tier: 'client.zip', price: 'Yes', includes: 'Main client package to process' },
            {
                tier: 'Logo assets',
                price: 'Optional',
                includes: 'Used for branded installer screens and legal pages',
            },
            { tier: 'Server copy', price: 'Optional', includes: 'Support text, links, and descriptions' },
            {
                tier: 'Launcher integration notes',
                price: 'Optional',
                includes: 'Useful when pairing the installer with the launcher package',
            },
        ],
        faqs: [
            {
                question: 'Is this an instant download product?',
                answer: 'No. It is a build service that starts from your provided client package and branding assets.',
            },
            {
                question: 'Can the installer match the launcher visuals?',
                answer: 'Yes. The installer and launcher are designed to be sold as a coherent pair.',
            },
            {
                question: 'Can legal/EULA content be customized?',
                answer: 'Yes. Agreement copy, labels, and branded artwork can be adapted to your server.',
            },
        ],
        primaryActionLabel: 'Start Order',
        secondaryActionLabel: 'Add to Wishlist',
    },
    {
        slug: 'server-manager',
        name: 'Server Manager',
        description:
            'Admin control panel for configuration, monitoring, server visibility, and routine operational workflows.',
        priceLabel: 'From $59',
        badge: 'Control',
        href: routes.serverManager,
        imageSrc: serverManagerScreen.src,
        imageAlt: 'Server manager overview',
        ctaLabel: 'View Product',
        heroBadges: ['Control Panel', 'Operations UI'],
        sideNote:
            'A clean operations layer for teams that need visibility across configs, services, and server health from one interface.',
        sideList: [
            'Admin-focused operational UI',
            'Fits shard, config, and server tooling workflows',
            'Expandable with environment-specific modules',
            'Pairs with launcher and installer product family',
        ],
        gallery: [
            { src: serverManagerScreen.src, alt: 'Server manager overview' },
            { src: serverManagerScreen2.src, alt: 'Server manager lower panel detail' },
        ],
        subtitle:
            'A management dashboard for operating Silkroad infrastructure with one coherent interface for configuration, shard and server visibility, service navigation, and admin-side tooling.',
        stats: [
            { value: '8+ panels', label: 'Configs, shards, agents, tools' },
            { value: 'Status aware', label: 'Detected files and server checks' },
            { value: 'Admin focused', label: 'Built for operators, not players' },
        ],
        included: [
            'Configuration overview dashboard with file detection and service summary.',
            'Navigation for core servers, agent servers, game servers, and utility tools.',
            'Editable sections for configs, SQL install/backup, paths, and operational shortcuts.',
            'Structured admin UI that can be branded as part of your broader server toolkit.',
        ],
        goodFit: [
            'Owners running a serious Silkroad deployment with multiple server components.',
            'Teams that want one admin interface instead of scattered utility scripts and notes.',
            'Projects selling premium infrastructure tooling as part of a managed server stack.',
            'Operators who want a presentable panel for repeat maintenance and oversight tasks.',
        ],
        comparisonTitle: 'Package comparison',
        comparisonHeaders: ['Tier', 'Price', 'Includes'],
        comparisonRows: [
            {
                tier: 'Starter',
                price: '$59',
                includes: 'Core interface shell and standard server management sections',
            },
            {
                tier: 'Expanded',
                price: '$119',
                includes: 'Starter + extra admin tabs, branded labels, and custom quick actions',
            },
            {
                tier: 'Custom',
                price: 'Quote',
                includes: 'Workflow tailoring, new tools, environment-specific wiring, and deeper ops views',
            },
        ],
        faqs: [
            {
                question: 'Is this player-facing?',
                answer: 'No. This product is framed as an operator/admin tool for server maintenance and monitoring.',
            },
            {
                question: 'Can sections be customized?',
                answer: 'Yes. Tabs, labels, quick actions, and environment-specific modules can be tailored.',
            },
            {
                question: 'Does it pair with the launcher and installer?',
                answer: 'Yes. The three product pages form one consistent family: player-facing launcher, distribution installer, and operator-facing manager.',
            },
        ],
        primaryActionLabel: 'Buy Now',
        secondaryActionLabel: 'Add to Wishlist',
    },
];

export const guides: GuideSummary[] = [
    {
        meta: 'Guide',
        title: 'How to structure a gated free-download library',
        description:
            'Keep public landing pages indexable, but enforce login only when the user tries to claim or download the resource.',
    },
    {
        meta: 'Guide',
        title: 'When a product should be upload-based',
        description:
            'Some items are services, not instant downloads. That changes the UX, order status, and dashboard requirements.',
    },
    {
        meta: 'Guide',
        title: 'Using launcher visuals as commerce assets',
        description:
            'How to transform in-game or launcher-style visual identity into a polished storefront without losing atmosphere.',
    },
];

export const freeResources: ResourceSummary[] = [
    {
        meta: 'Free • Login required',
        title: 'PK2 Starter Library',
        description: 'Introductory archive workflow resources, helper files, and starter notes for tooling pipelines.',
        ctaLabel: 'Login to Claim',
        href: routes.dashboard,
    },
    {
        meta: 'Free • Login required',
        title: 'Launcher Copy Pack',
        description: 'Placeholder text and structure examples for notices, links, and launcher presentation blocks.',
        ctaLabel: 'Login to Claim',
        href: routes.dashboard,
    },
    {
        meta: 'Free • Login required',
        title: 'Branding Checklist',
        description: 'A practical checklist for server naming, homepage composition, CTA flow, and delivery readiness.',
        ctaLabel: 'Login to Claim',
        href: routes.dashboard,
    },
];

export const platformHighlights = [
    {
        icon: 'tools',
        title: 'Exclusive Dev Tools',
        copy: 'High-end PK2 editors, script generators, launcher builders, and other technical resources for advanced Silkroad workflows.',
    },
    {
        icon: 'support',
        title: 'Dedicated Support',
        copy: 'Expert guidance for launcher customization, packaging flows, delivery portals, and infrastructure hardening.',
    },
    {
        icon: 'resources',
        title: 'Premium Resources',
        copy: 'Free and paid content organized into a member-friendly experience with SEO-friendly public pages and gated delivery.',
    },
];

export const dashboardSections = ['Overview', 'My Orders', 'Downloads', 'Uploads', 'Free Library', 'Account'];

export const dashboardMetrics: DashboardMetric[] = [
    { value: '4', label: 'Active orders' },
    { value: '12', label: 'Available downloads' },
    { value: '3', label: 'Pending uploads' },
];

export const dashboardOrders: DashboardOrder[] = [
    { product: 'Game Installer', status: 'In review', updated: 'Today', action: 'Open order' },
    { product: 'Game Launcher', status: 'Ready', updated: 'Yesterday', action: 'Download' },
    { product: 'PK2 Tools Suite', status: 'Claimed', updated: 'Apr 18', action: 'Open library' },
];
