(function() {
  console.log('Search built with InstantSearch.js');

// 3.1: Load Algolia with your credentials
/*
var search = instantsearch({
  appId: 'YOUR_APP_ID',
  apiKey: 'YOUR_SEARCH_API_KEY',
  indexName: 'smashing',
  urlSync: true
});
*/

// 3.2: Add a SearchBox for user input
/*
search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#searchbar',
    placeholder: 'Search for articles',
    autofocus: false,
    poweredBy: true
  })
);
*/

// 3.3: Display search results and start search
// /!\ COMMENT AGAIN THIS CODE BLOCK BEFORE UNCOMMENTING THE NEXT ONE /!\
/*
search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits-container',
    hitsPerPage: 10,
    templates: {
      item: `{{title}}`,
      empty: `No results`
    }
  })
);
*/

// 3.4: Improved display of search results
// /!\ COMMENT AGAIN THIS CODE BLOCK BEFORE UNCOMMENTING THE NEXT ONE /!\
/*
search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits-container',
    hitsPerPage: 10,
    templates: {
      item: document.getElementById("templateSearch-hit").innerHTML,
      empty: `No results`
    },
    cssClasses: {
      root: 'search-hits'
    }
  })
);
*/

// 3.5: Transform data in search results
/*
search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits-container',
    hitsPerPage: 10,
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
*/


//3.6: Add statistics
/*
search.addWidget(
  instantsearch.widgets.stats({
    container: '#stats-container',
    cssClasses: {
      root: 'search-stats'
    }
  })
);
*/

//3.7: Add pagination
/*
search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination-container',
    maxPages: 20,
    // default is to scroll to 'body', here we disable this behavior
    scrollTo: false
  })
);
*/

// 3.8: Tag cloud
/*
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
*/

// Start the user interaction
search.start();
})();
