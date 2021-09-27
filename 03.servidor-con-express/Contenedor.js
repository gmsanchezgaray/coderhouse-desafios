const fs = require("fs");

class Contenedor {
  constructor(file) {
    this.file = file;
  }

  //TODO Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
  async save(Object) {
    try {
      let products = [];
      const data = await fs.promises.readFile(`./${this.file}`, "utf-8");
      if (data == "") {
        Object.id = 1;
        products.push(Object);
      } else {
        const dataParsed = JSON.parse(data);
        Object.id = dataParsed[dataParsed.length - 1].id + 1;
        dataParsed.push(Object);
        products = dataParsed;
      }

      const productsString = JSON.stringify(products, null, 2);
      await fs.promises.writeFile(`./${this.file}`, productsString);
      return Object.id;
    } catch (error) {
      console.log("No se ha podido guardar =>", error);
    }
  }
  //TODO Recibe un id y devuelve el objeto con ese id, o null si no está.
  async getById(Number) {
    try {
      const data = await fs.promises.readFile(`./${this.file}`, "utf-8");

      if (data !== "") {
        const dataParsed = JSON.parse(data);

        const productObject = dataParsed.find(
          (product) => product.id === Number
        );
        if (productObject) {
          console.log(productObject);
        } else {
          console.log(null);
        }
      }
    } catch (error) {
      console.log(
        `Hubo un error tratando de buscar el producto con el id => ${Number}`,
        error
      );
    }
  }
  //TODO Devuelve un array con los objetos presentes en el archivo.
  async getAll() {
    try {
      const data = await fs.promises.readFile(`./${this.file}`, "utf-8");
      if (data !== "") {
        const dataParsed = await JSON.parse(data);
        console.log(dataParsed);
        return dataParsed;
      }
    } catch (error) {
      console.log("Hubo un error al traer los productos =>", error);
    }
  }
  //TODO Elimina del archivo el objeto con el id buscado.
  async deleteById(Number) {
    try {
      const data = await fs.promises.readFile(`./${this.file}`, "utf-8");
      if (data !== "") {
        const dataParsed = JSON.parse(data);

        const newList = dataParsed.filter((product) => product.id != Number);
        const newListString = JSON.stringify(newList, null, 2);

        if (newListString === "[]") {
          await fs.promises.writeFile(`./${this.file}`, "");
        } else {
          await fs.promises.writeFile(`./${this.file}`, newListString);
        }
      }
    } catch (error) {
      console.log("Hubo un error al eliminar el producto =>", error);
    }
  }
  //TODO Elimina todos los objetos presentes en el archivo.
  async deleteAll() {
    try {
      const data = await fs.promises.writeFile(`./${this.file}`, "");
      return data;
    } catch (error) {
      console.log("Hubo un error al eliminar todos los productos =>", error);
    }
  }
}

module.exports = Contenedor;
