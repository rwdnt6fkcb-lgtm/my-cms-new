<script>
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.post.title} – My CMS</title>
	<meta name="description" content={data.post.excerpt} />
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
	<a href="/" style="color:var(--color-muted);font-size:.9rem;display:inline-block;margin-bottom:1.5rem">← Späť na zoznam</a>

	<article>
		<header style="margin-bottom:2rem">
			<h1 style="font-size:2.25rem;line-height:1.2">{data.post.title}</h1>
			<p style="color:var(--color-muted);margin-top:.5rem;font-size:.9rem">
				{new Date(data.post.created_at).toLocaleDateString('sk-SK', { year:'numeric', month:'long', day:'numeric' })}
			</p>
		</header>

		<div class="prose">
			{@html data.post.html}
		</div>
	</article>
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
	.site-footer {
		border-top: 1px solid var(--color-border);
		padding: 1.5rem 0;
		text-align: center;
		color: var(--color-muted);
		font-size: .9rem;
	}
</style>
