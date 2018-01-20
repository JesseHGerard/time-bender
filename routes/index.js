const path = require('path');
const app = require('express');
const router = app.Router();



router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/view-react-dom/build/index.html'));
});




module.exports = router;
