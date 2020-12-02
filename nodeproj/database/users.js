const mongoose = require('mongoose');
const DATABASE_CONECTION = 'mongodb://mongo/Challenge';
const md5 = require('md5')

var userSchema = mongoose.Schema({
  nombre: String,
  correo: String,
  contraseña: String,
  cursos: Array,
});

User = exports.User = mongoose.model('User', userSchema);

exports.initializeMongo = function() {
  mongoose.connect(DATABASE_CONECTION);

  console.log('Trying to connect to ' + DATABASE_CONECTION);

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error: We might not be as connected as I thought'));
  db.once('open', function() {
    console.log('We are connected you and I!');
    
  });
}

exports.addUser = function(name, mail, password) {
  var user = new User({
    nombre: name,
    correo: mail,
    contraseña: password,
  });

  user.save(function (err, fluffy) {
    if (err) return console.error(err);
    console.log('There is a new user');
  });
}


exports.getUser = function() {
  
  DATABASE_CONECTION.collection('users').find().toArray(function(e, d) {
    console.log(d.length);
    db.close();
});
}







//////////////////LOGIN/////////////////////



var loginSchema = mongoose.Schema({
  correo: String,
  contraseña: String
});

Login = exports.Login = mongoose.model('Login', loginSchema);


// exports.login = function(mail, password) {
//   var loginss = new User({
//     correo: mail,
//     contraseña: password,
//   });

  // db.find({ correo: loginss.correo, contraseña: loginss.contraseña }, function() {
  //   console.log('User exists!');
    
  // });

  // user.find(function (err, {correo: correo, contraseña: contraseña}) {
  //   if (err) res.status(500).send({ error: err });
  //   console.log(kittens);
  //   res.json(kittens);
  // })

  

  // user.find( {correo: correo, contraseña: contraseña }, function (err, fluffy) {
  //   if (err) return console.error(err);
  //   console.log('There is a new user');
  // });
// }