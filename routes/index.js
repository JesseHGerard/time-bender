const path = require('path');
const app = require('express');
const router = app.Router();



router.get('/vr', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/VRContent/vr/index.html'))
});



module.exports = router;
