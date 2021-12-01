const faker = require("faker");
const Contenedor = require("../Contenedor");

const productoContenedor = new Contenedor("./data/productos.json");

const getAllProducts = async () => {
  const productos = await productoContenedor.getAll();
  return productos;
};

const getAllProductsFaker = async () => {
  const productosFaker = await [...new Array(5)].map((_, index) => ({
    id: index,
    title: faker.commerce.product(),
    price: faker.commerce.price(),
    thumbnail: faker.image.imageUrl(),
  }));
  return productosFaker;
};

const getOneProduct = async (indexNumber) => {
  const product = await productoContenedor.getById(indexNumber);
  return product;
};

const addProduct = async (productToAdd) => {
  const idProduct = await productoContenedor.save(productToAdd);
  return idProduct;
};

const editProduct = async (indexNumber, infoToChange) => {
  const productToUpdate = await productoContenedor.update(
    indexNumber,
    infoToChange
  );

  return productToUpdate;
};

const deleteProduct = async (indexNumber) => {
  const productToRemove = await productoContenedor.deleteById(indexNumber);
  return productToRemove;
};

module.exports = {
  getAllProducts,
  getOneProduct,
  addProduct,
  editProduct,
  deleteProduct,
  getAllProductsFaker,
};