var express = require('express'),
	router = express.Router(),
	passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/login', passport.authenticate('local', {session: false}), function (req, res) {
	res.json(req.user);
});

module.exports = router;
