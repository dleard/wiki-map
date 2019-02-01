"use strict";

const express = require('express');
const router  = express.Router();

// app.GET(‘/marker/:id’)
// 	Click on marker for info
// 	TABLE: MARKER

module.exports = (knex) => {

  router.get("/:id", (req, res) => {
    console.log(req.params.id);
    knex
      .select("*")
      .from("markers")
      .where({id: `${req.params.id}`})
      .then((results) => {
        res.json(results[0]);
    });
  });

  return router;
}
