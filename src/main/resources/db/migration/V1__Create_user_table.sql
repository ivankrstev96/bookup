CREATE TABLE public."user"
(
    id bigint NOT NULL,
    username character varying(30) NOT NULL,
    email character varying NOT NULL,
    password character varying,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."user"
    OWNER to postgres;

CREATE SEQUENCE public.user_seq
    INCREMENT 50
    START 1
    OWNED BY "user".id;

ALTER SEQUENCE public.user_seq
    OWNER TO postgres;