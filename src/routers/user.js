const express = require('express')
const User=require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')

const upload = multer({
  
    limits: {
        fileSize:1000000
    },              
    fileFilter(req, file, cb) {
        if (!file.originalname.match (/\.(jpg|jpeg|png)$/)){
            return cb(new Error('upload a image'))
        }
        cb(undefined,true)
    }
})

router.post('/user/me/avatar',auth,upload.single('avatar'),async(req, res) =>{
    const buffer=await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.status(200).send()
}, (error,req,res,next) =>{
    res.status(400).send({ error: error.message })
})

router.delete('/user/me/avatar',auth,async(req, res) =>{
    req.user.avatar=undefined
    await req.user.save()
    res.send()
}) 
router.get('/user/:id/avatar',async(req, res) =>{
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar) {
            throw new Error("no user or avatar image found")
        }
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
     }
    catch(e) {
        res.status(404).send()
    }
}) 










router.post('/user', async(req, res) => {
    const user =await  new User(req.body)
    try {
        
        await user.save() 
        res.status(201).send(user)  
        const token = await user.generateAuthToken()
        res.status(201).send({user, token }) 
    }
    catch(e) {
        res.status(400).send();
        
    }
})
router.post('/user/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
     }
    catch(e) {
        res.status(500).send()
    }
})
//
router.post('/user/logoutAll', auth, async (req, res) => {
    try {
       req.user.tokens=[]
        await req.user.save()

        res.send()
     }
    catch(e) {
        res.status(500).send()
    }
})
router.post('/user/login', async (req, res) => {
        try {
            const user = await User.findByCredentials(req.body.email, req.body.password) 
            const token = await user.generateAuthToken()
            res.send({ user:user , token })//user and token need spaces to function correctly..
         }
        catch (e) {   
            res.status(400).send()
        }
    }) 
 
router.get('/user/me',auth,async(req, res) => {
  
        res.send(req.user)
    
    
})

router.patch('/user/me',auth, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValidOperation = updates.every((update) => 
         allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({error:'invalid updates..updates can be done on name, email, password '})
    }
    try {
      
        updates.forEach((update)=> 
           req.user[update] = req.body[update])
            await req.user.save()
            res.send(req.user)
    }
      
    catch(e){res.status(400).send()}

    
})
router.delete('/user/me',auth, async(req, res) => {
        
    try {
        
        await req.user.remove()
        res.send(req.user)}
    catch(e){res.status(500).send()}

    
})

module.exports = router;