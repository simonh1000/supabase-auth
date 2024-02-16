import { redirect } from '@sveltejs/kit';

// this is the callback route that supabase calls after an oAuth sign in
// Its role is to convert the auth code into a session (and cookie, and token,...)

export const GET = async (event) => {
	const {
		url,
		locals: { supabase }
	} = event;
	const code = url.searchParams.get('code') as string;
	// if "next" is in param, use it as the redirect URL
	const next = url.searchParams.get('next') ?? '/';

	if (code) {
		console.log('/auth/callback/+server.ts about to exchange', { code, next });
		const res = await supabase.auth.exchangeCodeForSession(code);
		console.log('/auth/callback/+server.ts exchanged', Object.keys(res));
		if (!res.error) {
			// redirect to next, with default to "/"
			console.log('/auth/callback/+server.ts redirecting to ', `/${next.slice(1)}`);
			throw redirect(303, `/${next.slice(1)}`);
		}
	}

	console.log('/auth/callback/+server.ts no code!');
	// return the user to an error page with instructions
	throw redirect(303, '/auth/auth-code-error');
};
