CREATE TABLE public.User
(
    Id uuid NOT NULL,
    Email character varying(512) NOT NULL,
    Password character varying(1048) NOT NULL,
    PRIMARY KEY (Id),
    UNIQUE (Email)
)