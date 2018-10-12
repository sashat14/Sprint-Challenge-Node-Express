const express = require('express');
const cors = require('cors');
const actionDb = require('./data/helpers/actionModel.js');
const projectDb = require('./data/helpers/projectModel.js');
const port = 7000;

const server = express();
server.use(express.json());

//========================Project Endpoints Start Here==============================

server.get('/', (req,res) => {
    res.send("Welcome to your new project");
})

server.get('/api/projects', (req,res) => {
    projectDb.get()
    .then(projects => {
        res.status(200).json(projects);
    })
    .catch(err => res.send(err.message));
})

server.get('/api/projects/:id', (req, res) => {
    const id = req.params.id;
    projectDb.get(id)
    .then(project => {
        res.status(200).json(project);
    })
    .catch(err => res.send(err));
})

server.post('/api/projects', (req, res) => {
    const { name, description, completed } = req.body;
    const newProject = { name, description, completed };
    projectDb.insert(newProject)
    .then(project => {
            res.status(201).json(project);
    })
    .catch(err => res.send(err.message));
})

server.put('/api/projects/:id', (req, res) => {
    const id = req.params.id;
    const { name, description, completed } = req.body;
    const editedProject = { name, description, completed };
    projectDb.update(id, editedProject)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => res.send(err.message));

})

server.delete('/api/projects/:id', (req, res) => {
    const id = req.params.id;
    projectDb.remove(id)
    .then(removedProject => {
        res.send(`${removedProject} project removed from database`);
    })
    .catch(err => {
        res.send(err.message);
    })
})

server.get('/api/projects/:id/actions', (req, res) => {
    const id = req.params.id;
    projectDb.getProjectActions(id)
    .then(projectActions => {
        res.status(200).json(projectActions);
    })
    .catch(err => res.send(err.message));
})

//=====================Action Endpoints Start Here=============================== 

server.get('/api/actions', (req, res) => {
    actionDb.get()
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch(err => {
        res.send(err.message);
    })
})

server.get('/api/actions/:id', (req, res) => {
    const id = req.params.id;
    actionDb.get(id)
    .then(action => {
        res.status(200).json(action);
    })
    .catch(err => res.send(err.message));
})

server.post('/api/actions', (req, res) => {
    const { project_id, description, notes, completed } = req.body;
    const newAction = { project_id, description, notes, completed };
    actionDb.insert(newAction)
    .then(action => {
        res.status(201).json(action);
    })
    .catch(err => res.send(err.message));
})

server.put('/api/actions/:id', (req, res) => {
    const id = req.params.id
    const { project_id, description, notes, completed } = req.body;
    const editedAction = { project_id, description, notes, completed };
    actionDb.update(id, editedAction)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => res.send(err.message));
})

server.delete('/api/actions/:id', (req, res) => {
    const id = req.params.id;
    actionDb.remove(id)
    .then(removedAction => {
        res.send(`${removedAction} action removed from database`);
    })
    .catch(err => {
        res.send(err.message);
    })
})


server.listen(port, () => {
    console.log(`Server started on port ${port}`);
})