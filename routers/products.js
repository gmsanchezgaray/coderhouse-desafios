const express = require("express");
const {
  getAllProducts,
  getOneProduct,
  addProduct,
  editProduct,
  deleteProduct,
} = require("../models/products");

const productsRouter = express.Router();

//GET '/api/productos' -> devuelve todos los productos.
productsRouter.get("/", async (req, res) => {
  const data = await getAllProducts();
  res.send({ data });
});

//GET '/api/productos/:id' -> devuelve un producto según su id.
productsRouter.get("/:id", async (req, res) => {
  const index = req.params.id;
  const data = await getOneProduct(index);

  res.send({ data });
});

// POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
productsRouter.post("/", async (req, res) => {
  const newProduct = req.body;

  const dataWithId = await addProduct(newProduct);
  res.send({ ...newProduct, id: dataWithId });
});

// PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
productsRouter.put("/:id", async (req, res) => {
  const index = req.params.id;
  const newInfo = req.body;

  const dataToUpdate = await editProduct(index, newInfo);
  res.send({ dataToUpdate });
});

// DELETE '/api/productos/:id' -> elimina un producto según su id.
productsRouter.delete("/:id", async (req, res) => {
  const index = req.params.id;
  const dataRemoved = await deleteProduct(index);

  res.send({
    dataRemoved,
  });
});

module.exports = productsRouter;
