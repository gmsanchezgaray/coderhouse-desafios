class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre; //String
    this.apellido = apellido; //String
    this.libros = libros; //Object[]
    this.mascotas = mascotas; //String[]
  }
  getFullName() {
    console.log(`${this.nombre} ${this.apellido}`);
  }

  addBook(nombre, autor) {
    this.libros.push({ nombre, autor });
  }

  getBookNames() {
    const arrayNombreLibros = this.libros.map((libro) => libro.nombre);
    console.log(arrayNombreLibros);
  }

  addMascota(nombreMascota) {
    this.mascotas.push(nombreMascota);
  }
  countMascotas() {
    console.log(this.mascotas.length);
  }
}

//Nueva instancia de prueba
const usuario1 = new Usuario(
  "Elon",
  "Musk",
  [
    { nombre: "El señor de las moscas", autor: "William Golding" },
    { nombre: "Fundacion", autor: "Isaac Asimov" },
  ],
  ["Firulais", "Pulguita"]
);

usuario1.getFullName();
usuario1.countMascotas();
usuario1.addMascota("Scooby");
usuario1.countMascotas();
usuario1.getBookNames();
