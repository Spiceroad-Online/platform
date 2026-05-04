import installerEulaPage from '../assets/installer-eula-page.png';
import installerFinishPage from '../assets/installer-finish-page.png';
import installerInstallPage from '../assets/installer-install-page.png';
import installerLocationPage from '../assets/installer-location-page.png';
import installerWelcomePage from '../assets/installer-welcome-page.png';
import launcherHomePage from '../assets/launcher-home-page.png';
import launcherSettingsPage from '../assets/launcher-settings-page.png';
import launcherUpdatePage from '../assets/launcher-update-page.png';
import sccDashboardPage from '../assets/scc-dashboard-page.png';
import sccDatabasePage from '../assets/scc-database-page.png';
import sccGamePage from '../assets/scc-game-page.png';
import sccPluginsOverview from '../assets/scc-plugins-overview.png';
import sccServerPage from '../assets/scc-server-page.png';
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
        pricePrefix: 'From',
        priceLabel: '$100',
        badge: 'SRO Core',
        href: routes.installer,
        imageSrc: installerInstallPage.src,
        imageAlt: 'Installer install page screenshot',
        ctaLabel: 'Order Now',
    },
    {
        slug: 'launcher',
        name: 'Game Launcher',
        description:
            'Order a branded five-screen launcher package with homepage, settings, update, trailer, and guide views.',
        pricePrefix: 'From',
        priceLabel: '$149',
        badge: 'Source',
        href: routes.launcher,
        imageSrc: launcherHomePage.src,
        imageAlt: 'Launcher homepage screenshot',
        ctaLabel: 'Order Now',
    },
    {
        slug: 'server-command-center',
        name: 'Server Command Center',
        description: 'Command center dashboard for server, game, and database operations in one admin surface.',
        pricePrefix: 'From',
        priceLabel: '$59',
        badge: 'Control',
        href: routes.serverCommandCenter,
        imageSrc: sccDashboardPage.src,
        imageAlt: 'Server Command Center dashboard screenshot',
        ctaLabel: 'View Product',
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
        description: 'Branded launcher package with homepage, settings, update, trailer, and guide screens.',
        priceLabel: 'From $149',
        badge: 'Flagship',
        href: routes.launcher,
        imageSrc: launcherHomePage.src,
        imageAlt: 'Launcher homepage screenshot',
        ctaLabel: 'View Product',
        heroBadges: ['5 screen flow', 'Custom branding'],
        sideNote:
            'Start a launcher order with your logo and optional background artwork for a branded five-screen flow.',
        sideList: [
            'Homepage, settings, update, trailer, and guide screens',
            'Logo required for branding',
            'Optional background artwork',
            'Pairs with the installer order flow',
        ],
        gallery: [
            { src: launcherHomePage.src, alt: 'Launcher homepage screenshot' },
            { src: launcherSettingsPage.src, alt: 'Launcher settings screenshot' },
            { src: launcherUpdatePage.src, alt: 'Launcher update screenshot' },
        ],
        subtitle:
            'A premium launcher package built around the in-game Silkroad look, with polished homepage, settings, update, trailer, and guide screens. This product is designed for servers that want a branded launcher experience that feels production-ready from first boot.',
        stats: [
            { value: '5 screens', label: 'Home, settings, update, trailer, guide' },
            { value: 'Logo required', label: 'Used across launcher branding' },
            { value: 'Artwork ready', label: 'Optional background image set' },
        ],
        included: [
            'Homepage launcher shell with navigation, patch status, notices, and branded entry panel.',
            'Settings screen with launcher-side controls for language, resolution, graphics, and audio.',
            'Update screen with a clear patching state and progress-focused presentation.',
            'Trailer and guide screens planned for richer media and onboarding content.',
            'Editable logo placement, background artwork, links, notices, and footer copy.',
        ],
        goodFit: [
            'Servers that want a premium first impression before the client even launches.',
            'Projects packaging updates, trailers, settings, and support links into one desktop flow.',
            'Teams that want a presentable launcher base they can iterate on over time.',
            'Storefronts selling branded launcher themes or premium client distribution packages.',
        ],
        comparisonTitle: 'Order requirements',
        comparisonHeaders: ['Item', 'Required', 'Notes'],
        comparisonRows: [
            {
                tier: 'Logo',
                price: 'Yes',
                includes:
                    'Required brand mark used across the launcher homepage, settings, update, trailer, and guide screens',
            },
            {
                tier: 'Background images',
                price: 'Optional',
                includes: 'Custom artwork for the launcher homepage, settings, update, trailer, and guide presentation',
            },
            {
                tier: 'Server links and copy',
                price: 'Optional',
                includes: 'Useful for notices, website links, support links, and footer text',
            },
            {
                tier: 'Installer pairing',
                price: 'Optional',
                includes: 'Useful when pairing the launcher with the branded installer package',
            },
        ],
        faqs: [
            {
                question: 'Does this include settings, update, trailer, and guide screens too?',
                answer: 'Yes. The package is presented as a five-screen launcher family: homepage, settings, update, trailer, and guide.',
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
        primaryActionLabel: 'Start order',
        secondaryActionLabel: 'Add to Wishlist',
    },
    {
        slug: 'installer',
        name: 'Game Installer',
        description:
            'Upload-based installer service with destination, progress, and agreement screens for branded delivery.',
        priceLabel: 'From $100',
        badge: 'Upload',
        href: routes.installer,
        imageSrc: installerInstallPage.src,
        imageAlt: 'Installer install page screenshot',
        ctaLabel: 'View Product',
        heroBadges: ['Bundle available', 'Custom branding'],
        sideNote:
            'Choose download mode for hosted archives or bundle mode to package your client directly into the installer.',
        sideList: [
            'Download mode: $100',
            'Bundle mode: $150',
            'Logo and legal text required',
            'Optional background artwork',
        ],
        gallery: [
            { src: installerWelcomePage.src, alt: 'Installer welcome page screenshot' },
            { src: installerEulaPage.src, alt: 'Installer EULA page screenshot' },
            { src: installerLocationPage.src, alt: 'Installer location page screenshot' },
            { src: installerInstallPage.src, alt: 'Installer install page screenshot' },
            { src: installerFinishPage.src, alt: 'Installer finish page screenshot' },
        ],
        subtitle:
            'A branded installer service for servers that want a polished client setup experience, from destination selection to progress flow and legal acceptance screens.',
        stats: [
            { value: '5 screens', label: 'Welcome, EULA, destination, progress, finish' },
            { value: 'Bundle mode', label: 'up to 3 uploads of your own client' },
            { value: 'Download mode', label: 'host your own client archive download' },
        ],
        included: [
            'Installer application with welcome, EULA, destination, progress, and finish screens.',
            'Choose bundle mode to include your game client, or download mode to host the client archive for installation-time delivery.',
            'Fully customizable artwork, logo placement, copy, colors, and server branding.',
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
            {
                tier: 'Client archive',
                price: 'Bundle mode',
                includes: 'Your game client archive packaged directly into the installer',
            },
            {
                tier: 'Download host URL',
                price: 'Download mode',
                includes: 'Your download server or hosted client archive URL for installation-time delivery',
            },
            {
                tier: 'Logo',
                price: 'Yes',
                includes: 'Required brand mark used across the installer screens',
            },
            {
                tier: 'License and ToU .txt files',
                price: 'Yes',
                includes: 'Required license and Terms of Use text files for the EULA step',
            },
            {
                tier: 'Background images',
                price: 'Optional',
                includes: 'Custom artwork for welcome, EULA, destination, progress, and finish screens',
            },
            {
                tier: 'Launcher integration',
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
        primaryActionLabel: 'Start order',
        secondaryActionLabel: 'Add to Wishlist',
    },
    {
        slug: 'server-command-center',
        name: 'Server Command Center',
        description: 'Command center dashboard for server, game, and database operations in one admin surface.',
        priceLabel: 'From $59',
        badge: 'Control',
        href: routes.serverCommandCenter,
        imageSrc: sccDashboardPage.src,
        imageAlt: 'Server Command Center dashboard screenshot',
        ctaLabel: 'View Product',
        heroBadges: ['Command Center', 'Operations UI'],
        sideNote:
            'A focused control surface for teams that need server, game, and database operations visible from one dashboard.',
        sideList: [
            'Dashboard, server, game, and database views',
            'Admin-focused operational UI',
            'Expandable with environment-specific modules',
            'Pairs with launcher and installer product family',
        ],
        gallery: [
            { src: sccDashboardPage.src, alt: 'Server Command Center dashboard screenshot' },
            { src: sccServerPage.src, alt: 'Server Command Center server page screenshot' },
            { src: sccGamePage.src, alt: 'Server Command Center game page screenshot' },
            { src: sccDatabasePage.src, alt: 'Server Command Center database page screenshot' },
            { src: sccPluginsOverview.src, alt: 'Server Command Center plugins overview screenshot' },
        ],
        subtitle:
            'A command center dashboard for operating Silkroad infrastructure through one coherent interface for server status, game configuration, database workflows, and routine admin-side tooling.',
        stats: [
            { value: '4 views', label: 'Dashboard, server, game, database' },
            { value: 'Ops focused', label: 'Built for operators, not players' },
            { value: 'Brand ready', label: 'Adapt labels, links, and sections' },
        ],
        included: [
            'Dashboard overview for server visibility, status, and operational summaries.',
            'Server page for service-oriented controls and infrastructure management workflows.',
            'Game page for gameplay-facing configuration, shortcuts, and maintenance tasks.',
            'Database page for SQL-oriented operations, backups, and data workflow access points.',
            'Structured admin UI that can be branded as part of your broader server toolkit.',
        ],
        goodFit: [
            'Owners running a serious Silkroad deployment with multiple server components.',
            'Teams that want one command center instead of scattered utility scripts and notes.',
            'Projects selling premium infrastructure tooling as part of a managed server stack.',
            'Operators who want a presentable panel for repeat maintenance and oversight tasks.',
        ],
        comparisonTitle: 'Package comparison',
        comparisonHeaders: ['Tier', 'Price', 'Includes'],
        comparisonRows: [
            {
                tier: 'Starter',
                price: '$59',
                includes: 'Dashboard, server, game, and database command center screens',
            },
            {
                tier: 'Expanded',
                price: '$119',
                includes: 'Starter + branded labels, extra admin sections, and custom quick actions',
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
                answer: 'No. Server Command Center is framed as an operator/admin tool for server maintenance and monitoring.',
            },
            {
                question: 'Can sections be customized?',
                answer: 'Yes. Labels, quick actions, views, and environment-specific modules can be tailored.',
            },
            {
                question: 'Does it pair with the launcher and installer?',
                answer: 'Yes. The product pages form one consistent family: player-facing launcher, distribution installer, and operator-facing command center.',
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
