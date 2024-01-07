import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	const { session } = await event.parent();

	if (session) {
		throw redirect(301, '/');
	}
	return {};
};
