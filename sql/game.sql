CREATE TABLE public."Game"
(
    "Id" uuid NOT NULL,
    "Name" character varying(256) NOT NULL,
    "Password" character varying(512),
    "StartingValue" double precision NOT NULL,
    PRIMARY KEY ("Id")
)