const express = require('express');

const Resources = require('./resourcesHelper.js');

const router = express.Router();

router.get('/', (req, res) => {
  Resources.find()
    .then(resources => {
      res.json(resources);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get resources' });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Resources.findById(id)
    .then(resource => {
      if (resource) {
        res.json(resource);
      } else {
        res.status(404).json({ message: 'Could not find resource with given id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get resources' });
    });
});

router.get('/:id/steps', (req, res) => {
  const { id } = req.params;

  Resources.findSteps(id)
    .then(steps => {
      if (steps.length) {
        res.json(steps);
      } else {
        res.status(404).json({ message: 'Could not find steps for given resource' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get steps' });
    });
});

router.post('/', (req, res) => {
  const resourceData = req.body;

  Resources.add(resourceData)
    .then(resource => {
      res.status(201).json(resource);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to create new resource' });
    });
});

router.post('/:id/steps', (req, res) => {
  const stepData = req.body;
  const { id } = req.params;

  Resources.findById(id)
    .then(resource => {
      if (resource) {
        Resources.addStep(stepData, id)
          .then(step => {
            res.status(201).json(step);
          })
      } else {
        res.status(404).json({ message: 'Could not find resource with given id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to create new step' });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Resources.findById(id)
    .then(resource => {
      if (resource) {
        Resources.update(changes, id)
          .then(updatedScheme => {
            res.json(updatedScheme);
          });
      } else {
        res.status(404).json({ message: 'Could not find resource with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to update resource' });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Resources.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find resource with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete resource' });
    });
});

module.exports = router;
