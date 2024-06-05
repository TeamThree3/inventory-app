const express = require("express");
const router = express.Router();
const { Item } = require("../models");

// GET /Items
router.get("/", async (req, res, next) => {
  try {
    const items = await Item.findAll();
    res.send(items);
  } catch (error) {
    next(error);
  }
});


// GET /Items by ID
router.get("/:id", async (req, res, next) => {
    try {
      const item = await Item.findByPk(req.params.id);
      if (item) {
        res.send(item);
      } else
      res.status(404).send({error: "Not Found"});
    } catch (error) {
      next(error);
    }
  });

  //DELETE /api/items/:id
  router.delete("/:id", async (req, res, next) => {
    try {
      const item = await Item.findByPk(req.params.id);
      if (item) {
        await item.destroy();
        res.status(204).send();
      } else {
        res.status(404).send({error: "Not Found"});
      }
    } catch (error) {
      next(error);
    }
  });

  //POST /Add new item to list
  router.post("/", async (req, res, next) => {
    try {
      const newItem = await Item.create(req.body);
      res.status(201).send(newItem);
    } catch (error) {
      next(error);
    }
  });
 
 // PUT /Update item to list
  router.put("/:id", async (req, res, next) => {
    try {
      const item = await Item.findByPk(req.params.id);
      if (item) {
        await item.update(req.body);
        res.send(item);
      } else {
      res.status(404).send({error: "Not Found"});
      }
    } catch (error) {
      next(error);
    }
  });
          

module.exports = router;