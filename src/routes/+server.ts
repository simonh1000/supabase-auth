import { redirect, type RequestHandler } from '@sveltejs/kit';

// example get request with access to supabase - fetch('/').then(...)
export const GET: RequestHandler = async (event) => {
	const {
		url,
		locals: { supabase }
	} = event;
	// return null;
	return new Response(String('hello from +server.ts'));
};
