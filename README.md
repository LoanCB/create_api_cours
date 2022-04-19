# Projet API B2 ESGI 

## Serveur
Installer les librairies nécessaires pour le projet grâce au fichier package.json <br>
Lancer le serveur via la commande suivante : `node --experimental-json-modules index.js`


## Documentation
Vous pouvez retrouver la documentation sur le serveur à cette adresse : http://localhost:5000/documentation 
(elle est générée grâce à swagger via le fichier swagger.json) <br>
Vous pouvez effectuer vos tests via ce postman : https://www.getpostman.com/collections/d16e3867942f373be93d (il faut importer le lien sur l'application)

## Autorisations
Certaines routes nécessite un Bearer token. Il suffit simplement de le placer dans les autorisations du dossier
articles en remplacement celui expiré
