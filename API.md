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

#### get hot menus (hot search word)

url

```
GET /hotMenu
```

response

```
{
    menus: [string], list of menus
}
```

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
    	rid: int, recipe id
    	url: '/recipe/'+id,
    	imgurl: string, image url
    	title: string, recipe name
    	author: string
    	likes: int,
    	ingredients: [string],
  	}*20]
}
```

### Recipe
#### get recipe information

url
```
POST /getRecipe
```

parameters
```
{
	token: string,
	uid: int, user id
	rid: int, recipe id
}
```

response
```
{
	rid: int,
    title: string, recipe title
    img: string, image url
    likes: int,
    isLiked: bool | false, whether user likes the recipe, default false
    tags: [string],
    aid: int, author uid
    avatar: string, url of user avatar
    author: string, username of author
    discription: string,
    calorie: int,
    preptime: int, in min
    ingredients: [string],
    directions: [string],
    notes: string, footnote
}
```

#### add ingredients to shopping cart

url

```
POST /addToCart
```

parameters

```
{
	token: string,
    uid: int, user id
    rid: int, recipe id
}
```

response

```
{
    state: 'success'|'fail'
    message: string
}
```

#### like recipe

url

```
POST /likeRecipe
```

parameters

```
{
	token: string,
    uid: int, user id
    rid: int, recipe id
    like: bool
}
```

response

```
{
    state: 'success'|'fail'
    message: string,
    likes: int,
    isLiked: bool
}
```

#### 