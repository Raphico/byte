ALTER TABLE "workshops" ADD COLUMN "has_started" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "workshops" ADD COLUMN "has_completed" boolean DEFAULT false NOT NULL;