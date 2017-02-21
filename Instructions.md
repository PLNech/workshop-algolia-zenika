# Intro

# Step 0: Get started

- Clone the repository or download [its archive](https://github.com/PLNech/workshop-algolia-zenika/archive/master.zip)
> `git clone git@github.com:PLNech/workshop-algolia-zenika.git`

- Connect to your Algolia account and get your [credentials](https://www.algolia.com/api-keys):
  - Your APPID
  - Your Admin API Key (for creating/modifying/deleting data)
  - Your Search-only API Key (for searching in your front-end)

# Step 1: From JSON to Algolia index

- Take `records.json` and load it in your code
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
        with open("../data/records.json") as f:
            articles = json.load(f)
            print(json.dumps(articles, indent=4))
        ```    
 </details>

- Add algolia dependency
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

- With your credentials, init client
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

- Create index
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

- Push data
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

# Step 2
> These can be done in dashboard too

- Set Searchable attributes and customRanking
-> priority for tie-breaking!
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

- Set faceting on tags
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
        $index->setSettings(array("attributesForFaceting" => array("tags.name")));
        ```
</details>

# Step 3: Front-end

- Activate IS.js: replace with your credentials

- Add Search Bar & Hits (customize or check doc)

- Use template (existent but free to customize)

- Transform data/Highlighting (see function, fiddle if you want)

- Stats / Pagination / Tag cloud (same)

- URLSync (what if reload?)


