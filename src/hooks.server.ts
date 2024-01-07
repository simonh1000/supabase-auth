import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createServerClient } from '@supabase/ssr';
import { redirect, type Handle } from '@sveltejs/kit';

// const authorization: Handle = async ({ event, resolve }) => {
// 	// Protect any route
// 	if (
// 		event.url.pathname !== '/auth/signin' &&
// 		event.url.pathname !== '/auth/signin/google' &&
// 		event.url.pathname !== '/auth/callback/google'
// 	) {
// 		const session = await event.locals.getSession();
// 		if (!session) {
// 			throw redirect(303, '/auth/signin');
// 		}
// 	}

// 	// If the request is still here, just proceed as normally
// 	return resolve(event);
// };

export const handle: Handle = async ({ event, resolve }) => {
	console.log('hooks.server.ts');
	event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			get: (key) => event.cookies.get(key),
			set: (key, value, options) => {
				event.cookies.set(key, value, options);
			},
			remove: (key, options) => {
				event.cookies.delete(key, options);
			}
		}
	});

	/**
	 * a little helper that is written for convenience so that instead
	 * of calling `const { data: { session } } = await supabase.auth.getSession()`
	 * you just call this `await getSession()`
	 * SH: uses a serverClient
	 */
	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		console.log('hooks.server.ts event.locals.getSession session?', session !== null);
		return session;
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};
