const authModel = require("../models/auth-model");

exports.register = (req,res)=>{
  authModel.createAccount(req.body).then(result => {
    res.send(result)
  }).catch(err => {
    console.log(err)
  })
}

exports.login = (req,res) => {
  authModel.login(req.body).then( result => {
    req.session.userId = result.user[0];
    res.send(result);
  }).catch(err => {
    res.send(err)
  })
}