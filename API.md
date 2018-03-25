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
  info: {
    uid: string,
    email: string,
    uname: string
  }
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
  status: string //Fail, Success
  info: string # if Fail, return string 
               # if success, return {
                                        uid: string,
                                        token: string,
                                        email: string,
                                        img: string,
                                        uname: string
                                     }
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
  id: int
}
```

### Shopping Cart
#### get user shopping Cart
url
```
GET /shoppingCart?userId=xxxx
```
response
```
{
  img: string,
  title: string, 
  price: string, (single item price)
  number: int,
  item: [{
      id: int,
      img: string,
      title: string,
      price: float,
      number: int
   }],
  id: int
}
```

### Settings
#### get basic information
url
```
GET /settings/basic?userId=xxxx
```
response
```
{
  firstname: string,
  lastname: string,
  gender: int,
  email: string,
  introduction: string
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
GET /settings/address?userId=xxx
```
response
```
{
  streetAdress1: string,
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
  streetAdress1: string,
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
