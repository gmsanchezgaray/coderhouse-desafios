const express = require("express");
const { getAllProductsFaker } = require("../models/products");

const productsFakerRouter = express.Router();

//GET '/api/products-test' -> devuelve todos los productos.
productsFakerRouter.get("/", async (req, res) => {
  const data = await getAllProductsFaker();
  res.send({ data });
});

module.exports = productsFakerRouter;
