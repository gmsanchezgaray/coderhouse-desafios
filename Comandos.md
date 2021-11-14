### Crear una base de datos llamada ecommerce que contenga dos colecciones: mensajes y productos.

```
mongo ecommerce

db.createCollection('messages')

db.createCollection('products')
```

### 1) Agregar 10 documentos con valores distintos a las colecciones mensajes y productos...

### 2) Definir las claves de los documentos en relación a los campos de las tablas de esa base. En el caso de los productos, poner valores al campo precio entre los 100 y 5000 pesos

#### ♦ ♦ ♦ Messages ♦ ♦ ♦

```
db.messages.insertMany([
 { email: 'matute@gmail.com', text: 'buenas', date: '07/11/2021 00:42:17'},
 { email: 'gIgnacio@gmail.com', text: 'Todo bien!', date: '07/11/2021 00:42:46'},
 { email: 'andress@gmail.com ', text: 'todo correcto', date: '07/11/2021 00:43:03'},
 { email: 'aabel@gmail.com', text: 'arreglaron el server ya?', date: '07/11/2021 00:43:14'},
 { email: 'martin@gmail.com', text: 'todavia no. Estamos en eso', date: '07/11/2021 00:43:39'},
 { email: 'pedro@gmail.com', text: 'Hola', date: '07/11/2021 00:43:59'},
 { email: 'anaMaria@gmail.com', text: 'Haciendo los ejercicios de Coder', date: '07/11/2021 00:44:20'},
 { email: 'gonzalo@gmail.com', text: 'No los termine aun', date: '07/11/2021 00:44:50'},
 { email: 'ezequiel@gmail.com', text: 'Te doy una mano si queres', date: '07/11/2021 00:45:15'},
 { email: 'mariana@gmail.com', text: 'Me sumo', date: '07/11/2021 00:45:16'},
])
```

#### ♦ ♦ ♦ Products ♦ ♦ ♦

```
db.products.insertMany([
 { title: 'Escuadra', price: 580, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png', stock: 16},
 { title: 'Calculadora', price: 1700, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png', stock: 65},
 { title: 'Globo Terráqueo', price: 4320, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png', stock: 65},
 { title: 'Cuaderno', price: 900, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/book-note-paper-school-256.png', stock: 54},
 { title: 'Mochila', price: 2300, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/bag-pack-container-school-256.png', stock: 562},
 { title: 'Microscopio', price: 4990, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/microscope-lab-science-school-512.png', stock: 300},
 { title: 'Lapiz', price: 120, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/pencil-pen-stationery-school-512.png', stock: 231},
 { title: 'Pizarra', price: 3350, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/board-math-class-school-512.png', stock: 87},
 { title: 'Agenda', price: 1280, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/paper-clip-academic-note-exam-512.png', stock: 66},
 { title: 'Reloj', price: 2860, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/clock-stopwatch-timer-time-512.png', stock: 54},
])
```

### 3) Listar todos los documentos en cada colección.

```
db.messages.find().pretty()

db.products.find().pretty()
```

### 4) Mostrar la cantidad de documentos almacenados en cada una de ellas.

```
db.messages.count()

db.products.count()
```

### 5) Realizar un CRUD sobre la colección de productos:

- Agregar un producto más en la colección de productos

```
db.products.insertOne({
 title: 'Tubo de ensayo', price: 3860, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/tube-lab-science-school-256.png', stock: 15
})
```

- Realizar una consulta por nombre de producto específico:

#### - Listar los productos con precio menor a 1000 pesos.

```
db.products.find({price: {$lt: 1000}}).pretty()
```

#### - Listar los productos con precio entre los 1000 a 3000 pesos.

```
db.products.find({$and: [{price: {$gt: 1000}}, {price: {$lt: 3000}}]}).pretty()
```

#### - Listar los productos con precio mayor a 3000 pesos.

```
db.products.find({price: {$gt: 3000}}).pretty()
```

#### - Realizar una consulta que traiga sólo el nombre del tercer producto más barato.

```
db.products.find({}, {title: 1, _id: 0}).sort({price:1}).skip(2).limit(1)
```

- Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.

```
db.products.updateMany({}, {$set: {stock: 100} })
```

#### - Cambiar el stock a cero de los productos con precios mayores a 4000 pesos.

```
db.products.updateMany({price: {$gt: 4000} }, {$set: {stock: 0} })
```

#### - Borrar los productos con precio menor a 1000 pesos

```
db.products.deleteMany({price: {$lt: 1000}})
```

### 6) Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce. Verificar que pepe no pueda cambiar la información.

```
use admin

db.createUser({
  user: 'pepe',
  pwd: 'asd456',
  roles: [
    { role: 'read', db: 'ecommerce'}
  ]
})
```

### Iniciar el usuario pepe.

```
mongod --auth
mongo -u pepe -p asd456
```
