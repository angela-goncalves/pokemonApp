create table "public"."catched" (
    "id" text not null default ''::text,
    "created_at" timestamp with time zone not null default now(),
    "name" text default ''::text
);


alter table "public"."catched" enable row level security;


CREATE UNIQUE INDEX catched_pkey ON public.catched USING btree (id);


alter table "public"."catched" add constraint "catched_pkey" PRIMARY KEY using index "catched_pkey";


grant delete on table "public"."catched" to "anon";

grant insert on table "public"."catched" to "anon";

grant references on table "public"."catched" to "anon";

grant select on table "public"."catched" to "anon";

grant trigger on table "public"."catched" to "anon";

grant truncate on table "public"."catched" to "anon";

grant update on table "public"."catched" to "anon";

grant delete on table "public"."catched" to "authenticated";

grant insert on table "public"."catched" to "authenticated";

grant references on table "public"."catched" to "authenticated";

grant select on table "public"."catched" to "authenticated";

grant trigger on table "public"."catched" to "authenticated";

grant truncate on table "public"."catched" to "authenticated";

grant update on table "public"."catched" to "authenticated";

grant delete on table "public"."catched" to "service_role";

grant insert on table "public"."catched" to "service_role";

grant references on table "public"."catched" to "service_role";

grant select on table "public"."catched" to "service_role";

grant trigger on table "public"."catched" to "service_role";

grant truncate on table "public"."catched" to "service_role";

grant update on table "public"."catched" to "service_role";


create policy "enable users to catch "
on "public"."catched"
as permissive
for all
to public
using (true)
with check (true);