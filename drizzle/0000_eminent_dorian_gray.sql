CREATE TABLE IF NOT EXISTS "BiacoraLogin" (
	"idBitacora" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "BiacoraLogin_idBitacora_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"idUser" integer NOT NULL,
	"token" uuid DEFAULT gen_random_uuid(),
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Category" (
	"idCategory" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "Category_idCategory_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"categoryName" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Product" (
	"idProduct" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "Product_idProduct_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"productName" varchar(255) NOT NULL,
	"price" double precision DEFAULT 10.2,
	"stock" integer DEFAULT 0,
	"categoryId" integer,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"idUser" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "User_idUser_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"age" integer NOT NULL,
	"email" varchar(255) NOT NULL,
	CONSTRAINT "User_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "BiacoraLogin" ADD CONSTRAINT "BiacoraLogin_idUser_User_idUser_fk" FOREIGN KEY ("idUser") REFERENCES "public"."User"("idUser") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_Category_idCategory_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("idCategory") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
