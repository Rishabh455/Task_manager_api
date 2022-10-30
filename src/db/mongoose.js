
const mongoose = require('mongoose');
const validator = require('validator');
mongoose.connect('mongodb://localhost:27017/deploydb', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify:false
}, (err) => {
    if (!err) { console.log('connection to db done'); }
    else{ console.log("error in db connection" + err);}
});
// mongoose.connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, (err) => {
//     if (!err) { console.log('connection to db done'); }
//     else{ console.log("error in db connection" + err);}
// });



    //     useUnifiedTopology: true
    // }, (err) => {
    //     if (!err) { console.log('connection to db done'); }
    //     else{ console.log("error in db connection" + err);}
    // });

// mongoose.connect('mongodb://localhost:27017/deploydb',
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     },
//     () => {
//         console.log("DB connected!!")
//     }
// );

//app.use(express.urlencoded({ extended: true }));
// const User = mongoose.model('User', {
//     name: {
//         type:String
//     },
    
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase:true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error('Email is invalid')
//              //return console.log('enter valid email');
//             }
//         }
//     },



//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength:7,
        
//         validate(value) {
           
//           if (value.includes("password")) {
//                 throw new Error('password cannot be password!!')
//             }
//         }
//     }



// })
// const me = new User({
//     name: 'Ritu',
//     email: 'mikeFULER@gmail.com',
//     password:'esha'
// })
// me.save().then(() => {
//     console.log(me);
// }).catch((error) => {
//     console.log('error',error);
// })
// const eva = mongoose.model('eva', {
//     name: {
//         type: String,
//         required: true,
//         validate(value) {
//             if (!value) {
//                 value=='dafault value'
//             }
//         }
//     },
//     sub: {
//         type:Boolean
//     }
// })
// const he = new eva({
//     name:'hey nikiki',
//     sub:false
// })
// he.save().then(() => {
//     console.log(he);
// }).catch((error) => { console.log('error', error); })