// Import d'express afin de créer des applis web avec Node.
// Import mongoose afin de faciliter les intéractions avec la bdd mongoDB.
// Import de dotenv afin de protéger les informations de connexion vers la BDD.
// Import de path afin de  pouvoir travailler avec les chemins des fichiers.
// Import de helmet afin de sécuriser les en-tête http de l'application express.
// Import de sanitize afin de nettoyer les données fournies par l'utilisateur pour empêcher l'injection d'opérateur MongoDB.

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
const helmet = require("helmet");
const sanitize = require("express-mongo-sanitize");


// Pour les routes vers l'utilisateur et les sauces :

const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");

// Connection à la BDD :

mongoose
  .connect(process.env.DB_CODE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à la BDD réussie !"))
  .catch(() => console.log("Connexion à la BDD échouée !"));

// Appel au module Express avec sa fonction

const app = express();

// Avant la route d'API, on ajoute la fonction (middleware) des headers permettant aux deux ports front et end de communiquer entre eux.
// "*" permet d'accéder a l'API depuis n'importe quelle origine
// Et, autorisation d'utiliser certains headers sur l'objet requête

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); 
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  ); 
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  ); 
  next(); 
});

// Je récupère le body en front sur l'objet request et "parse" le corps de la requête en objet json .
// Et, je protège l'appli de certaines vulnerabilités en protégeant les en-têtes.
// Nettoyage des données "user" pour éviter des injections dans la BDD.

app.use(express.json());
app.use(helmet());
app.use(sanitize());

// Configuration des routes d'API :

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

// Exportation du module afin de pouvoir le réutiliser.

module.exports = app;