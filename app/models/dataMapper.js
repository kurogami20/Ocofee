import data from "../models/connect.js";

const dataMapper = {
  async allCoffee() {
    const coffee = await data.query(
      `SELECT * FROM cafes
      ORDER BY nom;`
    );
    return coffee.rows;
  },

  async allCoffeesByCarac(id) {
    const coffee = await data.query(
      `SELECT c.nom, c.reference, c.disponible, t.* 
      FROM cafes c JOIN caracteristique t ON c.id_caracteristique=t.id
      WHERE c.id_caracteristique = $1
      ORDER BY nom;`,
      [id]
    );
    return coffee.rows;
  },
  async caracById(id) {
    const carac = await data.query(
      `SELECT * FROM caracteristique WHERE id = $1`,
      [id]
    );
    return carac.rows[0];
  },
  async allCarac() {
    const carac = await data.query(`SELECT * FROM caracteristique`);
    return carac.rows;
  },
  async newCoffes() {
    const coffee = await data.query(
      `SELECT nom, reference FROM cafes ORDER BY id DESC LIMIT 3`
    );
    return coffee.rows;
  },
  async coffeeByRef(id) {
    const coffee = await data.query(
      `SELECT c.*, t.carac_name FROM cafes c JOIN caracteristique t on c.id_caracteristique = t.id  WHERE c.reference = $1`,
      [id]
    );
    return coffee.rows[0];
  },
  async admin(name, pass) {
    const admin = await data.query(
      `SELECT * FROM cafes_admin WHERE name = $1 and password = $2`,
      [name, pass]
    );
    return admin.rows[0];
  },
  async addCoffe(coffee, ref) {
    const newCoffee = await data.query(
      `INSERT INTO cafes (nom,description,reference,origine,prix_kilo,id_caracteristique,disponible) VALUES
      ($1,$2,$3,$4,$5,$6,true)
      `,
      [
        coffee.nom,
        coffee.description,
        coffee.reference,
        coffee.origine,
        coffee.prix_kilo,
        ref,
      ]
    );
    return newCoffee;
  },

  async deleteCoffee(ref) {
    const coffee = data.query(`DELETE FROM cafes WHERE reference = $1`, [ref]);
    return coffee;
  },
  async updCoffe(coffee, carac, dispo) {
    const newCoffee = await data.query(
      `UPDATE cafes SET nom = $1, description=$2, origine=$3, prix_kilo=$4, id_caracteristique=$5, disponible=$6
      WHERE reference = $7;
      `,
      [
        coffee.nom,
        coffee.description,
        coffee.origine,
        coffee.prix_kilo,
        carac,
        dispo,
        coffee.reference,
      ]
    );
    return newCoffee;
  },
};

export default dataMapper;
