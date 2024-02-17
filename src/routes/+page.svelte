<script lang="ts">
	import type { PageData } from './$types';
	import PostAuth from '$lib/PostAuth.svelte';
	import { invalidateAll } from '$app/navigation';

	// A +page.svelte component defines a page of your app.
	// By default, pages are rendered both on the server (SSR) for the initial request and in the browser (CSR) for subsequent navigation.
	export let data: PageData;
	let { supabase, session, player } = data;
	$: ({ supabase, session, player } = data);

	async function signout() {
		const { error } = await supabase.auth.signOut();
		console.log('signed out', error);
		invalidateAll();
	}

	async function setIntro(val: CustomEvent) {
		if (data.player) {
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
	}
</script>

<h1>/+page.svelte</h1>

<button on:click={signout}>Sign Out</button>

{#if player?.intro === null}
	<h2>Player withOUT intro</h2>
	<!-- <PostAuth {player} on:set-intro={setIntro} /> -->
{:else}
	<h2>Player with intro</h2>
{/if}
{JSON.stringify(session?.user?.user_metadata)}
