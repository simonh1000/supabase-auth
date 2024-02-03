<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	console.log('+layout.svelte session?', data.session !== null);
	$: title = data.session === null ? 'Sign In' : 'Logged In!';
	// let page = data.session ? (data?.player?.intro ? 'loaded' : 'postauth') : 'login';
</script>

<header>
	{#if data.session}
		<img src={data.session?.user.user_metadata.avatar_url} alt="avatar" />
	{/if}
	<div class="title">
		{title}
	</div>
	<img src="/fingerprint.svg" alt="icon" />
</header>

<slot />

<style>
	header {
		background-color: aquamarine;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 60px;
	}
	img {
		height: 100%;
	}
	.title {
		margin-left: 20px;
	}
</style>
