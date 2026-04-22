export const siteConfig = {
    siteName: 'Spiceroad Platform',
    siteUrl: import.meta.env.PUBLIC_SITE_URL ?? 'https://platform.spiceroad.online',
    defaultTitle: 'Spiceroad Platform',
    defaultDescription:
        'Premium Silkroad Online private server resources, launcher assets, PK2 tooling, gated downloads, and custom build services.',
};

export const apiConfig = {
    apiBaseUrl: import.meta.env.PUBLIC_API_BASE_URL ?? 'https://api.platform.spiceroad.online',
    uploadsBaseUrl: import.meta.env.PUBLIC_UPLOADS_BASE_URL ?? 'https://uploads.platform.spiceroad.online',
};
