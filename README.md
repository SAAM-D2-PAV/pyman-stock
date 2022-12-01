# GDP | PYMAN STOCK 
## Gestion du stock audiovisuel 
> version Alpha - 2022211
<br/></br>
Pyman stock est une application développée par le pôle audiovisuel du SAAM D2 (service de l'action administrative et des moyens) de l'administration centrale. https://www.education.gouv.fr/service-de-l-action-administrative-et-des-moyens-saam-6818

Le service de l'action administrative et des moyens assure la gestion administrative, logistique et financière de l'administration centrale. Il contribue au fonctionnement des services administratifs du ministère de l'éducation nationale, de l'enseignement supérieur et de la recherche.


## Installation

```sh
git clone git@github.com:SAAM-D2-PAV/pyman-stock.git
```

```sh
touch .env
```
puis ajouter les variables suivantes au fichier .env :
```sh
REACT_APP_URL=https://localhost:8000/ -> lien API
REACT_APP_CONNEXION_URL=https://localhost:8000/api/login_check -> lien de connexion API
```
```sh
npm install
```


### `npm start`


Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `Comment ça fonctionne ?`
Grâce à https://www.npmjs.com/package/@ericblade/quagga2 🤘
<ul>
 <li>
    1 - Naviguer dans l'onglet tâches. ⛵
</li>
<li>
    2 - Rechercher une tâche par son intitulé. 👀
</li>
<li>
    3 - Selectionner  <em>"Sortie"</em>. 🛫
</li>
<li>
    4 - Scanner le code barres ou taper le numéro du matériel pour l'ajouter à la tâche, le nom s'affiche et est ajouté automatiquement. ✅
</li>
<li>
    5 - Procéder de même pour tout le matériel. ➿
</li>
<li>6 - Voilà c'est terminé, bye. &#128526;</li>
</ul>