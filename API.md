# API:

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

url
```
/recipe
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
  category: string,
  description: string,
  direction: list of string,
  footnote: list of string,
  img: string,
  ingredients: list of string,
  reviews: string
  stars: string
  time: string,
  title: string,
  url: string
}
```
