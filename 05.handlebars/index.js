const express = require("express");

const Contenedor = require("./Contenedor");

const productoContenedor = new Contenedor("./data/productos.json");

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Seteo de motor de plantillas
const handleBars = require("express-handlebars");
server.engine(
  "hbs",
  handleBars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials/",
  })
);

server.set("view engine", "hbs");
server.set("views", "./views");

const PORT = 8080;

// Pagina principal
server.get("/", (req, res) => {
  res.render("layouts/formulario");
});

// Enciendo el server
server.listen(PORT, () => console.log(`server running in port: ${PORT}`));

//GET '/productos' -> devuelve todos los productos.
server.get("/productos", async (req, res) => {
  const productos = await productoContenedor.getAll();
  res.render("layouts/productos", { productos });
});

// POST '/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
server.post("/productos", async (req, res) => {
  const newProduct = req.body;
  await productoContenedor.save(newProduct);
  res.redirect("/productos");
});

//GET '/productos/:id' -> devuelve el producto especificado por el id.
server.get("/productos/:id", async (req, res) => {
  const index = req.params.id;
  const product = await productoContenedor.getById(index);

  res.render("layouts/datos-productos", product);
});

// Manejo de errores
server.on("error", (error) => console.log("Error: ", error));
