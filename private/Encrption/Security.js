bcrypt.hash('password', 5, function( err, bcryptedPassword) {
   //save to db
});

//to compare password that user supplies in the future
var hash = getFromDB(..);
bcrypt.compare(userSuppliedPassword, hash, function(err, doesMatch){
  if (doesMatch){
     //log him in
  }else{
     //go away
  }
 });