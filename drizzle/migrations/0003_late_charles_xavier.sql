CREATE TABLE IF NOT EXISTS "registrations" (
	"registration_id" serial PRIMARY KEY NOT NULL,
	"workshop_id" integer NOT NULL,
	"participant_id" text NOT NULL,
	"registered_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "registrations_workshop_id_unique" UNIQUE("workshop_id"),
	CONSTRAINT "registrations_participant_id_unique" UNIQUE("participant_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "registrations" ADD CONSTRAINT "registrations_workshop_id_workshops_id_fk" FOREIGN KEY ("workshop_id") REFERENCES "workshops"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "registrations" ADD CONSTRAINT "registrations_participant_id_users_id_fk" FOREIGN KEY ("participant_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
