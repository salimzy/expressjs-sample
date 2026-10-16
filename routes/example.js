var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
 console.log(req);
   res.send('Hello World!',{array:[1,2,3,4,5]});
});

module.exports = router;
