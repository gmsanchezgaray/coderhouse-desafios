const Contenedor = require("../Contenedor");
const { mysqlOptions } = require("./databases");

const productoContenedor = new Contenedor(mysqlOptions, "products");

const getAllProducts = async () => {
  const productos = await productoContenedor.getAll();
  return productos;
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
};
