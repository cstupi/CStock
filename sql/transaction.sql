CREATE TABLE public."Transaction"
(
    "Id" uuid NOT NULL,
    "Order" uuid NOT NULL,
    "Count" integer NOT NULL,
    "Date" timestamp without time zone NOT NULL,
    "Price" double precision NOT NULL,
    PRIMARY KEY ("Id"),
    CONSTRAINT "Order" FOREIGN KEY ("Order")
        REFERENCES public."Order" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)