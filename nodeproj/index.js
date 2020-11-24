const express = require('express');
const dataUsers = require('./database/users');
const dataCursos = require('./database/cursos');
const md5 = require('md5');
const jwt = require("jsonwebtoken");

//body parser
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//Swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const app = express();

dataUsers.initializeMongo();
// dataCursos.initializeMongo();

app.get('/', function (req, res) {
  res.send('Hello World!')

})


// ///////////SWAGGER
const swaggerOptions = {
  swaggerDefinition : {
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'Documentation of API of the Challenge'
      }
    },
    apis:  ['index.js'],
    // host,
    // basePath: '/',
  };
const swaggerDocs = swaggerJsDoc(swaggerOptions);
console.log(swaggerDocs);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/** 
* @swagger
* /addUser: 
*   post:
*     summary: Creates a new user
*       
*     responses:
*       200:
*        description: Success
*
*/


/////////////////////////INSERT USER/////////////////////////

app.post('/addUser', urlencodedParser, function (req, res) {
  // res.send('welcome, ' + req.body.name);


  dataUsers.addUser(req.body.name, req.body.mail, md5(req.body.password))
  res.send({
    name: req.body.name,
    mail: req.body.mail,
    // password: md5( req.body.password ),
    password: req.body.password,

  });
})

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})


// /////////////////////////LOGIN USER/////////////////////////

app.post('/login', urlencodedParser, function (req, res) {

  dataUsers.User.find({ "correo": req.body.mail, "contraseña": md5( req.body.password) }, function (err, usr) {
    if (err) res.status(500).send({ error: err });
    if (usr.length > 0) {
      res.status(200).send;
      // console.log('si');

      ////////////////SENDING TOKEN/////////////////
      jwt.sign({ user: req.body.mail }, 'secretKey', (err, token) => {
        res.json({
          token
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

  dataCursos.addCurso(req.body.nombreCurso, req.body.link, req.body.descripcion )
  res.send({
    name: req.body.nombreCurso,
    mail: req.body.link,
    password: req.body.descripcion,
  });
})
