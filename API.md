### Sign Up
#### post user information and get activate token

url
```
/register
```

parameters
```
{
name: string
email: string
pwd: string
}
```

response
```
{
status: string
info: string
}
```

### Log In
#### post user information and get login token

url

```
/login
```

parameters
```
{
email: string
pwd: string
}
```

response
```
{
status: string
info: list of string
}

```

### Recipe
#### get recipe information
||||||| merged common ancestors
#### get recipe information
=======
### search recipes
>>>>>>> c7c44cc132dd5b9e110d3384fe3cbe47ea5aad16

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
