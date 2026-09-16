// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://branyang.me',
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
