const express = require("express");
const path = require("path");
const authRouter = express.Router();

authRouter.get("/", (req, res) => {
  res.redirect("/home");
});

authRouter.get("/login", (req, res) => {
  const nombre = req.session?.nombre;
  if (nombre) {
    res.redirect("/");
  } else {
    res.sendFile(path.join(process.cwd(), "public/login.html"));
  }
});

authRouter.get("/logout", (req, res) => {
  const nombre = req.session?.nombre;
  if (nombre) {
    req.session.destroy((err) => {
      if (!err) {
        res.render(path.join(process.cwd(), "public/views/logout.ejs"), {
          nombre,
        });
      } else {
        res.redirect("/");
      }
    });
  }
});

authRouter.post("/login", (req, res) => {
  req.session.nombre = req.body.nombre;
  // res.render(path.join(process.cwd(), "public/views/home.ejs"));
  res.redirect("/home?name=" + req.body.nombre);
});

module.exports = authRouter;
