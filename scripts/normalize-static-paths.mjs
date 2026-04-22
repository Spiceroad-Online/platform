import fs from 'node:fs';
import path from 'node:path';

const siteDir = path.resolve('site');

const toPosix = (value) => value.split(path.sep).join('/');

const splitSuffix = (value) => {
    const match = value.match(/[?#].*$/);
    if (!match) {
        return { pathname: value, suffix: '' };
    }

    return {
        pathname: value.slice(0, match.index),
        suffix: value.slice(match.index),
    };
};

const isExternalUrl = (value) => /^(?:[a-z]+:|#|\/\/)/i.test(value);

const resolveSiteTarget = (pathname) => {
    if (pathname === '/' || pathname === '') {
        return path.join(siteDir, 'index.html');
    }

    const trimmed = pathname.replace(/^\/+/, '');
    const directTarget = path.join(siteDir, trimmed);

    if (fs.existsSync(directTarget)) {
        const stat = fs.statSync(directTarget);
        return stat.isDirectory() ? path.join(directTarget, 'index.html') : directTarget;
    }

    if (!path.posix.extname(pathname)) {
        const htmlTarget = path.join(siteDir, `${trimmed}.html`);
        if (fs.existsSync(htmlTarget)) {
            return htmlTarget;
        }
    }

    return directTarget;
};

const makeRelative = (fromDir, toFile) => {
    const relativePath = toPosix(path.relative(fromDir, toFile)) || path.basename(toFile);
    return relativePath.startsWith('.') ? relativePath : `./${relativePath}`;
};

const rewriteLocalUrl = (value, currentDir) => {
    if (!value || isExternalUrl(value)) {
        return value;
    }

    const { pathname, suffix } = splitSuffix(value);

    if (/^(?:\.\/+)?_astro\//.test(pathname)) {
        const normalizedAsset = pathname.replace(/^(?:\.\/+)?/, '');
        return `${makeRelative(currentDir, path.join(siteDir, normalizedAsset))}${suffix}`;
    }

    if (pathname.startsWith('/')) {
        return `${makeRelative(currentDir, resolveSiteTarget(pathname))}${suffix}`;
    }

    return value;
};

const rewriteRefreshContent = (value, currentDir) => {
    const match = value.match(/^(\s*\d+\s*;\s*url=)(.+)$/i);
    if (!match) {
        return value;
    }

    return `${match[1]}${rewriteLocalUrl(match[2].trim(), currentDir)}`;
};

const rewriteHtml = (htmlFilePath) => {
    const currentDir = path.dirname(htmlFilePath);
    let contents = fs.readFileSync(htmlFilePath, 'utf8');

    contents = contents.replace(/\b(href|src)=(['"])(.*?)\2/g, (fullMatch, attribute, quote, value) => {
        return `${attribute}=${quote}${rewriteLocalUrl(value, currentDir)}${quote}`;
    });

    contents = contents.replace(/\bcontent=(['"])(.*?)\1/g, (fullMatch, quote, value) => {
        return `content=${quote}${rewriteRefreshContent(value, currentDir)}${quote}`;
    });

    fs.writeFileSync(htmlFilePath, contents);
};

const rewriteCss = (cssFilePath) => {
    const currentDir = path.dirname(cssFilePath);
    let contents = fs.readFileSync(cssFilePath, 'utf8');

    contents = contents.replace(
        /url\((['"]?)(\/_astro\/[^)'"?#]+(?:[?#][^)'"]*)?)\1\)/g,
        (fullMatch, quote, assetPath) => {
            const normalizedAssetPath = assetPath.replace(/^\//, '');
            const relativeAssetPath = makeRelative(currentDir, path.join(siteDir, normalizedAssetPath));
            return `url(${quote}${relativeAssetPath}${quote})`;
        },
    );

    fs.writeFileSync(cssFilePath, contents);
};

const collectHtmlFiles = (directory) => {
    const entries = fs.readdirSync(directory, { withFileTypes: true });
    const htmlFiles = [];

    for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);
        if (entry.isDirectory()) {
            htmlFiles.push(...collectHtmlFiles(fullPath));
            continue;
        }

        if (entry.name.endsWith('.html')) {
            htmlFiles.push(fullPath);
        }
    }

    return htmlFiles;
};

const collectFilesByExtension = (directory, extension) => {
    const entries = fs.readdirSync(directory, { withFileTypes: true });
    const matches = [];

    for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);
        if (entry.isDirectory()) {
            matches.push(...collectFilesByExtension(fullPath, extension));
            continue;
        }

        if (entry.name.endsWith(extension)) {
            matches.push(fullPath);
        }
    }

    return matches;
};

if (!fs.existsSync(siteDir)) {
    throw new Error(`Static output directory not found: ${siteDir}`);
}

for (const htmlFile of collectHtmlFiles(siteDir)) {
    rewriteHtml(htmlFile);
}

for (const cssFile of collectFilesByExtension(siteDir, '.css')) {
    rewriteCss(cssFile);
}
