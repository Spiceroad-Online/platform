import { siteConfig } from './config';

type SeoInput = {
    title?: string;
    description?: string;
    pathname?: string;
};

export const buildSeo = ({ title, description, pathname = '/' }: SeoInput) => {
    const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
    const canonical = new URL(normalizedPath, siteConfig.siteUrl).toString();
    const pageTitle = title ? `${title} | ${siteConfig.siteName}` : siteConfig.defaultTitle;

    return {
        canonical,
        description: description ?? siteConfig.defaultDescription,
        title: pageTitle,
    };
};
