import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { createBrowserClient, isBrowser, parse } from '@supabase/ssr';
import { getPlayer } from '$lib';

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

	// note: not using the (server-side) version in hooks
	const {
		data: { session }
	} = await supabase.auth.getSession();

	supabase.auth.onAuthStateChange((event, session) => {
		console.log('+layout.ts onAuthStateChange', event);
		if (event === 'SIGNED_OUT') {
			location.reload();
		}

		// setTimeout(async () => {
		//   // await on other Supabase function here
		//   // this runs right after the callback has finished
		// }, 0)
	});

	const signIn = '/auth/signin';
	const isSignin = url.pathname === signIn;
	// code occurs on the callback from the signin process
	const isCode = url.searchParams.has('code');

	console.log('+layout.ts session?', session !== null);

	if (session && isSignin) {
		// we do not need to signin, perhaps something to do with...?
		console.log('+layout.ts redirecting /signin => /');
		throw redirect(307, '/');
	}
	if (session || isCode) {
		// either we already have a session, or
		// the code has just arrived which will be converted into a session (where?)
		console.log('+layout.ts session || isCode', session !== null);
		// NOTE we do not for certain have the session here so we cannot
		// let res = await getPlayer(supabase, session);
		return { supabase, session };
	}
	if (isSignin) {
		// session is null
		console.log(`+layout.ts isSignin == true`);
		return { supabase, session };
	}

	// session is null, so user must login
	console.log(`+layout.ts redirecting ${url.pathname} => ${signIn}`);
	throw redirect(307, signIn);
};
