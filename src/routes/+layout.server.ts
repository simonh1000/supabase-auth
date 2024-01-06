import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
	console.log('+layout.server.ts load');
	return {
		session: await getSession()
	};
};
