import { getAllPosts } from '$lib/db.js';

export function load() {
	return { posts: getAllPosts() };
}
