import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { createBrowserClient, isBrowser, parse } from '@supabase/ssr';

export const load: LayoutLoad = async ({ fetch, data, depends, ...rest }) => {
	depends('supabase:auth');
	console.log('+layout.ts data.session', data.session);
	console.log('+layout.ts url', rest.url);

	const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		global: {
			fetch
		},
		cookies: {
			get(key) {
				if (!isBrowser()) {
					return JSON.stringify(data.session);
				}

				const cookie = parse(document.cookie);
				return cookie[key];
			}
		}
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	supabase.auth.onAuthStateChange((event, session) => {
		console.log('onAuthStateChange', event);
		if (event === 'SIGNED_OUT') {
			location.reload();
		}

		// setTimeout(async () => {
		//   // await on other Supabase function here
		//   // this runs right after the callback has finished
		// }, 0)
	});
	console.log('+layout.ts session', session);

	// const isSignin = rest.url.pathname === '/signin';

	// if (session && isSignin) {
	// 	console.log('+layout.ts redirecting /signin => /');
	// 	throw redirect(307, '/');
	// }
	// if (session) {
	// 	console.log('+layout.ts has session');
	// 	// returns supabase for client code
	// 	return { supabase, session, player: null };
	// }
	// if (isSignin) {
	// 	console.log(`+layout.ts isSignin == true`);
	// 	return { supabase, session, player: null };
	// }

	// console.log(`+layout.ts redirecting ${rest.url.pathname} => /signin`);
	// throw redirect(307, '/signin');
	return { supabase, session, player: null };
};
