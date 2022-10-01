

CREATE SEQUENCE user_seq;

CREATE TABLE public.user
(
    id integer NOT NULL DEFAULT nextval('user_seq'::regclass),
    name character varying(80) COLLATE pg_catalog."default",
	email character varying(80) COLLATE pg_catalog."default",
	password text,
	is_active boolean DEFAULT true,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NOT NULL DEFAULT now(),
    CONSTRAINT user_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.user
    OWNER to postgres;