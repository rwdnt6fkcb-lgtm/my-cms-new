<script>
	import { enhance } from '$app/forms';
	import { slugify } from '$lib/slugify.js';

	let { form } = $props();

	const initialTitle = form?.title ?? '';
	const initialSlug = form?.slug ?? '';

	let title = $state(initialTitle);
	let slug = $state(initialSlug);
	let autoSlug = $state(true);

	function onTitleInput(e) {
		title = e.target.value;
		if (autoSlug) slug = slugify(title);
	}

	function onSlugInput(e) {
		slug = e.target.value;
		autoSlug = false;
	}
</script>

<svelte:head><title>Nový článok – My CMS Admin</title></svelte:head>

<div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem">
	<a href="/admin/posts" class="btn btn-ghost">← Späť</a>
	<h1 style="font-size:1.6rem">Nový článok</h1>
</div>

{#if form?.error}
	<div class="alert alert-error">{form.error}</div>
{/if}

<form method="POST" use:enhance>
	<div class="card" style="margin-bottom:1rem">
		<div class="form-group">
			<label for="title">Názov článku *</label>
			<input id="title" name="title" class="input" type="text" bind:value={title} oninput={onTitleInput} required />
		</div>

		<div class="form-group">
			<label for="slug">URL slug</label>
			<input id="slug" name="slug" class="input" type="text" bind:value={slug} oninput={onSlugInput} placeholder="generuje sa automaticky" />
			<small style="color:var(--color-muted)">/blog/<strong>{slug || '...'}</strong></small>
		</div>

		<div class="form-group">
			<label for="excerpt">Krátky popis (voliteľný)</label>
			<input id="excerpt" name="excerpt" class="input" type="text" value={form?.excerpt ?? ''} placeholder="Zobrazí sa v zozname článkov" />
		</div>
	</div>

	<div class="card" style="margin-bottom:1rem">
		<div class="form-group">
			<label for="content">Obsah (Markdown)</label>
			<textarea id="content" name="content" class="textarea" style="min-height:350px">{form?.content ?? ''}</textarea>
		</div>
	</div>

	<div style="display:flex;align-items:center;gap:1rem">
		<label class="checkbox-label">
			<input type="checkbox" name="published" />
			Publikovať hneď
		</label>
		<button type="submit" class="btn btn-primary">Uložiť článok</button>
	</div>
</form>
