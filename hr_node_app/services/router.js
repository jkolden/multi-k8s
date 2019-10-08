const express = require("express");
const router = new express.Router();
const employees = require("../controllers/employees.js");
const otbi = require("../controllers/otbi.js");

router
  .route("/employees/:id?")
  .get(employees.get)
  .post(employees.post)
  .put(employees.put)
  .delete(employees.delete)
  .route("/otbi")
  .post(otbi.post);

module.exports = router;
