import { getPublishedPosts } from '$lib/db.js';

export function load() {
	return {
		posts: getPublishedPosts()
	};
}
