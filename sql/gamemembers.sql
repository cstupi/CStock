CREATE TABLE public."GameMembers"
(
    "Game" uuid,
    "User" uuid,
    "Admin" bit,
    "JoinedAt" timestamp without time zone,
    CONSTRAINT "GAME_USER_UNIQUE" UNIQUE ("Game", "User")
,
    CONSTRAINT "Game_FK" FOREIGN KEY ("Game")
        REFERENCES public."Game" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "User_FK" FOREIGN KEY ("User")
        REFERENCES public."User" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)