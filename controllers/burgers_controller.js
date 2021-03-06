const express = require('express');

const router = express.Router();

// Import the model (burger.js) to use its database functions.
const burgers = require('../models/burger');

// Create all our routes and set up logic within those routes where required.
router.get("/", (req, res) => {
    burgers.selectAll((result) => {
      const obj = {
        burgers: result,
      };
      res.render("index", obj);
    });
});


router.post("/api/burgers", (req, res) => {
    burgers.insertOne(req.body.burgerName, (data) => {
    // Send back the ID of the new quote
      res.json({ id: data.insertId });
    });
});


router.put("/api/burgers/:id", (req, res) => {
    burgers.updateOne(req.params.id, (data) => {
      if (data.affectedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
});


router.delete('/api/burgers/:id', (req, res) => {
  const condition = `id = ${req.params.id}`;

  burgers.delete(condition, (result) => {
    if (result.affectedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();
  });
});

// Export routes for server.js to use.
module.exports = router;