import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
	console.log('+layout.server.ts attaching session');
	// locals.getSession uses the server side version
	return {
		session: await getSession()
	};
};
