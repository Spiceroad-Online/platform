import {
    dashboardMetrics,
    dashboardOrders,
    dashboardSections,
    freeResources,
    guides,
    productCatalog,
} from '../content/platform';

export const listProducts = () => productCatalog;

export const getProductBySlug = (slug: string) => productCatalog.find((product) => product.slug === slug);

export const listGuides = () => guides;

export const listFreeResources = () => freeResources;

export const getDashboardData = () => ({
    metrics: dashboardMetrics,
    orders: dashboardOrders,
    sections: dashboardSections,
});
