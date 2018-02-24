# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class CrawlerItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    title = scrapy.Field()
    url = scrapy.Field()
    category = scrapy.Field()
    img = scrapy.Field()
    author = scrapy.Field()
    description = scrapy.Field()
    stars = scrapy.Field()
    reviews = scrapy.Field()

    descriptions = scrapy.Field()
    time = scrapy.Field()
    calorie = scrapy.Field()
    ingredients = scrapy.Field()
    directions = scrapy.Field()
    footnotes = scrapy.Field()
