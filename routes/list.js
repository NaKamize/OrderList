var express = require('express');
var router = express.Router();

router.get('/list', (req, res) => {
    res.send("Hey");
    res.render('list', { title: 'All Orders' });
});

module.exports = router;
