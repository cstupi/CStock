CREATE TABLE public."Order"
(
    "Id" uuid NOT NULL,
    "User" uuid NOT NULL,
    "Game" uuid NOT NULL,
	"Identifier" character varying(512) COLLATE pg_catalog."default" NOT NULL,
    "OrderType" character varying(128) COLLATE pg_catalog."default" NOT NULL,
    "TransactionType" character varying(128) COLLATE pg_catalog."default" NOT NULL,
    "Quantity" integer NOT NULL,
    "Limit" double precision,
    "Reason" character varying(512) COLLATE pg_catalog."default",
	"CreatedAt" timestamp without time zone,
	"ExpiresAt" date,
    CONSTRAINT "Order_pkey" PRIMARY KEY ("Id")
)