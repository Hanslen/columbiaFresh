import scrapy
from ..items import CrawlerItem

class RecipeSpider(scrapy.Spider):
    name = "recipe"
    headers = {}

    def start_requests(self):
        urls = [
            'http://allrecipes.com/recipes/76/appetizers-and-snacks/',
            'http://allrecipes.com/recipes/79/desserts/',
            'http://allrecipes.com/recipes/77/drinks/',
            'http://allrecipes.com/recipes/1116/fruits-and-vegetables/',
            'http://allrecipes.com/recipes/92/meat-and-poultry/',
            'http://allrecipes.com/recipes/95/pasta-and-noodles/',
            'http://allrecipes.com/recipes/96/salad/',
            'http://allrecipes.com/recipes/93/seafood/',
            'http://allrecipes.com/recipes/81/side-dish/',
            'http://allrecipes.com/recipes/94/soups-stews-and-chili/'
        ]
        for url in urls:
            yield scrapy.Request(url)

    def parse(self, response):
        category = response.url.split('/')[5]
        articles = response.xpath('//article[@class="fixed-recipe-card"]')
        for article in articles:
            item = CrawlerItem()
            item['category'] = category
            item['img'] = article.xpath('.//img/@data-original-src').extract_first()
            item['title'] = article.xpath('./div[@class="fixed-recipe-card__info"]/h3[@class="fixed-recipe-card__h3"]/a/span[@class="fixed-recipe-card__title-link"]/text()').extract_first()
            item['url'] = article.xpath('./div[@class="fixed-recipe-card__info"]/a/@href').extract_first()
            item['stars'] = article.xpath('./div[@class="fixed-recipe-card__info"]/a/div[@class="fixed-recipe-card__ratings"]/span[@data-ratingstars]/@data-ratingstars').extract_first()
            item['reviews'] = article.xpath('./div[@class="fixed-recipe-card__info"]/a/div[@class="fixed-recipe-card__ratings"]/span[@class="fixed-recipe-card__reviews"]/format-large-number/@number').extract_first()
            item['description'] = article.xpath('./div[@class="fixed-recipe-card__info"]/a/div[@class="fixed-recipe-card__description"]/text()').extract_first()
            item['author'] = article.xpath('./div[@class="fixed-recipe-card__info"]/div[@class="fixed-recipe-card__profile"]//ul[@class="cook-submitter-info"]//h4/text()').extract_first()
            request = scrapy.Request(item['url'], callback=self.parseRecipe)
            request.meta['item'] = item
            yield request
        
        # pagination
            
    def parseRecipe(self, response):
        item = response.meta['item']
        summary = response.xpath('//section[@class="recipe-summary clearfix"]')
        ingredients = response.xpath('//section[@class="recipe-ingredients"]')
        directions = response.xpath('//div[@class="directions--section__steps"]')
        footnotes = response.xpath('//section[@class="recipe-footnotes"]')

        item['descriptions'] = summary.xpath('./div[@class="submitter"]/div[@class="submitter__description"]/text()').extract_first()

        item['time'] = ingredients.xpath('./span[@class="recipe-ingredients__header__toggles"]/span[@class="ready-in-time__container"]/span[@class="ready-in-time"]/text()').extract_first()
        item['calorie'] = ingredients.xpath('./span[@class="recipe-ingredients__header__toggles"]/a/span[@class="calorie-count"]/span/text()').extract_first()
        item['ingredients'] = ingredients.xpath('./ul/li[@class="checkList__line"]/label/span/text()').extract()

        # TODO: prepTime
        item['directions'] = directions.xpath('./ol[@itemprop="recipeInstructions"]/li[@class="step"]/span/text()').extract()

        item['footnotes'] = footnotes.xpath('./ul/li/text()').extract()
        
        yield item
