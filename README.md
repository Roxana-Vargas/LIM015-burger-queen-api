# Burger Queen - API con Node.js

## Índice

* [1. Preámbulo](#1-pre%C3%A1mbulo)
* [2. Resumen del proyecto](#2-resumen-del-proyecto)
* [3. Criterios de aceptación mínimos del proyecto](#3-criterios-de-aceptación-mínimos-del-proyecto)

## 1. Preámbulo

![Node.js logo](https://nodejs.org/static/images/logos/nodejs-new-pantone-black.svg)

Un pequeño restaurante de hamburguesas, que está creciendo, necesita un
sistema a través del cual puedan tomar pedidos usando una _tablet_, y enviarlos
a la cocina para que se preparen ordenada y eficientemente.
Nuestra clienta nos ha solicitado desarrollar la API que se debe integrar con la
interfaz, que otro equipo de desarrolladoras está trabajando simultáneamente.

## 2. Resumen del proyecto

Este proyecto e trabajó con el _stack_ ([Node.js](https://nodejs.org/) y
[Express](https://expressjs.com/)) y complementado con el motor de bases de
datos [MongoDB](https://www.mongodb.com/).

La clienta nos ha dado un [link a la documentación](https://laboratoria.github.io/burger-queen-api/)
que especifica el comportamiento esperado de la API que expondremos por
HTTP. Ahí puedes encontrar todos los detalles de qué _endpoints_ están implementados en la aplicación, 
qué parámetros esperan, qué deben responder, etc.

## 3. Criterios de aceptación mínimos del proyecto

## 3.1. API

### Ejemplo de peticiones y respuestas

Según lo establecido por la [documentación](https://laboratoria.github.io/burger-queen-api/)
entregada por nuestra clienta, la API expone los siguientes endpoints:

### 3.1.1. `/auth`

* `POST /auth`

```javascript

Body

{
	"email": "admin@localhost.com",
	"password": "adminapi"
}

Body Response 

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNWE4ZGJiZTk5MzA4OTg2Mzk2ZTk3YyIsImlhdCI6MTYzODk3OTg3NCwiZXhwIjoxNjM5MDY2Mjc0fQ.IIuNAnxMLuuL6vHTn8Dh-lsBqo1y1g1lrwYghZ1MzCQ"
}


```

#### 3.1.2 `/users`

* `GET /users`
Requiere token de autenticación y que la usuaria sea admin.

Query Parameters: por defecto: `limit` = 10 and `page` = 1

```javascript
Resultado para: https://bq-lim015.herokuapp.com/users?limit=2&page=1

Body Response 

[
  {
    "_id": "615a8dbbe99308986396e97c",
    "email": "admin@localhost.com",
    "password": "$2b$10$XjmcIxuM4mgMdQyfBJ4fj.wnDlKl/WAvci8tei6Bs9dx9J5AkC2TS",
    "roles": [
      "615a8dbbe99308986396e977"
    ],
    "createdAt": "2021-10-04T05:14:35.303Z",
    "updatedAt": "2021-10-04T05:14:35.303Z"
  },
  {
    "_id": "6167b2e2a31326a4f724c5bd",
    "email": "firstwaiter@gmail.com",
    "password": "$2b$10$U3c/2HAXkY3.Eb4uGDpnCuyg5RvwTotUyKOIFM9FKl0YPs.jadN12",
    "roles": [
      "615a8dbbe99308986396e976"
    ],
    "createdAt": "2021-10-14T04:32:34.541Z",
    "updatedAt": "2021-10-20T00:21:20.950Z"
  }
]

```
* `GET /users/:uid`

Requiere token de autenticación y que la usuaria sea admin o la usuaria a consultar

Route Parameters: `id` o `email` de la usuaria a consultar.

```javascript
Resultado para: https://bq-lim015.herokuapp.com/users/firstwaiter@gmail.com

Body Response 

{
  "_id": "6167b2e2a31326a4f724c5bd",
  "email": "firstwaiter@gmail.com",
  "password": "$2b$10$U3c/2HAXkY3.Eb4uGDpnCuyg5RvwTotUyKOIFM9FKl0YPs.jadN12",
  "roles": [
    "615a8dbbe99308986396e976"
  ],
  "createdAt": "2021-10-14T04:32:34.541Z",
  "updatedAt": "2021-10-20T00:21:20.950Z"
}

Resultado para: https://bq-lim015.herokuapp.com/users/6167b36ba31326a4f724c5d4

{
  "_id": "6167b36ba31326a4f724c5d4",
  "email": "secondwaiter@gmail.com",
  "password": "$2b$10$muFhiwCtpNAE/jUca9c4Uuo3AJvTXfDX4YJC5GI3jkygxqW6zg07O",
  "roles": [
    "615a8dbbe99308986396e976"
  ],
  "createdAt": "2021-10-14T04:34:51.374Z",
  "updatedAt": "2021-10-14T04:34:51.374Z"
}

```

* `POST /users`

Requiere `token` de autenticación y que la usuaria sea admin


```javascript
Body

{
    "email": "newuser@gmail.com",
    "password": "newuser21",
		"roles": ["user"]
}

Body Response 

{
  "email": "newuser@gmail.com",
  "password": "$2b$10$k.yPLU7oLiBT0i6poNKW2OVR62qwgXoA.AW7iQLEnJrHaAqbK/fh6",
  "roles": [
    "615a8dbbe99308986396e976"
  ],
  "_id": "61b0e57d025976792e3fa837",
  "createdAt": "2021-12-08T17:03:57.303Z",
  "updatedAt": "2021-12-08T17:03:57.303Z"
}

```

* `PUT /users/:uid`

Requiere `token` de autenticación y que la usuaria sea admin o la usuaria a modificar

```javascript
Resultado para https://bq-lim015.herokuapp.com/users/newuser@gmail.com

Body
{
    "email": "newuserupdated@gmail.com"
}

Body Response 
{
  "_id": "61b0e57d025976792e3fa837",
  "email": "newuserupdated@gmail.com",
  "password": "$2b$10$k.yPLU7oLiBT0i6poNKW2OVR62qwgXoA.AW7iQLEnJrHaAqbK/fh6",
  "roles": [
    "615a8dbbe99308986396e976"
  ],
  "createdAt": "2021-12-08T17:03:57.303Z",
  "updatedAt": "2021-12-08T17:17:24.567Z"
}

```

* `DELETE /users/:uid`

Requiere `token` de autenticación y que la usuaria sea admin o la usuaria a eliminar

```javascript
Resultado para https://bq-lim015.herokuapp.com/users/newuserupdated@gmail.com

Body Response

{
  "_id": "61b0e57d025976792e3fa837",
  "email": "newuserupdated@gmail.com",
  "password": "$2b$10$k.yPLU7oLiBT0i6poNKW2OVR62qwgXoA.AW7iQLEnJrHaAqbK/fh6",
  "roles": [
    "615a8dbbe99308986396e976"
  ],
  "createdAt": "2021-12-08T17:03:57.303Z",
  "updatedAt": "2021-12-08T17:17:24.567Z"
}

```

#### 3.1.3 `/products`

* `GET /products`

Requiere `token` de autenticación

Query Parameters: por defecto: `limit` = 10 and `page` = 1

```javascript

Resultado para: https://bq-lim015.herokuapp.com/products?limit=2&page=1

Body Response 

[
  {
    "_id": "616b1100367e31d31940a9d5",
    "name": "Cafè americano",
    "price": 10,
    "image": "https://cdn.shortpixel.ai/spai/q_lossy+ret_img+to_webp/https://www.rutta.pe/wp-content/uploads/2020/06/americano.jpg",
    "type": "Desayuno",
    "createdAt": "2021-10-16T17:50:56.512Z",
    "updatedAt": "2021-10-18T14:59:35.664Z"
  },
  {
    "_id": "616b11b4367e31d31940a9dd",
    "name": "Aros de cebolla",
    "price": 10,
    "image": "https://img.vixdata.io/pd/jpg-large/es/sites/default/files/imj/elgranchef/a/aros-de-cebolla.jpg",
    "type": "Almuerzo",
    "createdAt": "2021-10-16T17:53:56.693Z",
    "updatedAt": "2021-10-18T15:17:54.938Z"
  }
]

```
* `GET /products/:productid`

Requiere `token` de autenticación

Route Parameters: `id` del producto

```javascript

Resultado para: https://bq-lim015.herokuapp.com/products/616b1100367e31d31940a9d5

Body Response 

{
  "_id": "616b1100367e31d31940a9d5",
  "name": "Cafè americano",
  "price": 10,
  "image": "https://cdn.shortpixel.ai/spai/q_lossy+ret_img+to_webp/https://www.rutta.pe/wp-content/uploads/2020/06/americano.jpg",
  "type": "Desayuno",
  "createdAt": "2021-10-16T17:50:56.512Z",
  "updatedAt": "2021-10-18T14:59:35.664Z"
}

```

* `POST /products`

Requiere `token` de autenticación y que la usuaria sea admin

```javascript

Body

{ 
    "name": "Jugo de naranja",
    "price": 10,
    "type": "Desayuno",
    "image": "https://i.pinimg.com/originals/78/c0/b6/78c0b6f61ef591aa3dbaad7511b7f6c7.png"
}

Body Response 

{
  "name": "Jugo de naranja",
  "price": 10,
  "image": "https://i.pinimg.com/originals/78/c0/b6/78c0b6f61ef591aa3dbaad7511b7f6c7.png",
  "type": "Desayuno",
  "_id": "61b0ec1f025976792e3fa84e",
  "createdAt": "2021-12-08T17:32:15.190Z",
  "updatedAt": "2021-12-08T17:32:15.190Z"
}

```

* `PUT /products/:productid`

Requiere `token` de autenticación y que la usuaria sea admin

```javascript

Resultado para: https://bq-lim015.herokuapp.com/products/61b0ec1f025976792e3fa84e

Body

{ 
    "name": "Jugo de naranja updated",
}

Body Response 

{
  "_id": "61b0ec1f025976792e3fa84e",
  "name": "Jugo de naranja updated",
  "price": 10,
  "image": "https://i.pinimg.com/originals/78/c0/b6/78c0b6f61ef591aa3dbaad7511b7f6c7.png",
  "type": "Desayuno",
  "createdAt": "2021-12-08T17:32:15.190Z",
  "updatedAt": "2021-12-08T17:34:33.438Z"
}

```
* `DELETE /products/:productid`

```javascript
Resultado para: https://bq-lim015.herokuapp.com/products/61b0ec1f025976792e3fa84e

Body Response

{
  "_id": "61b0ec1f025976792e3fa84e",
  "name": "Jugo de naranja updated",
  "price": 10,
  "image": "https://i.pinimg.com/originals/78/c0/b6/78c0b6f61ef591aa3dbaad7511b7f6c7.png",
  "type": "Desayuno",
  "createdAt": "2021-12-08T17:32:15.190Z",
  "updatedAt": "2021-12-08T17:34:33.438Z"
}

```

#### 3.1.4 `/orders`

* `GET /orders`

Requiere `token` de autenticación

Query Parameters: por defecto: `limit` = 10 and `page` = 1

```javascript

Resultado para: https://bq-lim015.herokuapp.com/orders?limit=2&page=1

Body Response 

[
  {
    "_id": "6178fde627dd4587fc323fd3",
    "userId": "6178fc8f27dd4587fc323c48",
    "client": "Bety",
    "products": [
      {
        "product": {
          "_id": "616b1253367e31d31940a9e7",
          "name": "Papas fritas",
          "price": 10,
          "image": "https://mejorconsalud.as.com/wp-content/uploads/2013/07/patatas-fritas--500x375.jpg",
          "type": "Almuerzo",
          "createdAt": "2021-10-16T17:56:35.105Z",
          "updatedAt": "2021-10-18T15:18:57.004Z"
        },
        "qty": 1,
        "_id": "6178fde627dd4587fc323fd4"
      },
      {
        "product": {
          "_id": "616d8d97e9a157a02e66ed62",
          "name": "Agua 750 ml",
          "price": 7,
          "image": "https://farmaciamedilife.com/wp-content/uploads/2019/07/bonafotn-1-l.jpg",
          "type": "Almuerzo",
          "createdAt": "2021-10-18T15:07:03.068Z",
          "updatedAt": "2021-10-18T15:29:35.815Z"
        },
        "qty": 1,
        "_id": "6178fde627dd4587fc323fd5"
      }
    ],
    "status": "delivered",
    "dateEntry": "2021-10-27T07:21:10.813Z",
    "dateProcessed": "2021-10-27T07:21:10.813Z"
  },
  {
    "_id": "6178fe9f27dd4587fc324140",
    "userId": "615a8dbbe99308986396e97c",
    "client": "Mario",
    "products": [
      {
        "product": {
          "_id": "616b1253367e31d31940a9e7",
          "name": "Papas fritas",
          "price": 10,
          "image": "https://mejorconsalud.as.com/wp-content/uploads/2013/07/patatas-fritas--500x375.jpg",
          "type": "Almuerzo",
          "createdAt": "2021-10-16T17:56:35.105Z",
          "updatedAt": "2021-10-18T15:18:57.004Z"
        },
        "qty": 1,
        "_id": "6178fe9f27dd4587fc324141"
      },
      {
        "product": {
          "_id": "616d8d97e9a157a02e66ed62",
          "name": "Agua 750 ml",
          "price": 7,
          "image": "https://farmaciamedilife.com/wp-content/uploads/2019/07/bonafotn-1-l.jpg",
          "type": "Almuerzo",
          "createdAt": "2021-10-18T15:07:03.068Z",
          "updatedAt": "2021-10-18T15:29:35.815Z"
        },
        "qty": 1,
        "_id": "6178fe9f27dd4587fc324142"
      }
    ],
    "status": "delivered",
    "dateEntry": "2021-10-27T07:24:15.954Z",
    "dateProcessed": "2021-10-27T07:24:15.954Z"
  }
]

```


* `GET /orders/:orderId`

Requiere `token` de autenticación

Route Parameters: `ìd` de la orden

```javascript

Resultado para: https://bq-lim015.herokuapp.com/orders/6178fde627dd4587fc323fd3

Body Response 

{
  "_id": "6178fde627dd4587fc323fd3",
  "userId": "6178fc8f27dd4587fc323c48",
  "client": "Bety",
  "products": [
    {
      "product": {
        "_id": "616b1253367e31d31940a9e7",
        "name": "Papas fritas",
        "price": 10,
        "image": "https://mejorconsalud.as.com/wp-content/uploads/2013/07/patatas-fritas--500x375.jpg",
        "type": "Almuerzo",
        "createdAt": "2021-10-16T17:56:35.105Z",
        "updatedAt": "2021-10-18T15:18:57.004Z"
      },
      "qty": 1,
      "_id": "6178fde627dd4587fc323fd4"
    },
    {
      "product": {
        "_id": "616d8d97e9a157a02e66ed62",
        "name": "Agua 750 ml",
        "price": 7,
        "image": "https://farmaciamedilife.com/wp-content/uploads/2019/07/bonafotn-1-l.jpg",
        "type": "Almuerzo",
        "createdAt": "2021-10-18T15:07:03.068Z",
        "updatedAt": "2021-10-18T15:29:35.815Z"
      },
      "qty": 1,
      "_id": "6178fde627dd4587fc323fd5"
    }
  ],
  "status": "delivered",
  "dateEntry": "2021-10-27T07:21:10.813Z",
  "dateProcessed": "2021-10-27T07:21:10.813Z"
}

```


* `POST /orders`

Requiere `token` de autenticación

```javascript

Body

{
    "status": "pending",
    "userId": "6167b2e2a31326a4f724c5bd",
    "client": "Marianela",
    "products": [
        {
            "product": "616b1253367e31d31940a9e7",
            "qty": 2
        }
    ]
}

Body Response 

{
  "_id": "61b0f032025976792e3fa864",
  "userId": "6167b2e2a31326a4f724c5bd",
  "client": "Marianela",
  "products": [
    {
      "product": {
        "_id": "616b1253367e31d31940a9e7",
        "name": "Papas fritas",
        "price": 10,
        "image": "https://mejorconsalud.as.com/wp-content/uploads/2013/07/patatas-fritas--500x375.jpg",
        "type": "Almuerzo",
        "createdAt": "2021-10-16T17:56:35.105Z",
        "updatedAt": "2021-10-18T15:18:57.004Z"
      },
      "qty": 2,
      "_id": "61b0f032025976792e3fa865"
    }
  ],
  "status": "pending",
  "dateEntry": "2021-12-08T17:49:38.863Z",
  "dateProcessed": "2021-12-08T17:49:38.863Z"
}

```

* `PUT /orders/:orderId`

Requiere `token` de autenticación

```javascript

Resultado para: https://bq-lim015.herokuapp.com/orders/61b0f032025976792e3fa864

Body

{
    "status": "delivering"
}

Body Response 

{
  "_id": "61b0f032025976792e3fa864",
  "userId": "6167b2e2a31326a4f724c5bd",
  "client": "Marianela",
  "products": [
    {
      "product": {
        "_id": "616b1253367e31d31940a9e7",
        "name": "Papas fritas",
        "price": 10,
        "image": "https://mejorconsalud.as.com/wp-content/uploads/2013/07/patatas-fritas--500x375.jpg",
        "type": "Almuerzo",
        "createdAt": "2021-10-16T17:56:35.105Z",
        "updatedAt": "2021-10-18T15:18:57.004Z"
      },
      "qty": 2,
      "_id": "61b0f032025976792e3fa865"
    }
  ],
  "status": "delivering",
  "dateEntry": "2021-12-08T17:49:38.863Z",
  "dateProcessed": "2021-12-08T17:49:38.863Z"
}

```

* `DELETE /orders/:orderId`

Requiere `token` de autenticación

```javascript

Resultado para: https://bq-lim015.herokuapp.com/orders/61b0f032025976792e3fa864

Body Response 

{
  "_id": "61b0f032025976792e3fa864",
  "userId": "6167b2e2a31326a4f724c5bd",
  "client": "Marianela",
  "products": [
    {
      "product": {
        "_id": "616b1253367e31d31940a9e7",
        "name": "Papas fritas",
        "price": 10,
        "image": "https://mejorconsalud.as.com/wp-content/uploads/2013/07/patatas-fritas--500x375.jpg",
        "type": "Almuerzo",
        "createdAt": "2021-10-16T17:56:35.105Z",
        "updatedAt": "2021-10-18T15:18:57.004Z"
      },
      "qty": 2,
      "_id": "61b0f032025976792e3fa865"
    }
  ],
  "status": "delivering",
  "dateEntry": "2021-12-08T17:49:38.863Z",
  "dateProcessed": "2021-12-08T17:49:38.863Z"
}

```

### 3.2 CLI

La clienta nos ha solicitado que la aplicación cuente un comando **`npm start`**
que se debe encargar de ejecutar nuestra aplicación node y que además pueda
recibir información de configuración, como el puerto en el que escuchar, a qué
base datos conectarse, etc. Estos datos de configuración serán distintos entre
diferentes entornos (desarrollo, producción, ...). .

#### 3.2.1 Argumentos de línea de comando

Podemos especificar el puerto en el que debe arrancar la aplicación pasando un
argumento a la hora de invocar nuestro programa:

```sh
# Arranca la aplicación el puerto 8888 usando npm
npm start 8888
```

#### 5.2.2 Variables de entorno

Nuestra aplicación usa las siguientes variables de entorno:

* `PORT`: Si no se ha especificado un puerto como argumento de lína de comando,
  podemos usar la variable de entorno `PORT` para especificar el puerto. Valor
  por defecto `8080`.
* `DB_URL`: El _string_ de conexión de _MongoDB_ . Cuando ejecutemos la
  aplicación en nuestra computadora (en entorno de desarrollo), podemos usar el
  una base de datos local, pero en producción deberemos utilizar las instancias
  configuradas con `docker-compose` (mas sobre esto en la siguiente sección de
  **Deployment**)
* `JWT_SECRET`: Nuestra aplicación implementa autenticación usando JWT (JSON
  Web Tokens). Para poder firmar (cifrar) y verificar (descifrar) los tokens,
  nuestra aplicación necesita un secreto. En local puedes usar el valor por
  defecto (`xxxxxxxx`), pero es muy importante que uses un _secreto_ de verdad
  en producción.
* `ADMIN_EMAIL`: Opcionalmente podemos especificar un email y password para
  el usuario admin (root). Si estos detalles están presentes la aplicación se
  asegurará que exista el usuario y que tenga permisos de administrador. Valor
  por defecto `admin@localhost`.
* `ADMIN_PASSWORD`: Si hemos especificado un `ADMIN_EMAIL`, debemos pasar
  también una contraseña para el usuario admin. Valor por defecto: `changeme`.

