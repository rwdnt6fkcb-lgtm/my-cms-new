import { redirect } from '@sveltejs/kit';
import { logout, SESSION_COOKIE } from '$lib/auth.js';

export const actions = {
	default: ({ cookies }) => {
		const sessionId = cookies.get(SESSION_COOKIE);
		if (sessionId) {
			logout(sessionId);
			cookies.delete(SESSION_COOKIE, { path: '/' });
		}
		throw redirect(303, '/admin/login');
	}
};
