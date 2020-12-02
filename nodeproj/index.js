const express = require('express');
const dataUsers = require('./database/users');
const dataCursos = require('./database/cursos');
const dataTiemposInv = require('./database/tiempos');
const dataEntrenamiento = require('./database/entrenamientos');
const md5 = require('md5');
const jwt = require("jsonwebtoken");
const cors = require('cors');

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
  res.send('Hello World!')

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
*  description: defaultDescription
*  version: '0.1'
*  title: defaultTitle
*paths:
*  /login:
*    post:
*      consumes:
*        - application/json
*      produces:
*        - application/json
*      parameters:
*        - in: body
*          name: body
*          required: false
*          schema:
*            $ref: '#/definitions/loginModel'
*          x-examples:
*            application/json: "{\r\n    \"mail\": \"Backend JavaScript\",\r\n    \"link\": \"hola123\"\r\n}"
*      responses:
*        '200':
*          description: Success
*        '403':
*          description: Forbidden
*  /addUser:
*    post:
*      consumes:
*        - application/json
*      produces:
*        - application/json
*      parameters:
*        - in: body
*          name: body
*          required: false
*          schema:
*            $ref: '#/definitions/addUserModel'
*          x-examples:
*            application/json: "{\r\n    \"name\": \"Pruebaman\",\r\n    \"mail\": \"prueba@man.com\",\r\n    \"password\": \"prueba123\"\r\n}"
*      responses:
*        '200':
*          description: Success
*          schema:
*            $ref: '#/definitions/addUserModel'
*  /addCurso:
*    post:
*      consumes:
*        - application/json
*      produces:
*        - application/json
*      parameters:
*        - in: body
*          name: body
*          required: false
*          schema:
*            $ref: '#/definitions/addCursoModel'
*          x-examples:
*            application/json: "{\r\n    \"nombreCurso\": \"Backend JavaScript\",\r\n    \"link\": \"https://platzi.com/backend-javascript/?utm_source=google&utm_medium=cpc&utm_campaign=9581077849&utm_adgroup=93834209210&utm_content=430529219711&&gclid=CjwKCAiAnvj9BRA4EiwAuUMDf5vOkeUr8jm3DJHyTKxhyzX1GwIlOC0PuWNCyjIK7mxbWHuFfNjFXxoCfr8QAvD_BwE&gclsrc=aw.ds\",\r\n    \"descripcion\": \"En los últimos años JavaScript ha avanzado exponencialmente como lenguaje de programación. Como sabemos, JavaScript antes lo usábamos para agregar interacción a nuestras aplicaciones web, es decir, solo era ejecutado e interpretado por el navegador web, pero todo cambió gracias al lanzamiento de Node.js.\\nConoce los fundamentos con el Curso de Fundamentos de JavaScript\"\r\n}"
*      responses:
*        '200':
*          description: Success
*          schema:
*            $ref: '#/definitions/addCursoModel'

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
  console.log('Listening on port 3001!')
})

/////////////////////////INSERT USER/////////////////////////

app.post('/addUser', urlencodedParser, function (req, res) {
  // res.send('welcome, ' + req.body.name);


  dataUsers.addUser(req.body.name, req.body.mail, md5(req.body.password))
  res.send({
    name: req.body.name,
    mail: req.body.mail,
    password: md5( req.body.password ),
    // password: req.body.password,

  });
})


app.get('/v2/addUser/:name/:mail/:password', function (req, res) {

  dataUsers.addUser( req.params.name, req.params.mail, md5(req.params.password))
  res.send({
    name: req.params.name,
    mail: req.params.mail,
    password: md5(req.params.password),
  });
})


/////////////////////////GET USERS/////////////////////////

app.post('/getUsers', verifyToken, urlencodedParser, function (req, res) {

  jwt.verify(req.token, 'secretKey', (error, authData) => {

    if (error) {
      res.sendStatus(403);
    } else {

      /////GETTING USERS//////////
      dataUsers.User.find(function (e, usr) {
        res.send(usr);
        // console.log(usr);
      });
    }
  })
})

// /////////////////////////LOGIN USER/////////////////////////

app.post('/login', urlencodedParser, function (req, res) {

  console.log(req.body.mail,req.body.password );

  dataUsers.User.find({ "correo": req.body.mail, "contraseña": req.body.password }, function (err, usr) {
    if (err) res.status(500).send({ error: err });
    if (usr.length > 0) {
      res.status(200).send;
      // res.send(usr);
      // console.log('si');
      var id = usr[0]._id;

      ////////////////SENDING TOKEN/////////////////
      jwt.sign({ user: req.body.mail }, 'secretKey', (err, token) => {
        // console.log(token, usr);
        res.json({
          token, 
          id
        });
      });
    }
    else {
      res.status(401).send;
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
})

/////////////////////////GET CURSOS/////////////////////////

app.post('/getCursos', verifyToken, urlencodedParser, function (req, res) {

  jwt.verify(req.token, 'secretKey', (error, authData) => {

    if (error) {
      res.sendStatus(403);
    } else {

      /////GETTING USERS//////////
      dataCursos.Curso.find(function (e, cur) {
        res.send(cur);
        // console.log(usr);
      });
    }
  })
})

// /////////////////////////CRUD TIEMPOS/////////////////////////

app.post('/addTiempos', urlencodedParser, function (req, res) {

  dataTiemposInv.addTiempoInv(req.body.nombreUsuario, req.body.tipoCurso, req.body.dias, req.body.horas, req.body.minutos, req.body.nombreCurso ) 
  res.send({
    nombreUsuario: req.body.nombreUsuario,
    tipoCurso: req.body.tipoCurso,
    dias: req.body.dias,
    horas: req.body.horas,
    minutos: req.body.minutos,
    nombreCurso: req.body.nombreCurso,
  });
})

/////////////////////////GET TIEMPOS/////////////////////////

app.post('/getTiempos', verifyToken, urlencodedParser, function (req, res) {

  jwt.verify(req.token, 'secretKey', (error, authData) => {

    if (error) {
      res.sendStatus(403);
    } else {

      /////GETTING USERS//////////
      dataTiemposInv.TiempoInv.find(function (e, tim) {
        res.send(tim);
        // console.log(usr);
      });
    }
  })
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

