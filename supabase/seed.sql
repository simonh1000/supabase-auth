create table
  public.players (
    id uuid references auth.users on delete cascade not null primary key,
    updated_at timestamp with time zone,
    created_at timestamp with time zone null default now(),
    name text null,
    intro text null,
    email text null,
    pot bigint null,
    constraint players_pot_check check ((pot >= 0))
  ) tablespace pg_default;

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table players
  enable row level security;

create policy "Public players are viewable by everyone." on players
  for select using (true);

create policy "Users can insert their own profile." on players
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on players
  for update using (auth.uid() = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.players (id, name, email)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'email');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
