const { normalize, schema } = require("normalizr");

const schemaAuthor = new schema.Entity("author", {}, { idAttribute: "email" });

const schemaMensaje = new schema.Entity("message", { author: schemaAuthor });

const schemaMensajes = new schema.Entity("messages", {
  mensajes: [schemaMensaje],
});

const normalizeMessages = (mensajesConId) =>
  normalize({ id: "mensajes", messages: mensajesConId }, schemaMensajes);
module.exports = {
  normalizeMessages,
};
