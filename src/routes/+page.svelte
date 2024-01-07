<script lang="ts">
	import type { PageData } from './$types';

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

<h1>+page: we have a session, and are loading the user</h1>
<div class="submenu">
	<!-- Session: {JSON.stringify(data.session)} -->
	<img src={data.session?.user.user_metadata.avatar_url} alt="" />
	<button on:click={signout}>Sign Out</button>
</div>

{#if player === null}
	{JSON.stringify(player)}
	Loading
{:else if player.intro === null}
	<div>
		{JSON.stringify(player)}
	</div>
	<h2>Intro</h2>
{:else}
	<button on:click={testGet}>Test Get</button>
{/if}
