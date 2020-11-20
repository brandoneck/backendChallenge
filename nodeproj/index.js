console.log("Oh Yeah!")
const express = require('express')
const dataUsers = require('./database/users')
const md5 = require('md5')

//Swagger
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const app = express()

dataUsers.initializeMongo();

app.get('/', function (req, res) {
  res.send('Hello World!')

})


///SWAGGER


// const swaggerOptions = {
//   swaggerDefinition : {
//     info: {
//       title: 'Library API',
//       version: '1.0.0'
//       // description: 'work work work'
//     },
//     apis: ['index.js']
//     // host,
//     // basePath: '/',
//   }
// }
// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// /** 
// *@swagger
// * /books: 
// *   get:
// *     description: Get users
// *     responses:
// *       200:
// *        description: Success
// *
// *
// */


// app.get('/books', (req, res) =>{
//   res.send([
//     {
//       id: 1,
//       title: 'Harry Potter'
//     }
//   ])
// })


/////////////////////////INSERT USER/////////////////////////

app.get('/addUser/:name/:mail/:password', function (req, res) {

  dataUsers.addUser( req.params.name, req.params.mail, md5(req.params.password))
  res.send({
    name: req.params.name,
    mail: req.params.mail,
    password: md5(req.params.password),
  });
})

app.listen(3001, function () {
  console.log('Example app listening on port 3000!')
})


// /////////////////////////LOGIN USER/////////////////////////

app.get('/login/:mail/:password', function (req, res) {

  dataUsers.User.find({"correo": req.params.mail, "contraseña": md5(req.params.password)}, function (err, usr) {

    if (err) res.status(500).send({ error: err });

    if (usr.length > 0) {
      res.status(200).send;
      console.log('si');
      res.send("Success");
    }
    else {
      res.status(401).send;
      console.log('no');
      res.send("Wrong");
    }
    // console.log(usr);
    // res.json(usr);
  })

  // res.send({
  //   mail: req.params.mail,
  //   password: md5(req.params.password),
  // });
  
  // dataUsers.login( req.params.mail, md5(req.params.password))
   
 })



 
