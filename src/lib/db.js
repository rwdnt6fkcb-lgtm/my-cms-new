import Database from 'better-sqlite3';
import { join } from 'path';
import { hashSync } from 'bcryptjs';

let db;

/**
 * Get (or create) the database connection.
 * @returns {import('better-sqlite3').Database}
 */
export function getDb() {
	if (!db) {
		const dbPath = process.env.DATABASE_PATH || join(process.cwd(), 'cms.db');
		db = new Database(dbPath);
		db.pragma('journal_mode = WAL');
		db.pragma('foreign_keys = ON');
		migrate(db);
	}
	return db;
}

function migrate(db) {
	db.exec(`
		CREATE TABLE IF NOT EXISTS posts (
			id        INTEGER PRIMARY KEY AUTOINCREMENT,
			title     TEXT    NOT NULL,
			slug      TEXT    NOT NULL UNIQUE,
			content   TEXT    NOT NULL DEFAULT '',
			excerpt   TEXT    NOT NULL DEFAULT '',
			published INTEGER NOT NULL DEFAULT 0,
			created_at TEXT NOT NULL DEFAULT (datetime('now')),
			updated_at TEXT NOT NULL DEFAULT (datetime('now'))
		);

		CREATE TABLE IF NOT EXISTS settings (
			key   TEXT PRIMARY KEY,
			value TEXT NOT NULL
		);

		CREATE TABLE IF NOT EXISTS sessions (
			id         TEXT PRIMARY KEY,
			created_at TEXT NOT NULL DEFAULT (datetime('now'))
		);
	`);

	// Seed default admin password if not set
	const hasPassword = db.prepare("SELECT value FROM settings WHERE key = 'admin_password'").get();
	if (!hasPassword) {
		const hashed = hashSync('admin123', 10);
		db.prepare("INSERT INTO settings (key, value) VALUES ('admin_password', ?)").run(hashed);
	}

	// Seed example post if table is empty
	const count = db.prepare('SELECT COUNT(*) AS n FROM posts').get();
	if (count.n === 0) {
		db.prepare(`
			INSERT INTO posts (title, slug, content, excerpt, published)
			VALUES (?, ?, ?, ?, 1)
		`).run(
			'Vitajte v My CMS',
			'vitajte-v-my-cms',
			`# Vitajte v My CMS\n\nToto je váš prvý článok. Môžete ho upraviť alebo zmazať v [administrácii](/admin).\n\n## Ako to funguje\n\n- Vytvárajte nové články v admin rozhraní\n- Obsah píšte v **Markdown** formáte\n- Publikujte alebo nechajte ako koncept\n\nVeľa zábavy so správou obsahu!`,
			'Toto je váš prvý článok. Zistite, ako funguje My CMS.'
		);
	}
}

// ---- Posts ----

/** @returns {object[]} */
export function getAllPosts() {
	return getDb().prepare('SELECT * FROM posts ORDER BY created_at DESC').all();
}

/** @returns {object[]} */
export function getPublishedPosts() {
	return getDb().prepare('SELECT * FROM posts WHERE published = 1 ORDER BY created_at DESC').all();
}

/** @param {string} slug */
export function getPostBySlug(slug) {
	return getDb().prepare('SELECT * FROM posts WHERE slug = ?').get(slug);
}

/** @param {number} id */
export function getPostById(id) {
	return getDb().prepare('SELECT * FROM posts WHERE id = ?').get(id);
}

/**
 * @param {{ title: string, slug: string, content: string, excerpt: string, published: boolean }} data
 */
export function createPost(data) {
	const stmt = getDb().prepare(`
		INSERT INTO posts (title, slug, content, excerpt, published)
		VALUES (@title, @slug, @content, @excerpt, @published)
	`);
	const result = stmt.run({
		...data,
		published: data.published ? 1 : 0
	});
	return result.lastInsertRowid;
}

/**
 * @param {number} id
 * @param {{ title: string, slug: string, content: string, excerpt: string, published: boolean }} data
 */
export function updatePost(id, data) {
	getDb()
		.prepare(`
		UPDATE posts
		SET title = @title, slug = @slug, content = @content,
		    excerpt = @excerpt, published = @published,
		    updated_at = datetime('now')
		WHERE id = @id
	`)
		.run({ ...data, id, published: data.published ? 1 : 0 });
}

/** @param {number} id */
export function deletePost(id) {
	getDb().prepare('DELETE FROM posts WHERE id = ?').run(id);
}

// ---- Auth / Sessions ----

/** @returns {string} */
export function getAdminPasswordHash() {
	const row = getDb().prepare("SELECT value FROM settings WHERE key = 'admin_password'").get();
	return row?.value ?? '';
}

/** @param {string} hash */
export function setAdminPasswordHash(hash) {
	getDb()
		.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES ('admin_password', ?)")
		.run(hash);
}

/** @param {string} sessionId */
export function createSession(sessionId) {
	getDb().prepare("INSERT INTO sessions (id) VALUES (?)").run(sessionId);
}

/** @param {string} sessionId */
export function sessionExists(sessionId) {
	const row = getDb().prepare('SELECT id FROM sessions WHERE id = ?').get(sessionId);
	return !!row;
}

/** @param {string} sessionId */
export function deleteSession(sessionId) {
	getDb().prepare('DELETE FROM sessions WHERE id = ?').run(sessionId);
}
