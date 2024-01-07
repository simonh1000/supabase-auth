// place files you want to import through the `$lib` alias in this folder.

import type { Session, SupabaseClient } from '@supabase/supabase-js';

export function getPlayer(supabase: SupabaseClient, session: Session) {
	return supabase.from('players').select().eq('id', session.user.id).single();
}
