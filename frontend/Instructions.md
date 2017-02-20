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
> XXX CODE SAMPLES XXX

Cool, now let's push it to algolia!

- Add algolia dependency
> XXX CODE SAMPLES XXX

- With your credentials, init client
> XXX CODE SAMPLES XXX

- Create index
> XXX CODE SAMPLES XXX

- Push data
> XXX CODE SAMPLES XXX

# Step 2
> These can be done in dashboard too

- Set Searchable attributes
-> priority for tie-breaking!

- Set Unretrievable attributes
> Some attrs can be used for searching/ranking, but not displayed

# Step 3: Front-end

- Activate IS.js: replace with your credentials

- Add Search Bar & Hits (customize or check doc)

- Use template (existent but free to customize)

- Transform data/Highlighting (see function, fiddle if you want)

- Stats / Pagination / Tag cloud (same)

- URLSync (what if reload?)


