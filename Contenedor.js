const knex = require("knex");
class Contenedor {
  constructor(config, table) {
    this.table = table;
    this.conexion = knex(config);
  }

  // Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
  async save(Object) {
    try {
      const data = await this.conexion(this.table).insert(Object);
      return data.id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  // Recibe un id y devuelve el objeto con ese id, o null si no está.
  async getById(Number) {
    try {
      const data = await this.conexion
        .from(this.table)
        .select("*")
        .where("id", "=", Number);

      if (data.length !== 0) {
        return data[0];
      } else {
        console.log("No se encontro el producto.");
        return null;
      }
    } catch (error) {
      console.log(
        `Hubo un error tratando de buscar el producto con el id => ${Number}`,
        error
      );
    }
  }
  // Devuelve un array con los objetos presentes en el archivo.
  async getAll() {
    try {
      const data = await this.conexion.from(this.table).select("*");
      if (data.length !== 0) {
        console.log(data);
        return data;
      }
    } catch (error) {
      console.log("Hubo un error al traer los productos =>", error);
    }
  }

  // Recibe y actualiza un producto según su id
  async update(indexNumber, columnToEdit) {
    try {
      const data = await this.conexion
        .from(this.table)
        .where("id", indexNumber)
        .update(columnToEdit);

      return data;
    } catch (error) {
      console.log("Hubo un error al editar el producto =>", error);
    }
  }

  // Elimina del archivo el objeto con el id buscado.
  async deleteById(Number) {
    try {
      const data = await this.conexion
        .from(this.table)
        .where("id", "=", Number)
        .del();

      console.log(data);
    } catch (error) {
      console.log("Hubo un error al eliminar el producto =>", error);
    }
  }
}

module.exports = Contenedor;
