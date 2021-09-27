# ORINOCO

### Pré-requis

Lien gitHub backend à télécharger :

https://github.com/OpenClassrooms-Student-Center/JWDP5.git

Pré-requis [npm install :](https://nodejs.org/fr/)

Lancer windows PowerShell ou autre invité de commande  
 Exemple :

`PS C:\Users\....> cd C:\Users\....\JWDP5-master`  
 `PS C:\Users\.....\JWDP5-master> node server`  
 `Listening on port 3000`

### Construire un site e-commerce

#### Architecture générale

L’application web sera composée de 4 pages :

- une page de vue sous forme de liste, montrant tous les articles disponibles
  à la vente ;
- une page “produit”, qui affiche de manière dynamique l'élément
  sélectionné par l'utilisateur et lui permet de personnaliser le produit et de
  l'ajouter à son panier ;
- une page “panier” contenant un résumé des produits dans le panier, le prix
  total et un formulaire permettant de passer une commande. Les données
  du formulaire doivent être correctes et bien formatées avant d'être
  renvoyées au back-end. Par exemple, pas de texte dans les champs date ;
- une page de confirmation de commande, remerciant l'utilisateur pour sa
  commande, et indiquant le prix total et l'identifiant de commande envoyé
  par le serveur.

#### Informations complémentaires

Pour le MVP, la personnalisation du produit ne sera pas fonctionnelle : la page
contenant un seul article aura un menu déroulant permettant à l'utilisateur de
choisir une option de personnalisation, mais celle-ci ne sera ni envoyée au serveur
ni reflétée dans la réponse du serveur.
Le code source devra être indenté et utiliser des commentaires. Il devra
également utiliser des fonctions globales.
Concernant l’API, des promesses devront être utilisées pour éviter les rappels.
Les inputs des utilisateurs doivent être validés avant l’envoi à l’API.

#### Technologies utilisées

HTML, CSS, JavaScript.

#### URL des API

● Caméras vintage : http://localhost:3000/api/cameras

#### Validation des données

Pour les routes POST, l’objet contact envoyé au serveur doit contenir les champs
firstName, lastName, address, city et email. Le tableau des produits envoyé au
backend doit être un array de strings product_id. Les types de ces champs et leur
présence doivent être validés avant l’envoi des données au serveur.
