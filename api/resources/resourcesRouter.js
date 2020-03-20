const express = require('express');

const Projects = require('../projects/projectsHelper');
const Resources = require("./resourcesHelper")
const Tasks = require("../tasks/tasksHelper")
const Project_resources = require("../project_resources/project_resourcesHelper")

const router = express.Router();

router.get('/', (req, res) => {
  Resources.find()
    .then(projects => {
      res.json(projects);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get projects' });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Resources.findById(id)
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

router.get('/:id/Projects', (req, res) => {
  const { id } = req.params;

  Resources.findProjects(id)
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
  const resourceData = req.body;

  console.log(resourceData)

  Resources.add(resourceData)
    .then(resource => {
      res.status(201).json(resource);
    })
    .catch(err => {
      res.status(500).json({ ...err, message: 'Failed to create new resource' });
    });
});


// router.post('/:id/projects', (req, res) => {
//   const resourceData = req.body;
//   const { id } = req.params;

//   Resources.findById(id)
//     .then(project => {
//       if (project) {
//         Projects.add(resourceData)
//           .then(resource => {
//             const pairData = {
//               project_id: id,
//               resource_id: resource.id
//             }
//             Project_resources.add(pairData)
//               .then(pair => {
//                 res.status(201).json(resource)
//               })
//           })
//       } else {
//         res.status(404).json({ message: 'Could not find project with given id.' })
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ message: 'Failed to create new step' });
//     });
// }); // needs fixing

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Resources.findById(id)
    .then(project => {
      if (project) {
        Resources.update(changes, id)
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

  Resources.remove(id)
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
