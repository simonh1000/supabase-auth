// place files you want to import through the `$lib` alias in this folder.

import type { Session, SupabaseClient } from '@supabase/supabase-js';
import type { NewPlayer } from './types';

export async function getPlayer(supabase: SupabaseClient, session: Session): Promise<NewPlayer> {
	const { data, error } = await supabase
		.from('players')
		.select()
		.eq('id', session.user.id)
		.single();
	if (error) return Promise.reject(error);
	return data;
}
