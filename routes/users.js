"use strict";

const express = require('express');
const router  = express.Router();


const userid = 1;
const mapid = 1;

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });

  router.get("/:id", (req, res) => {
    knex
      .select("*")
      .from("users")
      .where({id: `${userid}`})
      .then((results) => {
        res.json(results[0]);
    });
  });

  router.get("/:id/maps", (req, res) => {
    knex
      .select("*")
      .from("maps")
      .join('users', 'maps.creatorid', '=', 'users.id')
      .where({creatorid: 1})
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}
