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
<!-- <button on:click={() => dispatcher('set-intro', 'friend')}>Update</button> -->

<form method="POST" action="?/set_intro">
	<fieldset>
		<div>
			<input type="radio" id="family" name="intro" value="family" checked />
			<label for="family">Family</label>
		</div>

		<div>
			<input type="radio" id="friend" name="intro" value="friend" />
			<label for="friend">Friend</label>
		</div>

		<div>
			<input type="radio" id="runner" name="intro" value="runner" />
			<label for="runner">Runner</label>
		</div>
		<input type="submit" value="Set!" />
	</fieldset>
</form>
<p>notifications</p>
