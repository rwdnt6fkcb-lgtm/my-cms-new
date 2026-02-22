import { getPostById, updatePost, deletePost } from '$lib/db.js';
import { slugify } from '$lib/slugify.js';
import { error, redirect, fail } from '@sveltejs/kit';

export function load({ params }) {
	const post = getPostById(Number(params.id));
	if (!post) throw error(404, 'Článok nenájdený');
	return { post };
}

export const actions = {
	update: async ({ request, params }) => {
		const data = await request.formData();
		const title = data.get('title')?.toString().trim() ?? '';
		const content = data.get('content')?.toString() ?? '';
		const excerpt = data.get('excerpt')?.toString().trim() ?? '';
		const published = data.get('published') === 'on';
		const rawSlug = data.get('slug')?.toString().trim();
		const slug = rawSlug ? slugify(rawSlug) : slugify(title);

		if (!title) return fail(400, { error: 'Názov článku je povinný.', title, content, excerpt, slug });
		if (!slug) return fail(400, { error: 'Nepodarilo sa vygenerovať URL slug.', title, content, excerpt, slug });

		try {
			updatePost(Number(params.id), { title, slug, content, excerpt, published });
		} catch (err) {
			if (err?.message?.includes('UNIQUE')) {
				return fail(400, { error: 'Článok s týmto URL slug-om už existuje.', title, content, excerpt, slug });
			}
			throw err;
		}

		return { success: 'Článok bol uložený.' };
	},

	delete: async ({ params }) => {
		deletePost(Number(params.id));
		throw redirect(303, '/admin/posts');
	}
};
