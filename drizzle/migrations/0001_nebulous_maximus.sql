CREATE TABLE IF NOT EXISTS "workshops" (
	"id" serial PRIMARY KEY NOT NULL,
	"organizer_id" text NOT NULL,
	"title" varchar(50) NOT NULL,
	"description" text NOT NULL,
	"date" timestamp NOT NULL,
	"duration" integer NOT NULL,
	"is_public" boolean NOT NULL,
	"access_code" varchar(16) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT current_timestamp,
	CONSTRAINT "workshops_access_code_unique" UNIQUE("access_code")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workshops" ADD CONSTRAINT "workshops_organizer_id_users_id_fk" FOREIGN KEY ("organizer_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
