"use strict";

const express = require('express');
const router  = express.Router();

// app.GET(‘/maps/:id’)
// 	Populate map
// 	TABLE: MARKER JOIN MAP ON (MAPID = MAP.ID)

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("maps")
      .then((results) => {
        res.json(results);
    });
  });

  router.get("/:id", (req, res) => {
    knex
      .select("*")
      .from("markers")
      .join("maps", "markers.mapid", "=", "maps.id" )
      .then((results) => {
        console.log(results)
        res.json(results);
      })
  });

  return router;
}
