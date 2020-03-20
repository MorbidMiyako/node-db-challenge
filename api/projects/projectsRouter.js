const express = require('express');

const Projects = require('./projectsHelper.js');
const Resources = require("../resources/resourcesHelper")
const Tasks = require("../tasks/tasksHelper")
const Project_resources = require("../project_resources/project_resourcesHelper")

const router = express.Router();

// post resources with id needs to be fixed


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

  Projects.findById(id)
    .then(project => {
      if (project) {
        Projects.findTasks(id)
          .then(steps => {
            if (steps.length) {
              res.json({ ...project, steps: { ...steps } });
            } else {
              res.status(404).json({ message: 'Could not find steps for given project' })
            }
          })
          .catch(err => {
            res.status(500).json({ message: 'Failed to get steps' });
          });

      } else {
        res.status(404).json({ message: 'Could not find project with given id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get projects' });
    });
});

router.get('/:id/All', (req, res) => {
  const { id } = req.params;

  Projects.findById(id)
    .then(project => {
      if (project) {
        Projects.findTasks(id)
          .then(steps => {
            if (steps.length) {
              Projects.findResources(id)
                .then(resources => {
                  if (resources.length) {
                    res.json({ ...project, steps: { ...steps }, resources: { ...resources } });
                  } else {
                    res.status(404).json({ message: 'Could not find steps for given project' })
                  }
                })
                .catch(err => {
                  res.status(500).json({ message: 'Failed to get steps' });
                });
            } else {
              res.status(404).json({ message: 'Could not find steps for given project' })
            }
          })
          .catch(err => {
            res.status(500).json({ message: 'Failed to get steps' });
          });

      } else {
        res.status(404).json({ message: 'Could not find project with given id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get projects' });
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
          .then(id => {
            // console.log(resource)
            // Project_resources.add(pairData)
            //   .then(pair => {
            res.status(200).json(resource)
          })
          // .catch(err => {
          //   res.status(500).json({ err, message: "failed to pair resource" })
          // })
          // })
          .catch(err => {
            res.status(500).json({ err, message: "failed to add resource" })
          })
      } else {
        res.status(404).json({ message: 'Could not find project with given id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to create new step' });
    });
}); // needs fixing

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
