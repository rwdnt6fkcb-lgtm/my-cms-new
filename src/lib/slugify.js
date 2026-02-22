/**
 * Convert a post title into a URL-friendly slug.
 * @param {string} title
 * @returns {string}
 */
export function slugify(title) {
	return title
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '') // remove diacritics
		.replace(/[^a-z0-9\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');
}
