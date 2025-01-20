import dataMapper from "../models/dataMapper.js";

const products = {
  async displayProduct(req, res, next) {
    const ref = req.params.id;
    try {
      const coffeeSelected = await dataMapper.coffeeByRef(ref);
      res.render("product_page.ejs", {
        coffeeSelected,
      });
    } catch (error) {
      next();
    }
  },
};

export default products;
