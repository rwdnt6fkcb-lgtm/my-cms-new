<script>
	import { enhance } from '$app/forms';
	let { form } = $props();
</script>

<svelte:head><title>Nastavenia – My CMS Admin</title></svelte:head>

<h1 style="font-size:1.6rem;margin-bottom:1.5rem">Nastavenia</h1>

<div class="card" style="max-width:480px">
	<h2 style="font-size:1.1rem;margin-bottom:1rem">Zmena hesla</h2>

	{#if form?.error}
		<div class="alert alert-error">{form.error}</div>
	{/if}
	{#if form?.success}
		<div class="alert alert-success">{form.success}</div>
	{/if}

	<form method="POST" use:enhance>
		<div class="form-group">
			<label for="current">Aktuálne heslo</label>
			<input id="current" name="current" type="password" class="input" autocomplete="current-password" required />
		</div>
		<div class="form-group">
			<label for="new">Nové heslo (min. 6 znakov)</label>
			<input id="new" name="new" type="password" class="input" autocomplete="new-password" required />
		</div>
		<div class="form-group">
			<label for="confirm">Potvrdiť nové heslo</label>
			<input id="confirm" name="confirm" type="password" class="input" autocomplete="new-password" required />
		</div>
		<button type="submit" class="btn btn-primary">Zmeniť heslo</button>
	</form>
</div>
