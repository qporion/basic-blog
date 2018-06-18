var posts = require("./posts");

module.exports = function(app) {

  app.get("/", function(req, res) {
    app.db.collection("article").find({}).toArray( function(err, result) {
      if (err) throw err;
      result = result.reverse();
      res.render("index", {"data": result});
    });    
  });

  // Register posts endpoint
  posts(app);
}	
