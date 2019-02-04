"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // GET ALL MAPS
  router.get("/", (req, res) => {
    knex
      .select(["maps.id", "maps.name", "maps.likes", "maps.type", "maps.city", "maps.creatorid", "users.handle", "users.avatar"])
      .from("maps")
      .join("users", "users.id", "=", "maps.creatorid")
      .then((results) => {
        res.json(results);
    });
  });

  // GET A LIST OF MAPS FILTERED BY TYPE
  router.get("/filter/:filter", (req, res) => {
    knex
      .select(["maps.id", "maps.name", "maps.likes", "maps.type", "maps.city", "maps.creatorid", "users.handle", "users.avatar"])
      .from("maps")
      .join("users", "users.id", "=", "maps.creatorid")
      .where('maps.type', `${req.params.filter}`)
      .then((results) => {
        res.json(results);
    });
  });

  // GET ALL MARKERS FOR A MAP
  router.get("/:id", (req, res) => {
    knex
      .select("markers.name", "markers.id", "address", "markers.type", "description", "lat", "long", "imgsrc", "contributorid", "mapid", "maps.startlat", "maps.startlong")
      .from("markers")
      .join("maps", "markers.mapid", "=", "maps.id" )
      .where({'maps.id': `${req.params.id}`})
      .then((results) => {
        res.json(results);
      });
  });

  // GET A SINGLE MAP
  router.get("/map/:id", (req, res) => {
    knex
      .select("maps.startlat", "maps.startlong")
      .from("maps")
      .where({'maps.id': `${req.params.id}`})
      .then((results) => {
        res.json(results);
      });
  });

  // GET A LIST OF MAPS FAVORITED BY A USER
  router.get("/:mapid/:userid", (req, res) => {
    knex
      .select("maps.id")
      .from("maps")
      .join("favorites", "maps.id", "=", "favorites.mapid")
      .where({'maps.id': `${req.params.mapid}`})
      .andWhere({'favorites.userid': `${req.params.userid}`})
      .then((results) => {
        res.json(results[0]);
      });
  });

  // ADD A MAP
  router.post("/", (req, res) => {
    knex("maps")
      .returning('id')
      .insert(req.body)
      .then((results) => {
        res.json(results[0]);
      });
  });

  return router;
}
