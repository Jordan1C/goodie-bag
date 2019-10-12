"use strict";
import Candy from "../server/db/models/Candy";

const router = require("express").Router();

// Your routes go here!
// NOTE: Any routes that you put here are ALREADY mounted on `/api`
// You can put all routes in this file HOWEVER,
// this file should almost be like a table of contents for the routers you create!
// For example:
//
// For your `/api/puppies` routes:
// router.use('/puppies', require('./puppies'))
//
// And for your `/api/kittens` routes:
// router.use('/kittens', require('./kittens'))

// If someone makes a request that starts with `/api`,
// but you DON'T have a corresponding router, this piece of
// middleware will generate a 404, and send it to your
// error-handling endware!

router.get("/candies", async (req, res, next) => {
  try {
    const allCandies = await Candy.findAll();
    if (!allCandies) res.sendStatus(404);
    else res.json(allCandies);
  } catch (error) {
    next(error);
  }
});

router.get("/candies/:id", async (req, res, next) => {
  try {
    const candy = await Candy.findById(req.params.id);
    if (!candy) res.sendStatus(404);
    else res.json(candy);
  } catch (error) {
    next(error);
  }
});

router.post("/candies", async (req, res, next) => {
  try {
    Candy.create(req.body).then(candy => res.status(201).send(candy));
  } catch (error) {
    next(error);
  }
});

router.put("/candies/:id", async (req, res, next) => {
  try {
    const candy = await Candy.findById(req.params.id);
    candy.update(req.body).then(candy => res.status(200).send(candy));
  } catch (error) {
    next(error);
  }
});

router.delete("/candies/:id", async (req, res, next) => {
  try {
    const candy = await Candy.findById(req.params.id);
    candy.destroy(req.body).then(candy => res.status(204).send(candy));
  } catch (error) {
    next(error);
  }
});

router.use((req, res, next) => {
  const err = new Error("API route not found!");
  err.status = 404;
  next(err);
});

module.exports = router;
