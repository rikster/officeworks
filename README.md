# Developers Notes

## Assumptions
- There are 10 items/products in the db
- Weight and Cost
  - A single items delivery cost is calculated using its postcode and weight
  - Total Cost of all items is calculated and appended to the end of the db  

## Response and Justification
- Will use faker in separate scripts, keeping it out of core code
  - this can be imported into db
  - or you can use API to POST a new item to db
- Replace loki w/ db.json or MongoDb to make data persistent
  - therefore, using models correctly w/ schemas
  - although loki (or redis, sql-lite, etc ) could be used for performance usage
- will replace services dir with routes dir and put biz logic there in separate files
- replace app.js w/ server.js as an entry point for the API
  - setup persistance (db etc), middleware and define routes
- validation is done via Express Validator rather than if thens
- errors are handled in try catch statements blocks
- testing
  - Supertest and Jest Ideally 
- swagger
  - Ideally

## Getting Started

```bash
  npm install
  npm run server # Runs on http://localhost:5090
```

```bash
  To see the end result POST  
  
  {
     "postcode": 3000,
     "itemids": ["60e95a19a4b8af30b8e325c3", "60e95af6d64ec75b4831734f", "60e9abdb08bf3a349c29b9aa"]
  }
  
  to http://localhost:5090/api/items/getItemsDeliveryCostByPostcodeAndID
```
That is, get Item/s by a postcode and list of Id/s, add cost and total cost.
This should produce an array of items with the cost calulated per item and totalled at the
end.

## Postman

- To test, there is a postman collection in the root
  - Officeworks-postman_collection.json




