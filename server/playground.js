const express=require('express');
const app=express();

app.get('/',(req,res)=>{
  console.log('111');
  res.set('acesstoken','12345').send('sucess');
});
app.get('/post',(req,res)=>{
  console.log(req.header('acesstoken'));
  res.send('done');
});

app.listen(2000,()=>{
  console.log('2000')
});
