#!/usr/bin/env python
import json
from algoliasearch import algoliasearch

# Step 1

# Get data
with open("../data/articles.json") as f:
    articles = json.load(f)
    # print(json.dumps(articles, indent=4))

# Init client
client = algoliasearch.Client("YOUR_APP_ID", "YOUR_ADMIN_API_KEY")

# Create index
index = client.init_index("smashing")

# Push data
index.add_objects(articles)


# Step 2

# Set settings: searchable attributes and ranking (async)
index.set_settings({
    "searchableAttributes": ["title", "description", "tags", "author"],
    "customRanking": ["desc(commentCount)"]
})

# Set settings: faceting on tag names (sync)
res = index.set_settings({
    "attributesForFaceting": ["tags.name"]
})
index.wait_task(res['taskID'])
print("Attributes for faceting: %s." % index.get_settings()['attributesForFaceting'])


