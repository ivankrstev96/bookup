CREATE TABLE public."user"
(
    id bigserial NOT NULL,
    username character varying(30) NOT NULL,
    password character varying NOT NULL,
    role character varying NOT NULL,
    email character varying NOT NULL,
    CONSTRAINT user_pkey PRIMARY KEY (id),
    CONSTRAINT username_unique UNIQUE (username),
    CONSTRAINT email_unique UNIQUE (email)
);

ALTER TABLE IF EXISTS public."user"
    OWNER to postgres;