const express = require("express");

const productosRouter = require("./routers/productos");

const server = express();

const PORT = 8080;

// Midlewares de express
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Espacio público de servidor
server.use("/", express.static("public"));

// server.get("/", (req, res) => {
//   res.send("<h1>Server running...</h1>");
// });

// Usa las rutas de productos
server.use("/api/productos", productosRouter);

// Enciendo el server
const callbackInicial = () => {
  console.log(`Servidor corriendo en el puerto: ${PORT}`);
};
server.listen(PORT, callbackInicial);

// Manejo de errores
server.on("error", (error) => console.log("Error: ", error));
