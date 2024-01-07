<script lang="ts">
	import type { PageData } from './$types';
	import PostAuth from '$lib/PostAuth.svelte';

	// A +page.svelte component defines a page of your app.
	// By default, pages are rendered both on the server (SSR) for the initial request and in the browser (CSR) for subsequent navigation.
	export let data: PageData;
	let { supabase, player } = data;
	$: ({ supabase, player } = data);

	async function signout() {
		const { error } = await supabase.auth.signOut();
		console.log('signed out', error);
	}

	function testGet() {
		fetch('/')
			.then((res) => res.text())
			.then(console.log)
			.catch(console.error);
	}
</script>

<header>
	<!-- Session: {JSON.stringify(data.session)} -->
	<img src={data.session?.user.user_metadata.avatar_url} alt="" />
	<button on:click={signout}>Sign Out</button>
</header>

<h1>+page: we have a session, and are loading the user</h1>

{#if player === null}
	{JSON.stringify(player)}
	Loading
{:else if player.intro === null}
	<PostAuth {player} />
{:else}
	<button on:click={testGet}>Test Get</button>
{/if}

<style>
	header {
		background-color: aquamarine;
		display: flex;
		justify-content: space-between;
	}
</style>
