<script lang="ts">
	import { goto } from '$app/navigation';

	// /signin/+page.svelte
	import type { LayoutData } from '../$types';

	export let data: LayoutData;
	console.log('/signin/+page.svelte: LayoutData', Object.keys(data));
	let { supabase } = data;

	const signin = () => {
		supabase.auth.signInWithOAuth({
			provider: 'google'
			// unclear why it works without this
			// options: {
			// 	redirectTo: `http://127.0.0.1:54321/auth/v1/callback`
			// }
		});
		console.log('signin');
	};
</script>

<h1>Sign In</h1>

<button on:click={signin}>Sign In with Google</button>

<style>
</style>
