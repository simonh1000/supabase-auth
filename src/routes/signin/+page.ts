import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	const { session } = await event.parent();
	console.log('/signin/+page.ts session?', session !== null);

	// if we already have a session, we do not need to login
	if (session) {
		throw redirect(301, '/');
	}

	return {};
};
