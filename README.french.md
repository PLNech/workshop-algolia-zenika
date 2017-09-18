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

# Étape 0: Premiers pas
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

- Add Algolia as a dependency
<details>
 <summary>**Documentation** | *Loading JSON*</summary>
  - [Python](https://www.algolia.com/doc/api-client/python/getting-started/#install)
  - [Java](https://www.algolia.com/doc/api-client/python/getting-started/#install)
  - [PHP](https://www.algolia.com/doc/api-client/python/getting-started/#install)
</details>

----
----


- Take `articles.json` and load it in your code
<details>
 <summary>**Documentation** | *Loading JSON*</summary>
  - [Python](https://docs.python.org/3.6/library/json.html)
  
  - [Java](http://www.oracle.com/technetwork/articles/java/json-1973242.html)
  
  - [PHP](https://secure.php.net/manual/en/function.json-decode.php)
<details>
 <summary>**Code samples**</summary>
    - Python
 
        ```python
        with open("../data/articles.json") as f:
            articles = json.load(f)
            print(json.dumps(articles, indent=4))
        ``` 
    - Java
    
        ```java
        BufferedReader br = new BufferedReader(new FileReader("../data/articles.json"));
        List<Article> articles = com.algolia.search.Defaults.DEFAULT_OBJECT_MAPPER.readValue(br, Article.class);
        ```
    - PHP
    
        ```php
        $batch = json_decode(file_get_contents('../data/articles.json'), true);
        ```
 </details>


- With your credentials, initialize an API client
<details>
 <summary>**Documentation** | *Initialize the API Client*</summary>
  - [Python](https://www.algolia.com/doc/api-client/python/getting-started/#initialize-the-client)
  
  - [Java](https://www.algolia.com/doc/api-client/java/getting-started/#initialize-the-client)
  
  - [PHP](https://www.algolia.com/doc/api-client/php/getting-started/#initialize-the-client)
</details>
<details>
 <summary>**Code samples**</summary>
    - Python
 
        ```python
        client = algoliasearch.Client("YOUR_APP_ID", "YOUR_ADMIN_API_KEY")
        ```
    - Java   
 
        ```java
        APIClient client = new ApacheAPIClientBuilder("YOUR_APP_ID", "YOUR_ADMIN_API_KEY").build();
        ```
    - PHP   
 
        ```php
        $client = new \AlgoliaSearch\Client("YOUR_APP_ID", "YOUR_ADMIN_API_KEY");
        ```
</details>

- Create your algolia index: `smashing`
<details>
 <summary>**Documentation** | *Initialize an index*</summary>
  - [Python](https://www.algolia.com/doc/api-client/python/getting-started/#push-data)
  
  - [Java](https://www.algolia.com/doc/api-client/java/getting-started/#push-data)
  
  - [PHP](https://www.algolia.com/doc/api-client/php/getting-started/#push-data)
</details>
<details>
 <summary>**Code samples**</summary>
    - Python

        ```python
        index = client.init_index("smashing")
        ```
    - Java   
 
        ```java
        Index<Article> index = client.initIndex("smashing", Article.class);
        ```
    - PHP   
 
        ```php
        $index = $client->initIndex('smashing');
        ```
</details>

- Add your objects to the index
<details>
 <summary>**Documentation** | *Push data*</summary>
  - [Python](https://www.algolia.com/doc/api-client/python/getting-started/#push-data)
  
  - [Java](https://www.algolia.com/doc/api-client/java/getting-started/#push-data)
  
  - [PHP](https://www.algolia.com/doc/api-client/php/getting-started/#push-data)
</details>
<details>
 <summary>**Code samples**</summary>
    - Python

        ```python
        index.add_objects(articles)
        ```
    - Java   
 
        ```java
        index.addObjects(articles);
        ```
    - PHP   
 
        ```php
        $index->addObjects($batch);
        ```
</details>

# Step 2: Customizing the index
> *Set the appropriate settings for your data: where to search, how to sort, how to filter*

A search engine can be configured for so many use-cases that you need to customize its default settings if you want to bring as much value as possible to your users.

We'll configure two very important settings: how the engine will search in your data, and how the results will be sorted.  
The former is controlled by `searchableAttributes`, which lists the attributes of your records that could contain search terms.  
The latter depends on `customRanking`, which describes the attributes to use for sorting.  

As an example, imagine we have `searchableAttributes=['title']` and `customRanking=['author', 'publishedDate']`: if the user searches for `javascript` and two articles match in their `title`, we would display them by alphabetical order of author name (and if they have the same author, they will be ordered by increasing publication dates).

- Set searchableAttributes (what can be searched) and customRanking (how results should be sorted)
<details>
 <summary>**Documentation** | *Set settings*</summary>
  - [Python](https://www.algolia.com/doc/api-client/python/settings/#set-settings)
  
  - [Java](https://www.algolia.com/doc/api-client/java/settings/#set-settings)
  
  - [PHP](https://www.algolia.com/doc/api-client/php/settings/#set-settings)
</details>
<details>
 <summary>**Code samples**</summary>
    - Python  

        ```python
        index.set_settings({
            "searchableAttributes": ["title", "description", "tags", "author"],
            "customRanking": ["desc(commentCount)"]
        })
        ```
    - Java   
 
        ```java
        index.setSettings(new IndexSettings()
                              .setSearchableAttributes(Arrays.asList("title", "description", "tags", "author"))
                              .setCustomRanking(Arrays.asList("desc(commentCount)")));
        ```
    - PHP   
 
        ```php
        $index->setSettings(array(
            "searchableAttributes" => array("title", "description", "tags", "author"),
            "customRanking" => array("desc(commentCount)")));
        ```
</details>

- Set attributesForFaceting (which attributes can be filtered on) and confirm the new value
<details>
 <summary>**Documentation** | *Get settings*</summary>
  - [Python](https://www.algolia.com/doc/api-client/python/settings/#get-settings)
  
  - [Java](https://www.algolia.com/doc/api-client/java/settings/#get-settings)
  
  - [PHP](https://www.algolia.com/doc/api-client/php/settings/#get-settings)
</details>
<details>
 <summary>**Code samples**</summary>
    - Python

        ```python
        res = index.set_settings({
                "attributesForFaceting": ["tags.name"]
        })
        index.wait_task(res['taskID']) # as operations are asynchronous, we explicitly wait for task completion
        print("Attributes for faceting: %s." % index.get_settings()['attributesForFaceting'])
        ```
    - Java   
 
        ```java
        index.setSettings(new IndexSettings().setAttributesForFaceting(Arrays.asList("tags.name")))
             .waitForCompletion(); // as operations are asynchronous, we explicitly wait for task completion
        System.out.println(index.getSettings().getAttributesForFaceting());
        ```
    - PHP   
 
        ```php
        $res = $index->setSettings(array("attributesForFaceting" => array("tags.name")));
        $index->waitTask($res['taskID']); // as operations are asynchronous, we explicitly wait for task completion
        $settings = $index->getSettings();
        var_dump($settings['attributesForFaceting']);

        ```
</details>

# Step 3: Integrate your search engine in a front-end 
> *Build a search interface quickly with instantsearch.js*

For this step, you will need:
- an editor for modifying HTML/JS files (any editor is fine)
- a browser to display the page (either by manually opening the html or using `cd frontend; npm install && npm run serve`)

**Don't hesitate to open the [instantsearch.js documentation][is-doc] : you can do a lot more with each widget than what is shown here!**
## Load instantsearch.js with your Algolia credentials

- In `index.js`, uncomment the first code block and replace the placeholders with your credentials

<details>
 <summary>**Code**</summary>
```js
var search = instantsearch({
  appId: 'YOUR_APP_ID',
  apiKey: 'YOUR_SEARCH_API_KEY',
  indexName: 'smashing',
});
```
</details>
## Add your first widget: a [`searchBox`](https://community.algolia.com/instantsearch.js/documentation/#searchbox) for user input

- In `index.html`, notice the `<input id="searchbar" />`: we'll use this input for our search
- In `index.js`, uncomment the code that creates the `searchBox` widget

<details>
 <summary>**Code**</summary>
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

## Add a second widget to display search [`hits`](https://community.algolia.com/instantsearch.js/documentation/#hits)

- In `index.js`, uncomment the next code block to add a `hits` widget and start the search

<details>
 <summary>**Code**</summary>
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


## Improve the search result display with a better template
> *Use a HTML template for displaying the hits and some css to make it pretty*

- In `index.html`, notice the `<script id="templateSearch-hit" language="x-template">` node: we will use this template to enrich the display of our search results
- In `index.js`, replace the item's template by `document.getElementById("templateSearch-hit").innerHTML`

<details>
 <summary>**Code**</summary>
```js
templates: {
  item: document.getElementById("templateSearch-hit").innerHTML,
  empty: `No results`
}
```
</details>

- In `index.css`, notice the `.search-hits` class: we'll use it for styling our search results
- In `index.js`, add to the hits widget a cssClasses property : `cssClasses: {root: 'search-hits'}`

<details>
 <summary>**Code**</summary>
```js
//templates: {...},
cssClasses: {
  root: 'search-hits'
}
```
</details>

## Enrich the data before displaying it
> *Transform your data to make it more useful for your users*

- In `index.js`, add to the hits widget a `transformData` function to enrich your search results: use the `publishedDate` timestamp to create a human-readable `date`, and create a new `comments` attribute to pretty print the number of comments

<details>
 <summary>**Code**</summary>
```js
//cssClasses: {...},
transformData: {
  item: (hit) => {
    // Date in human-readable format
    hit.date = moment.unix(hit.publishedDate).format('MMMM Do, YYYY');

    // Number of comments
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

- In `index.html`, edit the template to use your new attributes (replace `commentCount` by `comments` and `publishedDate` by `date`)

<details>
 <summary>**Code**</summary>
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

## Help your users understand the search results with highlighting
> *Highlight the query terms in your search results to explain them to the user*

[Search result highlighting](https://blog.algolia.com/inside-the-algolia-engine-part-5-highlighting-a-cornerstone-to-search-ux/) is one of the key components of a great search experience. Your search results already include highlighted attributes, you just need to use them in your results template!  
- In `index.html`, edit the template to highlight the `searchableAttributes` in the results: simply replace `{{attribute}}` by `{{{_highlightResult.attribute.value}}}` for each searchable attribute

<details>
 <summary>**Code**</summary>
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
          <li class="search-hit--info search-hit--info__comments comments">{{comments}}</li>
        </ul>
        <p class="search-hit--excerpt">{{{_highlightResult.description.value}}}</p>
      </div>
    </div>
</script>
```
</details>

## Display statistics/metadata about your search
> *Use the [`stats`](https://community.algolia.com/instantsearch.js/documentation/#stats) widget to display contextual information*

- In `index.html`, notice the `<div id="stats-container">"` which will host your stats
- In `index.js`, uncomment the next code block to add a `stats` widget:

<details>
 <summary>**Code**</summary>
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

## Add pagination to your interface
> *Use the [`pagination`](https://community.algolia.com/instantsearch.js/documentation/#pagination) widget to let your user navigate through pages of results*

- In `index.html`, notice the `<div id="pagination-container">"` which will host the pagination
- In `index.js`, uncomment the next code block to add a `pagination` widget:

<details>
 <summary>**Code**</summary>
```js
search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination-container',
    maxPages: 20,
    // default is to scroll to 'body', here we disable this behavior
    scrollTo: false
  })
);
```
</details>

## Let your users filter by tag
> *Use the [`refinementList`](https://community.algolia.com/instantsearch.js/documentation/#refinementList) widget to display an interactive tag cloud*

- In `index.html`, notice the `<div id="tags-container">"` which will host your tags
- In `index.js`, uncomment the next code block to add a `refinementList` widget:

<details>
 <summary>**Code**</summary>
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

## Reflect the state of the interface in the url
> *Make it possible to share a link to search results with [`urlSync`](https://community.algolia.com/instantsearch.js/documentation/#initialization)*

- In the instanciation of instantsearch.js, add the `urlSync` attribute:

<details>
 <summary>**Code**</summary>
```js
var search = instantsearch({
  appId: 'YOUR_APP_ID',
  apiKey: 'YOUR_SEARCH_API_KEY',
  indexName: 'smashing',
  urlSync: true
});
```
</details>

# Step 4: Going further

Congratulations for reaching this far! You just built a fully functional search interface, from the data loading in your back-end to the search display in your front-end 💪  
Here are a few ideas of what else you could do with your Algolia application:

## Promote some articles over the other results

Let's update our initial data: each article will now have a `promoted` attribute, and when`true` we will display this article before the other results.

- Update your articles to add a `promoted` boolean attribute to each article (and randomly set some to `true`)

When you save an edited object, the engine will automatically index again your data. The update and reindexation is atomic: your front-end will search in the previous data until the new index is available, at which point it automatically targets the new data.

- Update your `customRanking` setting to first use `promoted` to sort results 

Once the setting is updated, promoted results will always be displayed before other ones 👌

## Restrict what your users can see

You may want to hide that some articles are promoted over the other ones. This can be done with the `unretrievableAttributes` setting, which lets you specify attributes that won't be returned in the search results (so they will only be used for ranking them).

- Set the `unretrievableAttributes` setting to `promoted` to remove this attribute from the engine's response

## Control what your teammates can access

You just welcomed an intern at your company, which will be doing some development on your application. But you don't want him to mess with your production data... What can you do?

- Create a new collaborator in the [Team tab](https://www.algolia.com/team)

- Choose what features he has access to: by default he will only see the dashboard and search data, but for example cannot change settings or see your analytics

- Click edit restrictions to limit which indices he can access: for example you can use `dev_*` to only give him rights to your `dev_foo`/`dev_bar`/... indices

[is-doc]: https://community.algolia.com/instantsearch.js/documentation/#widgets)
