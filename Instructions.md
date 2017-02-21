# Intro

# Step 0: Get started

- Clone the repository or download [its archive](https://github.com/PLNech/workshop-algolia-zenika/archive/master.zip)
> `git clone git@github.com:PLNech/workshop-algolia-zenika.git`

- Connect to your Algolia account and locate:
  - Your APPID
  - Your Admin API Key (for creating/modifying/deleting data)
  - Your Search-only API Key (for searching in your front-end)

# Step 1: From JSON to Algolia index

- Take `records.json` and load it in your code
```python
with open("../data/records.json") as f:
    records = json.load(f)
    print(json.dumps(records, indent=4))
```

Cool, now let's push it to algolia!

- Add algolia dependency
> XXX CODE SAMPLES XXX
```python
# requirements.txt
algoliasearch
```

- With your credentials, init client
```python
client = algoliasearch.Client("YOUR_APP_ID", "YOUR_ADMIN_API_KEY")
```

- Create index
```python
index = client.init_index("smashing")
```
- Push data
```python
index.add_objects(records)
```

# Step 2
> These can be done in dashboard too

- Set Searchable attributes and customRanking
-> priority for tie-breaking!
```python
index.set_settings({
    "searchableAttributes": ["title", "description", "tags", "author"],
    "customRanking": ["desc(commentCount)"]
})
```

- Set faceting on tags
```python
res = index.set_settings({
        "attributesForFaceting": ["tags.name"]
})
index.wait_task(res['taskID'])
print("Attributes for faceting: %s." % index.get_settings()['attributesForFaceting'])
```


# Step 3: Front-end

- Activate IS.js: replace with your credentials

- Add Search Bar & Hits (customize or check doc)

- Use template (existent but free to customize)

- Transform data/Highlighting (see function, fiddle if you want)

- Stats / Pagination / Tag cloud (same)

- URLSync (what if reload?)


