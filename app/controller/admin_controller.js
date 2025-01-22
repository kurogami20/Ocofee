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

    if (userCo.name === "" || userCo.password === "") {
      res.render("admin.ejs", {
        errorMessage: "veuillez remplir tous les champs",
      });
    } else if (admin === "" || admin === undefined) {
      res.render("admin.ejs", {
        errorMessage: "Mot de passe ou nom d'utilisateur incorrect",
      });
    } else {
      req.session.admin = [];
      req.session.admin = admin;
      res.redirect("/admin/addCoffee");
    }
  },

  displayAddCoffee(req, res) {
    res.render("addCoffe.ejs", {
      adminStyle: "css",
      adminConnected: req.session.admin,
    });
  },
  async AddCoffee(req, res) {
    const coffee = req.body;

    // const admin = await dataMapper.addCoffe(coffee);

    // if () {
    //   res.render("admin.ejs", {
    //     errorMessage: "veuillez remplir tous les champs",
    //   });
    // } else if (admin === "" || admin === undefined) {
    //   res.render("admin.ejs", {
    //     errorMessage: "Mot de passe ou nom d'utilisateur incorrect",
    //   });
    // } else {
    //   req.session.admin = [];
    //   req.session.admin = admin;
    //   res.redirect("/admin/addCoffee");
    // }
  },
  logout(req, res) {
    req.session.admin = [];
    res.redirect("/");
  },
};

export default adminController;
