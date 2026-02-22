import { describe, it, expect } from 'vitest';
import { slugify } from './slugify.js';

describe('slugify', () => {
	it('converts spaces to hyphens', () => {
		expect(slugify('Hello World')).toBe('hello-world');
	});

	it('removes diacritics', () => {
		expect(slugify('Vitajte v My CMS')).toBe('vitajte-v-my-cms');
		expect(slugify('Článok o Svelte')).toBe('clanok-o-svelte');
		expect(slugify('Ďalší príspevok')).toBe('dalsi-prispevok');
	});

	it('removes special characters', () => {
		expect(slugify('Hello! World?')).toBe('hello-world');
	});

	it('collapses multiple hyphens', () => {
		expect(slugify('foo   bar')).toBe('foo-bar');
	});

	it('trims leading/trailing whitespace', () => {
		expect(slugify('  hello  ')).toBe('hello');
	});

	it('handles empty string', () => {
		expect(slugify('')).toBe('');
	});
});
