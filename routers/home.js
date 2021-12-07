const express = require("express");
const { webAuth } = require("../utils/authWeb");
const path = require("path");
const homeRouter = express.Router();

homeRouter.get("/home", webAuth, (req, res) => {
  res.render(path.join(process.cwd(), "/public/views/home.ejs"), {
    nombre: req.session.nombre,
  });
});

module.exports = homeRouter;
