import { redirect } from '@sveltejs/kit';

// this is a route that supabase calls?
export const GET = async (event) => {
	console.log('/auth/callback/+server.ts', event);
	const {
		url,
		locals: { supabase }
	} = event;
	const code = url.searchParams.get('code') as string;
	// if "next" is in param, use it as the redirect URL
	const next = url.searchParams.get('next') ?? '/';

	if (code) {
		const { error } = await supabase.auth.exchangeCodeForSession(code);
		console.log('/auth/callback/+server.ts', { code, next, error });
		if (!error) {
			// redirect to next, with default to "/"
			console.log('/auth/callback/+server.ts redirecting to ', `/${next.slice(1)}`);
			throw redirect(303, `/${next.slice(1)}`);
		}
	}

	// return the user to an error page with instructions
	throw redirect(303, '/auth/auth-code-error');
};
