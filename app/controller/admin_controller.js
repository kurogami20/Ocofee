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
    // si le nom ou le mot de passe n'est pas remplis on renvois sur le formulaire
    if ((userCo.name === "") === "" || userCo.password === "") {
      res.render("admin/admin.ejs", {
        errorMessage: "veuillez remplir tous les champs",
      });
      // si les identifiant son incorrect on renvoie sur la page du formilaire
    } else if (admin === "" || admin === undefined) {
      res.render("admin/admin.ejs", {
        errorMessage: "Mot de passe ou nom d'utilisateur incorrect",
      });
      // si tout est bon on renvoi à l'accueil et on envoie les identifiant dans la session
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
    // on vérifie si il y a un admin connecté on envoie un 404 si il n'y a personne de connecté
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
    // on récupère les donnée envoyée
    const coffee = req.body;
    try {
      // on récupère la table les caractéristiques
      const carac = await dataMapper.allCarac();
      //  on vérifie si tous les input ont bien été remplis si ce n'est pas le cas on renvois le formulaire
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
        // on récupère l'id de la caractéristique et on le transforme en nombre
        const id_carac = req.body.carac;
        dataMapper.addCoffe(coffee, parseInt(id_carac));
        // on renvoi le formulaire avec un message de succès
        res.render("admin/addCoffe.ejs", {
          adminConnected: req.session.admin,
          carac,
          successMessage: `Café ajouté allez le voir`,
          address: `/produit/${coffee.reference}`,
        });
      }
    } catch (error) {
      res.status(500).render("error/500.ejs");
    }
  },
  // *affichage de la page de suppression du café
  async displaySuppCoffee(req, res, next) {
    try {
      // On récupère tous les cafés
      const coffees = await dataMapper.allCoffee();

      const empty = "";
      const admin = req.session.admin;
      // on vérifie si il y a un admin connecté on envoie un 404 si il n'y a personne de connecté
      if (admin === empty || admin === undefined) {
        next();
      }
      // on envoie la page avec tous les cafés
      else {
        res.render("admin/suppCoffee.ejs", {
          coffees,
          adminConnected: req.session.admin,
        });
      }
    } catch (error) {
      res.status(500).render("error/500.ejs");
    }
  },
  // *on gère la suppression des café
  async suppCoffee(req, res) {
    // on récupère la reference marquée dans le params
    const ref = req.params.ref;
    try {
      // on envoie ref dans la fonction de suppression du datamapper
      dataMapper.deleteCoffee(parseInt(ref));
      res.redirect("admin/suppCoffee");
    } catch (error) {
      res.status(500).render("error/500.ejs");
    }
  },

  // *on fait apparraitre la page modification
  async displayUpdCoffee(req, res, next) {
    try {
      // on récupère tous les cafés
      const coffees = await dataMapper.allCoffee();
      // on récupère le nom du café sélectionné
      const coffeeName = req.query.nameCoffee;
      // on récupère toutes les caractéristique
      const carac = await dataMapper.allCarac();

      const empty = "";
      const admin = req.session.admin;
      // on vérifie si il y a un admin connecté on envoie un 404 si il n'y a personne de connecté
      if (admin === empty || admin === undefined) {
        next();
      }
      // on vérifie si un café a été sélectionné si c'est bon on renvoit le formulaire de mise à jour
      else {
        if (coffeeName !== "" || coffeeName !== undefined) {
          const coffee = await dataMapper.coffeeByRef(coffeeName);
          // ce IF sert à afficher la caractéristique actuelle du café sélectionné
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
        }
        // On renvoie la  page de choix du café à modifier
        else {
          res.render("admin/updCoffee.ejs", {
            coffees,
            adminConnected: req.session.admin,
            carac,
          });
        }
      }
    } catch (error) {
      res.status(500).render("error/500.ejs");
    }
  },

  // *on gère la mise à jour d'un café
  UpdCoffee(req, res) {
    try {
      // on récupère les données envoyées
      const coffee = req.body;
      // on créé une variable correspondante à la disponibilité
      let disponibilite;
      // on récupère la caractéristique du café pour la transformer en nombre plus tard
      const carac = coffee.carac;

      // si la disponibilité est égale à "false"
      if (coffee.dispo === "false") {
        // disponibilité est donc égale à false
        disponibilite = false;
        // on envoie les donnée dans la fonction de mise à jour du datamapper et on transforme carac en nombre
        dataMapper.updCoffe(coffee, parseInt(carac), disponibilite);
      }
      // si la disponibilité est égale à "true"
      else {
        // disponibilité est donc égale à true
        disponibilite = true;
        // on envoie les donnée dans la fonction de mise à jour du datamapper et on transforme carac en nombre
        dataMapper.updCoffe(coffee, parseInt(carac), disponibilite);
      }
      // on renvoie la page
      res.redirect("/admin/updCoffee");
    } catch (error) {
      res.status(500).render("error/500.ejs");
    }
  },

  // *déconnexion
  logout(req, res) {
    // on efface la session admin
    req.session.admin = "";
    res.redirect("/");
  },
};

export default adminController;
