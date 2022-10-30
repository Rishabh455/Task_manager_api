const mongoose = require('mongoose');
const validator = require('validator');
const taskSchema=new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim:true
    },
    completed: {
        type: Boolean,
        defalut:false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    }
}, {
    timestamps:true


}
)

taskSchema.pre('save', async function (next) {
    const user = this
    // if (user.isModified('password')) {
    //     user.password=await bcrypt.hash(user.password,8)
    // }
    //console.log('just befor saving');
    next()
    
})



const task = mongoose.model('task',taskSchema)
    module.exports= task