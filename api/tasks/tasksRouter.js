const express = require('express');

const Tasks = require('./tasksHelper.js');

const router = express.Router();

router.get('/', (req, res) => {
  Tasks.find()
    .then(tasks => {
      res.json(tasks);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get tasks' });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Tasks.findById(id)
    .then(task => {
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ message: 'Could not find task with given id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get tasks' });
    });
});

router.post('/', (req, res) => {
  const taskData = req.body;

  Tasks.add(taskData)
    .then(task => {
      res.status(201).json(task);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to create new task' });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Tasks.findById(id)
    .then(task => {
      if (task) {
        Tasks.update(changes, id)
          .then(updatedScheme => {
            res.json(updatedScheme);
          });
      } else {
        res.status(404).json({ message: 'Could not find task with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to update task' });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Tasks.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find task with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete task' });
    });
});

module.exports = router;
