const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')
const Task = require('./task')
const sharp=require('sharp')
const userSchema=new mongoose.Schema({
    name: {
        type:String
    },
    
    email: {
        type: String,
        required: true,
        unique:true,
        trim: true,
        lowercase:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
             //return console.log('enter valid email');
            }
        }
    },



    password: {
        type: String,
        required: true,
        trim: true,
        minlength:7,
        
        validate(value) {
           
          if (value.includes("password")) {
                throw new Error('password cannot be password!!')
            }
        }
    },
    
   


    tokens: [{
        token: {
            type: String,
            required:true
        }
    }],avatar: {
        type:Buffer
    }
}, {
    timestamps:true


}
)
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token  = jwt.sign( { _id:user._id.toString()},'thisisit')
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject
}

userSchema.virtual('task', {
    ref: 'task',
    localField: '_id',
    foreignField:'owner'
})


userSchema.statics.findByCredentials = async(email,password)=>
{
    const user = await User.findOne({email})
    if (!user) {
     throw new Error('unable to login')
    }
    const isMatch =await bcrypt.compare(password,user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user 
}
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password=await bcrypt.hash(user.password,8)
    }
   // console.log('just befor saving');
    next()
     
}) 

//Delete user task when user is removed
userSchema.pre('remove', async function (next) {
    const user = this
   await Task.deleteMany({ owner: user._id })
    next()
}) 

const User = mongoose.model('User',userSchema ) 
module.exports = User