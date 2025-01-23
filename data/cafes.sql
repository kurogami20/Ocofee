BEGIN

DROP TABLE IF EXISTS "caracteristique" ;

CREATE TABLE IF NOT EXISTS "caracteristique" (
"id" SERIAL PRIMARY KEY,
"nom" TEXT NOT NULL
);

INSERT INTO "caracteristique" ("nom") VALUES
    ('Corsé'),
    ('Acide'),
    ('Fruité'),
    ('Doux'),
    ('Chocolaté'),
    ('Epicé');





DROP TABLE IF EXISTS "cafes";

CREATE TABLE IF NOT EXISTS "cafes" (
   "id" SERIAL PRIMARY KEY,
    "nom" TEXT NOT NULL,
   "description" TEXT NOT NULL,
    "reference" TEXT UNIQUE NOT NULL,
    "origine" TEXT NOT NULL,
   "prix_kilo" DECIMAL(10,2) NOT NULL,
    "disponible" BOOLEAN NOT NULL,
    "id_caracteristique" INT NOT NULL,
    FOREIGN KEY ("id_caracteristique") REFERENCES "caracteristique"("id")
);
-- Insert initial data
INSERT INTO "cafes" ("nom", "description","reference", "origine", "prix_kilo", "id_caracteristique", "disponible") VALUES
    ('Espresso', 'Café fort et concentré préparé en faisant passer de l''eau chaude à travers du café finement moulu.', '100955890', 'Italie', 20.99, 1, true),
    ('Columbian', 'Café moyennement corsé avec une acidité vive et une saveur riche.', '100955894', 'Colombie', 18.75, 2, true),
    ('Ethiopian Yirgacheffe', 'Réputé pour son arôme floral, son acidité vive et ses notes de saveur citronnée.', '105589090', 'Éthiopie', 22.50, 3, true),
    ('Brazilian Santos', 'Café doux et lisse avec un profil de saveur de noisette.', '134009550', 'Brésil', 17.80, 4, true),
    ('Guatemalan Antigua', 'Café corsé avec des nuances chocolatées et une pointe d''épice.', '256505890', 'Guatemala', 21.25, 1, true),
    ('Kenyan AA', 'Café complexe connu pour son acidité rappelant le vin et ses saveurs fruitées.', '295432730', 'Kenya', 23.70, 2, true),
    ('Sumatra Mandheling', 'Café profond et terreux avec un corps lourd et une faible acidité.', '302932754', 'Indonésie', 19.95, 1, true),
    ('Costa Rican Tarrazu', 'Café vif et net avec une finition propre et une acidité vive.', '327302954', 'Costa Rica', 24.50, 2, true),
    ('Vietnamese Robusta', 'Café audacieux et fort avec une saveur robuste distinctive.', '549549090', 'Vietnam', 16.75, 6, true),
    ('Tanzanian Peaberry', 'Acidité vive avec un profil de saveur rappelant le vin et un corps moyen.', '582954954', 'Tanzanie', 26.80, 3, true),
    ('Jamaican Blue Mountain', 'Reconnu pour sa saveur douce, son acidité vive et son absence d''amertume.', '589100954', 'Jamaïque', 39.25, 4, true),
    ('Rwandan Bourbon', 'Café avec des notes florales prononcées, une acidité vive et un corps moyen.', '650753915', 'Rwanda', 21.90, 3, true),
    ('Panamanian Geisha', 'Café rare aux arômes floraux complexes, une acidité brillante et un profil de saveur distinctif.', '795501340', 'Panama', 42.00, 3, true),
    ('Peruvian Arabica', 'Café équilibré avec des notes de chocolat, une acidité modérée et un corps velouté.', '954589100', 'Pérou', 19.40, 5, false),
    ('Hawaiian Kona', 'Café rare au goût riche, une acidité douce et des nuances subtiles.', '958090105', 'Hawaï', 55.75, 4, false),
    ('Nicaraguan Maragogipe', 'Café avec des notes de fruits, une acidité vive et un corps plein.', '691550753', 'Nicaragua', 28.60, 3, false);

COMMIT