<script>
	import { page } from '$app/stores';
	let { children, data } = $props();
	let isLoginPage = $derived($page.url.pathname === '/admin/login');
</script>

{#if isLoginPage}
	{@render children()}
{:else}
<div class="admin-shell">
	<aside class="sidebar">
		<a href="/admin" class="logo">⚙ My CMS</a>
		<nav>
			<a href="/admin">Dashboard</a>
			<a href="/admin/posts">Články</a>
			<a href="/admin/posts/new">+ Nový článok</a>
			<a href="/admin/settings">Nastavenia</a>
		</nav>
		<div style="margin-top:auto">
			<form method="POST" action="/admin/logout">
				<button type="submit" class="logout-btn">Odhlásiť sa</button>
			</form>
		</div>
	</aside>

	<main class="admin-main">
		{@render children()}
	</main>
</div>
{/if}

<style>
	.admin-shell {
		display: flex;
		min-height: 100vh;
	}
	.sidebar {
		width: 220px;
		flex-shrink: 0;
		background: #1e293b;
		color: #e2e8f0;
		display: flex;
		flex-direction: column;
		padding: 1.5rem 1rem;
		gap: .25rem;
	}
	.logo {
		display: block;
		font-size: 1.1rem;
		font-weight: 700;
		color: #fff;
		text-decoration: none;
		margin-bottom: 1.5rem;
		padding: .5rem;
	}
	.sidebar nav {
		display: flex;
		flex-direction: column;
		gap: .15rem;
	}
	.sidebar nav a {
		color: #94a3b8;
		text-decoration: none;
		padding: .55rem .75rem;
		border-radius: .375rem;
		font-size: .9rem;
		transition: background .15s, color .15s;
	}
	.sidebar nav a:hover,
	.sidebar nav a:global(.active) {
		background: rgba(255,255,255,.08);
		color: #fff;
	}
	.logout-btn {
		width: 100%;
		background: transparent;
		border: 1px solid #334155;
		color: #94a3b8;
		padding: .5rem .75rem;
		border-radius: .375rem;
		cursor: pointer;
		font-size: .85rem;
		text-align: left;
		transition: background .15s;
	}
	.logout-btn:hover { background: rgba(255,255,255,.06); color: #fff; }
	.admin-main {
		flex: 1;
		padding: 2rem;
		overflow-y: auto;
		background: var(--color-bg);
	}
	@media (max-width: 640px) {
		.admin-shell { flex-direction: column; }
		.sidebar { width: 100%; flex-direction: row; flex-wrap: wrap; align-items: center; }
	}
</style>
