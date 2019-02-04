"use strict";

const express = require('express');
const router  = express.Router();

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
      .where({id: `${req.params.id}`})
      .then((results) => {
        res.json(results[0]);
    });
  });

  router.get("/:id/maps", (req, res) => {
    knex
      .select("*")
      .from("maps")
      .join('users', 'maps.creatorid', '=', 'users.id')
      .where({creatorid: `${req.params.id}`})
      .then((results) => {
        res.json(results);
    });
  });

  router.get("/:id/maps/contributed", (req, res) => {
    knex
      .distinct("maps.id", "maps.name", "maps.likes", "maps.type", "maps.city", "maps.creatorid", "users.handle", "users.avatar")
      .select()
      .from("maps")
      .join('users', 'maps.creatorid', '=', 'users.id')
      .join('markers', 'maps.id', '=', 'markers.contributorid')
      .where('markers.contributorid', `${req.params.id}`)
      .then((results) => {
        res.json(results);
    });
  });

  router.get("/:id/maps/favorited", (req, res) => {
    knex
      .distinct("maps.id", "maps.name", "maps.likes", "maps.type", "maps.city", "maps.creatorid", "users.handle", "users.avatar")
      .select()
      .from("maps")
      .join('users', 'maps.creatorid', '=', 'users.id')
      .join('favorites', 'maps.id', '=', 'favorites.mapid')
      .where('favorites.userid', `${req.params.id}`)
      .then((results) => {
        res.json(results);
    });
  });

  router.post("/:id/favorites", (req, res) => {
    knex("favorites")
      .insert(req.body)
      .then(() => {
        res.sendStatus(200);
      });
  });

  return router;
}
