var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
//  console.log(req.baseUrl);
res.json({ message: 'Hello World!', array: [1, 2, 3, 4, 5] });

   // res.send(200,`Hello World!${JSON.stringify({ array: [1, 2, 3, 4, 5] })}`);
});

module.exports = router;
