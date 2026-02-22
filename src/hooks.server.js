import { verifySession, SESSION_COOKIE } from '$lib/auth.js';
import { redirect } from '@sveltejs/kit';

export function handle({ event, resolve }) {
	const sessionId = event.cookies.get(SESSION_COOKIE);
	event.locals.isAdmin = verifySession(sessionId);

	// Protect all /admin routes except /admin/login
	if (event.url.pathname.startsWith('/admin') && !event.url.pathname.startsWith('/admin/login')) {
		if (!event.locals.isAdmin) {
			throw redirect(303, '/admin/login');
		}
	}

	return resolve(event);
}
