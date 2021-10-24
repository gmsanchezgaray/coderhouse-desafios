// >> Aspectos a incluir en el entregable:
// Para construir la tabla dinámica con los datos recibidos por websocket utilizar Handlebars en el frontend. Considerar usar archivos públicos para alojar la plantilla vacía, y obtenerla usando la función fetch( ). Recordar que fetch devuelve una promesa.

const express = require("express");
const { Server: SocketServer } = require("socket.io");
const { Server: HttpServer } = require("http");

const Contenedor = require("./Contenedor");

const productoContendor = new Contenedor("./data/productos.json");
const chatsContendor = new Contenedor("./data/chats.json");
// const getData = //TODO ver para traer los productos y el chat historial

// CONFIGURACION
const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);

const PORT = 8080;

app.use(express.static("public"));

io.on("connection", async (socket) => {
  console.log("Nuevo usuario conectado");

  //Ver todos los productos cuando inician la pagina
  const productos = await productoContendor.getAll();
  socket.emit("products", productos);

  //Agregar un producto y que todos los vean
  socket.on("add-product", async (product) => {
    await productoContendor.save(product);

    const productos = await productoContendor.getAll();
    io.sockets.emit("products", productos);
  });

  //Ver todos los chats y mensajes cuando inician la pagina
  const mensajes = await chatsContendor.getAll();
  socket.emit("messages", mensajes);

  //Agregar un mensaje en el chat y que todos lo vean
  socket.on("add-message", async (message) => {
    await chatsContendor.save(message);
    const mensajes = await chatsContendor.getAll();
    io.sockets.emit("messages", mensajes);
  });
});

const connectedServer = httpServer.listen(PORT, () => {
  console.log(
    `servidor corriendo en el puerto ${connectedServer.address().port}`
  );
});

connectedServer.on("error", (error) => {
  console.log(`Error en servidor ${error}`);
});
