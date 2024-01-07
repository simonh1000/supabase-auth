create table
  public.contestants (
    id bigint generated by default as identity,
    created_at timestamp with time zone null default now(),
    name text null,
    "stillIn" boolean null,
    description text null,
    "totalVotes" double precision null,
    constraint contestants_pkey primary key (id)
  ) tablespace pg_default;