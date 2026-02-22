<script>
	let { data } = $props();
</script>

<svelte:head><title>Dashboard – My CMS Admin</title></svelte:head>

<h1 style="font-size:1.6rem;margin-bottom:1.5rem">Dashboard</h1>

<div class="stats-grid">
	<div class="stat-card">
		<span class="stat-num">{data.stats.total}</span>
		<span class="stat-label">Celkom článkov</span>
	</div>
	<div class="stat-card">
		<span class="stat-num">{data.stats.published}</span>
		<span class="stat-label">Publikovaných</span>
	</div>
	<div class="stat-card">
		<span class="stat-num">{data.stats.drafts}</span>
		<span class="stat-label">Konceptov</span>
	</div>
</div>

<div style="margin-top:2rem;display:flex;gap:.75rem">
	<a href="/admin/posts/new" class="btn btn-primary">+ Nový článok</a>
	<a href="/admin/posts" class="btn btn-ghost">Spravovať články</a>
	<a href="/" target="_blank" class="btn btn-ghost">Zobraziť web ↗</a>
</div>

<style>
	.stats-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px,1fr)); gap: 1rem; }
	.stat-card {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		padding: 1.25rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: .25rem;
	}
	.stat-num { font-size: 2rem; font-weight: 700; color: var(--color-primary); }
	.stat-label { font-size: .85rem; color: var(--color-muted); }
</style>
