import type { Actions, PageServerLoad } from './$types';

// export const load: PageServerLoad = async (data) => {
// 	console.log('+page.server.ts', Object.keys(data));
// 	console.log('+page.server.ts: url', data.url);
// 	// console.log('+page.ts: data', data.data);
// 	// let res = await data.supabase
// 	// 	.from('players')
// 	// 	.select()
// 	// 	.eq('id', data.session?.user.id)
// 	// 	.single();

// 	// if (res.error) {
// 	// 	console.error(res.error);
// 	// 	// what now?
// 	// 	return data;
// 	// } else {
// 	// 	return { ...data, player: res.data };
// 	// }
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
