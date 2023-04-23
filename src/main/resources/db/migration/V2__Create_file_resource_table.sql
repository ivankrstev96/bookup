CREATE TABLE public.file_resource
(
    id bigserial NOT NULL,
    name character varying NOT NULL,
    bytes bytea NOT NULL,
    type character varying NOT NULL,
    size bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    CONSTRAINT file_resource_pkey PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.file_resource
    OWNER to postgres;