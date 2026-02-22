<script>
	let { data } = $props();
</script>

<svelte:head>
	<title>My CMS – Blog</title>
	<meta name="description" content="Vitajte na mojom blogu." />
</svelte:head>

<header class="site-header">
	<div class="container">
		<a href="/" class="site-brand">My CMS</a>
		<nav>
			<a href="/admin" class="btn btn-ghost" style="font-size:.85rem">⚙ Admin</a>
		</nav>
	</div>
</header>

<main class="container" style="padding-top:2.5rem;padding-bottom:4rem">
	<h1 style="font-size:2rem;margin-bottom:.5rem">Blog</h1>
	<p style="color:var(--color-muted);margin-bottom:2rem">Všetky publikované články</p>

	{#if data.posts.length === 0}
		<div class="card" style="text-align:center;padding:3rem;color:var(--color-muted)">
			<p style="font-size:1.25rem">Zatiaľ žiadne články</p>
			<p style="margin-top:.5rem">Pridaj prvý článok v <a href="/admin/posts/new">administrácii</a>.</p>
		</div>
	{:else}
		<div class="post-grid">
			{#each data.posts as post}
				<article class="card post-card">
					<h2><a href="/blog/{post.slug}">{post.title}</a></h2>
					<p class="post-date">{new Date(post.created_at).toLocaleDateString('sk-SK', { year:'numeric', month:'long', day:'numeric' })}</p>
					{#if post.excerpt}
						<p style="color:var(--color-muted);margin-top:.5rem">{post.excerpt}</p>
					{/if}
					<a href="/blog/{post.slug}" class="read-more">Čítať ďalej →</a>
				</article>
			{/each}
		</div>
	{/if}
</main>

<footer class="site-footer">
	<div class="container">
		<p>Powered by <strong>My CMS</strong> · <a href="/admin">Administrácia</a></p>
	</div>
</footer>

<style>
	.site-header {
		background: var(--color-surface);
		border-bottom: 1px solid var(--color-border);
		padding: .75rem 0;
	}
	.site-header .container {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.site-brand {
		font-size: 1.3rem;
		font-weight: 700;
		color: var(--color-text);
		text-decoration: none;
	}
	.post-grid {
		display: grid;
		gap: 1.25rem;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	}
	.post-card h2 { font-size: 1.2rem; margin-bottom: .25rem; }
	.post-card h2 a { color: var(--color-text); }
	.post-card h2 a:hover { color: var(--color-primary); text-decoration: none; }
	.post-date { font-size: .8rem; color: var(--color-muted); }
	.read-more { display: inline-block; margin-top: 1rem; font-size: .9rem; font-weight: 600; color: var(--color-primary); }
	.site-footer {
		border-top: 1px solid var(--color-border);
		padding: 1.5rem 0;
		text-align: center;
		color: var(--color-muted);
		font-size: .9rem;
	}
</style>
