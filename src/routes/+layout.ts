import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { error, redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { createBrowserClient, isBrowser, parse } from '@supabase/ssr';

export const load: LayoutLoad = async ({ fetch, data, depends, ...rest }) => {
	depends('supabase:auth');
	console.log('+layout.ts data.session', Object.keys(data.session || {}));
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

	// note: not using the version in exports
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
	console.log('+layout.ts session', Object.keys(session || {}));

	const isSignin = rest.url.pathname === '/signin';
	const isCode = rest.url.searchParams.has('code');

	if (session && isSignin) {
		console.log('+layout.ts redirecting /signin => /');
		throw redirect(307, '/');
	}
	if (session || isCode) {
		console.log('+layout.ts has session or isCode');
		// not sure why supabase does not have the session already, but...
		// returns supabase for client code
		// let res = await supabase
		// 	.from('players')
		// 	.select()
		// 	.eq('id', session?.user.id)
		// 	.single();

		// if (res.error) {
		// 	console.error('+layout.ts session || isCode', res.error);
		// 	// this is unexpected because the DB trigger creates a basic player record
		// 	throw error(500);
		// }

		return { supabase, session, player: null };
	}
	if (isSignin) {
		console.log(`+layout.ts isSignin == true`);
		return { supabase, session, player: null };
	}

	console.log(`+layout.ts redirecting ${rest.url.pathname} => /signin`);
	throw redirect(307, '/signin');
};
