const Contenedor = require("../Contenedor");
const { normalizeMessages } = require("../utils/normalizar");

const mensajesContenedor = new Contenedor("./data/chats.json");

const getAllMessages = async () => {
  const messages = await mensajesContenedor.getAll();
  return messages;
};

const getAllMessagesNormalized = async () => {
  const messages = await mensajesContenedor.getAll();
  console.log(messages);
  // return messages;
  return normalizeMessages({ id: "messages", messages });
};

const getOneMessage = async (indexNumber) => {
  const message = await mensajesContenedor.getById(indexNumber);
  return message;
};

const addMessage = async (messageToAdd) => {
  const idMessage = await mensajesContenedor.save(messageToAdd);
  return idMessage;
};

const editMessage = async (indexNumber, infoToChange) => {
  const messageToUpdate = await mensajesContenedor.update(
    indexNumber,
    infoToChange
  );

  return messageToUpdate;
};

const deleteMessage = async (indexNumber) => {
  const messageToRemove = await mensajesContenedor.deleteById(indexNumber);
  return messageToRemove;
};

module.exports = {
  getAllMessages,
  getOneMessage,
  addMessage,
  editMessage,
  deleteMessage,
  getAllMessagesNormalized,
};
