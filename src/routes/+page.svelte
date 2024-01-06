<script lang="ts">
	// A +page.svelte component defines a page of your app.
	// By default, pages are rendered both on the server (SSR) for the initial request and in the browser (CSR) for subsequent navigation.
	export let data;
	let { supabase, session } = data;
	$: ({ supabase } = data);

	let player: null | any = null;

	async function signout() {
		const { error } = await supabase.auth.signOut();
		console.log('signed out', error);
	}

	supabase
		.from('players')
		.select()
		.eq('id', session?.user.id)
		.single()
		.then((res) => {
			if (res.error) {
				console.error('+page.svelte', res.error);
				return;
			}
			player = res.data;
		});

	// if (res.error) {
	// 	console.error('+layout.ts session || isCode', res.error);
	// 	// this is unexpected because the DB trigger creates a basic player record
	// 	throw error(500);
	// }

	function testGet() {
		fetch('/')
			.then((res) => res.text())
			.then(console.log)
			.catch(console.error);
	}
</script>

<h1>+page: we have a session, and are loading the user</h1>
<div class="submenu">
	<!-- Session: {JSON.stringify(data.session)} -->
	<img src={data.session?.user.user_metadata.avatar_url} alt="" />
	<button on:click={signout}>Sign Out</button>
</div>

{#if player === null}
	{JSON.stringify(player)}
	Loading
{:else if player.intro === null}
	Intro
{:else}
	<button on:click={testGet}>Test Get</button>
{/if}
