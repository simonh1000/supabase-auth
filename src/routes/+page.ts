import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import { getPlayer } from '$lib';

export const load: PageLoad = async ({ url, parent }) => {
	console.log('+page.ts: url', { p: url.pathname, params: url.searchParams });

	// During a signin start, this file loaded early, but `await parent` _should_ allow supabase+session to be ready
	const { session, supabase } = await parent();

	if (session) {
		return getPlayer(supabase, session).then((player) => {
			return { player };
		});
	}
	// no session => need to login
	console.log('+page.ts no session => /signin');
	throw redirect(301, '/signin');
};
