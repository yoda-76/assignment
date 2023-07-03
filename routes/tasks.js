const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// Create a new task
router.post('/', async (req, res) => {
  try {
    if(!req.body.tasks){
      // if(!req.body.title){res.status(404).send("title cant be empty")}
      const task = await Task.create(req.body);
      res.status(201).json({ [task._id]:task.title });
    }else{
      const task = await Task.insertMany(req.body.tasks);
      const resp={tasks:[]};
      task.map(t=>{
        resp.tasks.push({id:t._id})
      });
      res.status(201).json(resp);

    }
  } catch (error) {
    res.status(500).json(error );
  }
});

// List all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Get a specific task
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.status(200).json(task);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch task' });
  }
});

// Delete a specific task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// Bulk Delete
router.delete('/', async (req, res) => {
  try {
    console.log("s",req.body.tasks.map(t=>t.id))
    const task = await Task.deleteMany({_id:{$in:req.body.tasks.map(t=>t.id)}});
    console.log(task)
    if (!task) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// Update a specific task
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

module.exports = router;
