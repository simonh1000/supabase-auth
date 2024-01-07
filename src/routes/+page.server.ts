import type { Actions, PageServerLoad } from './$types';

// export const load: PageServerLoad = async ({ url, params, parent }) => {
// 	// console.log('+page.server.ts', Object.keys(data));
// 	// console.log('+page.server.ts: url', data.url);

// 	// returns data from parent +layout.server.js load functions.
// 	const { session } = await parent();

// 	return {};
// };

// Seems to be a login form handler
export const actions: Actions = {
	default: async (event) => {
		const {
			request,
			url,
			locals: { supabase }
		} = event;
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		console.log({ email, password });
	}
};
