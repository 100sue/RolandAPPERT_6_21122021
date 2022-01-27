// Importation des npm nécessaires 
// fs veut dire file-system, c'est ce qui nous permet de modifier et/ou supprimer un fichier.

const Sauce = require("../models/sauce");
const fs = require("fs");

// Création de la Sauce :
// body parsé en objet js utilisable.
// La fonction  ...spread permet de récupèrer toutes les infos du body .
// On  va récupèrer dynamiquement l'URL de l'image dans un AltGr + 7.
      /*    ${req.protocol} = http ou https
            ${req.get('host')} = host du serveur (ex: localhost)
            /images/ = dossier images
            ${req.file.filename} = nom de l'image
      */
// Départ des likes et des dilikes à 0.
// Puis, sauvegarde de la sauce dans la BDD.


exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      likes: 0, 
      dislikes: 0, 
    });
    sauce
      .save() 
      .then(() => res.status(201).json({message: "La sauce a bien été créée !"}))
      .catch(error => res.status(400).json({error}));
      console.log("voici la bonne sauce créée", sauce);
  };


  
// Affichage de toutes les sauces :
// Request : retrouver tout et res : promesse ok  (statut 200).

exports.getAllSauces = (req, res, next) => {
    Sauce.find() // request : retrouver tout
      .then(sauces => res.status(200).json(sauces)) 
      .catch(error => res.status(400).json({error}));
  };



// Affichage d'une sauce :
// retrouver un élément par son id.
// res : promesse ok (statut 200).

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
      .then(sauce => res.status(200).json(sauce)) 
      .catch(error => res.status(404).json({error}));
  };



// Modification d'une sauce :
// Si la request concerne le changement de l'image : on trouve la sauce concernée par son id.
// Suppression de son image et on supprime le lien entre l'ancienne image et la sauce en question.
// Puis, on met à jour le reste du "body".
// Et, on met à jour la sauce avec sa nouvelle image.
// Si la modif n'a pas été portée sur l'image : alors, on récupére le contenu du "body" et on met à jour la sauce concernée.

exports.modifySauce = (req, res, next) => {
  if (req.file) { 
    Sauce.findOne({_id: req.params.id}) 
      .then(sauce => {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          const sauceObject = {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
          };
          Sauce.updateOne(
            {_id: req.params.id},
            {...sauceObject, _id: req.params.id}
          )
            .then(() => res.status(200).json({message: "la sauce a bien été modifiée !"}))
            .catch(error => res.status(400).json({error}));
        });
      })
      .catch(error => res.status(500).json({error}));
  }
  else { 
    const sauceObject = {...req.body}; 
    Sauce.updateOne( 
      {_id: req.params.id},
      {...sauceObject, _id: req.params.id}
    )
      .then(() => res.status(200).json({message: "la sauce a bien été modifiée !"}))
      .catch(error => res.status(400).json({error}));
  }
};


// Suppression d'une sauce :
// On récupére l'imageUrl retournée par la BDD, stockée dans "images" qu'on peut split étant donné qu'elle est entre deux chemins.
// Split va retourner deux éléments dans un tableau :
//  xxxAxxx/images/xxxBxxx et on s'intéressera au nom du fichier, donc le deuxieme élément : (B), d'où le [1] à la fin .
// Puis, fonction pour supprimer l'image dans le système et ensuite l'id correspondant.

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
  .then(sauce => {
    const filename = sauce.imageUrl.split("/images/")[1];
    fs.unlink(`images/${filename}`, () => {
      Sauce.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({message: "La sauce a bien été supprimée !"}))
        .catch(error => res.status(400).json({error}));
    });
  })
  .catch(error => res.status(500).json({error}));
};



// Lke ou dislike d'une sauce :
// On récupère l'id du user, l'id de la sauce et le like .
// Puis, on récupère les valeurs de like et de dislike .
// On  va essayer plusieurs scénarios possibles avec la loop switch .
// on push si le user fait un like ou un dislike.
// Valeur par défaut, zéro like/dislike :
// Et/ou si le user annule son like ou son dislike .
// Pui, on calcule le nombre de likes et dislikes et on affiche la sauce avec les nouvelles valeurs .

exports.likeSauce = (req, res, next) => {
  const userId = req.body.userId;
  const sauceId = req.params.id;
  const like = req.body.like;
  
  Sauce.findOne({_id: sauceId})
    .then(sauce => {
      const values = {
        usersLiked: sauce.usersLiked,
        usersDisliked: sauce.usersDisliked,
        likes: 0,
        dislikes: 0,
      };
      switch (like) {
        case 1: 
        values.usersLiked.push(userId);
          break;
        case -1: 
        values.usersDisliked.push(userId);
          break;
        case 0:
          if (values.usersLiked.includes(userId)) { 
            const index = values.usersLiked.indexOf(userId);
            values.usersLiked.splice(index, 1);
          } else { 
            const index = values.usersDisliked.indexOf(userId);
            values.usersDisliked.splice(index, 1);
          }
          break;
      }
      values.likes = values.usersLiked.length;
      values.dislikes = values.usersDisliked.length;
      Sauce.updateOne({_id: sauceId}, values)
        .then(() => res.status(200).json({message: "La sauce a bien été notée !"}))
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};