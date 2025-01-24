import dataMapper from "../models/dataMapper.js";

const footer = {
  // *on affiche la page contact
  displaysContact(req, res) {
    res.render("footer/contact.ejs");
  },
  //   * on affiche la page plan du site
  async displayMap(req, res) {
    try {
      // on récupère les café et les trois nouveau café
      const coffee = await dataMapper.allCoffee();
      const newCoffe = await dataMapper.newCoffes();
      // on affiche la page
      res.render("footer/sitePlan.ejs", {
        coffee,
        newCoffe,
      });
    } catch (error) {
      res.status(500).render("error/500.ejs");
    }
  },
};
export default footer;
