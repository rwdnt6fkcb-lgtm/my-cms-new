import { getPostBySlug } from '$lib/db.js';
import { error } from '@sveltejs/kit';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

export function load({ params }) {
	const post = getPostBySlug(params.slug);

	if (!post || !post.published) {
		throw error(404, 'Článok nenájdený');
	}

	const rawHtml = marked.parse(post.content);
	const html = sanitizeHtml(rawHtml, {
		allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'details', 'summary']),
		allowedAttributes: {
			...sanitizeHtml.defaults.allowedAttributes,
			img: ['src', 'alt', 'width', 'height'],
			a: ['href', 'target', 'rel']
		}
	});

	return {
		post: {
			...post,
			html
		}
	};
}
