CREATE TYPE "public"."budget_type" AS ENUM('fixed', 'hourly');--> statement-breakpoint
CREATE TYPE "public"."project_status" AS ENUM('open', 'in_progress', 'completed', 'cancelled');--> statement-breakpoint
CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"client_id" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"category" varchar(100),
	"sub_category" varchar(100),
	"budget_type" "budget_type" NOT NULL,
	"min_budget" numeric(12, 2),
	"max_budget" numeric(12, 2),
	"expected_duration" varchar(100),
	"skills" json DEFAULT '[]'::json,
	"attachments" json DEFAULT '[]'::json,
	"location_preference" varchar(100) DEFAULT 'remote',
	"status" "project_status" DEFAULT 'open' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_client_id_users_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;