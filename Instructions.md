**Welcome to the Algolia Zenika Workshop! This readme will guide you through using Algolia in a few steps.**  
You will learn how to:

- Push your data in Algolia 🚀
- Configure the engine to search the way you like 🔎
- Build a front-end in a few minutes with instantsearch.js ⚡


# Step 0: Get started
> *Get the initial data and your API Credentials*

- Clone the repository or download [its archive](https://github.com/PLNech/workshop-algolia-zenika/archive/master.zip)
> `git clone git@github.com:PLNech/workshop-algolia-zenika.git`

- Connect to your Algolia account and get your [credentials](https://www.algolia.com/api-keys):
  - Your APPID
  - Your Admin API Key (for creating/modifying/deleting data)
  - Your Search-only API Key (for searching in your front-end)

# Step 1: From JSON to Algolia
> *Load the data and push it in an Algolia index*

- Add algolia as a dependency
<details>
 <summary>Documentation</summary>
  - [Python](https://www.algolia.com/doc/api-client/python/getting-started/#install)
  
  - [Java](https://www.algolia.com/doc/api-client/python/getting-started/#install)
  
  - [PHP](https://www.algolia.com/doc/api-client/python/getting-started/#install)
</details>
<details>
 <summary>Code samples</summary>
    - Python   
 
        ```python
        # requirements.txt
        algoliasearch
        ```
    - Java   
 
        ```xml
        <!-- pom.xml -->
        <dependency>
          <groupId>com.algolia</groupId>
          <artifactId>algoliasearch</artifactId>
          <version>[2,]</version>
        </dependency>
        ```
    - PHP   
 
        ```php
        composer require algolia/algoliasearch-client-php
        ```
</details>

- Take `articles.json` and load it in your code
<details>
 <summary>Documentation</summary>
  - [Python](https://docs.python.org/3.6/library/json.html)
  
  - [Java](http://www.oracle.com/technetwork/articles/java/json-1973242.html)
  
  - [PHP](https://secure.php.net/manual/en/function.json-decode.php)
</details>
<details>
 <summary>Code samples</summary>
    - Python   
 
        ```python
        with open("../data/articles.json") as f:
            articles = json.load(f)
            print(json.dumps(articles, indent=4))
        ``` 
    - Java
    
        ```java
        // Using GSON
        BufferedReader br = new BufferedReader(new FileReader("../data/articles.json"));
        List<Article> articles = new Gson().fromJson(br, Article.class);
        ```
    - PHP
    
        ```php
        $batch = json_decode(file_get_contents('../data/articles.json'), true);
        ```
 </details>


- With your credentials, initialize an API client
<details>
 <summary>Documentation</summary>
  - [Python](https://www.algolia.com/doc/api-client/python/getting-started/#initialize-the-client)
  
  - [Java](https://www.algolia.com/doc/api-client/java/getting-started/#initialize-the-client)
  
  - [PHP](https://www.algolia.com/doc/api-client/php/getting-started/#initialize-the-client)
</details>
<details>
 <summary>Code samples</summary>
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
 <summary>Documentation</summary>
  - [Python](https://www.algolia.com/doc/api-client/python/getting-started/#push-data)
  
  - [Java](http://www.oracle.com/technetwork/articles/java/json-1973242.html)
  
  - [PHP](https://secure.php.net/manual/en/function.json-decode.php)
</details>
<details>
 <summary>Code samples</summary>
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
 <summary>Documentation</summary>
  - [Python](https://www.algolia.com/doc/api-client/python/getting-started/#push-data)
  
  - [Java](https://www.algolia.com/doc/api-client/java/getting-started/#push-data)
  
  - [PHP](https://www.algolia.com/doc/api-client/php/getting-started/#push-data)
</details>
<details>
 <summary>Code samples</summary>
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

- Set searchableAttributes (what can be searched) and customRanking (how results should be sorted)
<details>
 <summary>Documentation</summary>
  - [Python](https://www.algolia.com/doc/api-client/python/settings/#set-settings)
  
  - [Java](https://www.algolia.com/doc/api-client/java/settings/#set-settings)
  
  - [PHP](https://www.algolia.com/doc/api-client/php/settings/#set-settings)
</details>
<details>
 <summary>Code samples</summary>
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

- Set attributesForFaceting (which attributes can be filtered on)
<details>
 <summary>Documentation</summary>
  - [Python](https://www.algolia.com/doc/api-client/python/settings/#set-settings)
  
  - [Java](https://www.algolia.com/doc/api-client/java/settings/#set-settings)
  
  - [PHP](https://www.algolia.com/doc/api-client/php/settings/#set-settings)
</details>
<details>
 <summary>Code samples</summary>
    - Python   

        ```python
        res = index.set_settings({
                "attributesForFaceting": ["tags.name"]
        })
        index.wait_task(res['taskID'])
        print("Attributes for faceting: %s." % index.get_settings()['attributesForFaceting'])
        ```
    - Java   
 
        ```java
        // The java client is either sync or async: you would use `algoliasearch-async` in your pom.xml instead
        index.setSettings(new IndexSettings().setAttributesForFaceting(Arrays.asList("tags.name")));
        ```
    - PHP   
 
        ```php
        $res = $index->setSettings(array("attributesForFaceting" => array("tags.name")));
        $index->waitTask($res['taskID']);
        $settings = $index->getSettings();
        var_dump($settings);

        ```
</details>

# Step 3: Integrate your search engine in a front-end 
> *Build a search interface quickly with instantsearch.js*

## Load instantsearch.js with your Algolia credentials

- In `assets/index.js`, uncomment the first code block and replace the placeholders with your credentials

```js
var search = instantsearch({
  appId: 'YOUR_APP_ID',
  apiKey: 'YOUR_SEARCH_API_KEY',
  indexName: 'smashing',
});
```

## Add your first widget: a `searchBox` for user input

- In `index.html`, notice the `<input id="searchbar" />`: we'll use this input for our search
- In `assets/index.js`, uncomment the code that creates the `searchBox` widget:

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

## Add a second widget to display search `hits`

- In `assets/index.js`, uncomment the next code block to add a `hits` widget and start the search:

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

search.start();
```


## Improve the search result display
> *Use a HTML template for displaying the hits and some css to make it pretty*

- In `index.html`, notice the `<script id="templateSearch-hit" language="x-template">` node: we will use this template to enrich the display of our search results
- In `assets/index.js`, replace the item's template by this one:

```js
templates: {
  item: document.getElementById("templateSearch-hit").innerHTML,
  empty: `No results`
}
```

- In `assets/css/index.css`, notice the `.search-hits` class: we'll use it for styling our search results
- In `assets/index.js`, add to the hits widget a `cssClasses` property to the hits widget:

```js
//templates: {...},
cssClasses: {
  root: 'search-hits'
}
```

## Enrich the data before displaying it
> *Transform your data to make it more useful for your users*

- In `assets/index.js`, add to the hits widget a `transformData` function to enrich your search results:

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

- In `index.html`, edit the template to use your new attributes (`comments` instead of `commentCount` and `date` instead of `publishedDate`):

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

## Help your users understand the search results with highlighting
> *Highlight the query terms in your search results to explain them to the user*

- In `index.html`, edit the template to highlight the `searchableAttributes` in the results: simply replace `{{attribute}}` by `{{{_highlightResult.attribute.value}}}`:

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

## Display statistics/metadata about your search
> Use the stats widget to display contextual information

- In `index.html`, notice the `<div id="stats-container">"` which will host your stats
- In `assets/index.js`, uncomment the next code block to add a `stats` widget:

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

## Add pagination to your interface
> *Use the pagination widget to let your user navigate through pages of results*

- In `index.html`, notice the `<div id="pagination-container">"` which will host the pagination
- In `assets/index.js`, uncomment the next code block to add a `pagination` widget:

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

## Let your users filter by tag
> *Use the refinementList widget to display an interactive tag cloud*

- In `index.html`, notice the `<div id="tags-container">"` which will host your tags
- In `assets/index.js`, uncomment the next code block to add a `refinementList` widget:

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

## Reflect the state of the interface in the url
> *Make it possible to share a link to search results with `urlSync`*

- In the instanciation of instantsearch.js, add the `urlSync` attribute:

```js
var search = instantsearch({
  appId: 'YOUR_APP_ID',
  apiKey: 'YOUR_SEARCH_API_KEY',
  indexName: 'smashing',
  urlSync: true
});
```
