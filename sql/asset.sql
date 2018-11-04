
CREATE TABLE public."Portfolio"
(
    "User" uuid NOT NULL,
    "Game" uuid NOT NULL,
    "Identifier" character(256) COLLATE pg_catalog."default" NOT NULL,
    "Quantity" integer NOT NULL,
    "PricePerUnit" double precision NOT NULL,
    CONSTRAINT "SingleAssetPerUserPerGame" UNIQUE ("User", "Game", "Identifier")

)