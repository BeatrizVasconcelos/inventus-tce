const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario");
const usuario = require("../models/usuario");

const router = express.Router();

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const usuario = new Usuario({
        email: req.body.email,
        password: hash
      });
      usuario.save()
        .then(result => {
          res.status(201).json({
            message: 'Usuário criado!',
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    });

});

router.post("/login", (req, res, next) => {
  let usuarioAtualizado;
  Usuario.findOne({ email: req.body.email }).then(usuario => {
      if(!usuario) {
        return res.status(401).json({
          message: 'Autenticação falhou.'
        });
      }
      usuarioAtualizado = usuario;
      return bcrypt.compare(req.body.password, usuario.password);
    })
    .then(result => {
      console.log(result);
      if(!result) {
        return res.status(401).json({
          message: 'Autenticação falhou.'
        });
      }
      const token = jwt.sign({email: usuarioAtualizado.email, usuarioId: usuarioAtualizado._id}, "secret_this_should_be_longer",
      {expiresIn: "1h" }
      );
      console.log(token);
      res.status(200).json({
        token: token
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({
        message: 'Autenticação falhou.'
    });
});
});

module.exports = router;
