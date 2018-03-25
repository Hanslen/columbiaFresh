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

### Confirm register
#### post user token to update the confirm info in database

url
```
/confirm/<token>
```

parameters
```python
None
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
#### get recipe search results

url
```
GET /search
```

parameters
```
{
  query: string
  page: int
}
```

response
```
{
  recipes: [{
    id: int, recipe id
    title: string, recipe name
    img: string, image url
    ingredients: [string],
    stars/likes: float/int,
    author: string
  }*20]
}
```

### Recipe (undetermined)
#### get recipe information

url
```
GET /recipe
```

parameters
```
{
  id: int, recipe id
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
  reviews: int,
  stars: float,
  time: string, cooking time
  title: string, recipe name
}
```

### Order
#### get user orders
url
```
GET /order?userId=xxxxx
```
response
```
{
  orderPlaceDate: string,
  totalPrice: string,
  shipTo: string,
  orderID: string,
  deliveredDate: string,
  soldBy: string,
  title: string,
  img: string,
  id: string
}
```


