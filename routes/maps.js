"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("maps")
      .join("users", "users.id", "=", "maps.creatorid")
      .then((results) => {
        res.json(results);
    });
  });

  router.get("/:id", (req, res) => {
    knex
      .select("lat", "long")
      .from("markers")
      .join("maps", "markers.mapid", "=", "maps.id" )
      .where({'maps.id': `${req.params.id}`})
      .then((results) => {
        res.json(results);
      });
  });

  router.post("/", (req, res) => {
    console.log(req.body);
    knex("maps")
      .insert(req.body)
      .then(() => {
        res.sendStatus(200);
      });
  });

  return router;
}
