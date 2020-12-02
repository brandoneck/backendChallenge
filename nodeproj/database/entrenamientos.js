const mongoose = require('mongoose');

var entrenamientoSchema = mongoose.Schema({
//   nombreCurso: String,
  tipoEntrenamiento: String,
  idCurso: String,
});

Entrenamiento = exports.Curso = mongoose.model('Entrenamiento', entrenamientoSchema);



exports.addEntrenamiento = function(tipoEntrenamiento, idCurso) {
  var entrenamiento = new Entrenamiento({
    tipoEntrenamiento: tipoEntrenamiento,
    idCurso: idCurso,
  });

  entrenamiento.save(function (err, fluffy) {
    if (err) return console.error(err);
    console.log('There is a new tipo entrenamiento');
  });
}





