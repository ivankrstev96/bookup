ALTER TABLE IF EXISTS public.book
    ADD COLUMN image_id bigint NOT NULL;
ALTER TABLE IF EXISTS public.book
    ADD CONSTRAINT fk_file_resource_image_book FOREIGN KEY (image_id)
    REFERENCES public.file_resource (id) MATCH SIMPLE
    ON UPDATE CASCADE
       ON DELETE CASCADE
    NOT VALID;

ALTER TABLE IF EXISTS public.book
    ADD COLUMN description character varying NOT NULL;