const mongoose=require('mongoose');
const validator=require('validator');
const environment=require('./environment').module.environment;
mongoose.Promise=global.Promise;
console.log(environment);
mongoose.connect(environment.mongoURL);

var userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:1,
        unique:true,
        validate:{
            validator:validator.isEmail,
            message:`{value} not valid`
        }
    },
    password:{
        type:String,
        minlength:3,
        required:true
    },
    gender:{
        type:String,
        required:true,
        trim:true
    }
});

var Userdata=mongoose.model('Userdata',userschema);

module.exports={Userdata};
