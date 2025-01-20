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
};

export default dataMapper;
