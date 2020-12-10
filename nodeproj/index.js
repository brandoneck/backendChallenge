const express = require('express');
const dataUsers = require('./database/users');
const dataCursos = require('./database/cursos');
const dataTiemposInv = require('./database/tiempos');
const dataEntrenamiento = require('./database/entrenamientos');
const md5 = require('md5');
const jwt = require("jsonwebtoken");
const cors = require('cors');
// const winston = require('winston');
const logger = require('./utils/logger');

//body parser
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//Swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const app = express();

app.use(cors());

dataUsers.initializeMongo();
// dataCursos.initializeMongo();

app.get('/', function (req, res) {
  res.send('Hello World!');
  logger.info('Server running');

})


// ///////////SWAGGER
const swaggerOptions = {
  swaggerDefinition : {
    info: {
      title: 'API CHALLENGE',
      version: '1.0.0',
      description: 'Documentation of the Challenge'
      }
    },
    apis:  ['index.js'],
    // host,
    // basePath: '/',
  };
const swaggerDocs = swaggerJsDoc(swaggerOptions);
// console.log(swaggerDocs);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


/**
*@swagger
*swagger: '2.0'
*info:
*  description: API Services
*  version: '0.1'
*  title: API Services
*paths:
*
*
*  /login:
*    post:
*      consumes:
*        - application/x-www-form-urlencoded
*      parameters:
*        - in: formData
*          name: mail
*          required: true
*        - in: formData
*          name: password
*          required: true
*          schema:
*            $ref: '#/definitions/loginModel'
*          x-examples:
*            application/x-www-form-urlencoded: "{\r\n    \"mail\": \"batman@batman.com\",\r\n    \"password\": \"9450476b384b32d8ad8b758e76c98a69\"\r\n}"
*      responses:
*        '200':
*          description: Success
*        '403':
*          description: Forbidden
*
*
*  /getUsers:
*    get:
*      consumes:
*        - application/json
*      produces:
*        - application/json
*      responses:
*        '200':
*          description: Success
*
*
*  /getCursos:
*    get:
*      consumes:
*        - application/json
*      produces:
*        - application/json
*      responses:
*        '200':
*          description: Success
*
*
*  /addCurso:
*    post:
*      consumes:
*        - application/x-www-form-urlencoded
*      parameters:
*        - in: formData
*          name: nombreCurso
*          required: true
*        - in: formData
*          name: link
*          required: true
*        - in: formData
*          name: descripcion
*          required: true
*          x-examples:
*            application/json: "{\r\n    \"nombreCurso\": \"Backend JavaScript\",\r\n    \"link\": \"https://platzi.com/backend-javascript/?utm_source=google&utm_medium=cpc&utm_campaign=9581077849&utm_adgroup=93834209210&utm_content=430529219711&&gclid=CjwKCAiAnvj9BRA4EiwAuUMDf5vOkeUr8jm3DJHyTKxhyzX1GwIlOC0PuWNCyjIK7mxbWHuFfNjFXxoCfr8QAvD_BwE&gclsrc=aw.ds\",\r\n    \"descripcion\": \"En los últimos años JavaScript ha avanzado exponencialmente como lenguaje de programación. Como sabemos, JavaScript antes lo usábamos para agregar interacción a nuestras aplicaciones web, es decir, solo era ejecutado e interpretado por el navegador web, pero todo cambió gracias al lanzamiento de Node.js.\\nConoce los fundamentos con el Curso de Fundamentos de JavaScript\"\r\n}"
*      responses:
*        '200':
*          description: Success
*          schema:
*            $ref: '#/definitions/addCursoModel'
*
*
*  /v1/addUser/{name}/{mail}/{password}:
*    get:
*      description: version 1 of add user request
*      parameters:
*        - in: path
*          name: name
*          required: true
*        - in: path
*          name: mail
*          required: true
*        - in: path
*          name: password
*          required: true
*      responses:
*        '200':
*          description: Success
*          content:
*            application/json; charset=utf-8:
*              schema:
*                type: string
*              examples: {}
*      servers:
*        - url: 'http://localhost:3001'
*    servers:
*      - url: 'http://localhost:3001'
*
*
*  /v2/addUser:
*    post:
*      description: version 2 of add user request
*      consumes:
*        - application/x-www-form-urlencoded
*      parameters:
*        - in: formData
*          name: name
*          required: true
*        - in: formData
*          name: mail
*          required: true
*        - in: formData
*          name: password
*          required: true
*      responses:
*        '200':
*          description: Success
*          schema:
*            $ref: '#/definitions/addUserModel'
*        '404':
*          description: Not Found
*        '500':
*          description: Error Internal Server Error
*
*
*  /addTiempos :
*    post:
*      consumes:
*        - application/x-www-form-urlencoded
*      parameters:
*        - in: formData
*          name: nombreUsuario
*          required: true
*        - in: formData
*          name: tipoCurso
*          required: true
*        - in: formData
*          name: dias
*          required: true
*        - in: formData
*          name: horas
*          required: true
*        - in: formData
*          name: minutos
*          required: true
*        - in: formData
*          name: nombreCurso
*          required: true
*        - in: header
*          name: Authorization
*          type: string
*          required: true
*          description: Bearer token
*      responses:
*        '200':
*          description: Success
*        '404':
*          description: Not Found
*        '500':
*          description: Error Internal Server Error
*          schema:
*            $ref: '#/definitions/addUserModel'
*
*
*  /getTiempos:
*    get:
*      consumes:
*        - application/json
*      produces:
*        - application/json
*      responses:
*        '200':
*          description: Success
*
*
* definitions:
*  loginModel:
*    properties:
*      mail:
*        type: string
*      password:
*        type: string
*  addUserModel:
*    properties:
*      name:
*        type: string
*      mail:
*        type: string
*      password:
*        type: string
*
*  addCursoModel:
*    properties:
*      nombreCurso:
*        type: string
*      link:
*        type: string
*      descripcion:
*        type: string
*
*/

app.listen(3001, function () {
  // logger.info('Listening on port 3001!');
})

/////////////////////////INSERT USER/////////////////////////

app.post('/v2/addUser', urlencodedParser, function (req, res) {
  // res.send('welcome, ' + req.body.name);


  dataUsers.addUser(req.body.name, req.body.mail, md5(req.body.password))
  res.send({
    name: req.body.name,
    mail: req.body.mail,
    password: md5( req.body.password ),
    // password: req.body.password,

  });
  logger.info('user added');
})


app.get('/v1/addUser/:name/:mail/:password', function (req, res) {

  dataUsers.addUser( req.params.name, req.params.mail, md5(req.params.password))
  res.send({
    name: req.params.name,
    mail: req.params.mail,
    password: md5(req.params.password),
  });
})


/////////////////////////GET USERS/////////////////////////

// app.post('/getUsers', verifyToken, urlencodedParser, function (req, res) {

//   jwt.verify(req.token, 'secretKey', (error, authData) => {

//     if (error) {
//       logger.info(error);
//       res.sendStatus(403);
//     } else {

//       /////GETTING USERS//////////
//       dataUsers.User.find(function (e, usr) {
//         res.send(usr);
//         // console.log(usr);
//         logger.info('user list be sent');
//       });
//     }
//   })
// })


app.get('/getUsers', urlencodedParser, function (req, res) {

      dataUsers.User.find(function (e, usr) {
        // res.status(200).send(usr);
        // res.status(200);
        res.send(usr).status(200);

        // console.log(usr);
        logger.info('user list sent');
      });
    // }
})

// /////////////////////////LOGIN USER/////////////////////////

app.post('/login', urlencodedParser, function (req, res) {

  // console.log(req.body.mail,req.body.password );

  dataUsers.User.find({ "correo": req.body.mail, "contraseña": md5(req.body.password) }, function (err, usr) {
    if (err){
      res.status(500).send({ error: err });
      logger.info(err);
    } 
    if (usr.length > 0) {
      // res.status(200).send;
      // logger.info(res);
      // res.send(usr);
      // console.log('si');
      var id = usr[0]._id;

      ////////////////SENDING TOKEN/////////////////
      jwt.sign({ user: req.body.mail }, 'secretKey', (err, token) => {
        // console.log(token, usr);
        res.status(200).json({
          token, 
          id
        });
        logger.info('user be logged');
      });
    }
    else {
      // logger.info( JSON.stringify(res) );
      res.status(403).send('Wrong mail or password');
      // console.log(JSON.stringify(err));
      // logger.info('user cannot be logged');
    }
  });
});

/////////////////////TOKEN REQUEST//////////////////
app.post("/posts", verifyToken, (req, res) => {

  jwt.verify(req.token, 'secretKey', (error, authData) => {

    if (error) {
      res.sendStatus(403);
    } else {
      res.json({
        mensaje: "Post fue creado",
        // authData: authData
      });
    }
  })
});


////////////VERIFY TOKEN//////////////
// Authorization: Bearer <token>
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  }
  else {
    //  res.send('no pasa');
    res.sendStatus(403);
  }
}


// /////////////////////////INSERT CURSOS/////////////////////////

app.post('/addCurso', urlencodedParser, function (req, res) {

  dataCursos.addCurso(req.body.nombreCurso, req.body.link, req.body.descripcion, req.body.tipoEntrenamiento )
  res.send({
    nombreCurso: req.body.nombreCurso,
    link: req.body.link,
    descripcion: req.body.descripcion,
    tipoEntrenamiento: req.body.tipoEntrenamiento
  });
  logger.info('curso be added');
})

/////////////////////////GET CURSOS/////////////////////////

app.get('/getCursos', function (req, res) {

  // jwt.verify(req.token, 'secretKey', (error, authData) => {

  //   if (error) {
  //     res.sendStatus(403);
  //   } else {

      /////GETTING USERS//////////
      dataCursos.Curso.find(function (e, cur) {
        res.send(cur).status(200);
        // console.log(usr);
      });
    // }
  // })
})

// /////////////////////////CRUD TIEMPOS/////////////////////////

app.post('/addTiempos', verifyToken, urlencodedParser, function (req, res) {

  // logger.info(req.body.nombreUsuario+', '+req.body.tipoCurso+', '+req.body.dias+', '+req.body.horas+', '+req.body.minutos+', '+req.body.nombreCurso);
  // logger.info(req.token);

  // logger.info(req.token);
  jwt.verify(req.token, 'secretKey', (error, authData) => {
    
    if (error) {
      logger.info(error);
      res.sendStatus(403);
    } else {

      dataTiemposInv.addTiempoInv(req.body.nombreUsuario, req.body.tipoCurso, req.body.dias, req.body.horas, req.body.minutos, req.body.nombreCurso)
      // res.status(200);
      // res.status(200).send('Success');
      // res.sendStatus(200);
      res.send({
        nombreUsuario: req.body.nombreUsuario,
        nombreCurso: req.body.nombreCurso,
        }).status(200);
      // console.log(authData);

        // res.send(authData).status(200);




      logger.info('times sent');

    }
  })
});

/////////////////////////GET TIEMPOS/////////////////////////

app.get('/getTiempos', function (req, res) {

  // jwt.verify(req.token, 'secretKey', (error, authData) => {

  //   if (error) {
  //     res.sendStatus(403);
  //   } else {

      /////GETTING TIEMPOS//////////
      dataTiemposInv.TiempoInv.find(function (e, tim) {
        res.send(tim).status(200);
        // console.log(usr);
        logger.info('time inverted be sent');
      });
  //   }
  // })
})

// /////////////////////////INSERT TIPO ENTRENAMIENTO/////////////////////////
/// Videos
//  Lecturas
//  Ejercicios prácticos
//  Talleres

app.post('/addEntrenamiento', urlencodedParser, function (req, res) {

  dataEntrenamiento.addEntrenamiento(req.body.tipoEntrenamiento, req.body.idCurso )
  res.send({
    tipoEntrenamiento: req.body.tipoEntrenamiento,
    idCurso: req.body.idCurso,
  });
})

module.exports = app;