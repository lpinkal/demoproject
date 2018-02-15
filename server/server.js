const express=require('express');
const cors = require('cors');
const {Userdata}=require('./userschema');
const {Studentdata}=require('./studentschema');
const bodyParser=require('body-parser');
const passport=require('passport');
const Strategy=require('passport-local').Strategy;
const session=require('express-session');
const environment=require('./environment').module.environment;
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var cookieParser=require('cookie-parser');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');




const app=express();
app.use(bodyParser.json());
// app.use(cors());
// app.use(cors({origin: [
//     "http://localhost:4200"
//   ], credentials: true,header:'Content-Type'}));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "http://localhost:4200");
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Expose-Headers',"content-type, cache,X-Custom-header,acesstoken");
  res.header("AccessControlAllowMethods", "POST, GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers,Origin,Access-Control-Expose-Headers, X-Requested-With, Content-Type, Accept,acesstoken");
  next();
});

app.use(session({secret:'secreat'}));


app.get('/post',(req,res)=>{

  req.session.name='1223456';
  res.send('sucess')
});

app.get('/',(req,res)=>{
  console.log(req.session);
  res.send(req.session);
});

app.get('/logout',(req,res)=>{
  req.session.destroy();
  res.send(req.session);
});


app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user,cb)=>{
  console.log('ser');
  cb(null,user);
});

passport.deserializeUser((user,cb)=>{
  console.log('deser');
  cb(null,user);
});


authchecker=(req,res,next)=>{


  Userdata.findOne({email:req.body.user}).then((data)=>{
    console.log(req.headers.acesstoken);
    console.log(data);
    console.log(data.acesstoken);
    if(data.acesstoken===req.headers.acesstoken) {
      console.log('12334');
       next();

    }else{
      console.log('err');
    }
  });

};



app.get('/err',(req,res)=>{
  res.send('errr');
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
  req.session.email=req.session.passport.user.email;
  console.log(req.session);
  res.set("acesstoken",req.session.passport.user.acesstoken);
  res.json({user:req.session.passport.user.email});
});


app.get('/err',(req,res)=>{
  console.log('err');
  res.json('err');
});

app.post('/post',(req,res)=>{
console.log(req.headers);



  var user1=new Userdata(req.body.value);


  console.log(user1);
  user1.save().then((resolve)=>{
    req.session.email=user1.email;
    //console.log(user1);
    //console.log('at'+user1.acesstoken);
    res.set("acesstoken",user1.acesstoken);
    console.log(res._headers);
   // console.log("node responser: ",res);
    res.send({user:user1.email});
  },(err)=>{
    console.log(err);
    res.json({message: 'err'});
  });


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

app.post('/profile',authchecker,(req,res)=>{
 // console.log(req);
  Userdata.findOne({email:req.body.name},(err,users)=>{
    //console.log(users);

    res.json(users)
  });
});

app.post('/edit',authchecker,(req,res)=>{
  console.log('req');
  console.log(req.body.psw);
  console.log(req.body.user);
  console.log(req.headers.acesstoken);
  Userdata.findOneAndUpdate({email:req.body.user},{$set:{password:req.body.psw}}).then((res)=>{
    console.log('res');
  },(err)=>{
    console.log('err');
  });
res.json({"msg":'sucess'})

});

app.post('/delete',authchecker,(req,res)=>{
  console.log(req.body.user);

  Userdata.findOneAndRemove({email:req.body.user}).then((res)=>{

  },()=>{

  });
  res.send(req.body);
});


app.post('/studentpost',authchecker,(req,res)=>{
  console.log(req.session);
  var student1=new Studentdata(req.body.body);
  student1.save().then((data)=>{
    res.json({message: 'sucess'});
  },(err)=>{
    res.json({message: 'err'});
  })

});

app.post('/displaystudent',authchecker,(req,res)=>{
  Studentdata.find({}).then((students)=>{
    //console.log(students);
    res.json(students);
  })
});

app.post('/deletestudent',authchecker,(req,res)=>{
  console.log(req.body.email);
  Studentdata.findOneAndRemove({email:req.body.email}).then((data)=>{
    res.json({message: 'sucess'});
  },(err)=>{
    res.json({message: 'err'});
  });
});

app.post('/updatestudent',authchecker,(req,res)=>{
  Studentdata.findOne({email:req.body.email}).then((data)=>{
    res.json(data);
  })
});

app.post('/saveupdate',authchecker,(req,res)=>{
  console.log(req.body);
  let value=req.body.value;
  Studentdata.findOneAndUpdate({email:req.body.email},{$set:{name:value.name,password:value.password}}).then((data)=>{
    console.log(data);
    res.json({message: 'sucess'});
  })
});

app.post('/logout',authchecker,(req,res)=>{
  req.session.destroy();
  console.log(req.session);
  res.json({message: 'sucess'});
});


app.post('/upload',urlencodedParser,(req,res)=>{
  console.log(req);
});






app.listen(environment.port,()=>{
  console.log('app started on port '+environment.port)
});
