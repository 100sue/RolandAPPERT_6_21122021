## Sixième projet du parcours de développeur web chez OpenClassrooms. ##

L'objectif est la création d'une API sécurisée pour une application d'avis gastronomique dénommée "Piiquante" .

Ce site permet aux utilisateurs de télécharger leurs sauces piquantes préférées, et de "liker" ou de "disliker" les sauces que d'autres partagent.

### Compétences évaluées : ###

- Implémenter un modèle logique de données conformément à la règlementation.

- Mettre en oeuvre des opérations CRUS de manière sécurisée.

- Stocker des données de manière sécurisée.

### Technologie utilisée : ###

## Frontend : ##

Le Frontend (développé à l'aide d'Angular) est fourni dans le projet (repo "ici")

## Back-end : ##

ce projet utilise NodeJS et MongoDB a été choisi pour la base de données. Nous utilisons node.js pour construire le backend et ainsi ajouter les modules nécéssaires .

Les principaux modules de node.js utilisés dans ce projet :

- Express() : Nous utilisons express() pour la configuration du router. Express est un module de node.js et un framework JS. Express permet d'appliquer le CRUD à notre application.

- Mongoose : facilite la communication avec une base de donnée mongoDB ; mongoose est conçu pour node.js dont il est un module. Créer un schéma, appliquer le CRUD avec notre base de donnée, tout est possible avec Mongoose. Utilisation de dotenv pour securiser l'acces a mongoDB.

- Multer : récupère et stocke sur le serveur les fichiers envoyés par les utilisateurs. Ici, il est configuré de manière à stocker dans le dossier images/ les images de sauces proposées par chaque utilisateur.
modules de sécurité sur node.js

- Dotenv : Dotenv permet de travailler avec des variables d'environnement et de sécuriser les mots de passe d'un backend node.js.

- Helmet : Helmet permet a l'application de respecter les recommandations OWASP.

- JWT (JSON Web Tokens) : JWT est un module node.js qui permet de crypter les tokens d'authentification envoyés au client pour authentifier leur session, selon une clé définie par le développeur. Cette clé est généralement stockée dans le fichier .env.

- bcrypt : permet de faire un "hash" du mot de passe du client, de maniere a ce que cette chaine de caractère ne soit pas stockées coté serveur (mais seulement ce hash). Ainsi lorsque l'utilisateur se connecte avec son mot de passe, ce mot de passe est de nouveau haché et comparé au hash du serveur. Si les deux hash viennent du même mot de passe, les hash se reconnaitront.

- Email-validator e

- password-validator

