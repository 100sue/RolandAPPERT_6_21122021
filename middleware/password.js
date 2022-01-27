// Importation  du schéma de password.
// EN vérifiant que le password respecte le schéma.
// si false = avertissement


const pwdSchema = require("../models/password");

module.exports = (req, res, next) => {
  if (!pwdSchema.validate(req.body.password)) {
    res.writeHead(
      400,
      "Mot de passe non valide: min 8 caractères, une majuscule, une minuscule et un chiffre, sans espace.",
      {
        "content-type": "application/json",
      }
    );
    res.end("Le format de votre mot de passe est incorrect");
  } else {
    next();
  }
};