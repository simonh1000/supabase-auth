<script lang="ts">
	// /signin/+page.svelte
	import type { LayoutData } from '../../$types';

	export let data: LayoutData;
	console.log('/signin/+page.svelte: LayoutData', Object.keys(data));
	let { supabase } = data;

	const signin = () => {
		supabase.auth.signInWithOAuth({
			provider: 'google'
			// unclear why it works without this
			// options: {
			// 	redirectTo: `http://example.com/auth/callback`
			// }
		});
		console.log('signin');
	};
</script>

<header>De Mol</header>
<h1>Sign In</h1>

<button on:click={signin}>Sign In with Google</button>

<style>
	header {
		background-color: aquamarine;
		display: flex;
		justify-content: space-between;
	}
</style>
