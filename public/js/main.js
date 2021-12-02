const socket = io.connect();

// const renderProducts = (products) => {
//   const html = products
//     .map((product) => {
//       return `
//         <tr>
//             <td>${product.title}</td>
//                 <td>$ ${product.price}</td>
//             <td><img src=${product.thumbnail} alt=${product.title} width="40" /></td>
//         </tr>
//         `;
//     })
//     .join(" ");

//   document.getElementById("products").innerHTML = html;
// };

// const addProduct = (event) => {
//   event.preventDefault();
//   const product = {
//     title: document.getElementById("floatingTitle").value,
//     price: document.getElementById("floatingPrice").value,
//     thumbnail: document.getElementById("floatingThumbnail").value,
//   };
//   socket.emit("add-product", product);

//   document.getElementById("floatingTitle").value = "";
//   document.getElementById("floatingPrice").value = "";
//   document.getElementById("floatingThumbnail").value = "";
//   return false;
// };
// const formulario = document.getElementById("formulario");
// formulario.addEventListener("submit", addProduct);

// socket.on("products", (data) => {
//   renderProducts(data);
// });
// -------------------------------------------
// Productos hechos con faker----------------
const renderProductsFaker = (products) => {
  const html = products
    .map((product) => {
      return `
        <tr>
            <td>${product.title}</td>
                <td>$ ${product.price}</td>
            <td><img src=${product.thumbnail} alt=${product.title} width="40" /></td>
        </tr>
        `;
    })
    .join(" ");
  document.getElementById("products-faker").innerHTML = html;
};

socket.on("products-faker", (data) => {
  renderProductsFaker(data);
});
// -------------------------------------------

//Seccion de mensajes y chats------------------

const renderMessages = (messages) => {
  const html = messages
    .map((message) => {
      return `
        <div>
            <strong style="color:blue;">${message.email}</strong>
                <span style="color:brown;">[${message.date}]: </span><em style="color:green;">${message.text}</em>
        </div>
        `;
    })
    .join(" ");

  document.getElementById("chatGrupal").innerHTML = html;
};

//-----------------------------
const renderMessagesNormalized = (allMensajes) => {
  const html = allMensajes.messages
    .map((message) => {
      return `
        <div>
            <strong style="color:blue;">${message.author.id}</strong>
                <span style="color:brown;">[${message.date}]: </span><em style="color:green;">${message.text}</em>
                <img src='${message.author.avatar}' width='32px' />
        </div>
        `;
    })
    .join(" ");

  document.getElementById("chatGrupal").innerHTML = html;
};
//-----------------------------

const addMessage = (event) => {
  event.preventDefault();
  const date = new Date();
  const dateStr =
    ("00" + date.getDate()).slice(-2) +
    "/" +
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "/" +
    date.getFullYear() +
    " " +
    ("00" + date.getHours()).slice(-2) +
    ":" +
    ("00" + date.getMinutes()).slice(-2) +
    ":" +
    ("00" + date.getSeconds()).slice(-2);

  const messageContainer = {
    email: document.getElementById("userEmail").value,
    date: dateStr,
    text: document.getElementById("textContent").value,
  };
  socket.emit("add-message", messageContainer);

  document.getElementById("textContent").value = "";
  return false;
};
const formChat = document.getElementById("formChat");
formChat.addEventListener("submit", addMessage);

//------------------------------------------------------
const schemaAuthor = new normalizr.schema.Entity(
  "author",
  {},
  { idAttribute: "id" }
);

const schemaMessage = new normalizr.schema.Entity("message", {
  author: schemaAuthor,
});

const schemaMessages = new normalizr.schema.Entity("messages", {
  messages: [schemaMessage],
});

socket.on("messages", (data) => {
  console.log(data);
  const denormalize = normalizr.denormalize;
  const dataDenormalized = denormalize(
    data.result,
    schemaMessages,
    data.entities
  );
  console.log(dataDenormalized);

  // renderMessages(data);
  renderMessagesNormalized(dataDenormalized);
});
