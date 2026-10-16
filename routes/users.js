var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Got a get request');
});

// app.post('/users', (req: Request, res: Response) => {
//   res.send('Got a POST request');
// });
// app.post('/', (req, res) => {
//   res.send('Got a POST request');
// });

// app.delete('/user', (req, res) => {
//   res.send('Got a DELETE request at /user');
// });

// app.put('/user', (req, res) => {
//   res.send('Got a PUT request at /user');
// });
module.exports = router;
