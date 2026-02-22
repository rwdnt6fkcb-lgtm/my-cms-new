import { createPost } from '$lib/db.js';
import { slugify } from '$lib/slugify.js';
import { redirect, fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
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
			const id = createPost({ title, slug, content, excerpt, published });
			throw redirect(303, `/admin/posts/${id}`);
		} catch (err) {
			if (err?.status) throw err;
			if (err?.message?.includes('UNIQUE')) {
				return fail(400, { error: 'Článok s týmto URL slug-om už existuje.', title, content, excerpt, slug });
			}
			throw err;
		}
	}
};
