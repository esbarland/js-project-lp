DROP TABLE IF EXISTS cars;

CREATE TABLE "public"."cars" (
    "id" uuid NOT NULL,
    "name" character varying(250) NOT NULL,
    "fueltype" character varying(250) NOT NULL,
    "year" integer,
    CONSTRAINT "firstkey" PRIMARY KEY ("id")
) WITH (oids = false);

insert into cars values('e6776980-88ab-4eed-b932-ae1c2c451432', 'Toyota Yaris', 'essence', '2010');
insert into cars values('551da196-a128-4ad0-88f0-00b2b40c585e', 'Peugeot 207', 'diesel', '2007');
insert into cars values('801cf5d3-dcb4-4070-a560-8745ec0dd943', 'Skoda Fabia', 'essence', '2018');
insert into cars values('7b99a6ef-16a8-46cb-8367-127c420909d8', 'Volkswagen Golf GTI', 'essence', '2014');
insert into cars values('98cf13aa-db8d-4cee-82df-3c3c8c8b7df7', 'Peugeot 508 PSE', 'essence', '2020');





