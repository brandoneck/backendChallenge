const mongoose = require('mongoose');

var cursoSchema = mongoose.Schema({
  nombreCurso: String,
  link: String,
  descripcion: String,
  tipoEntrenamiento: String,
});

Curso = exports.Curso = mongoose.model('Curso', cursoSchema);



exports.addCurso = function(nombreCurso, link, descripcion, tipoEntrenamiento) {
  var curso = new Curso({
    nombreCurso: nombreCurso,
    link: link,
    descripcion: descripcion,
    tipoEntrenamiento: tipoEntrenamiento
  });

  curso.save(function (err, fluffy) {
    if (err) return console.error(err);
    console.log('There is a new curso');
  });
}





