const webAuth = (req, res, next) => {
  console.log("ASDADASDSA");
  if (req.session?.nombre) {
    next();
  } else {
    res.redirect("/login");
  }
};

module.exports = { webAuth };
