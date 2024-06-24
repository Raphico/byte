ALTER TABLE "registrations" RENAME COLUMN "participant_id" TO "registrant_id";--> statement-breakpoint
ALTER TABLE "registrations" DROP CONSTRAINT "registrations_participant_id_unique";--> statement-breakpoint
ALTER TABLE "registrations" DROP CONSTRAINT "registrations_participant_id_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "registrations" ADD CONSTRAINT "registrations_registrant_id_users_id_fk" FOREIGN KEY ("registrant_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_registrant_id_unique" UNIQUE("registrant_id");