import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	// console.log('+page.ts', Object.keys(data));
	// console.log('+page.ts: url', {p: data.url.pathname, params: data.url.searchParams});
	console.log('+page.ts: params', params);
	// console.log('+page.ts: data', supabase);
	// let res = await data.supabase
	// 	.from('players')
	// 	.select()
	// 	.eq('id', data.session?.user.id)
	// 	.single();

	// if (res.error) {
	// 	console.error(res.error);
	// 	// what now?
	// 	return data;
	// } else {
	// 	return { ...data, player: res.data };
	// }
	return {};
};
