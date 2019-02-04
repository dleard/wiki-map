"use strict";

const express = require('express');
const router  = express.Router();
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

module.exports = (knex) => {

  router.post("/", (req, res) => {
    knex("favorites")
      .returning('id')
      .insert(req.body)
      .then((results) => {
        res.json(results[0]);
      });
  });

  router.delete("/:userid/:mapid", (req, res) => {
    knex("favorites")
    .where("userid", `${req.params.userid}`)
    .andWhere("mapid", `${req.params.mapid}`)
    .del()
    .then(() => {
      console.log(`Marker deleted`);
      res.sendStatus(200);
    });
  });

  return router;
}
