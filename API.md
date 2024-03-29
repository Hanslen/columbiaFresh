## Status Code Instruction
responses:
'200': 
description: Backend Response

'403': 
description: Unauthorized

'401': 
description: Unexpected error

```
if status code is 403 or 401:
return "errorInfo": string
```

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
  token: string
}
```
### Check token
#### check user token
url
```
POST /token
```
parameters
```
{
	token:string
}
```
response
Only need statusCode
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
    uid: string,
    email: string,
    uname: string
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
password: string
}
```

response
```python
{
	uid: string,
	token: string,
	email: string,
	img: string,
	uname: string
}
```
### Upload recipes - get tags
url
```
GET /getRecipeTags
```
response
```
{
	tags: [String]
}
```
### Upload recipes - get ingredients
url
```
GET /getIngredients
```
response
```
{
	ingredients: [[String, String]] //ingredient type, ingredient unit
}
```
### Upload recipes
url
```
POST /createRecipe
```
postData
```
{	
	token: String,
	title: String,
	img: String,
	tag: [String],
	authorId: String, (userId Same),
	description: String,
	ingredients: [[String, String, String]], #iid, quantity, ?
	directions: [String],
	notes: String
}
```
response:
```
{
	success: Bool (True/False)
	msg: String
}
```

### Delete recipe
url
```
POST /deleteRecipe
```
postData
```
{	
	token: String,
	rid: String
}
```
response:
```
{
	msg: String
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

#### get number of result pages

url
```
GET /page
```

parameters
```
{
	query: string,
	perPage: int
}
```

response
```
{
	pages: int
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
	query: string,
	page: int,
	perPage: int
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
		ingredients: [{
			name: string,
			quantity: string
		}],
  	}]
}
```

#### get editor's choice

url
```
GET /rank
```

parameters
```
{
	query: string,  // empty
	page: int,
	perPage: int
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
		ingredients: [{
			name: string,
			quantity: string
		}],
  	}]
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
	ingredients: [{
		name: string,
		quantity: string
	}],
	directions: [string],
	notes: string, footnote
}
```

#### add recipes to shopping cart

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

#### place order

url

```
POST /placeOrder
```

parameters

```
{
	token: string,
	uid: int, user id
}
```

response

```
{
    orderId: string,
    message: string
}
```

#### get user orders
url
```
POST /orders
```
postData
```
data:
{
    userId: string,
    token: string
}
```
response
```
{
	msg:[{
		orderPlaceDate: string,
		totalPrice: string,
		shipTo: string,
		orderID: string,
		deliveredDate: string,
		soldBy: string,
		title: string,
		img: string
	}]
}

```
#### get user order by orderID
url
```
POST /getorder
```
postData
```
{
	userId: string,
	token: string,
	orderId: string
}
```
response
```{
date: string,
msg:[{
	recipeId: string,
	img: string,
	title: string,
	price: string, (single item price),
	number: int,
	item: [{
		id: int,
		img: string,
		title: string,
		price: float,
		number: int
	}]
}]}
```
### My recipe
#### get my recipe tags
url
```
POST /myrecipe/tags
```
postData
```
{
	userId: string,
	token: string
}
```
response
```
{
	tag: [string]
}
```
#### get recipe folder items
url
```
POST /myrecipe/folder
```
postData
```
{
	userId: String,
	token: String,
	tag: String
}
```
response
```
[{
	id: String,
        title: String,
        src: String
}]
```

### Shopping Cart
#### get user shopping Cart
url
```
POST /shoppingCart
```
postData
```
{
    userId: string,
    token: string
}
```

response
```
{[{
      recipeId: int,
      img: string,
      title: string,
      price: float,
      number: int,
      ingredient:[{
      		id: int,
		img: string,
		title: string,
		price: float,
		number: int
      }]
   }]
}
```
#### increase recipe num
url
```
POST /recipe/increasenum
```
postData
```
{
	userId: string,
	token: string,
	rid: string
}
```
response
```
{
	price: string
}
```
#### decrease recipe num
url
```
POST /recipe/decreasenum
```
postData
```
{
	userId: string,
	token: string,
	rid: string
}
```
response
```
{
	price: string
}
```
#### delete shoppingCartItem
url
```
POST /deleteShoppingCartItem
```
postData
```
{
	userId: string,
	token: string,
	rid: string
}
```
response
```
{
	msg: "Success" | "fail"
}
```

### Favourite List
#### get favourite list
url
```
POST /getfavouritelist
```
postData
```
{
	userId: string,
	token: string
}
```
response
```
[{
	id: string,
	title: string,
	src: string
}]
```


### Settings
#### get basic information
url
```
POST /settings/basic
```
postData
```
{
   token: string,
   userId: string
}
```

response
```
{
  firstname: string,
  lastname: string,
  gender: int,
  email: string,
  introduction: string, (token != userId)
  userName: string (token != userId)
}
```

#### get user reputation

url
```
GET /getReputation?uid
```

parameters
```
{
	uid: string
}
```

response
```
{
	reputation: int, total likes
}
```

#### update user Icon
url
```
POST /settings/update/userIcon
```
postData
```
{
	userId: string,
	token: string,
	img: string
}
```
reponse
```
{
	msg: string
}
```

#### update basic information
url
```
POST /settings/update/basic
```
postData
```
{
  userId: string,
  token: string,
  firstname: string,
  lastname: string,
  gender: int,
  email: string,
  introduction: string
}
```
response
```
{
  success: bool,
  msg: string
}
```
#### update password
url
```
POST /settings/update/password
```

postData
```
{
  userId: string,
  token: string,
  oldPassword: string,
  newPassword: string
}
```
response
```
{
  success: bool,
  msg: string
}
```
#### get address
url
```
POST /settings/address
```
postData
```
{
    userId: string,
    token: string
}
```

response
```
{
  streetAddress1: string,
  streetAddress2: string,
  city: string,
  state_province_region: string
  zipCode: string
}
```
#### update address
url
```
POST /settings/update/address
```
postData
```
{
  userId: xxxx,
  token: string,
  streetAddress1: string,
  streetAddress2: string,
  city: string,
  state_province_region: string
  zipCode: string 
}
```
response
```
{
  success: bool,
  msg: string
}
```
#### get credit card
url
```
POST /settings/getcredit
```
postData
```
{
  userId: xxxx,
  token: string
}
```
response
```
{
  name: string,
  cardNumber: string,
  expirationMonth: string,
  expirationYear:string,
  cvv: string
}
```
#### update credit card
url
```
POST /settings/update/credit
```
postData
```
{
  userId: xxxx,
  token: string,
  name: string,
  cardNumber: string,
  expirationMonth: string,
  expirationYear:string,
  cvv: string
}
```
response
```
{
  success: bool,
  msg: string
}
```

