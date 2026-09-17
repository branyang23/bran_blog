import type { CollectionEntry } from 'astro:content';

type BlogPost = CollectionEntry<'blog'>;

export interface TagSummary {
	name: string;
	slug: string;
	count: number;
}

export function tagToSlug(tag: string) {
	return tag
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

export function getTagSummaries(posts: BlogPost[]): TagSummary[] {
	const summaries = new Map<string, TagSummary>();

	for (const post of posts) {
		const postTags = new Set<string>();

		for (const name of post.data.tags) {
			const slug = tagToSlug(name);
			if (!slug || postTags.has(slug)) continue;

			postTags.add(slug);
			const existing = summaries.get(slug);
			if (existing) {
				existing.count += 1;
			} else {
				summaries.set(slug, { name, slug, count: 1 });
			}
		}
	}

	return [...summaries.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export function postHasTag(post: BlogPost, slug: string) {
	return post.data.tags.some((tag) => tagToSlug(tag) === slug);
}
