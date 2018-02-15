const mongoose=require('mongoose');
const validator=require('validator');
const environment=require('./environment').module.environment;
mongoose.Promise=global.Promise;
console.log(environment);
mongoose.connect(environment.mongoURL);

var studentschema=new mongoose.Schema({
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
  }
});

var Studentdata=mongoose.model('Studentdata',studentschema);

module.exports={Studentdata};
