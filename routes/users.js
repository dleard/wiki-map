"use strict";

const express = require('express');
const router  = express.Router();

const db = require('../db/db.json');

module.exports = (knex) => {

  router.get("/", (req, res) => {
    console.log(db);
    res.send(db.users);
    // knex
    //   .select("*")
    //   .from("users")
    //   .then((results) => {
    //     res.json(results);
    // });
  });

  return router;
}
