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
    const carac = await dataMapper.allCarac();
    const id = req.query.carac;

    if (id === null || id === NaN || id === "" || id === undefined) {
      const coffees = await dataMapper.allCoffee();
      res.render("browsing_page.ejs", {
        browsing_pageStyle: "css",
        browsing_pageJava: "java",
        coffees,
        carac,
      });
    } else {
      const coffees = await dataMapper.allCoffeesByCarac(parseInt(id));
      res.render("browsing_page.ejs", {
        browsing_pageStyle: "css",
        browsing_pageJava: "java",
        coffees,
        carac,
      });
    }
  },
  displayNewBrowse(req, res) {
    const id = req.query.carac;
  },
  displayWho(req, res) {
    res.render("who_page.ejs", {
      whoStyle: "css",
    });
  },
};

export default mainController;
