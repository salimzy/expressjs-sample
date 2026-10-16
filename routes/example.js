var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {

   res.json({array:[1,2,3,4,5], status: 200});
});

module.exports = router;
