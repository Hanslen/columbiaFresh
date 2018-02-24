## Recipe

### search recipes

url
```
GET /search
```

parameters
```
{
  query: string
}
```

### get recipe information

url
```
GET /recipe
```

parameters
```
{
  id: string
}
```

response
```
{
  author: string,
  calorie: string,
  category: [string],
  description: string,
  direction: [string],
  footnote: [string],
  img: string, imgurl
  ingredients: [string],
  reviews: string,
  stars: string,
  time: string, cooking time
  title: string, recipe name
}
```
