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
  userId=string,
  token=string,
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



