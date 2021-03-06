//Require wiki.js and user.js into routes/index.js and plug them in (remember, routers are middleware).
const router = require('express').Router();//creating router instance w/ express.
const wikiRouter = require('./wiki');
const userRouter = require('./user');
const {Page} = require('../models')


router.use('/wiki', wikiRouter); //use any request that comes in that starts with wiki. give that request the function 'wikiRouter'
//wikiRouter is a function w/ req, res, and next.
//redirect our request with the above middleware whenever it starts w/ wiki.
router.use('/user', userRouter);




module.exports = router;
