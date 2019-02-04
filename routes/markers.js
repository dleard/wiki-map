"use strict";

const express = require('express');
const router  = express.Router();
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

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

  router.put("/:id", (req, res) => {
    console.log('body:' + req.body);
    const edit = {};
    for (let key in req.body) {
      edit[key] = req.body[key];
    }
    const changedAttrs = Object.keys(req.body);
    console.log(edit);
    // knex("markers")
    //   .where({id: `${req.params.id}`})
    //   .update(edit,changedAttrs)
    //   .then((results) => {
    //     console.log(`Values changed: ${results}`);
    //     res.sendStatus(200);
    // });
  });

  router.post("/", (req, res) => {
    knex("markers")
    .insert(req.body)
    .then((results) => {
      console.log(`${results} added`);
      res.sendStatus(200);
    });
  });

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
