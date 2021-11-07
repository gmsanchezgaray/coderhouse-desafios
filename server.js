const express = require("express");
const { Server: SocketServer } = require("socket.io");
const { Server: HttpServer } = require("http");

// Metodos de Productos y Mensajes
const { getAllProducts, addProduct } = require("./models/products");
const { getAllMessages, addMessage } = require("./models/messages");

// Routers
const productsRouter = require("./routers/products");
const messagesRouter = require("./routers/messages");
// CONFIGURACION
const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);

const PORT = 8080;

// Midlewares de express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuracion de routers y página inicial
app.use(express.static("public"));

app.use("/api/productos", productsRouter);
app.use("/api/mensajes", messagesRouter);

io.on("connection", async (socket) => {
  console.log("Nuevo usuario conectado");

  //Ver todos los productos cuando inician la pagina
  const productos = await getAllProducts();

  socket.emit("products", productos);

  //Agregar un producto y que todos los vean
  socket.on("add-product", async (product) => {
    await addProduct(product);
    const productos = await getAllProducts();

    io.sockets.emit("products", productos);
  });

  //Ver todos los chats y mensajes cuando inician la pagina
  const mensajes = await getAllMessages();
  socket.emit("messages", mensajes);

  //Agregar un mensaje en el chat y que todos lo vean
  socket.on("add-message", async (message) => {
    await addMessage(message);
    const mensajes = await getAllMessages();
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
