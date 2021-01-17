const mongoose = require('mongoose');

const conjuntoSchema = mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: { type: String, required: true },
  origem: { type: String, required: false },
  setorEntidadeResponsavel: { type: String, required: false },
  formato: { type: String, required: false },
  conexao: { type: String, required: false },
  abrangenciaTemporal: { type: Date, required: false },
  freqAtt: { type: String, required: false },
  volume: { type: String, required: false },
  volumeAtt: { type: String, required: false },
  sigilo: { type: String, required: false },
  status: { type: String, required: false },
  software: { type: String, required: false },
  armazenamento: { type: String, required: false },
  publicoAlvo: { type: String, required: false },
  dicionarioDeDados: { type: String, required: false },
  acordoDeCooperacao: { type: String, required: false },
  comentarios: { type: String, required: false }
});


module.exports = mongoose.model('Conjunto', conjuntoSchema);
