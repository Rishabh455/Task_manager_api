const express = require('express')
const Task = require('../models/task')
const auth=require('../middleware/auth')
const router = new express.Router()
router.post('/task',auth, async(req, res) => {
   // const task = await new Task(req.body)
    const task = new Task({
        ...req.body,
        owner:req.user._id
    })
    try {
        await task.save();
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
        //onsole.log('e',e);
    }
    
})

 //GET/task?completed=true
 //GET /task?limit=10&skip10
 //GET/task?sortBy=createdAt:desc
router.get('/task', auth, async (req, res) => {
    
    const match = {}
    const sort = {}
    if (req.query.completed) {
        match.completed=req.query.completed==='true'
    }
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]]=parts[1]==='desc'? -1:1
    }
    try {
        //const task=await Task.find({owner:req.user._id})
        await req.user.populate({
            path: 'task', 
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        })
        res.send(req.user.task)
    } 
     catch(e){res.status(500).send()}
   
})
    
router.patch('/task/:id',auth,async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => 
         allowedUpdates.includes(update)
    )
    if (!isValidOperation) {
        return res.status(400).send({error:'invalid updates..updates can be done on name, sub only.. '})
    }
    try {
        
        const task = await Task.findOne({_id:req.params.id,owner:req.user._id})
        //const task = await Task.findById(req.params.id)
        updates.forEach((update)=> 
            task[update] = req.body[update])
            await task.save()
    
           res.send(task)
       
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)}
    catch(e)
    {  res.status(500).send()}
   
})
router.delete('/task/:id',auth, async(req, res) => {
    const _id=req.params.id
    try {
        const task = await Task.findOneAndDelete({_id, owner:req.user._id})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)}
    catch(e){res.status(500).send()}

    
})

router.get('/task/:id',auth, async(req, res) => {
        const _id=req.params.id
    try {
        const task = await Task.findOne({ _id, owner:req.user._id })
        //const task = await Task.findById(req.params.id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task) 
    }
    catch(e){res.status(500).send(e)}

    
})













module.exports=router

