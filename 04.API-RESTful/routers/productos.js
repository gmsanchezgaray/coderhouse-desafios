const express = require("express");

const Contenedor = require("../Contenedor");

const productoContenedor = new Contenedor("./data/productos.json");

const productsRouter = express.Router();

//GET '/api/productos' -> devuelve todos los productos.
productsRouter.get("/", async (req, res) => {
  const productos = await productoContenedor.getAll();
  res.send(productos);
});

//GET '/api/productos/:id' -> devuelve un producto según su id.
productsRouter.get("/:id", async (req, res) => {
  const index = req.params.id;
  const product = await productoContenedor.getById(index);

  if (!product) {
    res.send({ error: "producto no encontrado" });
  } else {
    res.send(product);
  }
});

// POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
productsRouter.post("/", async (req, res) => {
  const newProduct = req.body;

  const idProduct = await productoContenedor.save(newProduct);
  res.send({ ...newProduct, id: idProduct });
});

// PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
productsRouter.put("/:id", async (req, res) => {
  const index = req.params.id;

  const newInfo = req.body;
  const productToUpdate = await productoContenedor.update(index, newInfo);

  if (!productToUpdate) {
    res.send({ error: "producto no encontrado" });
  } else {
    res.send(productToUpdate);
  }
});
// DELETE '/api/productos/:id' -> elimina un producto según su id.
productsRouter.delete("/:id", async (req, res) => {
  const index = req.params.id;

  const productToRemove = await productoContenedor.deleteById(index);

  if (!productToRemove) {
    res.send({ error: "producto no encontrado", data: productToRemove });
  } else {
    res.send({
      status: "el producto ha sido eliminado",
      data: productToRemove,
    });
  }
});

module.exports = productsRouter;
