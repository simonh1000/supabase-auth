import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import { getPlayer } from '$lib';

export const load: PageLoad = async ({ url, parent }) => {
	console.log('+page.ts: url', { p: url.pathname, params: url.searchParams });

	// During a signin start, we load this file early, but `await parent` allows the session to be attached by supabase
	const { session, supabase } = await parent();

	console.log('+page.ts session?', session !== null);
	if (session) {
		return getPlayer(supabase, session)
			.then((player) => {
				return { player };
			})
			.catch((err) => {
				console.error('+page.ts error', err);
				throw error(500, err);
			});
	}
	throw redirect(301, '/signin');
};
