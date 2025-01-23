import dataMapper from "../models/dataMapper.js";

const products = {
  async displayProduct(req, res, next) {
    const ref = req.params.id;
    try {
      const coffeeSelected = await dataMapper.coffeeByRef(ref);
      console.log(coffeeSelected);
      res.render("product_page.ejs", {
        coffeeSelected,
        productStyle: "css",
      });
    } catch (error) {
      next();
    }
  },
};

export default products;
