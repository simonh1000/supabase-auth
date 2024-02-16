<script lang="ts">
	// /signin/+page.svelte
	import type { LayoutData } from '../$types';

	export let data: LayoutData;
	let { supabase } = data;
	console.log('/signin/+page.svelte: LayoutData', data.session);

	const signin = () => {
		supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `http://127.0.0.1:5173/auth/callback`
			}
		});
	};
</script>

<h1>Sign In</h1>

<button on:click={signin}>Sign In with Google</button>

<style>
</style>
