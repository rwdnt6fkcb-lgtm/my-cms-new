<script>
	import { enhance } from '$app/forms';
	let { form } = $props();
</script>

<svelte:head><title>Prihlásenie – My CMS Admin</title></svelte:head>

<div class="login-wrap">
	<div class="card login-card">
		<h1 style="font-size:1.5rem;margin-bottom:1.5rem;text-align:center">⚙ My CMS Admin</h1>

		{#if form?.error}
			<div class="alert alert-error">{form.error}</div>
		{/if}

		<form method="POST" use:enhance>
			<div class="form-group">
				<label for="password">Heslo</label>
				<input id="password" name="password" type="password" class="input" autocomplete="current-password" required />
			</div>
			<button type="submit" class="btn btn-primary" style="width:100%;justify-content:center">Prihlásiť sa</button>
		</form>

		<p style="margin-top:1rem;text-align:center;font-size:.85rem;color:var(--color-muted)">
			<a href="/">← Späť na web</a>
		</p>
	</div>
</div>

<style>
	.login-wrap {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-bg);
	}
	.login-card { width: 100%; max-width: 380px; }
</style>
