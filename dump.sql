--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text,
    email text,
    password text,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    token text
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (1, 1, 'https://www.notion.so/bootcampra/Sexta-16-12-Criando-bancos-e-tabelas-Constraints-e-Pr-tica-Modelagem-Entidade-e-Inconsist-ncia-4f9dacf55421483fbf3e82e8e66ffcad', 'V4wCMowdC7', 2, '2022-12-22 16:10:35.966573');
INSERT INTO public.urls VALUES (2, 10, 'https://popsql.com/learn-sql/postgresql/how-to-add-a-default-value-to-a-column-in-postgresql', 'QCP7ab73aW', 1, '2022-12-22 16:22:29.302213');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (7, 'gabriela', 'gabi@gmail.com.br.scs', '123456', '2022-12-19 17:22:39.05704', NULL);
INSERT INTO public.users VALUES (9, 'gabriela', 'gabi@gmail.com.br', '123456', '2022-12-19 17:25:31.619677', '08d5f716-4d0f-4c5f-8900-aed9e789eb70');
INSERT INTO public.users VALUES (1, 'gabriela', 'gabi@gmail', '123456', '2022-12-19 17:06:12.114242', 'cf103675-04c7-4519-aef5-aafda452085e');
INSERT INTO public.users VALUES (11, 'teste', 'teste@1', '123456', '2022-12-22 16:09:50.193881', NULL);
INSERT INTO public.users VALUES (10, 'teste', 'teste', '123456', '2022-12-22 16:05:53.026327', 'bd635e85-0d7e-4e80-a942-92c42ccc9133');
INSERT INTO public.users VALUES (12, 'teste criptografia', 'teste@gmail', '$2b$10$AojqWTzzdH8giqdlhgx7QeQfpVRVsV7degaGtsB.mxwKFTgzrRePu', '2022-12-22 16:34:09.010524', 'de9a1952-687b-4051-8fd0-fa33b3883b3d');


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 12, true);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_token_key UNIQUE (token);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

