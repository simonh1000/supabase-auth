<script lang="ts">
	import type { LayoutData } from './$types';
	import Signin from '$lib/Signin.svelte';

	export let data: LayoutData;

	console.log('+layout.svelte data:', Object.keys(data));
	// let page = data.session ? (data?.player?.intro ? 'loaded' : 'postauth') : 'login';
	// this logs on the server!
</script>

<h1>Layout</h1>

<slot />
