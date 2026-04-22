import { defineConfig } from 'astro/config';

export default defineConfig({
    outDir: './site',
    output: 'static',
    build: {
        format: 'directory',
    },
});
