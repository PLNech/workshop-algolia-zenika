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

- Activate IS.js: replace with your credentials

- Add Search Bar & Hits (customize or check doc)

- Use template (existent but free to customize)

- Transform data/Highlighting (see function, fiddle if you want)

- Stats / Pagination / Tag cloud (same)

- URLSync (what if reload?)


