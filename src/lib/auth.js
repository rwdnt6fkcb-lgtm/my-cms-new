import { randomBytes } from 'crypto';
import { compareSync } from 'bcryptjs';
import { getAdminPasswordHash, createSession, sessionExists, deleteSession } from './db.js';

export const SESSION_COOKIE = 'cms_session';
const COOKIE_MAX_AGE = 60 * 60 * 8; // 8 hours

/**
 * Attempt login with a plain-text password.
 * Returns a new session ID on success, or null on failure.
 * @param {string} password
 * @returns {string|null}
 */
export function login(password) {
	const hash = getAdminPasswordHash();
	if (!compareSync(password, hash)) return null;

	const sessionId = randomBytes(32).toString('hex');
	createSession(sessionId);
	return sessionId;
}

/**
 * Verify that a session ID is valid.
 * @param {string|undefined} sessionId
 * @returns {boolean}
 */
export function verifySession(sessionId) {
	if (!sessionId) return false;
	return sessionExists(sessionId);
}

/**
 * Log out by deleting the session.
 * @param {string} sessionId
 */
export function logout(sessionId) {
	deleteSession(sessionId);
}

export { COOKIE_MAX_AGE };
