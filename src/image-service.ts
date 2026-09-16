import type { ExternalImageService } from 'astro';

const service: ExternalImageService = {
	getURL(options) {
		console.log('[image-service] getURL called', options.src);
		const params = new URLSearchParams();

		if (options.width) params.set('width', String(options.width));
		if (options.height) params.set('height', String(options.height));
		if (options.quality) params.set('quality', String(options.quality));
		params.set('format', options.format ?? 'auto');
		params.set('fit', 'scale-down');
		params.set('onerror', 'redirect');

		const opts = params.toString().replace(/&/g, ',');
		const src = typeof options.src === 'string' ? options.src : options.src.src;
		const source = src.startsWith('/') ? src.slice(1) : src;

		return `/cdn-cgi/image/${opts}/${source}`;
	},

	getHTMLAttributes(options) {
		const { src, format, quality, ...attributes } = options;

		return {
			...attributes,
			loading: options.loading ?? 'lazy',
			decoding: options.decoding ?? 'async',
		};
	},

	validateOptions(options) {
		return options;
	},
};

export default service;
