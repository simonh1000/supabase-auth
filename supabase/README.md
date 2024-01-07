# Notes

```sh
source ./supabase/.env && npx supabase start
```

## Database Functions

### vote_count

```sql
select players.name, count('votes.player_id')
from public.votes
join public.players
ON votes.player_id = players.id
group by players.id;
```

## vote_count2

```sql
SELECT   players.id, players.name, ARRAY_AGG(votes.week) as weeks
FROM     public.votes
JOIN     public.players ON votes.player_id = players.id
GROUP BY players.id
```
