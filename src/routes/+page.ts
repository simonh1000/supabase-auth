import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url, parent }) => {
	console.log('+page.ts: url', { p: url.pathname, params: url.searchParams });

	// During a signin start, we load this file early, but `await parent` allows the session to be attached by supabase
	const { session, supabase } = await parent();

	console.log('+page.ts session?', session !== null);
	if (session) {
		let { data, error } = await supabase
			.from('players')
			.select()
			.eq('id', session.user.id)
			.single();

		console.log('+page.ts player', data);
		if (error) {
			console.error('+page.ts error', error);
			// what now?
			return { player: null };
		} else {
			return { player: data };
		}
	}
	return { player: null };
};
