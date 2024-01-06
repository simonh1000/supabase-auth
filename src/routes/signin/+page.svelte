<script lang="ts">
	import type { LayoutData } from '../$types';

	export let data: LayoutData;
	console.log('/signin/+page.svelte: LayoutData', Object.keys(data));
	let { supabase } = data;

	const signin = () => {
		supabase.auth.signInWithOAuth({
			provider: 'google'
		});
		console.log('signin');
	};
</script>

<h1>Sign In</h1>

<button on:click={signin}>Sign In with Google</button>
