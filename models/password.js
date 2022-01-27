// Password-validator afin de valider certains critères sur le mot de passe.
// Critères pour le mot de passe
// Minimun 8 caractères, maximum 15 caractères, avec au moins une majuscule et une minuscule, 
// Et au moins un chiffre et ne contenant aucun espace .

const pwdValidator = require("password-validator");
const pwdSchema = new pwdValidator();
pwdSchema
  .is().min(8) 
  .is().max(15) 
  .has().uppercase() 
  .has().lowercase() 
  .has().digits() 
  .has().not().spaces(); 

module.exports = pwdSchema;