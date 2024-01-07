import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

// export const load: PageServerLoad = async ({ url, params, parent }) => {
// 	// console.log('+page.server.ts', Object.keys(data));
// 	// console.log('+page.server.ts: url', data.url);

// 	// returns data from parent +layout.server.js load functions.
// 	const { session } = await parent();

// 	return {};
// };

// works with the <form>s on the pages
export const actions: Actions = {
	set_intro: async (event) => {
		const {
			request,
			locals: { supabase, getSession }
		} = event;

		// should be available as was used to create supabase!
		const session = await getSession();
		if (session === null) {
			throw redirect(301, '/signin');
		}

		// inspect form data
		const formData = await request.formData();
		const intro = formData.get('intro') as string;

		const res = await supabase.from('players').update({ intro }).eq('id', session.user.id);
		if (res.error) {
			throw error(500, 'supabase error');
		}
		// redirect to same page, which causes player to be re-read with the updated info
		throw redirect(301, '/');
	}
};
