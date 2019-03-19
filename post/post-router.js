const express = require('express');

const db = require('../data/db.js');
const router = express.Router();


// find
router.get('/', (req, res) => {
    db
      .find()
      .then(post => { 
        res.status(200).json(post);
      })
      .catch(error => {
        res.status(500).json({ message: 'error retrieving post' });
      });
  });

// findById

  router.get('/:id', (req, res) => {
    const id = req.params.id;
  
    db.findById(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "post Not found" });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "There was an error while saving the post to the database" })
    );
});

// post
  router.post("/", (req, res) => {
    const post = req.body;
  
    if (post.title && post.contents) {
      db
        .insert(post)
        .then(post => res.status(201).json(post))
        .catch(err =>
          res.status(500).json({ message: "Error inserting new post"})
        );
    } else {
      res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
  });


// Delete 

  router.delete("/:id", (req, res) => {
    const id = req.params.id;  
    db
      .remove(id)
      .then(deleted => {
          res.status(204).end();
      })
      .catch(error => {
        res.status(500).json({ message: 'Error deleting the user' });
      });
  });


// Update

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db
    .update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: 'user not found' });
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'error updating user' });
    });
});


  module.exports = router;