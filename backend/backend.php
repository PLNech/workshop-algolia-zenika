<?php
// STEP 1
// Load dependency
require __DIR__ . '/vendor/autoload.php';

// Load json file
$batch = json_decode(file_get_contents('../data/articles.json'), true);
var_dump($batch);

// Initialize API Client
$client = new \AlgoliaSearch\Client('YOUR_APP_ID', 'YOUR_ADMIN_API_KEY');

// Initialize index
$index = $client->initIndex('smashing');

// Push data
$index->addObjects($batch);

// STEP 2
// Set settings
$index->setSettings(array(
		"searchableAttributes" => array("title", "description", "tags", "author"),
		"customRanking" => array("desc(commentCount)")));

// Set settings and get settings
$res = $index->setSettings(array("attributesForFaceting" => array("tags.name")));
$index->waitTask($res['taskID']); // as operations are asynchronous, we explicitly wait for task completion
$settings = $index->getSettings();
var_dump($settings['attributesForFaceting']);
?>
