import dataMapper from "../models/dataMapper.js";

const mainController = {
  // *on affiche l'accueil
  async displayHome(req, res) {
    // on vérifie si l'admin est connecté
    // si l'admin n'est pas connecté on affiche l'interface pour l'utilisateur
    if (req.session.admin === "") {
      try {
        // on récupère les 3 nouveau cafés
        const coffee = await dataMapper.newCoffes();
        // on affiche la page
        res.render("index.ejs", {
          indexStyle: "css",
          coffee,
        });
      } catch (error) {
        res.status(500).render("error/500.ejs");
      }
    } // si l'admin est  connecté on affiche l'interface pour l'admin
    else {
      res.render("index.ejs", {
        indexStyle: "css",
        coffee,
        adminConnected: req.session.admin,
      });
    }
  },
  // *on affiche la page catalogue
  async displayBrowse(req, res) {
    try {
      // on récupère les caractéristique
      const carac = await dataMapper.allCarac();

      // on récupère l'id de caractéristique récupéré par le formulaire
      const id = req.query.carac;

      // on vérifie si l'id est égal a quelque chose si ce n'est pas le cas on affiche tous les café normalement
      if (id === null || id === NaN || id === "" || id === undefined) {
        // on récupère tous les cafés
        const coffees = await dataMapper.allCoffee();
        // on affiche la page
        res.render("browsing_page.ejs", {
          browsing_pageStyle: "css",
          browsing_pageJava: "java",
          coffees,
          carac,
        });
      }
      // si id est égal a quelque chose on affiche la liste des café filtré par la carctéristique choisie
      else {
        // on envoie id dans la fonction de filtrage et on le transforme en nombre
        const coffees = await dataMapper.allCoffeesByCarac(parseInt(id));
        // on affiche la page
        res.render("browsing_page.ejs", {
          browsing_pageStyle: "css",
          browsing_pageJava: "java",
          coffees,
          carac,
        });
      }
    } catch (error) {
      res.status(500).render("error/500.ejs");
    }
  },
  // *on affiche la "page qui sommes nous"
  displayWho(req, res) {
    res.render("who_page.ejs", {
      whoStyle: "css",
    });
  },
};

export default mainController;
