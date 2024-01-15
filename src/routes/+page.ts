import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import { getPlayer } from '$lib';

export const load: PageLoad = async ({ url, parent }) => {
	console.log('+page.ts: url', { p: url.pathname, params: url.searchParams });

	// During a signin start, this file loaded early, but `await parent` allows supabase+session to be ready
	const { session, supabase } = await parent();

	console.log('+page.ts session?', session !== null);

	if (session) {
		return getPlayer(supabase, session).then((player) => {
			return { player };
		});
	}
	// no session => need to login
	throw redirect(301, '/signin');
};
