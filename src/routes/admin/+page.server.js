import { getAllPosts } from '$lib/db.js';

export function load() {
	const posts = getAllPosts();
	const published = posts.filter((p) => p.published).length;
	const drafts = posts.length - published;
	return { stats: { total: posts.length, published, drafts } };
}
