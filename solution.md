
# Étape 1 : du JSON à Algolia

- Ajouter Algolia comme dépendence
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

- Prendre `articles.json` et le charger dans votre code
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

- Avec vos identifiants, initialisez un client d'API
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

- Créez votre index algolia : `smashing`
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

- Ajoutez vos objets à l'index
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

# Étape 2 : Configurer l'index

- Réglez les `searchableAttributes` (ce qui peut être cherché) et le `customRanking` (comment trier les résultats)
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

- Réglez les `attributesForFaceting` (quels attributs peuvent servir à répartir les résultats) pour utiliser le nom des tags :
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
