// @ts-check

import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://branyang.me',
	output: 'static',
	adapter: cloudflare({
		imageService: 'custom',
	}),
	integrations: [mdx(), sitemap()],
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Lora',
			cssVariable: '--font-lora',
			fallbacks: ['serif'],
			weights: [400, 700],
			styles: ['normal', 'italic'],
			subsets: ['latin'],
		},
	],
	image: {
		service: { entrypoint: './src/image-service.ts' },
	},
});
