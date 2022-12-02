exports.isUser = (req,res) => {
  console.log("cheking if user logged in");
  console.log(req.session.userId)
  if (req.session.userId) {
    res.send({
      user:true
    })
  } else {
    res.send({
      user:false
    })
  }
}