const router = require('express').Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;


//middleware to redirect '/' to the home page.
router.get('/', function(req, res, next) {
  Page.findAll()
  //returns a promise that has a value of all of the pages
    .then(function(pages) {
      res.render('index', {
        pages: pages//inside of index.html, can use pages
      });
    })
});

//router.get('/add') will create a post request
router.get('/add', function(req, res, next) {
  res.render('addpage');//this will be at /wiki/add - pass in the html page you want nunjucks to render - render is linked to nunjucks
});

router.get('/:urlTitle', function(req, res, next) {
  var urlTitleOfAPage = req.params.urlTitle;
  Page.findOne({
    where: {
      urlTitle: urlTitleOfAPage
    }
  })
  .then(function(foundPage) {
      if (foundPage === null) {
        return next(new Error('That page was not found!'))
      }
      res.render('wikipage', {
        page: foundPage
      })
  })
  .catch(next);
})
//router.get('/add') will create a post request
router.post('/', function(req, res, next) {

  User.findOrCreate({
    where: {
      email: req.body.authorEmail,
      name: req.body.authorName
    }
  })
  .spread(function(user, wasCreatedBool) { //resolves to the page that was found or created and a boolean
   Page.create({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status
   })
   .then(function(createdPage){
      return createdPage.setAuthor(user);
   })
   .then(function (createdPage) {
      res.redirect(createdPage.route);
  })
  .catch(next);
  });
});

module.exports = router;
