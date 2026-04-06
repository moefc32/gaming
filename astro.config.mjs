import { setMaxListeners } from 'events';
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import AstroPWA from '@vite-pwa/astro';

setMaxListeners(12);

export default defineConfig({
    vite: {
        plugins: [
            tailwindcss(),
        ],
        resolve: {
            noExternal: [
                '@lucide/svelte',
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
