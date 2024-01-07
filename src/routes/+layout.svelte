<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	console.log('+layout.svelte data:', Object.keys(data));
	// let page = data.session ? (data?.player?.intro ? 'loaded' : 'postauth') : 'login';
</script>

<h1>Layout</h1>

<slot />
