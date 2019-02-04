"use strict";

const express = require('express');
const router  = express.Router();
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

module.exports = (knex) => {

  // GET ALL INFORMATION FOR ONE MARKER
  router.get("/:id", (req, res) => {
    knex
      .select("*")
      .from("markers")
      .where({id: `${req.params.id}`})
      .then((results) => {
        res.json(results[0]);
    });
  });

  // EDIT ONE MARKER
  router.put("/:id", (req, res) => {
    const edit = {};
    for (let key in req.body) {
      edit[key] = req.body[key];
    }
    const changedAttrs = Object.keys(req.body);
    knex("markers")
      .where({id: `${req.params.id}`})
      .update(edit,changedAttrs)
      .then((results) => {
        console.log(`Values changed: ${results}`);
        res.sendStatus(200);
    });
  });

  // ADD A MARKER
  router.post("/", (req, res) => {
    knex("markers")
    .insert(req.body)
    .then((results) => {
      console.log(`${results} added`);
      res.sendStatus(200);
    });
  });

  // DELETE A MARKER
  router.delete("/:id", (req, res) => {
    knex("markers")
    .where("id", `${req.params.id}`)
    .del()
    .then(() => {
      console.log(`Marker ${req.params.id} deleted`);
      res.sendStatus(200);
    });
  });

  return router;
}
