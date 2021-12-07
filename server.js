const express = require("express");
const session = require("express-session");
const { Server: SocketServer } = require("socket.io");
const { Server: HttpServer } = require("http");

// Metodos de Productos y Mensajes
const {
  getAllProducts,
  addProduct,
  getAllProductsFaker,
} = require("./models/products");
const {
  getAllMessages,
  addMessage,
  getAllMessagesNormalized,
} = require("./models/messages");

// Routers
const productsRouter = require("./routers/products");
const messagesRouter = require("./routers/messages");
const productsFakerRouter = require("./routers/productsFaker");
const authorizationRouter = require("./routers/authorization");
const homeRouter = require("./routers/home");

// CONFIGURACION
const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);
app.set("view engine", "ejs");
const PORT = 8080;

// Midlewares de express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuracion de routers y página inicial
app.use(express.static("public"));

// Configuracion de Session
app.use(
  session({
    secret: "shhhhhhhhhhhhhhhhhhhhh",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000, // Session de 1 minuto == 60000 milisegundos
    },
  })
);
app.use("/api/productos", productsRouter);
app.use("/api/mensajes", messagesRouter);
app.use(authorizationRouter);
app.use(homeRouter);

// Ruta de productos faker
app.use("/api/products-test", productsFakerRouter);

io.on("connection", async (socket) => {
  console.log("Nuevo usuario conectado");

  //Ver todos los productos cuando inician la pagina
  const productos = await getAllProducts();

  socket.emit("products", productos);

  //!Ver todos los productos de faker
  const productosFaker = await getAllProductsFaker();

  socket.emit("products-faker", productosFaker);

  //Agregar un producto y que todos los vean
  socket.on("add-product", async (product) => {
    await addProduct(product);
    const productos = await getAllProducts();

    io.sockets.emit("products", productos);
  });

  //Ver todos los chats y mensajes cuando inician la pagina
  // const mensajes = await getAllMessages();
  const mensajes = await getAllMessagesNormalized();
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
