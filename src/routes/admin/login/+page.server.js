import { redirect } from '@sveltejs/kit';
import { login, SESSION_COOKIE, COOKIE_MAX_AGE } from '$lib/auth.js';

export function load({ locals }) {
	if (locals.isAdmin) {
		throw redirect(303, '/admin');
	}
	return {};
}

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const password = data.get('password')?.toString() ?? '';

		const sessionId = login(password);

		if (!sessionId) {
			return { error: 'Nesprávne heslo. Skús znova.' };
		}

		cookies.set(SESSION_COOKIE, sessionId, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			maxAge: COOKIE_MAX_AGE
		});

		throw redirect(303, '/admin');
	}
};
