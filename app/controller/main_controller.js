import dataMapper from "../models/dataMapper.js";

const mainController = {
  displayHome(req, res) {
    res.render("index.ejs", {
      indexStyle: "css",
    });
  },
};

export default mainController;
