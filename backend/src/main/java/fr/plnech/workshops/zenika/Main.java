package fr.plnech.workshops.zenika;

import com.algolia.search.APIClient;
import com.algolia.search.ApacheAPIClientBuilder;
import com.algolia.search.Index;
import com.algolia.search.exceptions.AlgoliaException;
import com.algolia.search.objects.IndexSettings;
import com.fasterxml.jackson.core.type.TypeReference;
import fr.plnech.workshops.zenika.model.Article;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Hello world!
 */
public class Main {
    public static void main(String[] args) throws AlgoliaException, IOException {
        //Step 1

        // Get data
        List<Article> articles = new ArrayList<Article>();
        BufferedReader br;
        try {
            br = new BufferedReader(new FileReader("../data/articles.json"));
            articles = com.algolia.search.Defaults.DEFAULT_OBJECT_MAPPER.readValue(br, new TypeReference<List<Article>>(){});
            System.out.println("Loaded " + articles.size() + "articles.");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        // Init client
        APIClient client = new ApacheAPIClientBuilder("YOUR_APP_ID", "YOUR_ADMIN_API_KEY").build();

        // Create index
        Index<Article> index = client.initIndex("smashing", Article.class);

        // Push data
        index.addObjects(articles);


        // Step 2

        // Set settings: searchable attributes and ranking (async)
        index.setSettings(new IndexSettings()
                .setSearchableAttributes(Arrays.asList("title", "description", "tags", "author"))
                .setCustomRanking(Collections.singletonList("desc(commentCount)")));

        // Set settings: faceting on tags name (sync)
        index.setSettings(new IndexSettings().setAttributesForFaceting(Collections.singletonList("tags.name")))
                .waitForCompletion(); // as operations are asynchronous, we explicitly wait for task completion
        System.out.println("Tags: " + index.getSettings().getAttributesForFaceting());
    }
}
