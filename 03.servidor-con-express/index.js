const express = require("express");

const Contenedor = require("./Contenedor");
const micontenedor = new Contenedor("./productos.json");

const server = express();

const PORT = 8080;

const obtenerRandom = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Endpoint inicial
const PATH = "/";
const callback = (peticion, response) => {
  response.send({ mensaje: "HOLA MUNDO" });
};
server.get(PATH, callback);

// Endpoint /products
server.get("/productos", async (req, res) => {
  const productos = await micontenedor.getAll();
  res.json(productos);
});

// Endpoint /productosRandom
server.get("/productosRandom", async (req, res) => {
  const productos = await micontenedor.getAll();
  const index = obtenerRandom(0, productos.length - 1);
  res.json(productos[index]);
});

// Enciendo el server
const callbackInicial = () => {
  console.log(`Servidor corriendo en el puerto: ${PORT}`);
};
server.listen(PORT, callbackInicial);

// Manejo de errores
server.on("error", (error) => console.log("Error: ", error));
