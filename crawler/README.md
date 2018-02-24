### Recipe Spider

Crawl recipes from [allrecipes](allrecipes.com).

#### How to use

```
pip install Scrapy
scrapy crawl recipe  // in derectory crawler/crawler
```

Recipe information is stored in the variable `item` in the function `parseRecipe()` in `RecipeSpider.py` .

##### Fields

```
{
    'author': string,
    'calorie': string,
    'category': string,
    'description': string,
    'descriptions': string,
    'direction': list of string, // bad punctuations to be processed
    'footnote': list of string, // bad punctuations to be processed
	'img': string,
	'ingredients': list of string,
	'reviews': string
	'stars': string
	'time': string,
	'title': string,
	'url': string
}
```

For persistence(save to file or database), refer to [Item Pipeline](https://doc.scrapy.org/en/latest/topics/item-pipeline.html).

