const express = require("express");

const Conjunto = require('../models/conjunto');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post(
  "", 
  checkAuth,
  (req, res, next) => {
  const conjunto = new Conjunto({
    id: req.body.id,
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    origem: req.body.origem,
    setorEntidadeResponsavel: req.body.setorEntidadeResponsavel,
    formato: req.body.formato,
    conexao: req.body.conexao,
    abrangenciaTemporal: req.body.abrangenciaTemporal,
    freqAtt: req.body.freqAtt,
    volume: req.body.volume,
    volumeAtt: req.body.volumeAtt,
    sigilo: req.body.sigilo,
    status: req.body.status,
    software: req.body.software,
    armazenamento: req.body.armazenamento,
    publicoAlvo: req.body.publicoAlvo,
    dicionarioDeDados: req.body.dicionarioDeDados,
    acordoDeCooperacao: req.body.acordoDeCooperacao,
    comentarios: req.body.comentarios

  });
  conjunto.save().then(result => {
    res.status(201).json({
      message: 'Conjunto adicionado.',
      conjuntoId: result._id
    });
  });
});


router.put("/:id", 
checkAuth,
(req, res, next) => {
  const conjunto = new Conjunto({
    _id: req.body.id,
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    origem: req.body.origem,
    setorEntidadeResponsavel: req.body.setorEntidadeResponsavel,
    formato: req.body.formato,
    conexao: req.body.conexao,
    abrangenciaTemporal: req.body.abrangenciaTemporal,
    freqAtt: req.body.freqAtt,
    volume: req.body.volume,
    volumeAtt: req.body.volumeAtt,
    sigilo: req.body.sigilo,
    status: req.body.status,
    software: req.body.software,
    armazenamento: req.body.armazenamento,
    publicoAlvo: req.body.publicoAlvo,
    dicionarioDeDados: req.body.dicionarioDeDados,
    acordoDeCooperacao: req.body.acordoDeCooperacao,
    comentarios: req.body.comentarios
  });
  Conjunto.updateOne({_id: req.params.id}, conjunto).then(result => {
    console.log(result);
    res.status(200).json({message: "Atualizado com sucesso!"});
  });
});

router.get("", 
(req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const conjuntoQuery = Conjunto.find();
  let fetchedConjuntos;
  if(pageSize && currentPage){
    conjuntoQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  conjuntoQuery.then(documents => {
    fetchedConjuntos = documents;
    return Conjunto.count();
  })
  .then(count => {
    res.status(200).json({
      message: 'Conjunto adicionado com sucesso',
      conjuntos: fetchedConjuntos,
      maxConjuntos: count
    });
  })
});

router.get("/:id", (req, res, next) => {
  Conjunto.findById(req.params.id).then(conjunto => {
    if (conjunto) {
      res.status(200).json(conjunto);
    } else {
      res.status(404).json({message: 'Conjunto não encontrado!'});
    }
  });
});

router.delete("/:id", checkAuth, (req, res, next) => {
  Conjunto.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: 'Conjunto deletado.'});
  });

});


module.exports = router;
