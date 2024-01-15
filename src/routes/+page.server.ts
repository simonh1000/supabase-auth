import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

// handler for PostAuth component
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
		// All good! redirect to "/", which causes player to be re-read with the updated info
		throw redirect(301, '/');
	}
};
