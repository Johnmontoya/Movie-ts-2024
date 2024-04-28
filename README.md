# App web Peliculas

Proyecto basico con nodejs para peliculas, hecho con typescript, angular y pagos de subscripción con stripe, con jest para pruebas y documentacion con swagger.

#gts
Estructura inicial generada por la libreria GTS
[NPM GTS]
- npx gts init

## TECNOLOGIAS
Usa las siguientes herramientas tecnologicas: 

- [Nodejs]
- [Express]
- [Typescript]
- [Sequelize]
- [Stripe]
- [Yup]
- [Mysql]
- [Nodemailer]
- [Jest]
- [Swagger]

## INSTALACION

MovieTS Es desarrollado con [Node.js](https://nodejs.org/) 20.11+ para funcionar.

Instalar las dependencias y dev Dependecias.
Crear un archivo .env en la raiz de la carpeta backend y agregar su información correspondiente basada en el archivo `.env.example`

Ejecutar npm start

```sh
    cd backend
    npm i
    npm start
```

#### Crear Seed y Ejecutar
```
    npx sequelize-cli db:create
    npx sequelize-cli seed:generate --name demo-user
    npx sequelize-cli db:seed:all
```

#### Test
Para ejecutar los test se debe crear primero la base de datos de prueba agregando un nombre a la variable de entorno DB_DATABASE_TEST del archivo .env
```
    npm run pretest
    npm run db:reset
    npm run test
```

[Nodejs]: <https://nodejs.org/en>
[Express]: <https://expressjs.com/>
[Typescript]: <https://www.typescriptlang.org/>
[Sequelize]: <https://sequelize.org/>
[Stripe]: <https://www.npmjs.com/package/stripe>
[Yup]: <https://www.npmjs.com/package/yup>
[Mysql]: <https://www.mysql.com/>
[Nodemailer]: <https://www.nodemailer.com/>
[Jest]: <https://jestjs.io/>
[Swagger]: <https://swagger.io/>
[NPM GTS]: <https://www.npmjs.com/package/gts>
