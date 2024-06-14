ALTER TABLE "registrations" RENAME COLUMN "registration_id" TO "id";--> statement-breakpoint
ALTER TABLE "registrations" DROP CONSTRAINT "registrations_workshop_id_workshops_id_fk";
--> statement-breakpoint
ALTER TABLE "registrations" ALTER COLUMN "workshop_id" SET DATA TYPE varchar(30);--> statement-breakpoint
ALTER TABLE "registrations" ALTER COLUMN "id" SET DATA TYPE varchar(30);--> statement-breakpoint
ALTER TABLE "workshops" ALTER COLUMN "id" SET DATA TYPE varchar(30);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "registrations" ADD CONSTRAINT "registrations_workshop_id_workshops_id_fk" FOREIGN KEY ("workshop_id") REFERENCES "workshops"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
