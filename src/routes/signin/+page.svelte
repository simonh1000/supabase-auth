<script lang="ts">
	// /signin/+page.svelte
	import type { LayoutData } from '../$types';

	export let data: LayoutData;
	console.log('/signin/+page.svelte: LayoutData', Object.keys(data));
	let { supabase } = data;

	const signin = () => {
		supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `http://127.0.0.1:5173/auth/callback`
				// can't recall where I got the idea that it should return to supabase, rather than client
				// redirectTo: `http://127.0.0.1:54321/auth/v1/callback`
			}
		});
		// goto('/');
		console.log('signin');
	};
</script>

<h1>Sign In</h1>

<button on:click={signin}>Sign In with Google</button>

<style>
</style>
