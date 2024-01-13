<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	console.log('+layout.svelte session?', data.session !== null);
	$: title = data.session === null ? 'Doe je mee?' : 'Speel mee!';
	// let page = data.session ? (data?.player?.intro ? 'loaded' : 'postauth') : 'login';
</script>

<header>
	{#if data.session}
		<img src={data.session?.user.user_metadata.avatar_url} alt="avatar" />
	{/if}
	{title}
	<img src="https://moljagers.vercel.app/demol192.png" alt="mol-icon" />
</header>

<slot />

<style>
	header {
		background-color: aquamarine;
		display: flex;
		justify-content: space-between;
		height: 60px;
	}
</style>
