// -------------------------
//        STEP 0
// -------------------------

Initial version

// -------------------------
//        STEP 1
// -------------------------

let search = instantsearch({
  appId: 'KHKP14DMQR',
  apiKey: '58f74646af37a47dcd4e8914e2382917',
  indexName: 'smashing'
});

// From Docsearch

// Search bar
search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#searchbar',
    placeholder: 'Search in all Smashing posts',
    wrapInput: false
  })
);

// Search results
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


// -------------------------
//        STEP 2
// -------------------------

# Replace used template
document.getElementById('templateSearch-hit').innerHTML

# Add the class
cssClasses: {
  root: 'search-hits'
},

// -------------------------
//        STEP 3
// -------------------------

# Enrich displayed content
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

{{date}}
{{comments}}

# Add Highlighing
{{{_highlightResult.title.value}}}
{{{_highlightResult.author.value}}}
{{{_highlightResult.description.value}}}


// -------------------------
//        STEP 4
// -------------------------

// Add stats
search.addWidget(
  instantsearch.widgets.stats({
    container: '#search-stats',
    cssClasses: {
      root: 'search-stats'
    }
  })
);

// Pagination
search.addWidget(
  instantsearch.widgets.pagination({
    container: '#search-pagination',
    scrollTo: false,
    cssClasses: {
      root: 'search-pagination'
    }
  })
);

// Tag cloud
search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#search-tags',
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


// -------------------------
//        EXTRA
// -------------------------
urlSync: true
