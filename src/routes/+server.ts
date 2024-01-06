import { redirect, type RequestHandler } from '@sveltejs/kit';

// example get request with access to supabase
export const GET: RequestHandler = async (event) => {
	const {
		url,
		locals: { supabase }
	} = event;
	console.log('GET', url);
	// return null;
	return new Response(String('hello from +server.ts'));
};
