# Atelier Algolia@Zenika

**Bienvenu à l'atelier Algolia@Zenika! En quelques étapes, vous allez voir comment construire une interface de recherche avec Algolia.**

Vous apprendrez comment : 
- Utiliser Algolia dans votre back-end pour indexer vos données 🚀
- Configurer votre moteur de recherche comme vous l'entendez 🔎
- Construire une interface de recherche en quelques minutes avec instantsearch.js

Nous utiliserons [**Smashing Magazine**](https://www.smashingmagazine.com/) comme projet, en allant d'un simple fichier JSON à l'interface de recherche fonctionnelle.

## Back-end (Étapes 1 et 2)
Dans les deux premières étapes, vous allez **construire la back-end**. Des liens vous guiderons vers la documentation appropriée, et des exemples de code sont à votre disposition si une tache vous bloque.

## Front-end (Étape 3)
Dans la dernière étape, vous allez rajouter l'interface de recherche dans une page du site.
Vous trouverez dans ce projet le code HTML/CSS/JS nécessaire, de sorte qu'il vous suffit de suivre ce readme et de décommenter les blocs de code pour obtenir une interface de recherche fonctionnelle. N'hésitez pas à la personnaliser davantage ! Essayez de faire varier les paramètres et jetez un œil à la [documentation d'instantsearch.js][is-doc] pour voir ce que vous pourriez faire 😉

# Étape 0 : Premiers pas
> *Récupérer les données initiales et vos identifiants*

Pour cet atelier vous avez besoin d'un [compte Algolia](https://www.algolia.com/users/sign_up), des données initiales et du squelette de l'interface front. Ces deux derniers se trouvent dans la branche `master` de ce projet !

- Clonez le projet ou téléchargez [son archive](https://github.com/PLNech/workshop-algolia-zenika/archive/master.zip)
> `git clone git@github.com:PLNech/workshop-algolia-zenika.git`

- Connectez-vous à votre compte Algolia et récupérez vos [identifiants](https://www.algolia.com/api-keys):
  - Votre APPID
  - Votre Admin API Key (for creating/modifying/deleting data)
  - Votre Search-only API Key (for searching in your front-end)

_Dans une application en production, vous éviteriez d'utiliser la clé d'API Admin (elle permet en effet de *TOUT* faire sur votre compte) et utiliseriez plutôt une clé spécifique générée pour l'occasion qui ne pourrait accèder qu'aux données de ce projet. Pour cet atelier vous pouvez utiliser votre clé admin, **à condition de ne pas publier votre code sur internet !**_

# Étape 1 : du JSON à Algolia
> *Charger les données et les pousser dans un index Algolia*

La première étape est de prendre le jeu de données en JSON, de le charger dans votre code et de l'envoyer dans un index Algolia.

- Ajouter Algolia comme dépendence
> **Documentation** | *Getting started*
>  - [Python](https://www.algolia.com/doc/api-client/python/getting-started/#install)
>  - [Java](https://www.algolia.com/doc/api-client/python/getting-started/#install)
>  - [PHP](https://www.algolia.com/doc/api-client/python/getting-started/#install)


- Prendre `articles.json` et le charger dans votre code
> **Documentation** | *Loading JSON*</summary>
> - [Python](https://docs.python.org/3.6/library/json.html)
> - [Java](http://www.oracle.com/technetwork/articles/java/json-1973242.html)
> - [PHP](https://secure.php.net/manual/en/function.json-decode.php)

- Avec vos identifiants, initialisez un client d'API
> **Documentation** | *Initialize the API Client*
>  - [Python](https://www.algolia.com/doc/api-client/python/getting-started/#initialize-the-client)
>  - [Java](https://www.algolia.com/doc/api-client/java/getting-started/#initialize-the-client)
>  - [PHP](https://www.algolia.com/doc/api-client/php/getting-started/#initialize-the-client)

- Créez votre index algolia : `smashing`
> **Documentation** | *Initialize an index*
>  - [Python](https://www.algolia.com/doc/api-client/python/getting-started/#push-data)
>  - [Java](https://www.algolia.com/doc/api-client/java/getting-started/#push-data)
>  - [PHP](https://www.algolia.com/doc/api-client/php/getting-started/#push-data)

- Ajoutez vos objets à l'index
> **Documentation** | *Push data*
>  - [Python](https://www.algolia.com/doc/api-client/python/getting-started/#push-data)
>  - [Java](https://www.algolia.com/doc/api-client/java/getting-started/#push-data)
>  - [PHP](https://www.algolia.com/doc/api-client/php/getting-started/#push-data)

# Étape 2 : Configurer l'index
> *Configurez le moteur avec les bons réglages pour vos données : où chercher, comment trier les résultats, comment les filtrer*

Un moteur de recherche peut être configuré pour de nombreux cas d'utilisations : il faut modifier ses réglages par défaut pour offrir le plus de valeur possible à vos utilisateurs.

Nous allons modifier deux réglages très important : comment le moteur **cherche dans vos données**, et comment les résultats seront **triés**.
Le premier est controllé par `searchableAttributes`, qui liste les attributs de vos objets qui pourraient contenir le terme cherché.
Le deuxième dépend du `customRanking`, qui décrit quels attributs seront utilisés pour trier les résultats.

Par exemple, imaginez que nous avons `searchableAttributes=['title']` and `customRanking=['author', 'publishedDate']`: si l'utilisateur cherche `javascript` et deux articles mentionnent ce terme dans leur `title`, nous les afficherons selon l'ordre alphabétique des auteurs (et si ils ont le même auteur, ils seront triés par ordre croissant des dates de publications.

- Fixez les `searchableAttributes` (ce qui peut être cherché) et le `customRanking` (comment trier les résultats)
> **Documentation** | *Set settings*
>  - [Python](https://www.algolia.com/doc/api-client/python/settings/#set-settings)
>  - [Java](https://www.algolia.com/doc/api-client/java/settings/#set-settings)
>  - [PHP](https://www.algolia.com/doc/api-client/php/settings/#set-settings)

Un autre point important d'une bonne interface de recherche est le **faceting**, une fonctionnalité permettant de répartir vos résultats selon une dimension (par exemple la distribution des téléphones par marque sur Amazon.com). Nous allons ici permettre à l'utilisateur de trier et filtrer les résultats selon les `tags` de nos articles, en utilisant l'attribut `tags.name` pour les différentier.

- Fixez les `attributesForFaceting` (quels attributs peuvent servir à répartir les résultats) pour utiliser le nom des tags :
> **Documentation** | *Get settings*
>  - [Python](https://www.algolia.com/doc/api-client/python/settings/#get-settings)
>  - [Java](https://www.algolia.com/doc/api-client/java/settings/#get-settings)
>  - [PHP](https://www.algolia.com/doc/api-client/php/settings/#get-settings)

# Étape 3 : Intégrez votre moteur de recherche dans la front-end
> *Construire une interface de recherche rapidement avec instantsearch.js*

Pour cette étape, il vous faut :
- Un éditeur pour modifier des fichiers HTML/JS
- Un navigateur pour afficher la page (manuellement ou avec `cd frontend; npm install && npm run serve`

**N'hésitez pas à aller voir la [documentation d'instantsearch.js][is-doc] : chaque widget peut faire bien plus que ce que nous vous montrons ici !**
## Initialisez instantsearch.js avec vos identifiants Algolia 

- Dans `index.js`, décommentez le premier bloc de code et entrez vos identifiants

<details>
 <summary><b>Code</b></summary>
```js
var search = instantsearch({
  appId: 'YOUR_APP_ID',
  apiKey: 'YOUR_SEARCH_API_KEY',
  indexName: 'smashing',
});
```
</details>
## Ajoutez votre premier widget : la [`searchBox`](https://community.algolia.com/instantsearch.js/documentation/#searchbox) pour l'entrée utilisateur

- Dans `index.html`, notez l'élément `<input id="searchbar" />`: nous allons l'utiliser pour notre interface
- Dans `index.js`, décommentez le code qui crée la `searchBox`

<details>
 <summary><b>Code</b></summary>
```js
search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#searchbar',
    placeholder: 'Search for articles',
    autofocus: true,
    poweredBy: true
  })
);
```
</details>

## Ajoutez un deuxième widget pour afficher les résultats : les [`hits`](https://community.algolia.com/instantsearch.js/documentation/#hits)

- Dans `index.js`, décommentez le bloc suivant pour ajouter les `hits` et démarrer la recherche (ce qui va connecter les widgets et afficher les résultats pour une recherche vide)

<details>
 <summary><b>Code</b></summary>
```js
search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits-container',
    hitsPerPage: 20,
    templates: {
      item: `{{title}}`,
      empty: `No results`
    }
  })
);
```
</details>


## Améliorez l'affichage des résultats avec un meilleur template
> *Utiliser un template HTML pour afficher les résultats et un peu de CSS pour les rendre attrayants*

- Dans `index.html`, notez l'élément `<script id="templateSearch-hit" language="x-template">` : nous allons l'utiliser pour enrichir l'affichage de nos résultats
- Dans `index.js`, replacez le template `item` par `document.getElementById("templateSearch-hit").innerHTML`

<details>
 <summary><b>Code</b></summary>
```js
templates: {
  item: document.getElementById("templateSearch-hit").innerHTML,
  empty: `No results`
}
```
</details>

- Dans `index.css`, notez la classe `.search-hits` : nous allons nous en servir pour donner du style à nos résultats
- Dans `index.js`, ajoutez aux `hits` une propriété `cssClasses`: `cssClasses: {root: 'search-hits'}`

<details>
 <summary><b>Code</b></summary>
```js
//templates: {...},
cssClasses: {
  root: 'search-hits'
}
```
</details>

## Enrichissez vos données avant de les afficher 
> *Transformer la donnée pour qu'elle serve davantage à l'utilisateur*

- Dans `index.js`, ajoutez aux `hits` une fonction `transformData` qui va enrichir vos résultats: utilisez la timestamp `publishedDate` pour créer une `date` lisible par un humain, et créez des `comments` pour afficher proprement le nombre de commentaires

<details>
 <summary><b>Code</b></summary>
```js
//cssClasses: {...},
transformData: {
  item: (hit) => {
    // Date dans un format lisible
    hit.date = moment.unix(hit.publishedDate).format('MMMM Do, YYYY');

    // Nombre de commentaires
    if (hit.commentCount > 1) {
      hit.comments = `${hit.commentCount} Comments`;
    } else {
      hit.comments = hit.commentCout === 0 ? null : '1 Comment';
    }
    
    return hit;
  }
}
```
</details>

- Dans `index.html`, éditez le template pour utiliser vos nouveaux attributs (remplacez `commentCount` par `comments` et `publishedDate` par `date`)

<details>
 <summary><b>Code</b></summary>
```html
<script id="templateSearch-hit" language="x-template">
    <div class="search-hit">
      <a href="{{url}}" class="search-hit--figure">
        <img src="{{image}}" class="search-hit--image" />
      </a>
      <div class="search-hit--details">
        <a href="{{url}}" class="search-hit--title">{{title}}</a>
        <ul class="search-hit--infos pmd">
          <li class="search-hit--info search-hit--info__date date rd">{{date}}</li>
          <li class="search-hit--info search-hit--info__author">By <a href="{{authorUrl}}">{{author}}</a></li>
          <li class="search-hit--info search-hit--info__tags tags">
          {{#tags}}<a href="https://www.smashingmagazine.com/tag/{{slug}}/">{{{name}}}</a>{{/tags}}
          </li>
          <li class="search-hit--info search-hit--info__comments comments">{{comments}}</li>
        </ul>
        <p class="search-hit--excerpt">{{description}}</p>
      </div>
    </div>
</script>
```
</details>

## Aidez vos utilisateurs à comprendre les résultats avec le Highlighting (mise en valeur)
> *Mettre en valeur les termes de la recherche dans vos résultats pour les expliquer à l'utilisateur*

[La mise en valeur des résultats de recherche](https://blog.algolia.com/inside-the-algolia-engine-part-5-highlighting-a-cornerstone-to-search-ux/) est l'un des composants clés d'une bonne expérience de recherche. La réponse d'Algolia contient déjà ces *highlights*, il ne reste plus qu'à les afficher !
- Dans `index.html`, modifiez le template pour surligner les `searchableAttributes` dans les résultats: il suffit de remplacer `{{attribut}}` by `{{{_highlightResult.attribut.value}}}` pour chaque attribut cherchable

<details>
 <summary><b>Code</b></summary>
```html
<script id="templateSearch-hit" language="x-template">
    <div class="search-hit">
      <a href="{{url}}" class="search-hit--figure">
        <img src="{{image}}" class="search-hit--image" />
      </a>
      <div class="search-hit--details">
        <a href="{{url}}" class="search-hit--title">{{{_highlightResult.title.value}}}</a>
        <ul class="search-hit--infos pmd">
          <li class="search-hit--info search-hit--info__date date rd">{{date}}</li>
          <li class="search-hit--info search-hit--info__author">By <a href="{{authorUrl}}">{{{_highlightResult.author.value}}}</a></li>
          <li class="search-hit--info search-hit--info__tags tags">
          {{#tags}}<a href="https://www.smashingmagazine.com/tag/{{slug}}/">{{{name}}}</a>{{/tags}}
          </li>
widget to display contextual information*
          <li class="search-hit--info search-hit--info__comments comments">{{comments}}</li>
        </ul>
        <p class="search-hit--excerpt">{{{_highlightResult.description.value}}}</p>
      </div>
    </div>
</script>
```
</details>
## Affichez des statistiques/métadonnées de la recherche
> *Montrer des informations contextuelles avec le widget [`stats`](https://community.algolia.com/instantsearch.js/documentation/#stats)*

- Dans `index.html`, notez l'élément `<div id="stats-container">"` qui va accueillir vos statistiques
- Dans `index.js`, décommentez le bloc suivant pour ajouter le widget `stats`

<details>
 <summary><b>Code</b></summary>
```js
search.addWidget(
  instantsearch.widgets.stats({
    container: '#stats-container',
    cssClasses: {
      root: 'search-stats'
    }
  })
);
```
</details>

## Ajoutez de la pagination à votre interface
> *Utiliser le widget [`pagination`](https://community.algolia.com/instantsearch.js/documentation/#pagination) pour passer d'une page à l'autre*

- Dans `index.html`, notez l'élément `<div id="pagination-container">"` qui contiendra la pagination
- Dans `index.js`, décommentez le bloc suivant pour ajouter le widget `pagination`

<details>
 <summary><b>Code</b></summary>
```js
search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination-container',
    maxPages: 20,
    // par défaut le widget défile jusqu'au 'body', désactivons cette fonctionnalité
    scrollTo: false
  })
);
```
</details>

## Permettre aux utilisateurs de filtrer par tag
> *Utiliser le widget [`refinementList`](https://community.algolia.com/instantsearch.js/documentation/#refinementList) pour afficher un nuage de tags interactif*

- Dans `index.html`, notez l'élément `<div id="tags-container">"` qui va contenir les tags
- Dans `index.js`, décommentez le bloc suivant pour ajouter le widget `refinementList`

<details>
 <summary><b>Code</b></summary>
```js
search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#tags-container',
    attributeName: 'tags.name',
    operator: 'and',
    limit: 10,
    cssClasses: {
      root: 'search-tags',
      header: 'search-tags-header'
    },
    templates: {
      header: 'Tags'
    }
  })
);
```
</details>

## Reflétez l'état de la recherche dans l'URL
> *Permettre de partager un lien vers des résultats de recherche avec [`urlSync`](https://community.algolia.com/instantsearch.js/documentation/#initialization)*

- Dans l'initialisation d'instantsearch, activez l'`urlSync`

<details>
 <summary><b>Code</b></summary>
```js
var search = instantsearch({
  appId: 'YOUR_APP_ID',
  apiKey: 'YOUR_SEARCH_API_KEY',
  indexName: 'smashing',
  urlSync: true
});
```
</details>

# Étape 4 : Aller plus loin

Félicitations pour être arrivé aussi loin ! Vous venez de construire une interface de recherche complètement fonctionnelle, du chargement des données depuis votre back-end à l'affichage de la recherche dans votre front-end 💪

Voilà quelques idées pour aller plus loin avec votre application Algolia :

## Promouvoir certains articles avant les autres résultats

Mettons à jour nos données initiales : chaque article aura maintenant un attribut `promoted`, qui quand il vaut `true` nous afficherons cet article avant les autres résultats.

- Mettez à jour vos articles pour ajouter un attribut `promoted` à chaque article (en le mettant vrai ou faux aléatoirement)
[**Documentation** : *browse*](https://www.algolia.com/doc/api-reference/api-methods/browse/)

Quand vous mettez à jour un objet, le moteur va automatiquement réindexer vos données. La mise à jour et réindexation est atomique : votre front-end va chercher dans les données précédentes puis basculera sur le nouvel i ndex sans interruption de service.

- Modifiez votre `customRanking` pour utiliser d'abord `promoted` dans le tri des résultats.

Une fois ce réglage mis à jour, les articles promus seront toujours affichés avant les autres 👌

## Restraindre ce que vos utilisateurs peuvent voir 

Vous pourriez vouloir cacher aux utilisateurs que certains articles sont promus par rapport aux autres. Vous pouvez le faire en configurant les `unretrievableAttributes`, qui décrivent quels attributs ne seront pas renvoyés dans les résultats de recherche (et ne serviront donc qu'à les trier).

- Réglez les `unretrievableAttributes` sur `promoted` pour enlever cet attribut de la réponse du moteur

[is-doc]: https://community.algolia.com/instantsearch.js/documentation/#widgets)
