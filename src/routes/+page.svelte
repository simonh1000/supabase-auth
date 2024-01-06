<script lang="ts">
	// A +page.svelte component defines a page of your app.
	// By default, pages are rendered both on the server (SSR) for the initial request and in the browser (CSR) for subsequent navigation.
	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	async function signout() {
		const { error } = await supabase.auth.signOut();
		console.log('signed out', error);
	}

	function testGet() {
		fetch('/')
			.then((res) => res.text())
			.then(console.log)
			.catch(console.error);
	}
</script>

<h1>+page</h1>

{JSON.stringify(data.player)}
<button on:click={testGet}>Test Get</button>

<div class="submenu">
	<!-- Session: {JSON.stringify(data.session)} -->
	<img src={data.session?.user.user_metadata.avatar_url} alt="" />
	<button on:click={signout}>Sign Out</button>
</div>
