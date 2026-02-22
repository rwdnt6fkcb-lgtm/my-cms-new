<script>
	let { data } = $props();
</script>

<svelte:head><title>Články – My CMS Admin</title></svelte:head>

<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
	<h1 style="font-size:1.6rem">Články</h1>
	<a href="/admin/posts/new" class="btn btn-primary">+ Nový článok</a>
</div>

{#if data.posts.length === 0}
	<div class="card" style="text-align:center;padding:3rem;color:var(--color-muted)">
		<p>Žiadne články. <a href="/admin/posts/new">Vytvor prvý</a>.</p>
	</div>
{:else}
	<div class="card" style="padding:0;overflow:hidden">
		<table class="table">
			<thead>
				<tr>
					<th>Názov</th>
					<th>Stav</th>
					<th>Vytvorené</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{#each data.posts as post}
					<tr>
						<td>
							<a href="/admin/posts/{post.id}" style="font-weight:600;color:var(--color-text)">{post.title}</a>
							<span style="display:block;font-size:.8rem;color:var(--color-muted)">/blog/{post.slug}</span>
						</td>
						<td>
							{#if post.published}
								<span class="badge badge-green">Publikovaný</span>
							{:else}
								<span class="badge badge-gray">Koncept</span>
							{/if}
						</td>
						<td style="font-size:.85rem;color:var(--color-muted);white-space:nowrap">
							{new Date(post.created_at).toLocaleDateString('sk-SK')}
						</td>
						<td style="white-space:nowrap">
							<a href="/blog/{post.slug}" target="_blank" class="btn btn-ghost" style="padding:.35rem .7rem;font-size:.8rem">Zobraziť</a>
							<a href="/admin/posts/{post.id}" class="btn btn-ghost" style="padding:.35rem .7rem;font-size:.8rem">Upraviť</a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}
