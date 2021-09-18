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

      const productsString = JSON.stringify(products);
      await fs.promises.writeFile(`./${this.file}`, productsString);
    } catch (error) {
      console.log("No se ha podido guardar =>", error);
    }
  }
  //TODO Recibe un id y devuelve el objeto con ese id, o null si no está.
  async getById(Number) {
    try {
      const data = await fs.promises.readFile(`./${this.file}`, "utf-8");
      const dataParsed = JSON.parse(data);

      const productObject = dataParsed.find((product) => product.id === Number);
      if (productObject) {
        console.log(productObject);
      } else {
        console.log(null);
      }
    } catch {
      console.log(
        `Hubo un error tratando de buscar el producto con el id => ${Number}`
      );
    }
  }
  //TODO Devuelve un array con los objetos presentes en el archivo.
  async getAll() {
    try {
      const data = await fs.promises.readFile(`./${this.file}`, "utf-8");
      const dataParsed = JSON.parse(data);
      console.log(dataParsed);
    } catch (error) {
      console.log("Hubo un error al traer los productos =>", error);
    }
  }
  //TODO Elimina del archivo el objeto con el id buscado.
  async deleteById(Number) {
    try {
      const data = await fs.promises.readFile(`./${this.file}`, "utf-8");
      const dataParsed = JSON.parse(data);

      const newList = dataParsed.filter((product) => product.id != Number);
      const newListString = JSON.stringify(newList);

      await fs.promises.writeFile(`./${this.file}`, newListString);
      // console.log(newList);
    } catch (error) {
      console.log("Hubo un error al eliminar el producto =>", error);
    }
  }
  //TODO Elimina todos los objetos presentes en el archivo.
  async deleteAll() {
    try {
      const data = await fs.promises.writeFile(`./${this.file}`, "");
    } catch (error) {
      console.log("Hubo un error al eliminar todos los productos =>", error);
    }
  }
}

module.exports = Contenedor;
