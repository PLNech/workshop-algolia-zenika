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
            records = json.load(f)
            print(json.dumps(records, indent=4))
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
        index.add_objects(records)
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
</details>

# Step 3: Front-end

- Activate IS.js: replace with your credentials

- Add Search Bar & Hits (customize or check doc)

- Use template (existent but free to customize)

- Transform data/Highlighting (see function, fiddle if you want)

- Stats / Pagination / Tag cloud (same)

- URLSync (what if reload?)


