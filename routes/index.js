//Require wiki.js and user.js into routes/index.js and plug them in (remember, routers are middleware).
const router = require('express').Router();//creating router instance w/ express.
const wikiRouter = require('./wiki');
const userRouter = require('./user');
const {Page} = require('../models')


router.use('/wiki', wikiRouter); //use any request that comes in that starts with wiki. give that request the function 'wikiRouter'
//wikiRouter is a function w/ req, res, and next.
//redirect our request with the above middleware whenever it starts w/ wiki.
router.use('/user', userRouter);

//middleware to redirect '/' to the home page.
router.get('/', function(req, res, next) {
  Page.findAll()
  //returns a promise that has a value of all of the pages
    .then(function(pages) {
      res.render('index', {
        pages: pages//inside of index.html, can use pages
      });
    })
  res.render('index');
});

router.use(function(err, req, res, next) {
  console.error(err);
  res.status(500).send(err.message);
})

module.exports = router;
