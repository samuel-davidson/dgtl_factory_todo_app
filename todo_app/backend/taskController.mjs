
import 'dotenv/config';
import express from 'express';
import * as task from './taskModel.mjs'

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

// CREATE controller ******************************************
app.post ('/tasks', (req,res) => { 
    task.createTask( req.body.task )
        .then(task => {
            console.log(`"${task}" was added to the collection.`);
            res.status(201).json(task);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'Task could not be added to list.' });
        });
});


// RETRIEVE controller ****************************************************
app.get('/tasks', (req, res) => {
    task.retrieveTasks()
        .then(tasks => { 
            if (tasks !== null) {
                console.log(`All tasks were retrieved from the collection.`);
                res.json(tasks);
            } else {
                res.status(404).json({ Error: 'Some or all of the tasks from the list could not be retrieved.' });
            }         
         })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'Some or all of the tasks from the list could not be retrieved.' });
        });
});


// RETRIEVE by ID controller
app.get('/tasks/:_id', (req, res) => {
    task.retrieveTaskByID(req.params._id)
    .then(task => { 
        if (task !== null) {
            console.log(`"${task}" was retrieved, based on its ID.`);
            res.json(task);
        } else {
            res.status(404).json({ Error: 'The ID entered retrieved no task from the list.' });
        }         
     })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'The ID entered retrieved no task from the list.' });
    });

});


// UPDATE controller ************************************
app.put('/tasks/:_id', (req, res) => {
    task.updateTask(
        req.params._id, 
        req.body.task,
    )
    .then(task => {
        console.log(`"${task}" was updated.`);
        res.json(task);
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'Task could not be updated.' });
    });
});


// DELETE Controller ******************************
app.delete('/tasks/:_id', (req, res) => {
    task.deleteTaskById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                console.log(`Based on its ID, ${deletedCount} task was deleted.`);
                res.status(200).send({ Success: 'Task has been removed from list.' });
            } else {
                res.status(404).json({ Error: 'Task could not be removed from list.' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Task could not be removed from collection.' });
        });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});