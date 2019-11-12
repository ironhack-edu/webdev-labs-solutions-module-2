# LAB Solution  | Advanced Querying Mongo



<br>



### 1. All the companies that it's name match 'Babelgum'. Retrieve only their `name` field.

```js
db.companies.find({name: 'Babelgum'}, {name: 1, _id: 0})
```



<br>



### 2. All the companies that have more than 5000 employees. Limit the search to 20 companies and sort them by **number of employees**.

```js
db.companies.find({ number_of_employees: {$gt: 5000} } )
  .limit(20)
  .sort({number_of_employees: -1})
```



<br>



### 3. All the companies founded between 2000 and 2005, both years included. Retrieve only the `name` and `founded_year` fields.

```js
db.companies.find({$and: [ {founded_year: {$gte: 2000}}, {founded_year: {$lte: 2005}}]}, {name: 1, founded_year: 1, _id: 0})
```



<br>



### 4. All the companies that had a Valuation Amount of more than 100.000.000 and have been founded before 2010. Retrieve only the `name` and `ipo` fields.

```js
db.companies.find({$and: [ {"ipo.valuation_amount": {$gt: 100000000}}, {founded_year: {$lt: 2010}}]}, {name: 1, ipo: 1, _id: 0})
```



<br>



### 5. All the companies that have less than 1000 employees and have been founded before 2005. Order them by the number of employees and limit the search to 10 companies.

```js
db.companies.find({$and: [ {number_of_employees: {$lt: 1000}}, {founded_year: {$lt: 2005}}]} ).sort({number_of_employees: -1}).limit(10)
```



<br>



### 6. All the companies that don't include the `partners` field.

```js
db.companies.find({partners: {$size: 0}})
```



<br>



### 7. All the companies that have a `null` type of value on the `category_code` field.

```js
db.companies.find({category_code: null})
```



<br>



### 8. All the companies that have at least 100 employees but less than 1000. Retrieve only the `name` and `number of employees` fields.

```js
db.companies.find({$and: [ {number_of_employees: {$gte: 100}}, {number_of_employees: {$lte: 1000}}]}, {name: 1, number_of_employees: 1, _id: 0})
```



<br>



### 9. Order all the companies by their IPO price in a descending order.

```js
db.companies.find().sort({"ipo.valuation_amount": -1})
```



<br>



### 10. Retrieve the 10 companies with more employees, order by the `number of employees`

```js
db.companies.find().sort({number_of_employees: -1}).limit(10)
```



<br>



### 11. All the companies founded on the second semester of the year. Limit your search to 1000 companies.

```js
db.companies.find({founded_month: {$gt: 6}})
```



<br>



### 12. All the companies founded before 2000 that have and acquisition amount of more than 10.000.000

```js
db.companies.find({$and: [ {founded_year: {$lte: 2000}}, {"acquisition.price_amount": {$gt: 10000000}}]})
```



<br>



### 13. All the companies that have been acquired after 2010, order by the acquisition amount, and retrieve only their `name` and `acquisiton` field.



<br>



```js
db.companies.find({"acquisition.acquired_year": {$gt: 2010}},{name: 1, acquisition: 1}).sort({"acquisition.price_amount": 1})
```



<br>



### 14. Order the companies by their `founded year`, retrieving only their `name` and `founded year`.

```js
db.companies.find({},{name: 1, founded_year: 1}).sort({founded_year: 1})
```



<br>



### 15. All the companies that have been founded on the first seven days of the month, including the seventh. Sort them by their `aquisition price` descending. 

### Limit the search to 10 documents.

```js
db.companies.find({founded_day: {$lte: 7}}).sort({"acquisition.price_amount": -1}).limit(10)
```



<br>



### 16. All the companies on the 'web' `category` that have more than 4000 employees. Sort them by the amount of employees in ascendant order.

```js
db.companies.find({$and: [{category_code: "web"}, {number_of1
```



<br>



### 17. All the companies which their acquisition amount is more than 10.000.000, and currency is 'EUR'.

```js
db.companies.find({$and: [{"acquisition.price_currency_code": "EUR"},{"acquisition.price_amount": {$gt: 10000000}}]})
```



<br>



### 18. All the companies that have been acquired on the first trimester of the year. Limit the search to 10 companies, and retrieve only their `name` and `acquisition` fields.

```js
db.companies.find({"acquisition.acquired_month": {$lte: 3}},{name: 1, acquisition: 1 }).limit(10)
```



<br>



### 19. All the companies that have been founded between 2000 and 2010, but have not been acquired before 2011.

```js
db.companies.find({$and: [{founded_year: {$gt: 2000}},{founded_year: {$lt: 2010}},{"acquisition.acquired_year": {$gte: 2011}}]}, {name: 1, "acquisition.acquired_year": 1})
```



<br>

