module.exports = function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.status(401);
  res.json({error: "Unauthorized"});
};


