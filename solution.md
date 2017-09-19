
# Étape 1 : du JSON à Algolia

## Ajouter Algolia comme dépendence

<details>
<summary><b>Python</b></summary>
 
```python
# requirements.txt
algoliasearch
```
</details>
<details>
 <summary><b>Java</b></summary>   
 
```xml
<!-- pom.xml -->
<dependency>
  <groupId>com.algolia</groupId>
  <artifactId>algoliasearch</artifactId>
  <version>[2,]</version>
</dependency>
```
</details>
<details>
<summary><b>PHP</b></summary>      

```php
composer require algolia/algoliasearch-client-php
```
</details>

## Prendre `articles.json` et le charger dans votre code

<details>
<summary><b>Python</b></summary>   

```python
with open("../data/articles.json") as f:
articles = json.load(f)
print(json.dumps(articles, indent=4))
``` 
</details>
<details>
<summary><b>Java</b></summary>   

```java
BufferedReader br = new BufferedReader(new FileReader("../data/articles.json"));
articles = com.algolia.search.Defaults.DEFAULT_OBJECT_MAPPER.readValue(br, new TypeReference<List<Article>>(){});
```

</details>
<details>
<summary><b>PHP</b></summary>   

```php
$batch = json_decode(file_get_contents('../data/articles.json'), true);
```
</details>

## Avec vos identifiants, initialisez un client d'API

<details>
<summary><b>Python</b></summary>   

```python
client = algoliasearch.Client("YOUR_APP_ID", "YOUR_ADMIN_API_KEY")
```
</details>
<details>
<summary><b>Java</b></summary>      

```java
APIClient client = new ApacheAPIClientBuilder("YOUR_APP_ID", "YOUR_ADMIN_API_KEY").build();
```
</details>
<details>
<summary><b>PHP</b></summary>      

```php
$client = new \AlgoliaSearch\Client("YOUR_APP_ID", "YOUR_ADMIN_API_KEY");
```
</details>

## Créez votre index algolia : `smashing`
<details>
<summary><b>Python</b></summary>   

```python
index = client.init_index("smashing")
```
</details>
<details>
<summary><b>Java</b></summary>      

```java
Index<Article> index = client.initIndex("smashing", Article.class);
```
</details>
<details>
<summary><b>PHP</b></summary>      

```php
$index = $client->initIndex('smashing');
```
</details>

## Ajoutez vos objets à l'index

<details>
<summary><b>Python</b></summary>   

```python
index.add_objects(articles)
```
</details>
<details>
<summary><b>Java</b></summary>      

```java
index.addObjects(articles);
```
</details>
<details>
<summary><b>PHP</b></summary>      

```php
$index->addObjects($batch);
```
</details>

# Étape 2 : Configurer l'index

## Réglez les `searchableAttributes` (ce qui peut être cherché) et le `customRanking` (comment trier les résultats)
<details>
<summary><b>Python</b></summary>     

```python
index.set_settings({
    "searchableAttributes": ["title", "description", "tags", "author"],
    "customRanking": ["desc(commentCount)"]
})
```
</details>
<details>
<summary><b>Java</b></summary>      

```java
index.setSettings(new IndexSettings()
                      .setSearchableAttributes(Arrays.asList("title", "description", "tags", "author"))
                      .setCustomRanking(Arrays.asList("desc(commentCount)")));
```
</details>
<details>
<summary><b>PHP</b></summary>      

```php
$index->setSettings(array(
    "searchableAttributes" => array("title", "description", "tags", "author"),
    "customRanking" => array("desc(commentCount)")));
```
</details>

## Réglez les `attributesForFaceting` (quels attributs peuvent servir à répartir les résultats) pour utiliser le nom des tags :
<details>
<summary><b>Python</b></summary>   

```python
res = index.set_settings({
        "attributesForFaceting": ["tags.name"]
})
index.wait_task(res['taskID']) # as operations are asynchronous, we explicitly wait for task completion
print("Attributes for faceting: %s." % index.get_settings()['attributesForFaceting'])
```
</details>
<details>
<summary><b>Java</b></summary>      

```java
index.setSettings(new IndexSettings().setAttributesForFaceting(Arrays.asList("tags.name")))
     .waitForCompletion(); // as operations are asynchronous, we explicitly wait for task completion
System.out.println(index.getSettings().getAttributesForFaceting());
```
</details>
<details>
<summary><b>PHP</b></summary>      

```php
$res = $index->setSettings(array("attributesForFaceting" => array("tags.name")));
$index->waitTask($res['taskID']); // as operations are asynchronous, we explicitly wait for task completion
$settings = $index->getSettings();
var_dump($settings['attributesForFaceting']);

```
</details>
