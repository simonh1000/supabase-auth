<script lang="ts">
	import { createEventDispatcher, type EventDispatcher } from 'svelte';
	export let player: any;
	let dispatcher = createEventDispatcher();
</script>

<h2>Post Auth: Intro</h2>

<div>
	{JSON.stringify(player)}
</div>

<p>How did you find us?</p>
<button on:click={() => dispatcher('set-intro', 'friend')}>Update</button>
<p>notifications</p>
