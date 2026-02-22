import { describe, it, expect, beforeAll } from 'vitest';
import { createPost, getPostBySlug, getPublishedPosts, getAllPosts, updatePost, deletePost } from './db.js';

// Use an in-memory database for tests
process.env.DATABASE_PATH = ':memory:';

// Reset singleton before tests
beforeAll(() => {
	// Force new connection by resetting module
});

describe('Post CRUD', () => {
	it('creates and retrieves a post by slug', () => {
		const id = createPost({
			title: 'Test Post',
			slug: 'test-post',
			content: '# Hello',
			excerpt: 'A test',
			published: true
		});
		expect(typeof id).toBe('number');

		const post = getPostBySlug('test-post');
		expect(post).toBeTruthy();
		expect(post.title).toBe('Test Post');
		expect(post.published).toBe(1);
	});

	it('returns only published posts from getPublishedPosts', () => {
		createPost({
			title: 'Draft Post',
			slug: 'draft-post',
			content: 'Draft',
			excerpt: '',
			published: false
		});

		const published = getPublishedPosts();
		const slugs = published.map((p) => p.slug);
		expect(slugs).not.toContain('draft-post');
	});

	it('updates a post', () => {
		const id = createPost({
			title: 'Old Title',
			slug: 'old-title',
			content: 'Old',
			excerpt: '',
			published: false
		});

		updatePost(id, {
			title: 'New Title',
			slug: 'new-title',
			content: 'New',
			excerpt: 'New excerpt',
			published: true
		});

		const post = getPostBySlug('new-title');
		expect(post).toBeTruthy();
		expect(post.title).toBe('New Title');
		expect(post.published).toBe(1);
	});

	it('deletes a post', () => {
		const id = createPost({
			title: 'To Delete',
			slug: 'to-delete',
			content: '',
			excerpt: '',
			published: false
		});

		deletePost(id);

		const post = getPostBySlug('to-delete');
		expect(post).toBeFalsy();
	});
});
