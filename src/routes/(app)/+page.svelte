<script lang="ts">
	import type { PageData } from '../$types';
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

	async function setIntro(val: CustomEvent) {
		let res = await supabase.from('players').update({ intro: val.detail }).eq('id', player.id);
		if (res.error) {
			console.error(res.error);
			return;
		}
		// update local version
		// next time page loads, it will have this field
		player = { ...player, intro: val.detail || '' };
		console.log('setIntro', val);
	}
</script>

<button on:click={signout}>Sign Out</button>
<h1>/+page.ts: we have a session</h1>

{#if player.intro === null}
	<h2>Player withOUT intro</h2>
	<PostAuth {player} on:set-intro={setIntro} />
{:else}
	<h2>Player with intro</h2>

	<!-- {JSON.stringify(data.session)} -->
{/if}
