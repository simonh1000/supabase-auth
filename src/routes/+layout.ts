import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { LayoutLoad } from './$types';
import { createBrowserClient, isBrowser, parse } from '@supabase/ssr';

// So frustrating that this makes everything work beautifully
// but with no SSR of course
// export const ssr = false;

export const load: LayoutLoad = async ({ fetch, data, depends, url }) => {
	depends('supabase:auth');

	console.log('+layout.ts data.session?', data.session !== null);
	console.log('+layout.ts url', url.pathname, url.searchParams);

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

	// note: ClientSide. Not using the (server-side) version in hooks
	const {
		data: { session }
	} = await supabase.auth.getSession();

	// supabase.auth.onAuthStateChange((event, session) => {
	// 	console.log('+layout.ts onAuthStateChange', event, session !== null);
	// 	if (event === 'SIGNED_OUT') {
	// 		location.reload();
	// 	}
	// });

	// const signIn = '/signin';
	// const isSignin = url.pathname === signIn;
	// // code occurs on the callback from the signin process
	// const isCode = url.searchParams.has('code');

	console.log('+layout.ts session?', session !== null);
	return { supabase, session };

	// if (isSignin) {
	// 	// On the server side, this might the return from auth with `?code=abc123`
	// 	// this can only be consumed by the client side so we must pass through everything
	// 	console.log('+layout.ts /signin');
	// 	return { supabase, session };
	// }

	// if (session || isCode) {
	// 	// either we already have a session, or
	// 	// the code has just arrived which will be converted into a session (where?)
	// 	console.log('+layout.ts', { 'session?': session !== null, isCode });
	// 	// NOTE we do not for certain have the session here so we cannot
	// 	return { supabase, session };
	// }

	// if (isSignin) {
	// 	// session is null
	// 	console.log(`+layout.ts isSignin == true`);
	// 	return { supabase, session };
	// }

	// // session is null, so user must login
	// console.log(`+layout.ts redirecting ${url.pathname} => ${signIn}`);
	// throw redirect(307, signIn);
};
