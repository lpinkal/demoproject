
const environment={
  mongoURL:'mongodb://localhost:27017/angularuserdata',
  port:process.env.PORT|'3000',
  jsonsecret:'hello'
};
exports.module={environment};
