### customer

```
CREATE TABLE `Columbia_Fresh`.`customer` (
  `uid` INT NOT NULL AUTO_INCREMENT,
  `uname` VARCHAR(64) NOT NULL,
  `email` VARCHAR(128) NOT NULL,
  `confirmed` TINYINT NOT NULL DEFAULT 0,
  `password_hash` VARCHAR(300) NOT NULL,
  `registered_on` DATETIME NULL,
  `confirmed_on` DATETIME NULL,
  `firstname` VARCHAR(50) NULL,
  `lastname` VARCHAR(50) NULL,
  `gender` INT(1) NULL,
  `introduction` VARCHAR(300) NULL,
  `streetAddress1` VARCHAR(50) NULL,
  `streetAddress2` VARCHAR(50) NULL,
  `city` VARCHAR(50) NULL,
  `state_province_reigion` VARCHAR(50) NULL,
  `zipCode` VARCHAR(6) NULL,
  `cardNumber` VARCHAR(16) NULL,
  `CVV` VARCHAR(3) NULL,
  `expirationMonth` VARCHAR(2) NULL,
  `expirationYear` VARCHAR(2) NULL,
  PRIMARY KEY (`uid`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC));

```

### order

```
CREATE TABLE `Columbia_Fresh`.`order` (
  `oid` INT NOT NULL AUTO_INCREMENT,
  `order_time` DATETIME NOT NULL,
  PRIMARY KEY (`oid`));
```

### ingredient

```
CREATE TABLE `Columbia_Fresh`.`ingredient` (
  `iid` INT NOT NULL AUTO_INCREMENT,
  `iname` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`iid`));
```

### supplier

```
CREATE TABLE `Columbia_Fresh`.`supplier` (
  `sid` INT NOT NULL AUTO_INCREMENT,
  `sname` VARCHAR(100) NOT NULL,
  `des` LONGTEXT NULL,
  PRIMARY KEY (`sid`));
```

### recipe

```
CREATE TABLE `Columbia_Fresh`.`recipe` (
  `rid` INT NOT NULL AUTO_INCREMENT,
  `rname` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`rid`));
```

### recipe_category	

```
CREATE TABLE `Columbia_Fresh`.`recipe_category` (
  `rcid` INT NOT NULL AUTO_INCREMENT,
  `rcname` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`rcid`));
```

### favorite_list_[#USERID#]

```
CREATE TABLE `Columbia_Fresh`.`favorite_list_[userid]` (
  `addedtime` DATETIME NOT NULL,
  `rid` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`addedtime`),
  CONSTRAINT `[userid]_favorite_list`
    FOREIGN KEY (`rid`)
    REFERENCES `Columbia_Fresh`.`recipe` (`rid`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
```

### ingredient_category

```
CREATE TABLE `Columbia_Fresh`.`ingredient_category` (
  `icid` INT NOT NULL AUTO_INCREMENT,
  `icname` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`icid`));
```

### browsing_history

```
CREATE TABLE `Columbia_Fresh`.`browsing_history` (
  `uuid` INT NOT NULL AUTO_INCREMENT,
  `url` TEXT(200) NOT NULL,
  PRIMARY KEY (`uuid`));
```

### cart

```
CREATE TABLE `Columbia_Fresh`.`cart` (
  `uid` INT NOT NULL,
  `uname` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`uid`),
  CONSTRAINT `customer_cart`
    FOREIGN KEY (`uid`)
    REFERENCES `Columbia_Fresh`.`customer` (`uid`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
```

### browse

```
CREATE TABLE `Columbia_Fresh`.`browse` (
  `uuid` INT NOT NULL,
  `uid` INT NOT NULL,
  PRIMARY KEY (`uuid`),
  INDEX `customer_browse_idx` (`uid` ASC),
  CONSTRAINT `customer_browse`
    FOREIGN KEY (`uid`)
    REFERENCES `Columbia_Fresh`.`customer` (`uid`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `browse_history_browse`
    FOREIGN KEY (`uuid`)
    REFERENCES `Columbia_Fresh`.`browsing_history` (`uuid`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
```

### issue

```
CREATE TABLE `Columbia_Fresh`.`issue` (
  `oid` INT NOT NULL,
  `uid` INT NOT NULL,
  PRIMARY KEY (`oid`),
  INDEX `customer_order_idx` (`uid` ASC),
  CONSTRAINT `customer_issue`
    FOREIGN KEY (`uid`)
    REFERENCES `Columbia_Fresh`.`customer` (`uid`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `order_issue`
    FOREIGN KEY (`oid`)
    REFERENCES `Columbia_Fresh`.`order` (`oid`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
```

### order_contain_items

```
CREATE TABLE `Columbia_Fresh`.`order_contain_items` (
  `oid` INT NOT NULL,
  `iid` INT NOT NULL,
  PRIMARY KEY (`oid`, `iid`),
  INDEX `ingredient_order_contains_item_idx` (`iid` ASC),
  CONSTRAINT `order_order_contains_item`
    FOREIGN KEY (`oid`)
    REFERENCES `Columbia_Fresh`.`order` (`oid`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `ingredient_order_contains_item`
    FOREIGN KEY (`iid`)
    REFERENCES `Columbia_Fresh`.`ingredient` (`iid`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
```

### ingredients_by_supplier

```
CREATE TABLE `Columbia_Fresh`.`ingredients_by_supplier` (
  `iid` INT NOT NULL,
  `sid` INT NOT NULL,
  `amount` INT NOT NULL,
  `time` DATETIME NOT NULL,
  PRIMARY KEY (`iid`, `sid`),
  INDEX `supplier_ingredients_by_supplier_idx` (`sid` ASC),
  CONSTRAINT `ingredient_ingredients_by_supplier`
    FOREIGN KEY (`iid`)
    REFERENCES `Columbia_Fresh`.`ingredient` (`iid`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `supplier_ingredients_by_supplier`
    FOREIGN KEY (`sid`)
    REFERENCES `Columbia_Fresh`.`supplier` (`sid`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
```

### ingredient_in_cate

```
CREATE TABLE `Columbia_Fresh`.`ingredient_in_cate` (
  `iid` INT NOT NULL,
  `icid` INT NOT NULL,
  PRIMARY KEY (`iid`, `icid`),
  INDEX `ingredient_category_ingredient_in_cate_idx` (`icid` ASC),
  CONSTRAINT `ingredient_ingredient_in_cate`
    FOREIGN KEY (`iid`)
    REFERENCES `Columbia_Fresh`.`ingredient` (`iid`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `ingredient_category_ingredient_in_cate`
    FOREIGN KEY (`icid`)
    REFERENCES `Columbia_Fresh`.`ingredient_category` (`icid`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
```

### ingredient_in_recipe

```
CREATE TABLE `Columbia_Fresh`.`ingredient_in_recipe` (
  `iid` INT NOT NULL,
  `rid` INT NOT NULL,
  `quantity` INT NOT NULL,
  PRIMARY KEY (`iid`, `rid`),
  INDEX `recipe_ingredient_in_recipe_idx` (`rid` ASC),
  CONSTRAINT `ingredient_ingredient_in_recipe`
    FOREIGN KEY (`iid`)
    REFERENCES `Columbia_Fresh`.`ingredient` (`iid`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `recipe_ingredient_in_recipe`
    FOREIGN KEY (`rid`)
    REFERENCES `Columbia_Fresh`.`recipe` (`rid`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
```

### recipe_in_cate

```
CREATE TABLE `Columbia_Fresh`.`recipe_in_cate` (
  `rid` INT NOT NULL,
  `rcid` INT NOT NULL,
  PRIMARY KEY (`rid`, `rcid`),
  INDEX `recipe_category_recipe_in_cate_idx` (`rcid` ASC),
  CONSTRAINT `recipe_recipe_in_cate`
    FOREIGN KEY (`rid`)
    REFERENCES `Columbia_Fresh`.`recipe` (`rid`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `recipe_category_recipe_in_cate`
    FOREIGN KEY (`rcid`)
    REFERENCES `Columbia_Fresh`.`recipe_category` (`rcid`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
```


### login_info

```
CREATE TABLE `Columbia_Fresh`.`login_info` (
  `token` VARCHAR(300) NOT NULL,
  `uid` INT NOT NULL,
  `expired` DATETIME NOT NULL,
  UNIQUE INDEX `token_UNIQUE` (`token` ASC),
  PRIMARY KEY (`uid`),
  CONSTRAINT `user_login_info`
    FOREIGN KEY (`uid`)
    REFERENCES `Columbia_Fresh`.`customer` (`uid`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
```

