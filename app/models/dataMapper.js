import data from "../models/connect.js";

const dataMapper = {
  async allCoffees() {
    const coffee = await data.query(
      `SELECT nom, reference, disponible FROM cafes ORDER BY nom`
    );
    return coffee.rows;
  },
  async newCoffes() {
    const coffee = await data.query(
      `SELECT nom, reference FROM cafes ORDER BY id DESC LIMIT 3`
    );
    return coffee.rows;
  },
  async coffeeByRef(id) {
    const coffee = await data.query(
      `SELECT * FROM cafes WHERE reference = $1`,
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
  async addCoffe(coffee) {
    const newCoffee = await data.query(
      `INSERT INTO cafes (nom,description,reference,origine,prix_kilo,caracteristique,disponible) VALUES
      ($1,$2,$3,$4,$5,$6,true)
      `,
      [
        coffee.nom,
        coffee.description,
        coffee.reference,
        coffee.origine,
        coffee.prix_kilo,
        coffee.caracteristique,
      ]
    );
    return newCoffee;
  },
};

export default dataMapper;
