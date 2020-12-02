const mongoose = require('mongoose');
const DATABASE_CONECTION = 'mongodb://mongo/Challenge';

var tiempoInvSchema = mongoose.Schema({
  nombreUsuario: String,
  tipoCurso: String,
  dias: Number,
  horas: Number, 
  minutos: Number,
  nombreCurso: String,
});

TiempoInv = exports.TiempoInv = mongoose.model('TiempoInv', tiempoInvSchema);

exports.initializeMongo = function() {
  mongoose.connect(DATABASE_CONECTION);

  console.log('Trying to connect to ' + DATABASE_CONECTION);

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error: We might not be as connected as I thought'));
  db.once('open', function() {
    // console.log('We are connected you and I!');
    
  });
}

exports.addTiempoInv = function(nombreUsuario, tipoCurso, dias, horas, minutos, nombreCurso) {
  var tiempoInv = new TiempoInv({
    nombreUsuario: nombreUsuario,
    tipoCurso: tipoCurso,
    dias: dias,
    horas: horas, 
    minutos: minutos,
    nombreCurso: nombreCurso,
  });

  tiempoInv.save(function (err, fluffy) {
    if (err) return console.error(err);
    console.log('There is a new inv time');
  });
}





