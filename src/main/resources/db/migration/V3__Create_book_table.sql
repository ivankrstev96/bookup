CREATE TABLE public.book
(
    id bigserial NOT NULL,
    name character varying NOT NULL,
    type character varying NOT NULL,
    file_resource_id bigint NOT NULL,
    created_by_user_id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.book
    OWNER to postgres;

ALTER TABLE IF EXISTS public.book
    ADD CONSTRAINT fk_file_resource_book FOREIGN KEY (file_resource_id)
    REFERENCES public.file_resource (id) MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE CASCADE
    NOT VALID;

ALTER TABLE IF EXISTS public.book
    ADD CONSTRAINT fk_user_book FOREIGN KEY (created_by_user_id)
    REFERENCES public."user" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION
    NOT VALID;