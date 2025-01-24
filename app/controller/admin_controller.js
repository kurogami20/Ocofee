import dataMapper from "../models/dataMapper.js";

const adminController = {
  // *affichage de la page de connexion
  displayAdmin(req, res) {
    res.render("admin/admin.ejs", {
      adminStyle: "css",
    });
  },
  // *On gère la connexion de l'admin
  async handleAdmin(req, res) {
    const userCo = req.body;

    const admin = await dataMapper.admin(userCo.name, userCo.password);

    if ((userCo.name === "") === "" || userCo.password === "") {
      res.render("admin/admin.ejs", {
        errorMessage: "veuillez remplir tous les champs",
      });
    } else if (admin === "" || admin === undefined) {
      res.render("admin/admin.ejs", {
        errorMessage: "Mot de passe ou nom d'utilisateur incorrect",
      });
    } else {
      req.session.admin = [];
      req.session.admin.push(admin);
      res.redirect("/");
    }
  },

  // * on affiche la page pour ajouter des café
  async displayAddCoffee(req, res, next) {
    const empty = "";
    const admin = req.session.admin;
    const carac = await dataMapper.allCarac();

    if (admin === empty || admin === undefined) {
      next();
    } else {
      res.render("admin/addCoffe.ejs", {
        adminStyle: "css",
        adminConnected: req.session.admin,
        carac,
      });
    }
  },
  // *gère l'ajout de café
  async AddCoffee(req, res) {
    const coffee = req.body;
    const carac = await dataMapper.allCarac();
    console.log(parseInt(req.body.carac));
    console.log(req.file);
    if (
      coffee.nom === "" ||
      coffee.description === "" ||
      coffee.reference === "" ||
      coffee.origine === "" ||
      coffee.prix_kilo === "" ||
      coffee.caracteristique === "" ||
      coffee.coffee_img === ""
    ) {
      res.render("admin/addCoffe.ejs", {
        adminConnected: req.session.admin,
        errorMessage: "veuillez remplir tous les champs",
        carac,
      });
    } else {
      const ref = req.body.carac;
      dataMapper.addCoffe(coffee, parseInt(ref));
      res.render("admin/addCoffe.ejs", {
        adminConnected: req.session.admin,
        carac,
        successMessage: `Café ajouté allez le voir`,
        address: `/produit/${coffee.reference}`,
      });
    }
  },

  async displaySuppCoffee(req, res, next) {
    const coffees = await dataMapper.allCoffee();
    const empty = "";
    const admin = req.session.admin;

    if (admin === empty || admin === undefined) {
      next();
    } else {
      res.render("admin/suppCoffee.ejs", {
        coffees,
        adminConnected: req.session.admin,
      });
    }
  },

  async suppCoffee(req, res) {
    const ref = req.params.ref;
    console.log(parseInt(ref));
    const coffees = await dataMapper.allCoffee();
    dataMapper.deleteCoffee(parseInt(ref));
    res.redirect("admin/suppCoffee");
  },

  // *modification
  async displayUpdCoffee(req, res, next) {
    const coffees = await dataMapper.allCoffee();
    const ref = req.query.nameCoffee;
    const empty = "";
    const admin = req.session.admin;
    const carac = await dataMapper.allCarac();

    if (admin === empty || admin === undefined) {
      next();
    } else {
      if (ref !== "" || ref !== undefined) {
        const coffee = await dataMapper.coffeeByRef(ref);

        if (coffee === undefined) {
          res.render("admin/updCoffee.ejs", {
            coffees,
            coffee,
            adminConnected: req.session.admin,
            carac,
          });
        } else {
          const actualCarac = await dataMapper.caracById(
            coffee.id_caracteristique
          );

          res.render("admin/updCoffee.ejs", {
            coffees,
            coffee,
            adminConnected: req.session.admin,
            carac,
            actualCarac,
          });
        }
      } else {
        res.render("admin/updCoffee.ejs", {
          coffees,
          adminConnected: req.session.admin,
          carac,
        });
      }
    }
  },

  UpdCoffee(req, res) {
    const coffee = req.body;
    console.log(coffee);
    let disponibilite;
    const carac = coffee.carac;
    if (coffee.dispo === "false") {
      disponibilite = false;
      dataMapper.updCoffe(coffee, parseInt(carac), disponibilite);
    } else {
      disponibilite = true;
      dataMapper.updCoffe(coffee, parseInt(carac), disponibilite);
    }

    res.redirect("/admin/updCoffee");
  },

  // *déconnexion
  logout(req, res) {
    req.session.admin = "";
    res.redirect("/");
  },
};

export default adminController;
