const Contenedor = require("./Contenedor");

const miContenedor = new Contenedor("./productos.txt");

const newProduct = {
  title: "Escuadra",
  price: 123.45,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
};

const newProduct2 = {
  title: "Calculadora",
  price: 234.56,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
};
const newProduct3 = {
  title: "Globo Terráqueo",
  price: 345.67,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
};

// const checkId = async () => {
//   const id = await miContenedor.save(newProduct);
//   console.log(id);
// };
// checkId();

// miContenedor.save(newProduct);
// miContenedor.save(newProduct2);
// miContenedor.save(newProduct3);

// miContenedor.getById(2);
// miContenedor.getById(7);

// miContenedor.getAll();

// miContenedor.deleteById(2);

// miContenedor.deleteAll();
