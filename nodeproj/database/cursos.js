const mongoose = require('mongoose');
const DATABASE_CONECTION = 'mongodb://mongo/Challenge';

var cursoSchema = mongoose.Schema({
  nombreCurso: String,
  link: String,
  descripcion: String,
});

Curso = exports.Curso = mongoose.model('Curso', cursoSchema);

exports.initializeMongo = function() {
  mongoose.connect(DATABASE_CONECTION);

  console.log('Trying to connect to ' + DATABASE_CONECTION);

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error: We might not be as connected as I thought'));
  db.once('open', function() {
    // console.log('We are connected you and I!');
    
  });
}

exports.addCurso = function(nombreCurso, link, descripcion) {
  var curso = new Curso({
    nombreCurso: nombreCurso,
    link: link,
    descripcion: descripcion,
  });

  curso.save(function (err, fluffy) {
    if (err) return console.error(err);
    console.log('There is a new curso');
  });
}





