(function() {
  console.log('Search built with InstantSearch.js')


var search = instantsearch({
  appId: 'TDNMRH8LS3',
  apiKey: '26b270849a0b8189838581c341ff3b06',
  indexName: 'smashing',
  urlSync: true
});


search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#searchbar',
    placeholder: 'Search for articles',
    autofocus: false,
    poweredBy: true
  })
);


// Search results
search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits-container',
    hitsPerPage: 20,
    templates: {
      item: document.getElementById("templateSearch-hit").innerHTML,
      empty: `No results`
    },
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
  })
);



search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination-container',
    maxPages: 20,
    // default is to scroll to 'body', here we disable this behavior
    scrollTo: false
  })
);



// Tag cloud
search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#tags-container',
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


search.start();
})();
