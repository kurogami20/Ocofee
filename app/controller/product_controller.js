import dataMapper from "../models/dataMapper.js";

const products = {
  // *on affiche la page de produit
  async displayProduct(req, res, next) {
    // on récupère la reférence dans le parametre
    const ref = req.params.id;

    // On vérifie si la fonction du datamapper fonctionne si ça ne fonctionne pas on envoie la 500
    try {
      // on envoie ref dans la fonction du datamapper qui recupère le café par la reférence
      const coffeeSelected = await dataMapper.coffeeByRef(ref);
      // on affiche la page
      res.render("product_page.ejs", {
        coffeeSelected,
        productStyle: "css",
      });
    } catch (error) {
      res.status(500).render("error/500.ejs");
    }
  },
};

export default products;
