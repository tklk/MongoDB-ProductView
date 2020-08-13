const prodController = require('./lib/product');
const prodLst = require('express').Router();
module.exports = prodLst;

// "/api/list" => GET: finds all item in list
prodLst.get('/', prodController.getList);

prodLst.get('/api/list', prodController.getList);

// "/api/list" => POST: creates a new item
prodLst.post('/api/list', prodController.postItem);

// "/api/list/:prodId" => GET: find item by id 
prodLst.get('/api/list/:prodId', prodController.getItem);

// "/api/list/:prodId" => POST: update item by id
prodLst.put('/api/list/:prodId', prodController.putUpdateItem);

// "/api/list/:prodId" => POST: delete item by id
prodLst.delete('/api/list/:prodId', prodController.deleteItem);