# Timeline

# Presentation
- Concepts
- Ranking: high-level idea
- Infra/Reliability/Perfs
- Features: typo/synonyms/plurals/highlighting...

## Step 0: Get instructions and data
Ensure:
  - got instructions
  - has Algolia account
  - clone repo or get archive

## Step 1: Parse data and upload to Algolia
- New project
- get JSONObject

- Algolia dependency
- Algolia credentials
> Secured API Key feature, users, A#CL
> Async yet realtime
- New Index
- Push data

## Step 2: Set settings
- Searchable attributes
> Tie breaking algorithm

- Faceting on tags.name

- Unretrievable attributes
> SetSettings triggers reindex, nothing else to do (no repush data, no reindex)

## Step 3: Front-end
- Activate IS.js
- Add Search Bar & Hits
- Use template
- Transform data/Highlighting
- Stats / Pagination / Tag cloud
- URLSync

## Step 4: Go further
- Bonus ideas?
- Projects/demos to explore?
