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
```python
{
status: string #Fail or Success
info: string
}
```
### Sign Up Verification URL generation
#### post user email and activate token

url
```
/register/confirm_url
```

parameters
```python
{
email: string
url: string # url: string # generate by token, e.g. www.columbiaFresh/register/<token>

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
```python
{
status: string
info: string # if success, response token
}

```

### Search recipes

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

### Recipe
#### get recipe information

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
