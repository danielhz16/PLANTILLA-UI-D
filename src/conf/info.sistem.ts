import fulllogo from '../assets/logos/full-logo.png'
import minlogo from '../assets/logos/min-logo.png'
import dhz from '../assets/logos/DHZ.jpg'

export const INFO_SISTEM = {
    name: "ALE LAB ADMIN",
    version: "1.0.0",
    description: "Gestión Hospitalaria",
    author: "Daniel Hernández",
   // license: "MIT",
   // url: "https://github.com/daniel-dev-07/VERA-UI",
    fulllogo: fulllogo,
    minlogo: minlogo,
    loginHelper: 'Ingresa tus credenciales para acceder',
    loginSubtitle: 'Bienvenido',
    logoCompany: dhz
}
/*


CREATE TABLE gender (
    gender_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
)

INSERT INTO gender (name) VALUES ('Hombre'), ('Mujer');


CREATE TABLE user_company (
    user_company_id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    firstname VARCHAR(150) NOT NULL,
    lastname VARCHAR(150) NOT NULL,
    birthdate DATE NULL,
    gender_id INTEGER NULL REFERENCES gender(gender_id),
    is_patient BOOLEAN NOT NULL DEFAULT FALSE,
    status_id SMALLINT NOT NULL DEFAULT 1 REFERENCES status(status_id)
);

CREATE TABLE users_company (
    user_company_id SERIAL PRIMARY KEY,
    user_company_id INTEGER NOT NULL REFERENCES user_company(user_company_id),
    company_id INTEGER NOT NULL REFERENCES company(company_id)
)*/