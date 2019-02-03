"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select(["maps.id", "maps.name", "maps.likes", "maps.type", "maps.city", "maps.creatorid", "users.handle", "users.avatar"])
      .from("maps")
      .join("users", "users.id", "=", "maps.creatorid")
      .then((results) => {
        res.json(results);
    });
  });

  router.get("/:id", (req, res) => {
    knex
      .select("markers.name", "address", "markers.type", "lat", "long", "imgsrc", "contributorid", "mapid", "maps.startlat", "maps.startlong")
      .from("markers")
      .join("maps", "markers.mapid", "=", "maps.id" )
      .where({'maps.id': `${req.params.id}`})
      .then((results) => {
        res.json(results);
      });
  });

  router.get("/map/:id", (req, res) => {
    knex
      .select("maps.startlat", "maps.startlong")
      .from("maps")
      .where({'maps.id': `${req.params.id}`})
      .then((results) => {
        res.json(results);
      });
  });

  router.post("/", (req, res) => {
    console.log(req.body);
    knex("maps")
      .returning('id')
      .insert(req.body)
      .then((results) => {
        res.json(results[0]);
      });
  });

  return router;
}
