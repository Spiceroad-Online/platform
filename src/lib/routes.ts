export const routes = {
    home: '/',
    products: '/products/',
    launcher: '/products/launcher/',
    installer: '/products/installer/',
    serverCommandCenter: '/products/server-command-center/',
    freeResources: '/free-resources/',
    guides: '/guides/',
    dashboard: '/dashboard/',
} as const;

export const primaryNavigation = [
    { label: 'Home', href: routes.home },
    { label: 'Products', href: routes.products },
    { label: 'Free Resources', href: routes.freeResources },
    { label: 'Guides', href: routes.guides },
] as const;
