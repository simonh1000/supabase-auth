import type { PageLoad } from './$types';

export const load = async ({ params, parent }) => {
	// console.log('+page.ts: url', {p: data.url.pathname, params: data.url.searchParams});
	console.log('+page.ts', params);

	const { session, supabase } = await parent();

	let { data, error } = await supabase
		.from('players')
		.select()
		.eq('id', session?.user.id)
		.single();

	if (error) {
		console.error(error);
		// what now?
		return { player: null };
	} else {
		return { player: data };
	}
};
