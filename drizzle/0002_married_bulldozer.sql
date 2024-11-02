CREATE TABLE IF NOT EXISTS "role" (
	"name" text PRIMARY KEY NOT NULL,
	"permissions" json DEFAULT '[{"resource":"newsArticle","actions":["create","read"]}]'::json NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "roleName" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_roleName_role_name_fk" FOREIGN KEY ("roleName") REFERENCES "public"."role"("name") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
