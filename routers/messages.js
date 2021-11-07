const express = require("express");
const {
  getAllMessages,
  getOneMessage,
  addMessage,
  editMessage,
  deleteMessage,
} = require("../models/messages");

const messagesRouter = express.Router();

//GET '/api/mensajes' -> devuelve todos los mensajes.
messagesRouter.get("/", async (req, res) => {
  const data = await getAllMessages();
  res.send({ data });
});

//GET '/api/mensajes/:id' -> devuelve un mensaje según su id.
messagesRouter.get("/:id", async (req, res) => {
  const index = req.params.id;
  const data = await getOneMessage(index);

  res.send({ data });
});

// POST '/api/mensajes' -> recibe y agrega un mensaje, y lo devuelve con su id asignado.
messagesRouter.post("/", async (req, res) => {
  const newMessage = req.body;

  const dataWithId = await addMessage(newMessage);
  res.send({ ...newMessage, id: dataWithId });
});

// PUT '/api/mensajes/:id/:column' -> recibe y actualiza un mensaje según su id.
messagesRouter.put("/:id", async (req, res) => {
  const index = req.params.id;
  const newInfo = req.body;

  const dataToUpdate = await editMessage(index, newInfo);
  res.send({ dataToUpdate });
});

// DELETE '/api/mensajes/:id' -> elimina un mensaje según su id.
messagesRouter.delete("/:id", async (req, res) => {
  const index = req.params.id;
  const dataRemoved = await deleteMessage(index);
  res.send({
    dataRemoved,
  });
});

module.exports = messagesRouter;
