<script>
	import { enhance } from '$app/forms';
	import { slugify } from '$lib/slugify.js';

	let { data, form } = $props();

	const initialTitle = form?.title ?? data.post.title;
	const initialSlug = form?.slug ?? data.post.slug;

	let title = $state(initialTitle);
	let slug = $state(initialSlug);

	function onTitleInput(e) {
		title = e.target.value;
	}
	function onSlugInput(e) {
		slug = slugify(e.target.value);
	}
</script>

<svelte:head><title>Upraviť: {data.post.title} – My CMS Admin</title></svelte:head>

<div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem">
	<a href="/admin/posts" class="btn btn-ghost">← Späť</a>
	<h1 style="font-size:1.6rem">Upraviť článok</h1>
	<a href="/blog/{data.post.slug}" target="_blank" class="btn btn-ghost" style="margin-left:auto;font-size:.85rem">Zobraziť ↗</a>
</div>

{#if form?.error}
	<div class="alert alert-error">{form.error}</div>
{/if}
{#if form?.success}
	<div class="alert alert-success">{form.success}</div>
{/if}

<form method="POST" action="?/update" use:enhance>
	<div class="card" style="margin-bottom:1rem">
		<div class="form-group">
			<label for="title">Názov článku *</label>
			<input id="title" name="title" class="input" type="text" bind:value={title} required />
		</div>

		<div class="form-group">
			<label for="slug">URL slug</label>
			<input id="slug" name="slug" class="input" type="text" bind:value={slug} oninput={onSlugInput} />
			<small style="color:var(--color-muted)">/blog/<strong>{slug}</strong></small>
		</div>

		<div class="form-group">
			<label for="excerpt">Krátky popis</label>
			<input id="excerpt" name="excerpt" class="input" type="text" value={form?.excerpt ?? data.post.excerpt} />
		</div>
	</div>

	<div class="card" style="margin-bottom:1rem">
		<div class="form-group">
			<label for="content">Obsah (Markdown)</label>
			<textarea id="content" name="content" class="textarea" style="min-height:350px">{form?.content ?? data.post.content}</textarea>
		</div>
	</div>

	<div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap">
		<label class="checkbox-label">
			<input type="checkbox" name="published" checked={data.post.published === 1} />
			Publikovaný
		</label>
		<button type="submit" class="btn btn-primary">Uložiť zmeny</button>
	</div>
</form>

<form method="POST" action="?/delete" use:enhance
	onsubmit={(e) => { if (!confirm('Naozaj chceš zmazať tento článok?')) e.preventDefault(); }}
	style="margin-top:1rem">
	<button type="submit" class="btn btn-danger">Zmazať článok</button>
</form>
