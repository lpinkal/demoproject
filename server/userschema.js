const mongoose=require('mongoose');
const validator=require('validator');
const environment=require('./environment').module.environment;
mongoose.Promise=global.Promise;
console.log(environment);
mongoose.connect(environment.mongoURL);
const bcrypt=require('bcrypt');

var user1schema=new mongoose.Schema({
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
    },
  acesstoken:{
      type:String,
    unique:true
  }
});

user1schema.pre('save', function (next) {
  console.log('save');
  bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(Date.now().toString(),salt,(err,hash)=>{
      console.log('hash');
      this.acesstoken=hash;
      next();
    })
  });

});

var Userdata=mongoose.model('User1data',user1schema);

module.exports={Userdata};
