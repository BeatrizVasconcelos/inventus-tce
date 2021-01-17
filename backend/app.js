const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const conjuntosRoutes = require("./routes/conjuntos");
const userRoutes = require("./routes/usuarios");


const app = express();

mongoose.connect(
  'mongodb://localhost:27017/conjuntos')
.then(() => {
  console.log('Conectado ao banco de dados');
})
.catch(() => {
  console.log('Conexão falhou');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/conjuntos", conjuntosRoutes);
app.use("/api/usuarios", userRoutes);


module.exports = app;
