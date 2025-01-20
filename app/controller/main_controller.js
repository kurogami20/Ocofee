import dataMapper from "../models/dataMapper.js";

const mainController = {
  async displayHome(req, res) {
    const coffee = await dataMapper.newCoffes();
    res.render("index.ejs", {
      indexStyle: "css",
      coffee,
    });
  },
  async displayBrowse(req, res) {
    const coffees = await dataMapper.allCoffees();
    console.log(coffees);
    res.render("browsing_page.ejs", {
      browsing_pageStyle: "css",
      coffees,
    });
  },
};

export default mainController;
