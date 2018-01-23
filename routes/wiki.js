const router = require('express').Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;


router.get('/', function(req, res, next) {
  res.redirect('/');
}); //anything inside this router will be inside of /wiki


router.get('/add', function(req, res, next) {
  res.render('addpage');//this will be at /wiki/add - pass in the html page you want nunjucks to render - render is linked to nunjucks
});

router.get('/:urlTitle', function(req, res, next) {
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then(function(foundPage) {
      if (foundPage === null) {
        return next(new Error('That page was not found!'))
      }
      res.render('wikipage', {
        page: page
      })
  })
  .catch(next);
})
//router.get('/add') will create a post request
router.post('/', function(req, res, next) {

  var newPage = page.build(req.body);
  newPage.save()
    .then(function() {
      res.redirect('/wiki');
    })
    .catch(next);

});

module.exports = router;
