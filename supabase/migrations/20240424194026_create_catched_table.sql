create table "public"."catched" (
    "id" text not null default ''::text,
    "created_at" timestamp with time zone not null default now(),
    "name" text default ''::text
);


alter table "public"."catched" enable row level security;

create table "public"."user" (
    "id" uuid not null default auth.uid(),
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."user" enable row level security;

CREATE UNIQUE INDEX catched_pkey ON public.catched USING btree (id);

CREATE UNIQUE INDEX user_pkey ON public."user" USING btree (id);

alter table "public"."catched" add constraint "catched_pkey" PRIMARY KEY using index "catched_pkey";

alter table "public"."user" add constraint "user_pkey" PRIMARY KEY using index "user_pkey";

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

grant delete on table "public"."user" to "anon";

grant insert on table "public"."user" to "anon";

grant references on table "public"."user" to "anon";

grant select on table "public"."user" to "anon";

grant trigger on table "public"."user" to "anon";

grant truncate on table "public"."user" to "anon";

grant update on table "public"."user" to "anon";

grant delete on table "public"."user" to "authenticated";

grant insert on table "public"."user" to "authenticated";

grant references on table "public"."user" to "authenticated";

grant select on table "public"."user" to "authenticated";

grant trigger on table "public"."user" to "authenticated";

grant truncate on table "public"."user" to "authenticated";

grant update on table "public"."user" to "authenticated";

grant delete on table "public"."user" to "service_role";

grant insert on table "public"."user" to "service_role";

grant references on table "public"."user" to "service_role";

grant select on table "public"."user" to "service_role";

grant trigger on table "public"."user" to "service_role";

grant truncate on table "public"."user" to "service_role";

grant update on table "public"."user" to "service_role";

create policy "enable users to catch "
on "public"."catched"
as permissive
for all
to public
using (true)
with check (true);