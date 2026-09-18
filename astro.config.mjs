import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import AstroPWA from '@vite-pwa/astro';

export default defineConfig({
    vite: {
        plugins: [
            tailwindcss(),
        ],
        resolve: {
            noExternal: [
                'svelte-sonner',
            ],
        },
    },
    integrations: [
        svelte(),
        AstroPWA(),
    ],
    server: {
        port: 4000,
    },
});
