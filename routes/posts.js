var ObjectId = require('mongodb').ObjectID;

module.exports = function(app) {
  app.get("/post/create", function(req, res) {
    res.render("create");
  });

  app.post("/post/create", function(req, res) {
    var date = new Date();
    var strDate = date.getFullYear()+"-";
    if(date.getMonth()+1 < 10) {
      strDate += "0"+(date.getMonth()+1)+"-";
    } else {
      strDate += (date.getMonth()+1)+"-";
    }

    if(date.getDate() < 10) {
      strDate += "0"+date.getDate();
    } else {
      strDate += date.getDate();
    }

    var article = { titre: req.body.titre, auteur: req.body.auteur, contenu: req.body.contenu, date: strDate};
    app.db.collection("article").insertOne(article, function(err, res) {
      if (err) throw err;
      console.log("1 article inserted");
    });
    res.redirect('/');
  });

  app.get("/post/remove", function(req, res) {
    if (req.query.id != null) {
      app.db.collection("article").remove({"_id": new ObjectId(req.query.id)}, function(err, result) {
        if (err) throw err;
        res.redirect('/');
      });
    }
    //
  });

  app.get("/post/:id", function(req, res) {
    app.db.collection("article").findOne({"_id": new ObjectId(req.params.id)}, function(err, result) {
      if (err) throw err;
      res.render("view", {"data": result});
    });
  });
}
