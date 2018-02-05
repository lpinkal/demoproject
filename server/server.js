const express=require('express');
const cors = require('cors');
const {Userdata}=require('./userschema');
const bodyParser=require('body-parser');
const passport=require('passport');
const Strategy=require('passport-local').Strategy;
const session=require('express-session');
const environment=require('./environment').module.environment;
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var cookieParser=require('cookie-parser');
const jwt=require('jsonwebtoken');

const app=express();
app.use(bodyParser.json());
app.use(cors());




app.use(session({secret:'secreat'}));

app.use(passport.initialize());
app.use(passport.session())

passport.serializeUser((user,cb)=>{
  console.log('ser');
  cb(null,user);
});

passport.deserializeUser((user,cb)=>{
  console.log('deser');
  cb(null,user);
});


// app.use(function(req,res,next){
//   res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
//   console.log('session gtrg '+JSON.stringify(req.session.passport));
//   if(req.url=='/login' || req.url=='/logout' || req.url=='/post'){
//     next();
//   }else{
//     if(req.session.passport){
//       if(Object.keys(req.session.passport).length!=0) {
//         next();
//       }
//       else{
//         console.log("ede3d");
//       }
//     }else{
//       console.log("!passport");
//     }
//   }
// });


passport.use(new Strategy((username,password,cb)=>{
  console.log("name"+username);
  Userdata.findOne({email:username},(err,users)=>{
    if(err){ console.log('err');return cb(null,false);}
    if(!users){console.log('!users');return cb(null,false);}
    console.log(users);
    if(users.password!==password){console.log('password not match');return cb(null,false);}
    else{return cb(null,users);}
  }).catch(()=>{
    console.log('err');
  });
}));





app.post('/login',urlencodedParser,passport.authenticate('local',{
  failureRedirect:'/err',
}),(req,res)=>{
  console.log('sucess user ');
  console.log('sucess user '+req.session.passport.user.email);
  const token=jwt.sign(JSON.stringify(req.session.passport.user),environment.jsonsecret);
  res.json({token:token,user:req.session.passport.user.email});
});


app.get('/err',(req,res)=>{
  console.log('err');
  res.json('err');
});

app.post('/post',(req,res)=>{

  // let name=req.body.value.name;
  // let password=req.body.value.password;
  // let email=req.body.value.email;
  // console.log(name+' '+password+' '+email);

  var user1=new Userdata(req.body.value);
  console.log(req.body);
  user1.save().then((resolve)=>{
    console.log('sucess');
    res.json({message: 'sucess'});
  },(err)=>{
    console.log('err');
    res.json({message: 'err'});
  })
});

// app.post('/login',(req,res)=>{
//    console.log(req.body.value.password);
//     // Userdata.find({email:req.body.value.email}).then((user)=>{
//     //     console.log(user);
//     //     res.json({message: 'sucess'});
//     // },(err)=>{
//     //     res.json({message: 'err'});
//     // })
//     Userdata.findOne({email:req.body.value.username},(err,users)=>{
//         if(err){ console.log('err');res.json({message: 'err'});}
//         if(!users){console.log('!users');res.json({message: 'err'});}
//         console.log(users);
//         if(users.password!==req.body.value.password){console.log('password not match');res.json({message: 'err'});}
//         else{res.json({message: 'sucess'});}
//     }).catch(()=>{
//         console.log('err');
//     });
// });

// app.get('/login',(req,res)=>{
//   Userdata.find({},(err,users)=>{
//     res.send(users);
//   })
// });

app.post('/profile',(req,res)=>{
  //console.log(req.body.name);
  Userdata.findOne({email:req.body.name},(err,users)=>{
    //console.log(users);
    res.json(users)
  });
});

app.post('/edit',(req,res)=>{
  console.log('req');
  console.log(req.body.psw);
  console.log(req.body.user);

  Userdata.findOneAndUpdate({email:req.body.user},{$set:{password:req.body.psw}}).then((res)=>{
    console.log('res');
  },(err)=>{
    console.log('err');
  });
res.json({"msg":'sucess'})

});

app.listen(environment.port,()=>{
  console.log('app started on port '+environment.port)
});
