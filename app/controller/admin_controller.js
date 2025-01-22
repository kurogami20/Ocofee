import dataMapper from "../models/dataMapper.js";

const adminController = {
  displayAdmin(req, res) {
    res.render("admin.ejs", {
      adminStyle: "css",
    });
  },

  async handleAdmin(req, res) {
    const userCo = req.body;

    const admin = await dataMapper.admin(userCo.name, userCo.password);

    if ((userCo.name === "") === "" || userCo.password === "") {
      res.render("admin.ejs", {
        errorMessage: "veuillez remplir tous les champs",
      });
    } else if (admin === "" || admin === undefined) {
      res.render("admin.ejs", {
        errorMessage: "Mot de passe ou nom d'utilisateur incorrect",
      });
    } else {
      req.session.admin = [];
      req.session.admin.push(admin);
      res.redirect("/admin/addCoffee");
    }
  },

  displayAddCoffee(req, res, next) {
    const empty = "";
    const admin = req.session.admin;
    console.log(admin === empty);
    if (admin === empty || admin === undefined) {
      next();
    } else {
      res.render("addCoffe.ejs", {
        adminStyle: "css",
        adminConnected: req.session.admin,
      });
    }
  },
  async AddCoffee(req, res) {
    const coffee = req.body;

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
      res.render("addCoffe.ejs", {
        adminConnected: req.session.admin,
        errorMessage: "veuillez remplir tous les champs",
      });
    } else {
      dataMapper.addCoffe(coffee);
      res.render("addCoffe.ejs", {
        adminConnected: req.session.admin,
        successMessage: "Café ajouté",
      });
    }
  },
  logout(req, res) {
    req.session.admin = "";
    res.redirect("/");
  },
};

export default adminController;
