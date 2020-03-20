const express = require('express');

const Projects = require('./projectsHelper.js');
const Resources = require("../resources/resourcesHelper")
const Tasks = require("../tasks/tasksHelper")
const Project_resources = require("../project_resources/project_resourcesHelper")

const router = express.Router();

router.get('/', (req, res) => {
  Projects.find()
    .then(projects => {
      res.json(projects);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get projects' });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Projects.findById(id)
    .then(project => {
      if (project) {
        res.json(project);
      } else {
        res.status(404).json({ message: 'Could not find project with given id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get projects' });
    });
});

router.get('/:id/Resources', (req, res) => {
  const { id } = req.params;

  Projects.findResources(id)
    .then(steps => {
      if (steps.length) {
        res.json(steps);
      } else {
        res.status(404).json({ message: 'Could not find steps for given project' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get steps' });
    });
});

router.get('/:id/Tasks', (req, res) => {
  const { id } = req.params;

  Projects.findTasks(id)
    .then(steps => {
      if (steps.length) {
        res.json(steps);
      } else {
        res.status(404).json({ message: 'Could not find steps for given project' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get steps' });
    });
});

router.post('/', (req, res) => {
  const projectData = req.body;

  Projects.add(projectData)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to create new project' });
    });
});

//checked until here

router.post('/:id/resources', (req, res) => {
  const resourceData = req.body;
  const { id } = req.params;

  Projects.findById(id)
    .then(project => {
      if (project) {
        Resources.add(resourceData)
          .then(resource => {
            const pairData = {
              project_id: id,
              resource_id: resource.id
            }
            Project_resources.add(pairData)
              .then(pair => {
                res.status(201).json(resource)
              })
          })
      } else {
        res.status(404).json({ message: 'Could not find project with given id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to create new step' });
    });
});

router.post('/:id/tasks', (req, res) => {
  const { id } = req.params;
  const taskData = {
    ...req.body,
    project_id: req.params.id
  };

  Resources.findById(id)
    .then(resource => {
      if (resource) {
        Tasks.add(taskData)
          .then(task => {
            res.status(201).json(task);
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

  Projects.findById(id)
    .then(project => {
      if (project) {
        Projects.update(changes, id)
          .then(updatedScheme => {
            res.json(updatedScheme);
          });
      } else {
        res.status(404).json({ message: 'Could not find project with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to update project' });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Projects.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find project with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete project' });
    });
});

module.exports = router;
