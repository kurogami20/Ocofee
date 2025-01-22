CREATE TABLE cafes_admin (
    id SERIAL PRIMARY KEY,
    name VARCHAR (20) NOT NULL,
   password VARCHAR (20) NOT NULL
);

INSERT INTO cafes_admin (name,password) VALUES
('admin','admin');